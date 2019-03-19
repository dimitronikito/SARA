var express = require('express');
var app = express();
var path = require('path');

app.set('view engine', 'ejs');

app.get('/', function(req, res) {
  res.render('pages/index');
});
app.get('/fixed-search', function(req, res) {
  res.render('pages/Search/fixed-list');
});
app.get('/from-file', function(req, res) {
  res.render('pages/Search/from-file');
});
app.get('/google-api', function(req, res) {
  res.render('pages/Search/google-api');
});
app.get('/search-engine', function(req, res) {
  res.render('pages/Search/search-engine');
});
app.get('/navigator', function(req, res) {
  res.render('pages/Browser/navigator');
});
app.get('/window', function(req, res) {
  res.render('pages/Browser/window');
});
app.get('/screen', function(req, res) {
  res.render('pages/Browser/screen');
});
app.get('/location', function(req, res) {
  res.render('pages/Browser/location');
});
app.get('/geolocation', function(req, res) {
  res.render('pages/Browser/geolocation');
});
app.get('/student-developers', function(req, res) {
  res.render('pages/About/student-developers');
});
app.get('/contact-us', function(req, res) {
  res.render('pages/About/contact-us');
});


app.use(express.static(path.join(__dirname, 'public')));

app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
