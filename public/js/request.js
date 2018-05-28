const request = require('request');
require('dotenv').config();

module.exports = function(search, callback, pagination) {
  // checks if pagination was defined before making the search
  const google = !pagination
    ? process.env.API_SEARCH + search + process.env.API_LIMITS
    : process.env.API_SEARCH + search + pagination + process.env.API_LIMITS;

  // performs google image search.
  request(google, (error, response, body) => {
    // callback executes res.send() to send the results to the user
    callback(error, body);
  });
};
