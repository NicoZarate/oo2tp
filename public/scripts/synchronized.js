 //El código para cargar la biblioteca apropiada es 
 //parte del script jsapi incluido y se llama cuando invoca el método google.load ().
 
 //var content = fs.readFileSync("./data.json");
 google.load("visualization", "1");

        // Set callback to run when API is loaded
google.setOnLoadCallback(drawVisualization);

var vis1;
var vis2;
var json;


function createTimeline1() {

    // Create and populate a data table.

    var jsonData = $.ajax({
      url: "./datos1.json",
      dataType: "json",
      async: false
      }).responseText;


    var evalledData = eval("("+jsonData+")");
    var data1 = new google.visualization.DataTable(evalledData);


    // specify options
    options1 = {"width":  "100%",
        "height": "300px",
        "layout": "box",
        "showCustomTime": true,
        "editable": true
    };

    // Instantiate our timeline object.
    vis1 = new links.Timeline(document.getElementById('timeline1'));

    // para no usar GOOGLE!!!
   // links.events.addListener(vis1, 'rangechanged', onrangechange1);

    google.visualization.events.addListener(vis1, 'rangechange', onrangechange1);
    
    google.visualization.events.addListener(vis1, 'timechange', timechange1);

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
    var data2 = new google.visualization.DataTable(evalledData);


    // specify options
    var options2 = {
        width:  "100%",
        height: "300px",
        "showCustomTime": true,
        "editable": true
    };

    // Instantiate our timeline object.
    vis2 = new links.Timeline(document.getElementById('timeline2'), options2);


    google.visualization.events.addListener(vis2, 'rangechange', onrangechange2);
    google.visualization.events.addListener(vis2, 'timechange', timechange2);
    // Draw our timeline with the created data and options
    vis2.draw(data2);

    
    onrangechange1();  // to set the range equal initially
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
var data = data1.getData({
  type: {
    start: 'ISODate',
    end: 'ISODate'
  }
});

function saveData2() {
var data = data2.getData({
  type: {
    start: 'ISODate',
    end: 'ISODate'
  }
});



// serialize the data and put it in the textarea
txtData.value = JSON.stringify(data, null, 2);
}





save1.onclick = saveData1;
save2.onclick = saveData2;