 //El código para cargar la biblioteca apropiada es 
 //parte del script jsapi incluido y se llama cuando invoca el método google.load ().
 
 //var content = fs.readFileSync("./data.json");
 google.load("visualization", "1");

        // Set callback to run when API is loaded
        google.setOnLoadCallback(drawVisualization);

        var vis1;
        var vis2;
        var json;
        $.getJSON("/data.json", function(datos) {
                   json = datos;
                
        });

        

        function createTimeline1() {

            // Create and populate a data table.
            var data1 = new google.visualization.DataTable();
            data1.addColumn('datetime', 'start');
            data1.addColumn('datetime', 'end');
            data1.addColumn('string', 'content');
            

            data1.addRows([
                [new Date(2017,1,10), , 'Conversation<br>' +
                        '<img src="img/comments-icon.png" style="width:32px; height:32px;">'],
                [new Date(2017,1,10,23,0,0), , 'Mail from boss<br>' +
                        '<img src="img/mail-icon.png" style="width:32px; height:32px;">'],
                [new Date(2017,1,10,16,0,0), , 'Report'],
                [new Date(2017,1,10), new Date(2017,1,11), 'Traject A'],
                [new Date(2017,1,10), , 'Memo<br>' +
                        '<img src="img/notes-edit-icon.png" style="width:48px; height:48px;">'],
                [new Date(2017,1,10), , 'Phone call<br>' +
                        '<img src="img/Hardware-Mobile-Phone-icon.png" style="width:32px; height:32px;">'],
                [new Date(2017,1,21), new Date(2017,1,30), 'Traject B'],
                [new Date(2017,1,30,12,0,0), , 'Report<br>' +
                        '<img src="img/attachment-icon.png" style="width:32px; height:32px;">']
            ]);

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


            links.events.addListener(vis1, 'rangechanged', onrangechange1);

            //google.visualization.events.addListener(vis1, 'rangechange', onrangechange1);
            
            google.visualization.events.addListener(vis1, 'timechange', timechange1);

            // Draw our timeline with the created data and options
            
            vis1.draw(data1, options1);

        }

        function createTimeline2() {
            var myJSON = '{ "name":"Tarjeta" , "date": [ '+
            ' {"anio": "2017" , "mes": "01","dia": "24" },'+
            '{"anio": "2017" , "mes": "01","dia": "30" }]}';
            var aux = new Date(2017,01,16);

            //alert(aux);
            var myObj = JSON.parse(myJSON);
            //var algo = JSON.parse(data);
             //alert(algo.name[0]);
            //alert(parseInt(myObj.anio));
            // Create and populate a data table.
<<<<<<< HEAD
            var data2 = new google.visualization.DataTable();
            data2.addColumn('datetime', 'start');
            data2.addColumn('datetime', 'end');
            data2.addColumn('string', 'content');

            data2.addRows([
                [aux, 
                new Date(parseInt(myObj.date[1].anio),parseInt(myObj.date[1].mes),parseInt(myObj.date[1].dia)),json["name"] ],
                [new Date(2017,01,17), json["date"], 'Traject D']
            ]);
=======
            //var data2 = new google.visualization.DataTable();
            //data2.addColumn('datetime', 'start');
            //data2.addColumn('datetime', 'end');
           // data2.addColumn('string', 'content');
           // datos= [
           //     [new Date(2017,01,19), new Date(2017,01,30), 'Traject C'],
             //   [new Date(2017,01,19), new Date(2017,01,31), 'Traject D']
            //];
            //data2.addRows(datos);


            //var fs = require('fs');
            //var contenido = fs.readFileSync("datos.json");
            //var jsonData = JSON.parse(contenido);

            //jsonData = require('./datos.json');
            //console.log("ola ke tal");
            var data2 = new google.visualization.DataTable(jsonData);
>>>>>>> bc77992525cdc4251369705d680d14de05c370b3

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