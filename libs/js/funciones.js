/* GLOBALES */
    mensaje = $('#successMessage');
    itemsOrdenar = [
      "barco" , "bus", "calavera", "cama", "campana", "coco", "conejo", "culebra",
      "doctor", "flores", "gato", "helado", "joyas", "lampara", "lapiz", "leon",
      "mono", "mosquito", "pan", "pastel", "pelota", "perro", "piquero", "pito",
      "policia", "raqueta", "raton", "reloj", "tambor", "toro", "tren", "zapato"
    ];
    
    $reloj = $('#t');
    contenedor =  $('#var');
   

        
/* GLOBALES */


    // INSTRUCCIONES //
    $('button#instrucciones').click(function(){
        $('div#instrucciones').fadeToggle();
    });
    // INSTRUCCIONES //


    $('button#regresar').click(function(){
        location.reload();
    });


/* COMPARAR ARRAYS*/
    $.extend({
        compare: function (arrayA, arrayB) {
            if (arrayA.length != arrayB.length) { return false; }
            // sort modifies original array
            // (which are passed by reference to our method!)
            // so clone the arrays before sorting
            var a = $.extend(true, [], arrayA);
            var b = $.extend(true, [], arrayB);
            //a.sort(); 
            //b.sort();
            for (var i = 0, l = a.length; i < l; i++) {
                if (a[i] !== b[i]) { 
                    return false;
                }
            }
            return true;
        }
    });

/* FIN COMPARAR ARRAYS*/




/* NUMEROS A LETRAS */
function toLetters(n)
{
  var o=new Array("diez", "once", "doce", "trece", "catorce", "quince", "dieciséis", "diecisiete", "dieciocho", "diecinueve", "veinte", "veintiuno", "veintidós", "veintitrés", "veinticuatro", "veinticinco", "veintiséis", "veintisiete", "veintiocho", "veintinueve");
  var u=new Array("cero", "uno", "dos", "tres", "cuatro", "cinco", "seis", "siete", "ocho", "nueve");
  var d=new Array("", "", "", "treinta", "cuarenta", "cincuenta", "sesenta", "setenta", "ochenta", "noventa");
  var c=new Array("", "ciento", "doscientos", "trescientos", "cuatrocientos", "quinientos", "seiscientos", "setecientos", "ochocientos", "novecientos");
  var n=parseFloat(n).toFixed(2); /*se limita a dos decimales, no sabía que existía toFixed() :)*/
  var p=n.toString().substring(n.toString().indexOf(".")+1); /*decimales*/
  var m=n.toString().substring(0,n.toString().indexOf(".")); /*número sin decimales*/
  var m=parseFloat(m).toString().split("").reverse(); /*tampoco que reverse() existía :D*/
  var t="";
 
  /*Se analiza cada 3 dígitos*/
  for (var i=0; i<m.length; i+=3)
  {
    var x=t;
    /*formamos un número de 2 dígitos*/
    var b=m[i+1]!=undefined?parseFloat(m[i+1].toString()+m[i].toString()):parseFloat(m[i].toString());
    /*analizamos el 3 dígito*/
    t=m[i+2]!=undefined?(c[m[i+2]]+" "):"";
    t+=b<10?u[b]:(b<30?o[b-10]:(d[m[i+1]]+(m[i]=='0'?"":(" y "+u[m[i]]))));
    t=t=="ciento cero"?"cien":t;
    if (2<i&&i<6)
      t=t=="uno"?"mil ":(t.replace("uno","un")+" mil ");
    if (5<i&&i<9)
      t=t=="uno"?"un millón ":(t.replace("uno","un")+" millones ");
    t+=x;
    //t=i<3?t:(i<6?((t=="uno"?"mil ":(t+" mil "))+x):((t=="uno"?"un millón ":(t+" millones "))+x));
  }
 
  //t+=" con "+p+"/100";
  /*correcciones*/
  //t=t.replace("  "," ");
  //t=t.replace(" cero","");
  //t=t.replace("ciento y","cien y");
  //alert("Numero: "+n+"\nNº Dígitos: "+m.length+"\nDígitos: "+m+"\nDecimales: "+p+"\nt: "+t);
  //document.getElementById("esc").value=t;
  return t;
}

/* NUMEROS A LETRAS */



/* NUMEROS DE FIGURAS A MOSTRAR*/
    function numeroFiguras(numero){

        newItems = [];

        for(var i = 0; i < numero; i++) {
              var idx = Math.floor(Math.random() * itemsOrdenar.length);
              newItems.push(itemsOrdenar[idx]);
              itemsOrdenar.splice(idx, -1);
              
        }
        return newItems;
    }
/* NUMEROS DE FIGURAS A MOSTRAR*/    



/* CERRAR EL MENSAJE DE SUCCESS */
    function cerrarMensaje(){
        mensaje.animate({
            left: '50%',
            top: '150px',
            width: '0',
            height: '0',
            opacity: 0,
            zIndex : '-999'
        }).html('');//mensaje*/
    }
/* CERRAR EL MENSAJE DE SUCCESS */



/* ABRIR EL MENSAJE DE SUCCESS */  
    function mostrarMensaje(contenido){
        mensaje.html(contenido)
            .show()
            .animate({
                left: '250px',
                top: '150px',
                width: '360px',
                height: '200px',
                opacity: 1,
                zIndex : '999'
          });//mensaje
    }
/* ABRIR EL MENSAJE DE SUCCESS */  



/* QUITAR TILDES */  
    function omitirAcentos(text) {
        var acentos = "ÃÀÁÄÂÈÉËÊÌÍÏÎÒÓÖÔÙÚÜÛãàáäâèéëêìíïîòóöôùúüûÑñÇç";
        var original = "AAAAAEEEEIIIIOOOOUUUUaaaaaeeeeiiiioooouuuunncc";
        for (var i=0; i<acentos.length; i++) {
           text = text.replace(acentos.charAt(i), original.charAt(i));
        }
       return text;
    }
/* QUITAR TILDES */  




/* RELOJ */
/*
 * =======================
 * jQuery Timer Plugin
 * =======================
 * 
 * Depends on:    jquery
 * 
 * --------
 * Summary:
 * --------
 * Start/Stop/Resume a time in any HTML element
 */

 (function($){

  var jQueryTimer = function(element, options) {

    var defaults = {
      action: 'start',
      editable: true   //this will let users make changes to the time
    };

    this.options = $.extend(defaults, options);
    this.$el = $(element);


    

    this.init();
    
  };

  /*
    Initialize the plugin with common properties
  */
  jQueryTimer.prototype.init = function() {

    //setup
    this.secsNum           = 0;
    this.minsNum           = 0;
    this.hrsNum            = 0;
    this.secsStr           = "0 sec";
    this.minsStr           = "";
    this.hrsStr            = "";
    this.timerId           = null;
    this.delay             = 1000;
    this.isTimerRunning    = false;

    if (this.options.seconds !== undefined) {
      this.hrsNum = Math.floor(this.options.seconds / 3600);
      this.minsNum = Math.floor((this.options.seconds - (this.hrsNum * 3600))/60);
      this.secsNum = this.options.seconds - (this.hrsNum * 3600) - (this.minsNum * 60);
      
      this.timeToString();
    }
    
    this.elType = this.$el.prop('tagName').toLowerCase();
  };

  jQueryTimer.prototype.start = function () {
    if(!this.isTimerRunning) {
      this.updateTimerDisplay();
      this.incrementTime(); //to avoid the 1 second gap that gets created if the seconds are not incremented
      this.startTimerInterval();
      this.$el.prop('className', 'badge activo');
    }
  }

  jQueryTimer.prototype.stop = function () {
    clearInterval(this.timerId);
    this.updateTimerDisplay();
    this.init();
    this.$el.prop('className', 'badge detenido');
  }


  jQueryTimer.prototype.pause = function () {
    clearInterval(this.timerId);
    this.isTimerRunning = false;
  }

  jQueryTimer.prototype.resume = function () {
    if(!this.isTimerRunning) this.startTimerInterval();
  }

  
  
  
  jQueryTimer.prototype.startTimerInterval = function () {
    var self = this;
    this.timerId = setInterval(function() { self.incrementTime() }, this.delay);
    this.isTimerRunning = true;
  }

  
  jQueryTimer.prototype.updateTimerDisplay = function () {
    //if(this.hrsNum > 0) this.options.showHours = true;
    /*if(this.options.showHours) this.$el.html(this.hrsStr + ":" + this.minsStr + ":" + this.secsStr);
    else this.$el.html(this.minsStr + ":" + this.secsStr);*/
    var displayStr;
    if(this.hrsNum == 0) {
      if(this.secsNum < 60 && this.minsNum == 0) displayStr = this.secsStr + ' sec';
      else displayStr = this.minsStr + ":" + this.secsStr + ' min';
    } else {
      displayStr = this.hrsStr + ':' + this.minsStr + ':' + this.secsStr;
    }

    if(this.elType == 'input' || this.elType == 'textarea') this.$el.val(displayStr);
    else this.$el.html(displayStr);

    //assign the number of seconds to this element's data attribute for seconds
    this.$el.data('seconds', this.get_seconds());
  }
  
  jQueryTimer.prototype.timeToString = function () {
    this.secsStr = ((this.minsNum > 0 || this.hrsNum > 0) && this.secsNum < 10) ?  '0' + this.secsNum : this.secsNum;
    this.minsStr = (this.hrsNum > 0 && this.minsNum < 10) ?  '0' + this.minsNum : this.minsNum;
    this.hrsStr = this.hrsNum;
  }

  /*
    Get the timer's value in seconds
  */
  jQueryTimer.prototype.get_seconds = function () {
    return ((this.hrsNum*3600) + (this.minsNum*60) + this.secsNum);
  }
  
  jQueryTimer.prototype.incrementTime = function () {
    this.timeToString();
    this.updateTimerDisplay();
    
    this.secsNum++;
    if(this.secsNum % 60 == 0) {
      this.minsNum++;
      this.secsNum = 0;
    }
    
    //handle time exceeding 60 minsNum!
    if(this.minsNum > 59 && this.minsNum % 60 == 0)
    {
      this.hrsNum++;
      this.minsNum = 0;
    }
  }
  




  ///////////////////////////////////////////////////
  ///////////////INITIALIZE THE PLUGIN///////////////
  var pluginName = 'timer';
  $.fn[pluginName] = function(options) {

    return this.each(function() {

      // only allow the plugin to be instantiated once
      if (!( $.data( this, 'plugin_' + pluginName ) instanceof jQueryTimer )) {
        $.data( this, 'plugin_' + pluginName, new jQueryTimer(this, options) );
      }

      var instance = $.data( this, 'plugin_' + pluginName );

      if(typeof options == 'string') {
        if(typeof instance[options] == 'function') {
          instance[options].call(instance); //passing in 'instance' to provide for the value of 'this' in the called function
        }
      }
    });
  }
  ////////////////////////////////////////////////////
  ////////////////////////////////////////////////////



 })(jQuery);

/* RELOJ */




// desordenar array //
function shuffle(array) {
  var currentIndex = array.length
    , temporaryValue
    , randomIndex
    ;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
// desordenar array //




//cargarNumeros
function cargarNumeros(min,max, words, id) {
  //$('#numero').fadeIn();
  $('#cardPile , #cardSlots , #numero').html( '' ).fadeIn();
  $('#content').removeClass().addClass('d'+ id);  

  // Reset the game
  correctCards = 0;

  // and the formula is:
  var numbers = (Math.floor(Math.random() * (max - min + 1)) + min).toString();
  
  localStorage.setItem("numbers", numbers);

  $('#numero').html('<p>Forma el número:</p><p id="num">' + numbers + '</p>');
  tempNum = numbers;
  numbers = shuffle(numbers.split(''));

  for ( var i=0; i<numbers.length; i++ ) {
    $('<div class="'+ words[i] +'">' + numbers[i] + '</div>').data( 'number', numbers[i] ).attr( 'id', 'card'+tempNum[i] ).appendTo( '#cardPile' ).draggable( {
      containment: '#content',
      stack: '#cardPile div',
      cursor: 'move',
      revert: true
    } );
  }

  // Create the card slots
  for ( var i=1; i<=tempNum.length; i++ ) {
    $('<div id="'+ words[i - 1] +'">' + words[i - 1] + '</div>').data( 'number', tempNum[i - 1] ).appendTo( '#cardSlots' ).droppable( {
      accept: '#cardPile div',
      hoverClass: 'hovered',
      drop: handleCardDrop
    } );
  }
}//cargarNumeros




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
    ui.draggable.position( { of: $(this), my: 'left top', at: 'left top' });
    ui.draggable.draggable( 'option', 'revert', false );
    correctCards++;
  } 
  
  // If all the cards have been placed correctly then display a message
  // and reset the cards for another go

  if ( correctCards == tempNum.length ) {
    mostrarMensaje('<h2>Bien Hecho!!!</h2><button class="button pulse" onclick="escribir()">Ahora escribe el número</button>');
  }//if correct

}//handleCardDrop


function escribir(){
      numbers = localStorage.getItem('numbers');
      cerrarMensaje();
      contenedor.html('<input type="text" size="50" name="resp" id="resp"/><div class="clear"></div><button id="btnSubmit">Verificar</button><div id="container" class="word"></div>');
}//escribir


function grafica(){
      numbers = localStorage.getItem('numbers');
      cerrarMensaje();
      contenedor.html('<div id="botonesCrear"></div><div id="soltarCubos"></div><div id="crear"></div>');
      botonesCrear = $('#botonesCrear'),
      soltarCubos = $('#soltarCubos');
      
      // for ( var i=0; i<numbers.length; i++ ) {
      //   contenedor.append('<button id="' + words[i]  +'" class="creaelemento">Crea ' + words[i]  +'</button><div id="suelta' + words[i]  +'" class="suelta"></div>').find('#suelta'+ words[i]).show().attr('data-cuenta' , numbers[i]);
      // };
      
      for ( var i=0; i<numbers.length; i++ ) {
        botonesCrear.append('<button id="' + words[i]  +'" class="creaelemento">Crea ' + words[i]  +'</button>');
        soltarCubos.append('<div id="suelta' + words[i]  +'" class="suelta"></div>').find('#suelta'+ words[i]).show().attr('data-cuenta' , numbers[i]);
      }

      


      //defino los elementos que se pueden arrastrar
      $(".arrastrable").draggable();
      $(".arrastrable").data("soltado", false);
      
      //voy a crear una variable para contar los elementos que estoy soltando
      $(".suelta").data("numsoltar", 0);
      //defino elementos donde se puede soltar
      $(".suelta").droppable({
        drop: function( event, ui ) {
            var elem = $(this);
            cuenta = elem.data("numsoltar");
            cuentaCajon = elem.data('cuenta');
            id = elem.attr('id').split('suelta');
            console.log(id[1]);

            if(cuenta != cuentaCajon){  
              if (!ui.draggable.data("soltado")){
                ui.draggable.data("soltado", true);
                elem.data("numsoltar", elem.data("numsoltar") + 1)
                elem.html("Llevo " + elem.data("numsoltar") + " elementos soltados");

              }
            }else{
                elementos = $('.' + id[1]);
                elementos.draggable({
                  cursor: 'move',
                    revert: true
                });
                $('button#'+id[1]).attr("disabled", "disabled").css({
                  opacity: '0.5',
                });
            }//if 
        }//drop
        
      });//suelta
      
      //soltar solo elementos Ds
      $("#sueltaD").droppable("option", "accept", ".D");
      //soltar solo elementos Ues
      $("#sueltaU").droppable("option", "accept", ".U");
      
      //enlaces para crear nuevos elementos Ds y Ues
     $(document).on('click', 'button.creaelemento' , function(){
        var id = $(this).attr('id'),        
          cubos = $('#crear div.' + id).length;

        if(cubos<9){  
          var nuevoElemento = $('<div class="' + $(this).attr("id") + ' arrastrable"></div>');
          nuevoElemento.draggable();
          contenedor.find('#crear').append(nuevoElemento);
        }else{
          $('button#'+id)
            .attr("disabled", "disabled")
            .css({
                opacity: '0.5',
            });
        }//if


      })//click crear elemento


}//escribir



function aleatorio(inferior,superior){ 
      numPosibilidades = superior - inferior 
      aleat = Math.random() * numPosibilidades 
      aleat = Math.floor(aleat) 
      return parseInt(inferior) + aleat 
    } 
    
    
