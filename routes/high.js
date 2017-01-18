var express = require('express');
var router = express.Router();

/* GET high. */
router.get('/', function(req, res, next) {
  res.render('high', { title: 'ejemplo con high' });
});

module.exports = router;
