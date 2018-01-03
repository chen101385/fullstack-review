const request = require('request');
const config = require('../config.js')
const database = require('../database/index.js');

//request('http://www.google.com', function (error, response, body) 


let getReposByUsername = (username, callback) => {
  // TODO - Use the request module to request repos for a specific
  // user from the github API

  // The options object has been provided to help you out, 
  // but you'll have to fill in the URL
  let options = {
    url: `https://api.github.com/users/${username}/repos`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`,
      'Accept': `application/vnd.github.v3+json`
    }
  };

  request(options, (err, response, body) => {
    var info = JSON.parse(body);
    console.log('request is made from button')

    //check if response object is an actual repo
    if (Array.isArray(info)) {
      database.save(info, callback);
    } else {
      console.log({ error: err })
    }
  });

}

module.exports.getReposByUsername = getReposByUsername;