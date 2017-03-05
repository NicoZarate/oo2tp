var express = require('express');
var router = express.Router();
var fs = require('fs');

/* GET high. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Timelines Synchronized' });
});
router.post('/save', function (request, response) { 
	var strJson = convertRequestInJson(request.body);
	console.log(strJson);
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