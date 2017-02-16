 //El código para cargar la biblioteca apropiada es 
 //parte del script jsapi incluido y se llama cuando invoca el método google.load ().

 //var content = fs.readFileSync("./data.json");
 google.load("visualization", "1");

        // Set callback to run when API is loaded
google.setOnLoadCallback(drawVisualization);

var vis1;
var vis2;
var json;


    var bsave1 = document.getElementById('save1');
    var bsave2 = document.getElementById('save2');


var data1;
var data2;

function createTimeline1() {

    // Create and populate a data table.

    var jsonData = $.ajax({
      url: "./datos1.json",
      dataType: "json",
      async: false
      }).responseText;


    var evalledData = eval("("+jsonData+")");
    data1 = new google.visualization.DataTable(evalledData);


    // specify options
    var options1 = {
        width:  "100%",
        height: "300px",
        "showCustomTime": true,
        "editable": true,
    };

    // Instantiate our timeline object.
    vis1 = new links.Timeline(document.getElementById('timeline1'));

    // para no usar GOOGLE!!!
   // links.events.addListener(vis1, 'rangechanged', onrangechange1);

    google.visualization.events.addListener(vis1, 'rangechange', onrangechange1);
    
    google.visualization.events.addListener(vis1, 'timechange', timechange1);

    google.visualization.events.addListener(vis1, 'select', selectHandler) ;

    google.visualization.events.addListener(vis1, 'add', addHandler) ;
    
    function addHandler() {
        var selectedItem = vis1.getSelection()[0];
      prettyPrompt('Add item', 'Enter text content for new item:', data1.getValue(selectedItem.row, 0), function (value) {
        if (value) {
          data1.getValue(selectedItem.row, 0) = value;
          callback(selectedItem); // send back adjusted new item
        }
        else {
          callback(null); // cancel item creation
        }
      });
    }

    function selectHandler() {
          var selectedItem = vis1.getSelection()[0];
          if (selectedItem) {
            var topping = data1.getValue(selectedItem.row, 0);
            alert('The user selected ' + topping);
          }
        }

    // Draw our timeline with the created data and options
    
    vis1.draw(data1, options1);

}

function createTimeline2() {

    // Create and populate a data table.

    var jsonData2 = $.ajax({
      url: "./datos2.json",
      dataType: "json",
      async: false
      }).responseText;


    var evalledData = eval("("+jsonData2+")");
    data2 = new google.visualization.DataTable(evalledData);


    // specify options
    var options2 = {
        width:  "100%",
        height: "300px",
        "showCustomTime": true,
        "editable": true,
         onAdd: function (item, callback) {
      prettyPrompt('Add item', 'Enter text content for new item:', item.content, function (value) {
        if (value) {
          item.content = value;
          callback(item); // send back adjusted new item
        }
        else {
          callback(null); // cancel item creation
        }
      });
    },

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

    // Instantiate our timeline object.
    vis2 = new links.Timeline(document.getElementById('timeline2'), options2);


    google.visualization.events.addListener(vis2, 'rangechange', onrangechange2);
    google.visualization.events.addListener(vis2, 'timechange', timechange2);
    // Draw our timeline with the created data and options
    vis2.draw(data2);

    
    onrangechange1();  // to set the range equal initially


 
}
 function logEvent(event, properties) {
    var log = document.getElementById('log');
    var msg = document.createElement('div');
    msg.innerHTML = 'event=' + JSON.stringify(event) + ', ' +
        'properties=' + JSON.stringify(properties);
    log.firstChild ? log.insertBefore(msg, log.firstChild) : log.appendChild(msg);
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
// Called when the Visualization API is loaded.
function drawVisualization() {
    createTimeline1();
    createTimeline2();
}

function onrangechange1() {
    var range = vis1.getVisibleChartRange();
    vis2.setVisibleChartRange(range.start, range.end);
}

function onrangechange2() {
    var range = vis2.getVisibleChartRange();
    vis1.setVisibleChartRange(range.start, range.end);
}

function timechange1() {
    var time = vis1.getCustomTime();
    vis2.setCustomTime(time);
}

function timechange2() {
    var time = vis2.getCustomTime();
    vis1.setCustomTime(time);
}

function saveData1() {
    var datos1 = data1.toJSON();

//console.log(datos1);

//var datos1 = JSON.stringify(datos1);
console.log(datos1);

   $.ajax({
  type: 'POST',
  dataType: 'text',
  url: "http://localhost:3000/traerJSON",
  data: datos1,
  error: function(e) {
    console.log(e);
  }
});

/*$.ajax({
    type: "POST",
    url: "/webservices/PodcastService.asmx/CreateMarkers",
    // The key needs to match your method's input parameter (case-sensitive).
    data: JSON.stringify({ Markers: markers }),
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: function(data){alert(data);},
    failure: function(errMsg) {
        alert(errMsg);
    }
});
*/


/* 
    var req = {
    method: 'POST',
    url: "http://localhost:3000/traerJson'",
    headers : {
        'Content-Type' : 'application/json; charset=utf-8'
    },
    body: datos1
    };
 */

}

function saveData2() {
    var datos2 = data2.toJSON();
    $.ajax({
      type: "POST",
      url: "../../app.js",
      data: {datos2}
    }).done(function(msg) {
      alert("Data Saved: " + msg);
    });
    }