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

    if(this.options.editable) this.initEditable();

  };

  jQueryTimer.prototype.start = function () {
    if(!this.isTimerRunning) {
      this.updateTimerDisplay();
      this.incrementTime(); //to avoid the 1 second gap that gets created if the seconds are not incremented
      this.startTimerInterval();
    }
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

  /*
    Allow users to click and edit the timer value by typing in
  */
  jQueryTimer.prototype.initEditable = function () {
    var self = this;
    this.$el.on('focus', function(){
      self.pause();
    });

    this.$el.on('blur', function(){
      //get the value and update the number of seconds if necessary
      var timerDisplayStr;

      //remove any spaces while getting the string
      if(self.elType == 'input' || self.elType == 'textarea') timerDisplayStr = $(this).val().replace(/\s+/, '');
      else timerDisplayStr = $(this).html().replace(/\s+/, '');

      //check for seconds
      //check for minutes
      //check for hours

      var matchSeconds  = /\d+sec/,
          matchMinutes  = /\d+\:\d+min/,
          matchHours    = /\d+\:\d+\:\d+/;

      if(timerDisplayStr.match(matchSeconds)) {
        //extract the seconds from this
        self.secsNum = parseInt(timerDisplayStr.replace(/sec/, ''), 10) + 1;
        if (self.secsNum > 59) {
          self.secsNum = 00;
          self.minsNum++;
        }
      } else if(timerDisplayStr.match(matchMinutes)) {
        timerDisplayStr = timerDisplayStr.replace(/min/, '');
        var timerDisplayArr = timerDisplayStr.split(':');
        self.minsNum = parseInt(timerDisplayArr[0], 10);
        self.secsNum = parseInt(timerDisplayArr[1], 10) + 1;

        if (self.secsNum > 59) {
          self.secsNum = 00;
          self.minsNum++;
        }

        if (self.minsNum > 59) {
          self.minsNum = 00;
          self.hrsNum++;
        }

      } else if(timerDisplayStr.match(matchHours)) {
        var timerDisplayArr = timerDisplayStr.split(':');
        self.hrsNum = parseInt(timerDisplayArr[0], 10);
        self.minsNum = parseInt(timerDisplayArr[1], 10);
        self.secsNum = parseInt(timerDisplayArr[2], 10) + 1;

        if (self.secsNum > 59) {
          self.secsNum = 00;
          self.minsNum++;
        }

        if (self.minsNum > 59) {
          self.minsNum = 00;
          self.hrsNum++;
        }
      }
      self.resume();
    });
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





