var express = require('express');
var app = express();
var morgan = require('morgan');
var nunjucks = require('nunjucks');
var routes = require('./routes/wiki');
var parser = require('body-parser');
var models = require('./models');

var env = nunjucks.configure('views', {noCache: true});
// have res.render work with html files
app.set('view engine', 'html');
// when res.render works with html files, have it use nunjucks to do so
app.engine('html', nunjucks.render);


app.use(parser.json());

app.use(parser.urlencoded({ extended: false }));



app.use(express.static('public'));

models.User.sync({})
.then(function () {
    return models.Page.sync();
    // {force: true}
    // force:true deletes old table and creates new table with fields needed
    // BUT  ALL DATA WILL BE DELETED! (useful only when testing table)
})
.then(function(){
  //console.log("text 12");
  app.use('/wiki', routes);
})
.then(function () {
    app.listen(3000, function () {
        console.log('Server is listening on port 3000!');
    });
})
.catch(console.error);
