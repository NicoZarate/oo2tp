var express = require('express');
var router = express.Router();

/* GET high. */
router.get('/', function(req, res, next) {
  res.render('time', { title: 'ejemplo sincronizado' });
});

module.exports = router;