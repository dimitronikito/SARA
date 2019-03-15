var express = require('express');
var app = express();
var path = require('path');

app.set('view engine', 'ejs');

app.get('/', function(req, res) {
  res.render('pages/index');
});
app.get('/fixed-search', function(req, res) {
  res.render('pages/fixed-list');
});
app.get('/from-file', function(req, res) {
  res.render('pages/from-file');
});
app.get('/google-api', function(req, res) {
  res.render('pages/google-api');
});
app.get('/search-engine', function(req, res) {
  res.render('pages/search-engine');
});
app.get('/navigator', function(req, res) {
  res.render('/pages/navigator')
})
app.get('/window', function(req, res) {
  res.render('/pages/window')
})
app.get('/screen', function(req, res) {
  res.render('/pages/screen')
})
app.get('/location', function(req, res) {
  res.render('/pages/location')
})
app.get('/geolocation', function(req, res) {
  res.render('/pages/geolocation')
})


app.use(express.static(path.join(__dirname, 'public')));

app.listen(8080);
console.log('8080 is the magic port');
