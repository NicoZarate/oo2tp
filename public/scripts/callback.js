
  var evalledData = traerJsonParaVis();
  var items = new vis.DataSet(evalledData);
  var global;





  var container = document.getElementById('visualization');
  var options = {
    editable: true,
    min:0,
    minHeight:"250px",
    showMajorLabels:false,

    onAdd: function (item, callback) {

      jQuery.noConflict();
      $('#myModal').modal('show');

    },

/*    onMove: function (item, callback) {
      var title = 'Do you really want to move the item to\n' +
          'start: ' + item.start + '\n' +
          'end: ' + item.end + '?';

      prettyConfirm('Move item', title, function (ok) {
        if (ok) {
          callback(item); // send back item as confirmation (can be changed)
        }
        else {
          callback(null); // cancel editing item
        }
      });
    },

    onMoving: function (item, callback) {
      if (item.start < min) item.start = min;
      if (item.start > max) item.start = max;
      if (item.end   > max) item.end   = max;

      callback(item); // send back the (possibly) changed item
    }, */

    onUpdate: function (item, callback) {
         global=item;
         jQuery.noConflict();
         $('#myUpModal').on('show.bs.modal', function (e) {
              document.getElementById("tipoUp").value= item.widget_id;
              document.getElementById("tipoUp1").innerHTML= item.widget_id;
              document.getElementById("nombreUp").value = item.content;
              document.getElementById("startUp").value= item.start;
              document.getElementById("endUp").value= item.end;
             // document.getElementById("tranIn").innerHTML= item.transition_in;
             // document.getElementById("tranOut").innerHTML= item.transition_out;
              $('#tipoUp').prop('disabled', true);
              cambioselect("tipoUp","tran1Up","tran2Up");
              document.getElementById("tran1Up").value= item.transition_in;
              document.getElementById("tran2Up").value= item.transition_out;

         
        });
       $('#myUpModal').modal('show');
       
     
      
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
  var timeline = new vis.Timeline(container, items, options);

  items.on('*', function (event, properties) {
    logEvent(event, properties);
  });

  function logEvent(event, properties) {
    //var log = document.getElementById('log');
    var msg = document.createElement('div');
    msg.innerHTML = 'event=' + JSON.stringify(event) + ', ' +
        'properties=' + JSON.stringify(properties);
    //log.firstChild ? log.insertBefore(msg, log.firstChild) : log.appendChild(msg);
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
   function loadData () {
    var evalledData = traerJsonParaVis();
    items.clear();
    items.add(evalledData);
    timeline.fit();
  }

  function saveData() {
    var data = items.get({
      type: {
        start: 'ISODate',
        end: 'ISODate'
      }
    });
    data = reverseJsonForvis(data);
    $.ajax({
      type: 'POST',
      dataType: 'text',
      url: "http://localhost:3000/save",
      data: data,
      error: function(e) {
        console.log(e);
      }
    });
  }
  function reverseJsonForvis(myJsonVis){
      var str= '';
       $.each(myJsonVis, function(i, item) {
           var j = {
              "start":getMilliseconds(item.start),
              "end":getMilliseconds(item.end),
              "widget_id":item.widget_id,
              "transition_in":item.transition_in,
              "transition_out":item.transition_out,
              "content":item.widget_id
            };
            str= str + JSON.stringify(j);
            if(i < (myJsonVis.length -1) ){
               str =str + ';';
          }
       });
       return str;
  }

  //---------------------estas funciones trae y convierte a json en un formato entendible para vis ---
   function traerJsonParaVis(){
       var jsonData = $.ajax({
          url: "./scripts/periodos.json",
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
            jsonInArrangement(item, array);

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
      "content":aJson.widget_id
     };
     array.push(j);

  }

  //----------------------------------------end-----------------------------------


  function getMilliseconds(aDate){
      var str = JSON.stringify(aDate);
      str = Number(str.slice(-5,-2));
      return str;
  }

  //-------------------- SUPER SELECT DINAMICO  -----------------------------------


function cambioselect(aType,tran1,tran2) {
 // alert(aType);
    var x = document.getElementById(aType).value;
    trans=traerTrans();

    var json = JSON.parse(trans);


    for (var key in json){

      if (key==x){

        var value = json[key].tran1;
        var value2 = json[key].tran2;
        console.log(key + ": " + value);
        console.log(key + ": " + value2);

        document.getElementById(tran1).options[0]=new Option("Select transition 1","");
        document.getElementById(tran1).options[1]=new Option(value,value);
        document.getElementById(tran1).options[2]=new Option(value2,value2);


        document.getElementById(tran2).options[0]=new Option("Select transition 2","");
        document.getElementById(tran2).options[1]=new Option(value,value);
        document.getElementById(tran2).options[2]=new Option(value2,value2);



      }
        
    }



}


function traerTrans(){
       var jsonData = $.ajax({
          url: "./scripts/transitions.json",
          dataType: "json",
          async: false
          }).responseText;
      return jsonData;

 }


function versiguardar() {

            var nom = $("#nombre").val();
            if (nom != "") {
                guardar();
            }

    }


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
    global.content = document.getElementById("nombreUp").value;
    global.start = Number(document.getElementById("startUp").value);
    global.end = Number(document.getElementById("endUp").value);
    global.transition_in = document.getElementById("tran1Up").value;
    global.transition_out = document.getElementById("tran2Up").value;
    //alert(global.content);
    items.update({id:global.id,end:global.end, 
          start: global.start, 
          content: global.content, 
          transition_in: global.transition_in, 
          transition_out: global.transition_out});
   global = null;
    $('#myUpModal').modal('hide');
  }