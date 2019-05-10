var express = require('express');
var app = express();
var path = require('path');

var MongoClient = require('mongodb').MongoClient;
var MONGODB_URL = 'mongodb://heroku_6m053q0r:e42hlrmtcl4q1cv42klohqhbkr@ds161584.mlab.com:61584/heroku_6m053q0r';
var uri = process.env.MONGODB_URL;

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

app.get('/populate', function(req, res) {
  var page = req.query.populate;
  res.send(page);
  MongoClient.connect(MONGODB_URL, function(err, client) {
    if (err) {
      console.log("unable to connect to mongoDB server. Error: ", err);
    } else {
      console.log("Connection established to", MONGODB_URL);
      dbo = client.db('heroku_6m053q0r');
      try {
        dbo.collection("page").insertOne(page);
      }
      catch(MongoError) {
        console.log(MongoError);
      }
      client.close();
    }
  });
});

function Search(terms, count, searchDate) {
  this.terms = terms;
  this.count = count;
  this.searchDate = searchDate;
}

app.get('/search', function(req, res) {
  var search = req.query.search;
  MongoClient.connect(MONGODB_URL, function(err, client) {
    if (err) {
      console.log("unable to connect to mongoDB server. Error: ", err);
    } else {
      console.log("Connection established to", MONGODB_URL);
      dbo = client.db('heroku_6m053q0r');
      try {
        dbo.collection("page").find({ $text: { $search: search }}).toArray(function(err, data) {
          length = data.length;
          if (length == 0) {
            data = ("no results found");
          }
          var date = new Date().toLocaleString();
          var query = new Search(search, length, date);
          dbo.collection("search").insertOne(query);
          client.close();
          res.send(data);
        });
      }
      catch(MongoError) {
        console.log(MongoError);
      }
    }
  });
});

app.use(express.static(path.join(__dirname, 'public')));

// MongoClient.connect(MONGODB_URL, function(err, db) {
//   if (err) {
//     console.log("unable to connect to mongoDB server. Error: ", err);
//   } else {
//     console.log("Connection established to", MONGODB_URL);
//     db.close();
//   }
// });

app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
