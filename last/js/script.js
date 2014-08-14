function getSlide(slider, item) {
    var wdt = $('.'+slider).width();

    if(item==1){
        var left = 0;
    }
    else{
        var left = (item-1)*(wdt);
    }
    $('.sliderContent').animate({'marginLeft': -(left)});

}



var ganados = 0;
var perdidos = 0;
var isready = 2;
var currentOportunities = 0;

var miCrono = null;
var enmarcha = false;
var segundos =0;
var minutos = 0;
var horas = 0;
var puntos;

var correctCards = 0;

var acerts = 0;
var selected = 0;
var tree = 0;
var animal = 0;
var currentEntorno = [];
var currentClasificacionID = [];
var currentClasificacion = [];

var gamer1;
var gamer2;

var correctInGame = 0;


/////dag function presidents


function init() {

    correctInGame = 6;

    // Hide the success message
    $('#successMessage').hide();
    $('#successMessage').css( {
        left: '580px',
        top: '250px',
        width: 0,
        height: 0
    } );

    // Reset the game
    correctCards = 0;
    $('#presidentsName').html( '' );
    $('#presidentsPhoto').html( '' );

    // Create the pile of shuffled cards
    var numbers = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49];
    numbers.sort( function() { return Math.random() - .5 } );

    for ( var i=0; i<6; i++ ) {
        $('<div><img src="images/presidentes/' + numbers[i] + '_n.png"></div>').data( 'number', numbers[i] ).attr( 'id', 'card'+numbers[i] ).appendTo( '#presidentsName' ).draggable( {
            containment: '#content',
            stack: '#presidentsName div',
            cursor: 'move',
            revert: true
        } );
    }

    // Create the card slots
    //var words = [ 'one', 'two', 'three', 'four', 'five', 'six'];
    for ( var i=1; i<=6; i++ ) {
        $('<div><img src="images/presidentes/' + numbers[i-1] + '_f.png"></div>').data( 'number', numbers[i-1] ).appendTo( '#presidentsPhoto' ).droppable( {
            accept: '#presidentsName div',
            hoverClass: 'hovered',
            drop: handleCardDrop
        } );
    }

    $('#presidentsName').randomize('div');

}

function handleCardDrop( event, ui ) {

    var slotNumber = $(this).data( 'number' );
    var cardNumber = ui.draggable.data( 'number' );

    // If the card was dropped to the correct slot,
    // change the card colour, position it directly
    // on top of the slot, and prevent it being dragged
    // again

    if ( slotNumber == cardNumber ) {
        ui.draggable.addClass( 'correct' );
        ui.draggable.draggable( 'disable' );
        $(this).droppable( 'disable' );
        ui.draggable.position( { of: $(this), my: 'left top', at: 'left top' } );
        ui.draggable.draggable( 'option', 'revert', false );
        correctCards++;
    }

    // If all the cards have been placed correctly then display a message
    // and reset the cards for another go

    if ( correctCards == correctInGame ) {
        $('#successMessage').show();
        $('#successMessage').animate( {
            left: '50%',
            top: '50%',
            width: '380px',
            height: '250px',
            opacity: 1
        } );

        $('#time_result').empty();
        $('#time_result').append(minutos+' minuto con '+segundos+' segundos');

        detener();
    }

}



$.fn.randomize = function(selector){
    var $elems = selector ? $(this).find(selector) : $(this).children(),
        $parents = $elems.parent();

    $parents.each(function(){
        $(this).children(selector).sort(function(){
            return Math.round(Math.random()) - 0.5;
            // }). remove().appendTo(this); // 2014-05-24: Removed `random` but leaving for reference. See notes under 'ANOTHER EDIT'
        }).detach().appendTo(this);
    });
    return this;
};

function resetPresidents(){
    init();
    getSlide('item_section', 1);
}
function showItem(itemShow){
    $('.'+itemShow).show("slow");
}
function hideItem(itemHide){
    $('.'+itemHide).hide('slow');
}

//////end drag function presidents



////////////reloj progresive


function detener(){
    if (enmarcha){
        clearTimeout(miCrono);
        enmarcha = false;
    }
}
//inicializa contadores globales

function ponerAceros(){
//puntos = false;
segundos = 0;
minutos = 0;
horas = 0;
document.crono.display.value = '00:00';
}
//incrementa el crono y configura la salida
function mostrar(){
if (puntos == true){
    segundos ++;
    if (segundos > 59){
        segundos = 0;
        minutos ++;
        if (minutos > 59){
            minutos = 0;
            horas ++;
            if (horas > 99){
                alert ('No hay más tiempo…');
                detener();
                return true;}
        }
    }
}
var texto = '';
horas = horas.toString();
if (horas.length == 1) horas = '0'+horas;
minutos = minutos.toString();
if (minutos.length == 1) minutos = '0'+minutos;
segundos = segundos.toString();
if (segundos.length == 1) segundos = '0'+segundos;
if (puntos == false){
    texto += minutos+' '+segundos;
    //texto += horas+' '+minutos+' '+segundos;
    document.crono.display.value = texto;
    puntos = true;}
else{
    texto += minutos+':'+segundos;
    //texto += horas+':'+minutos+':'+segundos;
    document.crono.display.value = texto;
    puntos = false;}
miCrono = setTimeout('mostrar()', 500);
enmarcha = true;
return true;}
function iniciar() {
    puntos = false;
    mostrar();
}

////////////end reloj progresive

var level;
///////temporizador

function regresive(time){

    if(time && time!=null && time != undefined){
        level = time;
    }
    else{
        level = level;
    }

    $('#countdown-callback').countdown({
        date: +(new Date) + level,
        render: function(data) {
            $(this.el).text(this.leadingZeros(data.sec, 2) + " sec");
        },
        onEnd: function() {

            $('#successMessage').show();
            $('#successMessage').animate( {
                left: '50%',
                top: '50%',
                width: '380px',
                height: '250px',
                opacity: 1
            } );

            $('#gotas_content .gota').hide();
            isready=2;
            $(this.el).addClass('ended');

            $('#time_result').empty();
            $('#time_result').append(ganados);
        }
    });
    $('#countdown-callback').removeClass('ended').data('countdown').update(+(new Date) + level).start();


}
//////end temporizador


/////////entorno

var entornoRoutes =  ['bosque_amazonico', 'bosque_andino', 'bosque_litoral', 'bosque_manglar'];
var entornonames = ['Bosque Húmedo Amazónico', 'Bosque Andino', 'Bosque Seco Litoral', 'Bosque Seco Litoral Manglar'];

var animals = [[1,2,3,4,5,6,7,8],[1,2,3,4,5],[1,2,3,4,5,6,7,8,9],[1,2,3,4]];
var trees = [[1,2,3],[1,2,3,4,5,6],[1,2,3],[1,2]];


function initEntornos() {

    $('#entornosElement .inactive, .itm2, .itm3').hide();

    $('#successMessage').hide();
    $('#successMessage').css( {
        left: '580px',
        top: '250px',
        width: 0,
        height: 0
    } );


    var entornos = [1,2,3,4];
    entornos.sort( function() { return Math.random() - .5 } );

    selected = 0;
    tree = 0;
    animal = 0;
    $('#entornos').html( '' );
    $('#entornosElement .itm1 .container-ent, #entornosElement .itm2 .container-ent, #entornosElement .itm3 .container-ent').html( '' );

    for ( var i=0; i<3; i++ ) {

        currentEntorno.push(entornos[i]);
        addEnt(entornos[i]);
    }

    function addEnt(ent){
        $('<div onclick="selectEntorno('+ent+')"><img src="images/entornos/suelos/' +entornoRoutes[(ent)-1]+ '/1.png"></div>').data( 'number', ent ).attr( 'id', 'card'+ent ).appendTo( '#entornosElement .itm1 .container-ent' );
    }

}

function selectEntorno(id){


    $('#entornos').data( 'number', id ).droppable( {
        accept: '.container-ent div',
        hoverClass: 'hovered',
        drop: handleEntorno
    } );

    $('#entornos').droppable( 'enable' );


    selected = id;
    $( '#entornos').empty();
    $( '#entornosElement .itm2 .container-ent, #entornosElement .itm3 .container-ent').empty();
    $('.itm1 .inactive, .itm2, .itm3').show();
    $('<div id="dropEntorno"><div class="entornoName">'+entornonames[(id-1)]+'</div><img class="suelos_img" src="images/entornos/suelos/'+entornoRoutes[(id)-1]+'/1.png"></div>').appendTo( '#entornos' );

    for ( var i=0; i<3; i++ ) {
        var selectTree = trees[(currentEntorno[i])-1];
        var selectAnimals = animals[(currentEntorno[i])-1];
        selectTree.sort( function() { return Math.random() - .5 } );
        selectAnimals.sort( function() { return Math.random() - .5 } );

        $('<div><img src="images/entornos/arboles/'+entornoRoutes[(currentEntorno[i])-1]+'/'+selectTree[0]+'.png"></div>').data( {'number': currentEntorno[i],'type': 1} ).attr( 'id', 'card'+currentEntorno[i] ).appendTo( '#entornosElement .itm2 .container-ent' ).draggable( {
            containment: '#content',
            stack: '#dropEntorno',
            cursor: 'move',
            revert: true
        } );

        $('<div><img src="images/entornos/animales/'+entornoRoutes[(currentEntorno[i])-1]+'/'+selectAnimals[0]+'.png"></div>').data( {'number': currentEntorno[i],'type': 2} ).attr( 'id', 'card'+currentEntorno[i] ).appendTo( '#entornosElement .itm3 .container-ent' ).draggable( {
            containment: '#content',
            stack: '#dropEntorno',
            cursor: 'move',
            revert: true
        } );
        if(i==2){
            $('<div><img src="images/entornos/animales/'+entornoRoutes[(currentEntorno[i])-1]+'/'+selectAnimals[2]+'.png"></div>').data( {'number': currentEntorno[i],'type': 2} ).attr( 'id', 'card'+currentEntorno[i] ).appendTo( '#entornosElement .itm3 .container-ent' ).draggable( {
                containment: '#content',
                stack: '#dropEntorno',
                cursor: 'move',
                revert: true
            } );
        }

        $('#entornosElement .itm2 .container-ent').randomize('div');
        $('#entornosElement .itm3 .container-ent').randomize('div');
    }

}


function handleEntorno( event, ui ) {

    var cardNumber = ui.draggable.data( 'number' );
    if ( cardNumber == selected ) {
        ui.draggable.addClass( 'correct' );
        ui.draggable.draggable( 'disable' );
        ui.draggable.draggable( 'option', 'revert', false );
        acerts++;

        if(ui.draggable.data( 'type' ) == 1){
            ui.draggable.position( { of: $(this), my: 'right bottom', at: 'right bottom' } );
            $('.itm2 .inactive').show();
        }

        if(ui.draggable.data( 'type' ) == 2){
            ui.draggable.position( { of: $(this), my: 'left bottom', at: 'left bottom' } );
            $('.itm3 .inactive').show();
        }

        if(acerts == 2){
            $(this).droppable( 'disable' );
        }

    }
    else{
        document.getElementById('player').play();
    }
    if ( acerts == 2 ) {
        $('#successMessage').show();
        $('#successMessage').animate( {
            left: '50%',
            top: '50%',
            width: '380px',
            height: '250px',
            opacity: 1
        } );

    }

}

function resetEntorno(){

    acerts = 0;
    selected = 0;
    tree = 0;
    animal = 0;
    currentEntorno = [];

    initEntornos();
}

////////end entorno



//////gotas

function initGotas() {

    $('#score1').empty();
    $('#score1').append('0');
    $('#score2').empty();
    $('#score2').append('0');

    ganados = 0;
    perdidos = 0;

    $('#successMessage').hide();
    $('#successMessage').css( {
        left: '580px',
        top: '250px',
        width: 0,
        height: 0
    } );

    isready = 1;

    fallingSnow();
}

function resetGotas(){
    $('#countdown-callback').data('countdown').stop();
    isready = 2;
    $('#gotas_content .gota').hide();
}

function reiniciarGotas(){
    resetGotas();
    initGotas();
    regresive(level);
}

////////objetos caen

function fallingSnow() {

    if(currentOportunities==0){

        $('<div id="gotas_content"></div>').appendTo( '#gotas' );
        var $gota = $(),
            creategota = function () {
                var qt = 10;
                for (var i = 0; i < qt; ++i) {

                    if(isready==2){
                        var $snowflake = $('<div class="gota" onclick=addPoint("gota'+i+'") id="gota'+i+'"></div>').data('estatus',3);
                    }
                    else{
                        var $snowflake = $('<div class="gota" onclick=addPoint("gota'+i+'") id="gota'+i+'"></div>').data('estatus',1);
                    }

                    $snowflake.css({
                        'left': (Math.random() * $('#gotas_content').width()) + 'px',
                        'top': (- Math.random() * $('#gotas_content').height()) + 'px'
                    });
                    // add this snowflake to the set of gota
                    $gota = $gota.add($snowflake);
                }
                $('#gotas_content').prepend($gota);
            },

            runSnowStorm = function() {
                $gota.each(function() {

                    singleAnimation = function($flake) {
                        $flake.animate({
                            top: "500px",
                            opacity : "0"
                        }, Math.random()*-7000 + 12000, function(){
                            // this particular snow flake has finished, restart again
                            $flake.css({
                                'left': (Math.random() * $('#gotas_content').width()) + 'px',
                                'top': (- Math.random() * $('#gotas_content').height()-100) + 'px',
                                'opacity': 1
                            });
                            singleAnimation($flake);

                            if(isready==1){
                                if($flake.data('estatus')==1){
                                    perdidos++;
                                    $('#score2').empty();
                                    $('#score2').append(perdidos);
                                }
                            }

                            if(isready==2){
                                $flake.hide().data('estatus',3);
                            }
                            else{
                                $flake.show().data('estatus',1);
                            }

                        });
                    };
                    singleAnimation($(this));

                });
            };

        currentOportunities++;

        creategota();
        runSnowStorm();

    }
    else{
        $('#gotas_content .gota').css({'top': '-500px'});
        $('#gotas_content .gota').show();
    }

}
function addPoint(gota){
    ganados++;
    $('#'+gota).hide().data('estatus',2);
    $('#score1').empty();
    $('#score1').append(ganados);
};

//////end objetos caen

//////end gotas



//////clasificaciones

var clasificacionesName = ['Anfibios','Artrópodos','Aves','Equinodermo','Gusano','Mamíferos','Molusco','Peces','Reptiles'];
var clasificacionesFiles = [1,2,3,4,5,6,7,8,9];
var clasificacionesAnimalsID = [[1,2,3],[1,2,3,4,5,6,7],[1,2,3,4,5,6,7,8,9,10,11,12],[1],[1],[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25],[1],[1,2,3],[1,2,3,4,5,6,7]];
var clasificacionesAnimals = [['rana','salamandra','sapo'],['Abeja','araña','cangrejo','escarabajo','mariposa','mosca','saltamontes'],['aguila','colibri','condor','flamenco','fragata','gallina','gallo','lechuza','papagayo','perico','piquero','tucan'],['estrella de mar'],['gusano'],['ballena','burro','Caballo','canguro','conejo','delfin','elefante','foca','gato','hipopotamo','Jaguar','jirafa','koala','leon','mono','oso de anteojos','oso','oveja','perro','raton','tigre','toro','vaca','zorrillo','zorro de santa elena'],['caracol'],['caballo de mar','pez','piraña'],['Anaconda','cocodrilo','Coral','iguana','lagarto','serpiente','tortuga mordedora']];


function initClasificacion(){
    $('.titulosClasificacion').randomize('div');
    randomClasificacion();
}

function randomClasificacion(){
    currentEntorno = clasificacionesFiles.sort( function() { return Math.random() - .5 } );
    clasificacionesFiles.sort( function() { return Math.random() - .5 } );
    currentEntorno.push(clasificacionesFiles[1]);
    //console.log(currentEntorno);

    for (var i = 0; i < 10; ++i) {
        var acCl = currentEntorno[i];
        var selectedCl = clasificacionesAnimalsID[acCl-1].sort( function() { return Math.random() - .5 } );
        currentClasificacionID.push(selectedCl[0]);
        currentClasificacion.push(clasificacionesAnimals[acCl-1][(selectedCl[0])-1]);
    }
    //console.log(currentClasificacionID);
    //console.log(currentClasificacion);

    initGameCl();

}

function initGameCl(){
    ganados = 0;
    perdidos = 0;
    selected = 0;
    currentOportunities = 0;
    $('#score1').empty();
    $('#score1').append(0);
    $('#score2').empty();
    $('#score2').append(0);

    $('#successMessage').hide();
    $('#successMessage').css( {
        left: '580px',
        top: '250px',
        width: 0,
        height: 0
    } );

    $('#clasificacion').empty();
    $('<div><img src="images/actividades/'+currentEntorno[0]+'/'+currentClasificacionID[0]+'.png"></div>').appendTo( '#clasificacion' );
    selected = currentEntorno[0];
}

function testSelected(id){

    if(id == selected){
        ganados = ganados+1;
        $('#score1').empty();
        $('#score1').append(ganados);
    }
    else{
        document.getElementById('player').play();
        perdidos = perdidos+1;
        $('#score2').empty();
        $('#score2').append(perdidos);
    }

    if(currentOportunities<9){
        currentOportunities = currentOportunities+1;
        selected = currentEntorno[currentOportunities];
        $('#clasificacion').empty();
        $('<div><img src="images/actividades/'+currentEntorno[currentOportunities]+'/'+currentClasificacionID[currentOportunities]+'.png"></div>').appendTo( '#clasificacion' );
    }
    else{
        $('#successMessage').show();
        $('#successMessage').animate( {
            left: '50%',
            top: '50%',
            width: '380px',
            height: '250px',
            opacity: 1
        } );
        $('#time_result').empty();
        $('#time_result').append(ganados);
    }

}

//////end clasificaciones



////////////ciclos de vida


function initCiclos() {

    correctInGame = 4;

    // Hide the success message
    $('#successMessage').hide();
    $('#successMessage').css( {
        left: '580px',
        top: '250px',
        width: 0,
        height: 0
    } );

    // Reset the game
    correctCards = 0;
    $('#ciclosName').html( '' );
    $('#ciclosPhoto').html( '' );

    // Create the pile of shuffled cards
    var numbers = [ 1, 2, 3, 4];
    var animalsFolder = Math.floor(Math.random() * 3) + 1;
    var ciclosFolder = Math.floor(Math.random() * 3) + 1;

    var rotarRandom = 'rotar_'+ (Math.floor(Math.random() * 4) + 1);

    $('#ciclosPhoto').removeClass();
    $('#ciclosPhoto').addClass(rotarRandom);

    for ( var i=0; i<4; i++ ) {
        $('<div><img src="images/ciclos/' + animalsFolder + '/' + numbers[i] + '.png"></div>').data( 'number', numbers[i] ).attr( 'id', 'card'+numbers[i] ).appendTo( '#ciclosName' ).draggable( {
            containment: '#content',
            stack: '#ciclosName div',
            cursor: 'move',
            revert: true
        } );
    }

    // Create the card slots
    //var words = [ 'one', 'two', 'three', 'four', 'five', 'six'];
    for ( var i=1; i<=4; i++ ) {
        $('<div class="ciclo_'+i+'"><img src="images/ciclos/arrow/' + ciclosFolder + '/' +numbers[i-1] + '.png"></div>').data( 'number', numbers[i-1] ).appendTo( '#ciclosPhoto' ).droppable( {
            accept: '#ciclosName div',
            hoverClass: 'hovered',
            drop: handleCardDrop
        } );
    }

    $('#ciclosName').randomize('div');

}

function resetCiclos(){
    initCiclos();
    getSlide('item_section', 1);
}


////////olimpiadas

var olLevel = ['Cuarto año', 'Quinto año', 'Sexto año', 'Séptimo año', 'Olimpiadas']
var olWords = [['acaso','ahorrativo','antepenúltimo','avecilla','banquero','bolivarense','caprichosa','cecilia','desconfianza','enseñanza','escriba','escurridiza','florecillas','huérfano','huésped','huesudo','librazo','lombrices','mansa','perezosos','persuasivos','precisas','renunciáis','vándalo','zapatazo'],
              ['bajeza','bulliciosos','burguesía','burocracia','buscapleitos','cerrajería','conclusión','contingencia','disuasivo','equipaje','evasivo','franqueza','gallinas','geométrico','guisado','humedad','humildad','indulgencia','interpretativo','jacobo','recibo','restringir','televisión','umbilical','velación'],
              ['ágilmente','alcohol','almohada','apoplejía','bastoncillo','bíceps','bisnieto','civilidad','convincente','desprestigio','eminencia','emoción','evacuáis','extranjería','Guayaquil','hemiciclo','hemoglobina','hervir','hiperácido','honorabilidad','nauseabundo','Paraguay','puertorriqueños','vicerrectoras','vizconde'],
              ['abochornadas','abolicionista','abominable','alabancioso','antigüedad','bagatela','bonanza','bulliciosas','cabezazo','converger','cortésmente','crujir','fotogénica','fríamente','gansa','insectívoro','lengüetazo','mugir','piscívoro','proteger','quincuagésima','sediciosos','tejer','venganza','zigzag'],
              ['alabanza','álbum','anexión','ascensión','cerrajería','complazcan','comprensible','connotación','convoy','crustáceo','cuadragésima','discusión','disolución','disyuntiva','ejecutivo','ennegrecer','evolucionar','exhalar','extracción','extraoficial','gentuza','hallábase','hallazgo','heterogéneo','hibernación','incisión','indigencia','innovar','inyectar','legítimo','ojeriza','olimpiada','previsión','proveer','rehuir','reminiscencia','semblanza','sucesión','ultimátum','vayáis']];

var current_level;
function initOlimpiadas(level){

    if(level){
        current_level = level;
    }
    else{
        current_level = current_level;
    }

    $('#successMessage').hide();
    $('#successMessage').css( {
        left: '580px',
        top: '250px',
        width: 0,
        height: 0
    } );

    $('#jugador1, #jugador2').empty();

    addSounds('#jugador1',1,current_level);
    addSounds('#jugador2',2,current_level);
}

var currentLevel;

var comlpeteG1 = false;
var comlpeteG2 = false;

function addSounds(miDiv, gamer, level){

    comlpeteG1 = false;
    comlpeteG2 = false;

    $('.ac_ol_1 .aciertos_ol .aciertos_count').empty();
    $('.ac_ol_2 .fallos_ol .aciertos_count').empty();
    $('.ac_ol_2 .aciertos_ol .aciertos_count').empty();
    $('.ac_ol_1 .fallos_ol .aciertos_count').empty();
    currentLevel = level;

    $('.olimpiadas_level_info').empty();

    if(level<5){
        $('.olimpiadas_level_info').text('Nivel'+level);
    }
    else{
        $('.olimpiadas_level_info').text('Olimpiadas');
    }

    currentClasificacionID = [];

    for ( var i=0; i<5; i++ ) {

        var acItm;

        if(level==5){
            acItm = Math.floor(Math.random() * 40) + 1;
        }
        else{
            acItm = Math.floor(Math.random() * 25) + 1;
        }
        if(i==0){
            currentClasificacionID.push(acItm);

            $('<div class="audio_item sl'+i+'"><a href="javascript:void(0)" onclick="this.firstChild.play()">' +
                '<audio id="player" class="audio_item">'+
                '<source src="images/olimpiadas/ogg/'+level+'/'+currentClasificacionID[i]+'.ogg" type="audio/ogg">'+
                '<source src="images/olimpiadas/mp3/'+level+'/'+currentClasificacionID[i]+'.mp3" type="audio/mpeg">'+
                '</audio><img src="images/play.png"></a>' +
                '<input type="text" id="pr'+i+'"><div class="sn_status"></div></div>').appendTo(miDiv);

        }
        else{
            for (var j=0; j<i; j++){
                if(currentClasificacionID[j] != acItm){
                    if(j==(i-1)){
                        currentClasificacionID.push(acItm);

                        $('<div class="audio_item sl'+i+'"><a href="javascript:void(0)" onclick="this.firstChild.play()">' +
                            '<audio id="player" class="audio_item">'+
                            '<source src="images/olimpiadas/ogg/'+level+'/'+currentClasificacionID[i]+'.ogg" type="audio/ogg">'+
                            '<source src="images/olimpiadas/mp3/'+level+'/'+currentClasificacionID[i]+'.mp3" type="audio/mpeg">'+
                            '</audio><img src="images/play.png"></a>' +
                            '<input type="text" id="pr'+i+'"><div class="sn_status"></div></div>').appendTo( miDiv);

                    }
                }
                else{
                    j=i;
                    i=i-1;
                }
            }
        }
    }

    if(gamer==1){
        gamer1 = currentClasificacionID;
    }
    if(gamer==2){
        gamer2 = currentClasificacionID;
    }
}

function verificar(id){
    var tAc=0;
    var tFl=0;

    if(id==1){
        var dvAc = '#jugador1';
        var testValidate = gamer1;

        comlpeteG1 = true;
    }
    if(id==2){
        var dvAc = '#jugador2';
        var testValidate = gamer2;

        comlpeteG2 = true;
    }

    for(i=0; i<5; i++){
        var wrl = olWords[currentLevel-1][(testValidate[i])-1];
        var rs = $(dvAc+' #pr'+i).val();
        var rslw = rs.toLowerCase();
        $('#jugador'+id+' .sl'+i+' .sn_status').empty();
        console.log(wrl+' = '+rs);
        if(rslw == wrl){
            $('<img src="images/acerto.png">').appendTo('#jugador'+id+' .sl'+i+' .sn_status');
            tAc = tAc + 1;
            console.log('acerto')
        }
        else{
            $('<img src="images/fallo.png">').appendTo('#jugador'+id+' .sl'+i+' .sn_status');
            tFl = tFl+1;
            console.log('fallo')
        }
    }
    $('.ac_ol_'+id+' .aciertos_ol .aciertos_count').empty();
    $('.ac_ol_'+id+' .aciertos_ol .aciertos_count').text(tAc);
    $('.ac_ol_'+id+' .fallos_ol .aciertos_count').empty();
    $('.ac_ol_'+id+' .fallos_ol .aciertos_count').text(tFl);


    if(comlpeteG1 && comlpeteG2){
        $('#successMessage').show();
        $('#successMessage').animate( {
            left: '50%',
            top: '50%',
            width: '380px',
            height: '250px',
            opacity: 1
        } );
        $('#time_result').empty();
        $('#time_result').append(ganados);
    }

}

function resetOlimpiadas(){
    getSlide('item_section', 1);
}