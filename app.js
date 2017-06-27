var express = require('express');
var path = require('path');

// Initialize App
var app = express();

// Load Views
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Home Route
app.get('/', function(req, res){
  var articles = [
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
  ];
  res.render('index', {
    title: 'Articles',
    articles: articles
  });
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
