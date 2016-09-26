
var express = require('express');
var router = express.Router();






router.get('/', function(req,res,next){
  console.log(' router');
  res.res('got to GET /wiki/');
});

router.post('/', function(req, res, next) {
  res.send('got to POST /wiki/');
});

router.get('/add', function(req, res, next) {
  res.render('addpage');
});



module.exports = router;
