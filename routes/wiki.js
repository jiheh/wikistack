
var express = require('express');
var router = express.Router();

var models = require('../models');
var Page = models.Page;
var User = models.User;




router.get('/', function(req,res,next){
  res.redirect('/');
});

router.post('/', function(req, res, next) {
  console.log(req.body);
  var page = Page.build({

    title : req.body.title,
    content : req.body.content,
    status : req.body.status,

  });


  page.save()
  .then(function(savedPage){
    res.redirect(savedPage.route);
  })
  .catch(next);


});


router.get('/add', function(req, res, next) {
  res.render('addpage');
});

router.get('/:urlTitle', function(req,res,next){

  Page.findOne({
    where : {
      urlTitle : req.params.urlTitle
    }
  })
  .then(function(foundPage){
    var pageDetails = foundPage.dataValues;

    res.render('wikipage', pageDetails);
   })
  .catch(next);

});






module.exports = router;
