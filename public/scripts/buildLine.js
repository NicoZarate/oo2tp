//var evalledData = traerJsonParaVis();
var items = new vis.DataSet();
// itemAux se necesita para el callback en el update y no perder el objeto
var itemAux;


// ------ inicio definición de la línea de tiempo ------


var container = document.getElementById('visualization');

  // ------ inicio opciones y callbacks ------


  var options = {
   timeAxis: {scale: 'millisecond', step: 1},
    editable: true,
    //esto es para que convierta las fechas en milisegundos y se vea 0 1 2 3..
    start: new Date(0),
    end: new Date(1),
    min: new Date(0),
    format: {
      minorLabels: function(date, scale, step) {
        switch (scale) {
          case 'millisecond':
            return new Date(date).getTime();
          case 'second':
            var seconds = Math.round(new Date(date).getTime() / 1000);
            return seconds;
          case 'minute':
            var minutes = Math.round(new Date(date).getTime() / 1000 * 60);
            return minutes;
         //............................ and so on ..........................
      }
    }
  },


    minHeight:"250px",
    showMajorLabels:false,

    onAdd: function (item, callback) {
      $('#myModal').on('show.bs.modal', function (e) {
              document.getElementById("tipo").value= '';
              document.getElementById("nombre").value = '';
              document.getElementById("start").value= '';
              document.getElementById("end").value= '';
              document.getElementById("tran1").value= '';
              document.getElementById("tran2").value= '';

         
        });

      jQuery.noConflict();
      $('#myModal').modal('show');

    },
    
    onUpdate: function (item, callback) {
         itemAux=item;
         jQuery.noConflict();
         $('#myUpModal').on('show.bs.modal', function (e) {
              document.getElementById("tipoUp").value= item.widget_id;
              document.getElementById("tipoUp1").innerHTML= item.widget_id;
              document.getElementById("nombreUp").value = item.content;
              if(item.start instanceof Date){
                document.getElementById("startUp").value= getMilliseconds(item.start);
                document.getElementById("endUp").value= getMilliseconds(item.end);
              }else{
                 
                 document.getElementById("startUp").value= item.start;
                document.getElementById("endUp").value= item.end;
            }
              $('#tipoUp').prop('disabled', true);
              cambioselect("tipoUp","tran1Up","tran2Up");
              document.getElementById("tran1Up").value= item.transition_in;
              document.getElementById("tran2Up").value= item.transition_out;

         
        });
       $('#myUpModal').modal('show');
       
      
  },
   onMoving: function (item, callback) {
      //no borrar, hace que no se puedan mover los eventos
    
    },

    onRemove: function (item, callback) {
      prettyConfirm('Remove item', 'Do you really want to remove item ' + item.content + '?', function (ok) {
        if (ok) {
          callback(item); // confirm deletion
        }
        else {
          callback(null); // cancel deletion
        }
      });
    }
  };

  // ------ fin opciones y callbacks ------

var timeline = new vis.Timeline(container, items, options);

//este fit hace que el 0 este al principio y no en el medio

timeline.fit();


// ------ fin definición de la línea de tiempo ------

// ------ inicio funciones para los callbacks ------

items.on('*', function (event, properties) {
  logEvent(event, properties);
});

function logEvent(event, properties) {
  var msg = document.createElement('div');
  msg.innerHTML = 'event=' + JSON.stringify(event) + ', ' +
      'properties=' + JSON.stringify(properties);
  
}

  function prettyConfirm(title, text, callback) {
    swal({
      title: title,
      text: text,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: "#DD6B55"
    }, callback);
  }

  function prettyPrompt(title, text, inputValue, callback) {
    swal({
      title: title,
      text: text,
      type: 'input',
      showCancelButton: true,
      inputValue: inputValue
    }, callback);
  }


  // ------ fin funciones para los callbacks ------

  // ------ inicio funciones de carga y guardado de JSON ------

   function loadData () {
    
    var select=document.getElementById("selectJson").value;
    
    if (select!=''){
      var evalledData = traerJsonParaVis();
      items.clear();
      items.add(evalledData);
      timeline.fit();
      swal("Loaded!", "You loaded the timeline!", "success");

    }
    
  }

  function saveData() {
    var select=document.getElementById("selectJson").value;
    var filename=document.getElementById("jsonName").value;
    
    
    if (select=='' & filename!='') {
    //crearNuevo
      filename=filename + '.json';
      mensajeAlServer(filename);
      
    }
    else{
      if (filename!=''){
        //actualizar;

        filename=filename + '.json';
        oldfilename=select + '.json';

        //si son iguales no actualizo el nombre

        if (filename==oldfilename){

           mensajeAlServer(filename);

        }
        else{
        //modificar
         mensajeAlServer(filename,oldfilename);
        }

      }
     }
   }

$('#selectJson').on('change', function() {
  document.getElementById('jsonName').value = this.value;
})

function mensajeAlServer(filename,oldfilename){
      var data = items.get({
      type: {
        start: 'ISODate',
        end: 'ISODate'
      }
      });
      data = reverseJsonForvis(data);
     if(oldfilename==undefined){

      $.ajax({
        type: 'POST',
        dataType: 'text',
        url: "http://localhost:3000/save",
        data: {
          JsOn: data,
          filename:filename
        }
        ,
        success: function () { window.location.href = "/"; },
        error: function(e) {
          console.log(e);
        }
      });
     

     }else{
        $.ajax({
          type: 'POST',
          dataType: 'text',
          url: "http://localhost:3000/update",
          data: {
            JsOn: data,
            oldfilename:oldfilename,
            filename:filename
          }
          ,
          success: function () { window.location.href = "/"; },
          error: function(e) {
            console.log(e);
          }
        });

     }
    swal("Saved!", "You saved the timeline!", "success");
  }
// ------ fin funciones de carga y guardado de JSON ------


//------- inicio conversión y manejo de json ------

  function reverseJsonForvis(myJsonVis){
      var str= '';
       $.each(myJsonVis, function(i, item) {
           var j = {
              "start":getMilliseconds(item.start),
              "end":getMilliseconds(item.end),
              "widget_id":item.widget_id,
              "transition_in":item.transition_in,
              "transition_out":item.transition_out,
              "content":item.content
            };
            str= str + JSON.stringify(j);
            if(i < (myJsonVis.length -1) ){
               str =str + ';';
          }
       });
       return str;
  }


   function traerJsonParaVis(){
       var filename=document.getElementById("selectJson").value + '.json';
       filename="./periodos/"+String(filename);
       var jsonData = $.ajax({
          url: filename,
          dataType: "json",
          async: false
          }).responseText;
      var myJson = JSON.parse(jsonData);
      myJson=convertJsonForVis(myJson);
      return eval("("+myJson+")");

 } 

  function convertJsonForVis(myJson){
       var array = [];
       var str;
       $.each(myJson, function(i, item) {
           if(item.content==undefined){
              item.content=item.widget_id;
              jsonInArrangement(item, array);
          }else{

            jsonInArrangement(item, array);
          }

       });
        return JSON.stringify(array);
  }
     

  function jsonInArrangement(aJson, array){
     var j = {
      "start": aJson.start,
      "end":aJson.end,
      "widget_id":aJson.widget_id,
      "transition_in":aJson.transition_in,
      "transition_out":aJson.transition_out,
      "content":aJson.content
     };
     array.push(j);

  }


//------- fin conversión y manejo de json ------

//------- trae el json de las transiciones según el tipo seleccionado ------

  function traerTrans(){
       var jsonData = $.ajax({
          url: "./sysfiles/transitions.json",
          dataType: "json",
          async: false
          }).responseText;
      return jsonData;

  }

  //------- inicio manipulación de items de la línea de tiempo ------

  function guardar(){

  var nombre = document.getElementById("nombre").value;
  var tipo = document.getElementById("tipo").value;
  var start = Number(document.getElementById("start").value);
  var end = Number(document.getElementById("end").value);
  var tran1 = document.getElementById("tran1").value;
  var tran2 = document.getElementById("tran2").value;

  var ejemplo = {
     "start":start,
     "end":end,
     "widget_id": tipo,
     "transition_in": tran1,
     "transition_out": tran2,
     "content": nombre
   };

   var data = items.get({
    type: {
      start: 'ISODate',
      end: 'ISODate'
    }
  });


     data.push(ejemplo);

     items.clear();
     items.add(data);
     timeline.fit();


     $('#myModal').modal('hide');

  }

  function changeItem(){
    itemAux.content = document.getElementById("nombreUp").value;
    itemAux.start = Number(document.getElementById("startUp").value);
    itemAux.end = Number(document.getElementById("endUp").value);
    itemAux.transition_in = document.getElementById("tran1Up").value;
    itemAux.transition_out = document.getElementById("tran2Up").value;
    //alert(itemAux.content);
    items.update({id:itemAux.id,end:itemAux.end, 
          start: itemAux.start, 
          content: itemAux.content, 
          transition_in: itemAux.transition_in, 
          transition_out: itemAux.transition_out});
   itemAux = null;
    $('#myUpModal').modal('hide');
  }


//------- inicio manipulación de items de la línea de tiempo ------


//------- redefinición de función para portabilidad de navegadores ------


  function getMilliseconds(aDate){
      var str = JSON.stringify(aDate);
      str = Number(str.slice(-5,-2));
      return str;
  }


// ------ inicio select dinámico que actualiza transiciones cuando cambia el type ------
  

function cambioselect(aType,tran1,tran2) {

    var x = document.getElementById(aType).value;
    trans=traerTrans();

    var json = JSON.parse(trans);


    for (var key in json){

      if (key==x){

        var value = json[key].tran1;
        var value2 = json[key].tran2;

        document.getElementById(tran1).options[0]=new Option(value,value);
        document.getElementById(tran1).options[1]=new Option(value2,value2);


        document.getElementById(tran2).options[0]=new Option(value,value);
        document.getElementById(tran2).options[1]=new Option(value2,value2);



      }
        
    }


}

// ------ fin select dinámico que actualiza transiciones cuando cambia el type ------

