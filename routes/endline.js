var express = require('express');
var router = express.Router();

/* GET high. */
router.get('/', function(req, res, next) {
  res.render('endline', { title: 'Timelines Synchronized' });
});

module.exports = router;