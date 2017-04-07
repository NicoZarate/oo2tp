var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require("path");

router.get('/', function(req, res, next) {
  fs.readFile('./public/model_widgets.json', 'utf8', function (err, data) {
        var tipos = JSON.parse(data);
        
        var archivos = [];
        
        var directorio = './public/periodos/';
        fs.readdir(directorio, function (err, files) {
          if (err) {
              throw err;
          }

          files.forEach(function (file) {
            var file1 = file
            archivos.push(file1);
          });
          res.render('index', { title : 'Main page', types : tipos, archivos : archivos });
          
        });

        

  });
    
});


router.post('/save', function (request, response) { 
	var strJson = convertRequestInJson(request.body);
	fs.writeFile("./public/scripts/periodos.json",strJson , function(err) {
    if(err) {
        return console.log(err);
    }

    console.log("The file was saved!");
});

});


function convertRequestInJson(aData){
    var json = '{';
  	aData = JSON.stringify(aData);
  	var str = aData.replace(/\\/g,'');
  	str = str.slice(2,-5);
  	str = str.split(';');
  	for (var i = 0, len = str.length; i < len; i++) {
		  json = json + '"prueba'+i+'":'+str[i]
		if(i < len-1){
		  json = json +',';
		} 
	} 
    return json + '}';
}






module.exports = router;