const moment = require('moment');
const getImages = require('../public/js/request');

module.exports = function(app, collection) {
  // render index page
  app.get('/', (req, res) => res.render('index'));

  // gets results of user search. saves search history
  app.get('/api/imagesearch/:search', (req, res) => {
    // checks if a query param was passed in by checking the length of the object, and its constructor. sets to null if no query is passed
    const query =
      Object.keys(req.query).length === 0 && req.query.constructor === Object ? null : req.query;

    // if a query param exists, and the key is 'offset', then define the pagination.
    if (query !== null && Object.keys(query)[0] === 'offset') {
      req.params.search += '&start=' + Object.entries(req.query)[0][1];
    }

    // contains search, and time of search to save to db
    const searchObj = {
      date: moment(new Date()).format('MMMM DD, YYYY hh:mm:ss a') + ' (MST)',
      search: req.params.search
    };

    // saves search history
    collection.insertOne(searchObj, (err, result) => {
      if (err) throw err;
    });

    // gets result of search.
    getImages(searchObj.search, (err, result) => res.send(result));
  });

  app.get('/api/history', (req, res) => {
    // finds all searches
    collection.find({}).toArray((err, result) => {
      if (err) throw err;

      // removes object _id from each result
      result.forEach(a => delete a._id);
      res.json(result);
    });
  });

  app.get('*', (req, res) => res.json('Page not found!'));
};
