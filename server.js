const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/routes');
const path = require('path');
const db = require('mongodb');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/image_search';

const app = express();
const PORT = process.env.PORT || 8080;

// Sets up Express to handle data parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// connect to the db
db.MongoClient.connect(MONGODB_URI, (err, db) => {
  // checks for errors
  if (err) throw err;
  else {
    console.log('Connected to mongodb');
  }

  // drops collection when server starts
  db.collection('history').drop((err, result) => {
    if (err) throw err;

    // creates collection to store search history
    db.createCollection('history');
    const collection = db.collection('history');

    // passes express and mongo to the routes
    routes(app, collection);

    // starts the server
    app.listen(PORT, function() {
      console.log('App listening on PORT: ' + PORT);
    });
  });
});
