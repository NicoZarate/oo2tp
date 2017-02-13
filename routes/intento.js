var express = require('express');
var router = express.Router();

/* GET high. */
router.get('/', function(req, res, next) {
  res.render('intento', { title: 'Timelines Synchronized' });
});

module.exports = router;