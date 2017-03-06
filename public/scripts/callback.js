
    

  var jsonData = $.ajax({
      url: "./scripts/periodos.json",
      dataType: "json",
      async: false
      }).responseText;
  var global;
  var myJson = JSON.parse(jsonData);
  convertJsonForVis(myJson);
  var evalledData = eval("("+global+")");
  //var btnLoad = document.getElementById('load');
  //var btnSave = document.getElementById('save');
  var items = new vis.DataSet(evalledData);





      

  




  var container = document.getElementById('visualization');
  var options = {
    editable: true,
    min:0,
    minHeight:"250px",
    showMajorLabels:false,

    onAdd: function (item, callback) {
      $(document).ready(function() {
        // Handler for .ready() called.
       var dialogform = document.getElementById('ola');
       alert(dialogform);


       var dialogform = document.getElementById('ola');
      

      uno = $( "#uno" ),
      alert(uno);
      dos = $( "#dos" ),
      allFields = $( [] ).add( uno ).add( dos ),
      tips = $( ".validateTips" );


      var dialog = $( "#dialog" ).dialog({
        autoOpen: false,
        height: 400,
        width: 350,
        modal: true,
        buttons: {
          "Create an account": 'ola',
          Cancel: function() {
            dialog.dialog( "close" );
          }
        },
        close: function() {
          form[ 0 ].reset();
          allFields.removeClass( "ui-state-error" );
        }
      });

      dialog.dialog( "open" );
   }); },

    onMove: function (item, callback) {
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
    },

    onUpdate: function (item, callback) {
      prettyPrompt('Update item', 'Edit items text:', item.content, function (value) {
        if (value) {
          item.content = value;
          callback(item); // send back adjusted item
        }
        else {
          callback(null); // cancel updating the item
        }
      });
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
    var data = evalledData;
    items.clear();
    items.add(data);
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
   

  function convertJsonForVis(myJson){
       var array = [];
       $.each(myJson, function(i, item) {
            jsonInArrangement(item, array);

       });
        global = JSON.stringify(array);
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
  function getMilliseconds(aDate){
      var str = JSON.stringify(aDate);
      str = Number(str.slice(-5,-2));
      return str;
  }

