const express = require('express');
const app = express();
const mongoDB = require('../database');
const parse = require('body-parser');
const github = require('../helpers/github.js');
//defaults to index.js

app.use(express.static(__dirname + '/../client/dist'));

app.use(parse.json())

app.post('/repos', function (req, res) {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
  console.log('post worked')
  if (!req.body) {
    res.sendStatus(500).end();
  } else {
    //get repo info from github API
    github.getReposByUsername(req.body.username);
    //save repo info in db
    res.sendStatus(200).end();
  }
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
  if (!req.body) {
    res.sendStatus(500).end();
  } else {
   
    //save repo info in db
    res.status(200).end();
  }
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

