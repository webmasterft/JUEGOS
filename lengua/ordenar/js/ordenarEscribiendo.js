  $(function() {
    var items = [
      "pelota",
      "corazon",
      "leon",
      "pelota"
    ]; 



  var newItems = [],
      result=[];
  
  var $ul = $('#sortable');
    for(var i = 0; i < 4; i++) {
        var idx = Math.floor(Math.random() * items.length);
        newItems.push(items[idx]);
        items.splice(idx, 1);
    }



  $.each(newItems, function(index, val) {
    $ul.append('<li class="ui-state-default" id='+ newItems[index] + '><img src="img/'+ newItems[index] + '.jpg" width="100" height="90"></li>');
  });

  
 
  var respuestaOK = newItems.sort(function(a, b){
      var a1= a, b1= b;
      if(a1== b1) return 0;
      return a1> b1? 1: -1;
  });

   $('form button').on('click', function(e){
      e.preventDefault();
      $("form#respuestas input[type=text]").each(function(index, val){
        var input = $(this).val(); // This is the jquery object of the input, do what you will
        console.log(input);
        if(input ===""){
          error = '<p>Rellena todos los campos</p>';
        }else{
          result.push(input);
        }
      });//form each
      console.log(result);
      $('div#error').html(error);
   }); 

  /*$("#sortable").sortable({
    update: function(event, ui) {
      var result = $(this).sortable('toArray');
      if($.compare(respuestaOK, result)){
        $('body').append('<p>Felicitaciones</p>');
        Stopwatch.stop();
      }
    },
  }).disableSelection();*/
    
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




  });//function ready
  



