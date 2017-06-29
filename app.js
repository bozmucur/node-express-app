var express = require('express');
var path = require('path');
var mongoose = require('mongoose');

// Connect to Database
mongoose.connect('mongodb://localhost/articlesdb');
var db = mongoose.connection;

// Check connection
db.once('open', function(){
  console.log('Connected to MongoDB');
});

// Check for Database errors
db.on('error', function(err){
  console.log(err);
});

// Initialize App
var app = express();

// Bring in Models
var Article = require('./models/article');

// Load Views
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Home Route
app.get('/', function(req, res){
  Article.find({}, function(err, articles){
    if(err) {
      console.log(err);
    } else {
      res.render('index', {
        title: 'Articles',
        articles: articles
      });
    }
  });
  /*var articles = [
    {
      id: 1,
      title: 'One',
      author: 'Burak Ozmucur',
      body: 'This is article one'
    },
    {
      id: 2,
      title: 'Two',
      author: 'Mary Smith',
      body: 'This is article two'
    },
    {
      id: 3,
      title: 'Three',
      author: 'Mike Jackson',
      body: 'This is article three'
    }
  ];*/
});

// Add Route
app.get('/articles/add', function(req, res){
  res.render('add_article', {
    title: 'Add Article'
  });
});

// Start Server
app.listen(3000, function(){
  console.log('Server starting on port 3000');
});
