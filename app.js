var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

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

// Body Parser Middleware
// Body parser application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

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
});

// Add Route
app.get('/articles/add', function(req, res){
  res.render('add_article', {
    title: 'Add Article'
  });
});

// Add Submit Post
app.post('/articles/add', function(req, res){
  var article = new Article();
  article.title = req.body.title;
  article.author = req.body.author;
  article.body = req.body.body;
  // console.log('Submit');

  article.save(function(err){
    if(err) {
      console.log(err);
      return;
    } else {
      res.redirect('/');
    }
  });
});

// Start Server
app.listen(3000, function(){
  console.log('Server starting on port 3000');
});
