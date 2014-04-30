/* GLOBALES */
    mensaje = $('#successMessage');
    itemsOrdenar = [
      "barco", "gato", "lentes", "pato", "pelota", "perro", "raton", "zapato" 
    ],

/* GLOBALES */



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
        var newItems = [];
        for(var i = 0; i < numero; i++) {
              var idx = Math.floor(Math.random() * itemsOrdenar.length);
              newItems.push(itemsOrdenar[idx]);
              itemsOrdenar.splice(idx, 1);
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
            opacity: 0
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
                opacity: 1
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
var Stopwatch = function(elem, options) {
  
  var timer       = createTimer(),
      startButton = createButton("start", start),
      stopButton  = createButton("stop", stop),
      resetButton = createButton("reset", reset),
      offset,
      clock,
      interval;
  
  // default options
  options = options || {};
  options.delay = options.delay || 1;
 
  // append elements     
  elem.appendChild(timer);
  elem.appendChild(startButton);
  elem.appendChild(stopButton);
  elem.appendChild(resetButton);
  
  // initialize
  reset();
  
  // private functions
  function createTimer() {
    return document.createElement("span");
  }
  
  function createButton(action, handler) {
    var a = document.createElement("a");
    a.href = "#" + action;
    a.innerHTML = action;
    a.addEventListener("click", function(event) {
      handler();
      event.preventDefault();
    });
    return a;
  }
  
  function start() {
    if (!interval) {
      offset   = Date.now();
      interval = setInterval(update, options.delay);
    }
  }
  
  function stop() {
    if (interval) {
      clearInterval(interval);
      interval = null;
    }
  }
  
  function reset() {
    clock = 0;
    render(0);
  }
  
  function update() {
    clock += delta();
    render();
  }
  
  function render() {
    timer.innerHTML = clock/1000; 
  }
  
  function delta() {
    var now = Date.now(),
        d   = now - offset;
    
    offset = now;
    return d;
  }
  
  // public API
  this.start  = start;
  this.stop   = stop;
  this.reset  = reset;
};


// basic examples
var elems = document.getElementsByClassName("basic");

for (var i=0, len=elems.length; i<len; i++) {
  new Stopwatch(elems[i]);
}


// programmatic examples
var a = document.getElementById("a-timer");
aTimer = new Stopwatch(a);
aTimer.start();

var b = document.getElementById("b-timer");
bTimer = new Stopwatch(b, {delay: 100});
bTimer.start();

var c = document.getElementById("c-timer");
cTimer = new Stopwatch(c, {delay: 456});
cTimer.start();

var d = document.getElementById("d-timer");
dTimer = new Stopwatch(d, {delay: 1000});
dTimer.start();


/* RELOJ */