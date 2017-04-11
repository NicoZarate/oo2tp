var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require("path");

router.get('/', function(req, res, next) {
  renderizarIndex(res);
    
});


router.post('/save', function (request, response) { 
	var strJson = convertRequestInJson(request.body.JsOn);
  console.log(String(request.body.filename));
  var filename = "./public/periodos/"+ String(request.body.filename);
  
	fs.writeFile(filename,strJson , function(err) {
    if(err) {
        return console.log(err);
    }
   
    console.log("The file was saved!");
    renderizarIndex(response);
});
     //modificarSelect(response);

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

  
    //modificarSelect(response);
});


function renderizarIndex(res){

  fs.readFile('./public/model_widgets.json', 'utf8', function (err, data) {

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


function convertRequestInJson(aData){
  //  console.log(aData);
  //fijarme que si no hay items que guarde solo un json vacio 
    var json = '{';
  	aData = JSON.stringify(aData);
  	var str = aData.replace(/\\/g,'');
    //console.log(str);
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