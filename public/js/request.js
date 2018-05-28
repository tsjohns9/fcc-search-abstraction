const request = require('request');
require('dotenv').config();

module.exports = function(search, callback) {
  // performs google image search.
  request(process.env.API_SEARCH + search + process.env.API_LIMITS, (error, response, body) => {
    // callback executs res.send() to send the results to the user
    callback(error, body);
  });
};

// url, snippet, thumbnail, context
// body[i].link, body[i].snippet, body[i].thumbnail, body[i].context
// &fields=link,snippet,images/thumbnailLink,images/contextLink
