var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require("path");

router.get('/', function(req, res, next) {
  renderizarIndex(res);
    
});


router.post('/save', function (request, response) { 
	var strJson = convertRequestInJson(request.body.JsOn);
  var filename = "./public/periodos/"+ String(request.body.filename);
  strJson = JSON.parse(strJson);
	fs.writeFile(filename,JSON.stringify(strJson,null,4), function(err) {
    if(err) {
        return console.log(err);
    }
   
    console.log("The file was saved!");
    renderizarIndex(response);
});

});

router.post('/update', function (request, response) { 


  var strJson = convertRequestInJson(request.body.JsOn);

  var oldfilename = "./public/periodos/"+ String(request.body.oldfilename);
  var filename = "./public/periodos/"+ String(request.body.filename);

  fs.rename(oldfilename, filename, function(err){
    if(err) {
        return console.log(err);
    }
    
    console.log("The file was saved!");
    renderizarIndex(response);
  });

});


function renderizarIndex(res){

  fs.readFile('./public/sysfiles/model_widgets.json', 'utf8', function (err, data) {

    var archivos = [];
    var directorio = './public/periodos/';
    
    fs.readdir(directorio, function (err, files) {
            if (err) {
                throw err;
            }

            files.forEach(function (file) {
              var file1 = path.basename(file, '.json');
              archivos.push(file1);
            });
          
                var tipos = JSON.parse(data);
                res.render('index', { title : 'Main page', types : tipos, archivos : archivos });
          });
          
    });
    
}

//----- convie

function convertRequestInJson(aData){
 
    var json = '{';
  	aData = JSON.stringify(aData);
  	var str = aData.replace(/\\/g,'');
  	str = str.slice(1,-1);
  	str = str.split(';');
    if(str[0]!=''){
  	for (var i = 0, len = str.length; i < len; i++) {
		  json = json + '"prueba'+i+'":'+str[i]
		if(i < len-1){
		  json = json +',';
		 } 
	  } 
  }
    return json + '}';
}


module.exports = router;