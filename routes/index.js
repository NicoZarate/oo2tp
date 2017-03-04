var express = require('express');
var router = express.Router();
var fs = require('fs');

/* GET high. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Timelines Synchronized' });
});
router.post('/save', function (request, response) { 
	var data = request.body;
	data = JSON.stringify(data);
   fs.writeFile("test.json",data , function(err) {
    if(err) {
        return console.log(err);
    }

    console.log("The file was saved!");
});

});

module.exports = router;