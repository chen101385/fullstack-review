const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

//db = repos
//collection = repoCollection

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function() {

// });

//MONGODB TIPS
/*
noSQL database
uses JSON
advantage: easy to scale;

db.[collection].createOne({...})

db.createUser({....})

use [database]

db.createCollection("______")

db.[database].update({parameter to match}, {what we replace it with})

$SET keeps what was already there, but adds the set value
db.[database].update({selector}, {$set:{ADD THIS}}

$UNSET
db.[database].update({selector}, {$unset:{REMOVE THIS}}


$INC increments
db.[database].update({selector}, {$inc:{INCREMENT BY THIS}}

$RENAME
db.[database].update({selector}, {$RENAME:{FROM: TO}}

*/

//create a SCHEMA of all our properties:types

  //A model is a class with which we construct documents. 
  //Each document will be a repo with properties and behaviors as declared in our schema
let repoSchema = mongoose.Schema({
  // TODO: your schema here!
  id: Number,
  username: String,
  fullname: String,
  repo_name: String,
  repo_url: String,
  description: String,
  watchers_count: Number
});

//Functions added to the methods property of a schema get compiled into the Model prototype and exposed on each document instance
//MongoDB native methods 
 //.find
 //.save

 //GHRepo acts like a constructor function for making documents;
let GHRepo = mongoose.model('GHRepo', repoSchema);

//test document
// let testRepo = new GHRepo({id:2, username: 'test2', repo_name: 'testname2', repo_url: 'testurl2'});

let save = (repos, callback) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB

  repos.forEach((repo) => {
    var document = new GHRepo({
      id: repo.id,
      username: repo.owner.login,
      repo_name: repo.name,
      fullname: repo.full_name,
      repo_url: repo.owner.repos_url,
      description: repo.description,
      watchers_count: repo.watchers
    }) 

    document.save((err) => {
      if (err) {
        return console.error(err);
      }
    })
  })
  callback();
}

let fetch = (callback) => {
//attempting to get results;
  GHRepo.find().limit(25).sort(`-watchers_count`).exec((err, results) => {
    if (err) {
      console.log('fetch failed!')
    }
    if (results.length) {
      callback(results);
    }
  })
}

//CLEAR RESULTS
// GHRepo.find().remove().exec();

// console.log(testRepo);
// save(testRepo);

// module.exports.save = save;
module.exports = {
  save,
  fetch
}