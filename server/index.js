const express = require('express');
const app = express();
const parse = require('body-parser');
const github = require('../helpers/github.js');
const database = require('../database');
//defaults to index.js

app.use(express.static(__dirname + '/../client/dist'));

app.use(parse.json())

app.post('/repos', function (req, res) {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
  if (!req.body) {
    res.sendStatus(500).end();
  } else {
    //get repo info from github API
      //save repo info in db
        //**pass res.sendStatus(200).end in as a CALLBACK, to make sure it ONLY runs after async function completes
    github.getReposByUsername(req.body.username, () => res.sendStatus(200).end());
  }
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
  if (!req.body) {
    res.sendStatus(500).end();
  } else {
   //get top 25 repos based on selection criteria (TBD)
   database.fetch((results) => {
    console.log('get works; request body:', results) 
    res.status(200);
    res.json(results)
  })
  }
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

