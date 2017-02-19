var express = require('express');
var router = express.Router();
var fs = require('fs');

/* GET high. */
router.get('/', function(req, res, next) {
  res.render('endline', { title: 'Timelines Synchronized' });
});
router.post('/save', function (request, response) { 
	var data = request.body;
   fs.writeFile("test.json", JSON.stringify(data), function(err) {
    if(err) {
        return console.log(err);
    }

    console.log("The file was saved!");
});

});

module.exports = router;