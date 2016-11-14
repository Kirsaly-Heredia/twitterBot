var Twit = require('twit');
var fs = require('fs');

//load crayols.json
var crayolaBuffer = fs.readFileSync('./corpora/crayola.json');
colors = JSON.parse(crayolaBuffer).colors;
// console.log(colors);

//load common.json
var commonBuffer = fs.readFileSync('./corpora/common.json');
animals = JSON.parse(commonBuffer).animals;
//console.log(animals);

//load fruits.json
var fruitBuffer = fs.readFileSync('./corpora/fruits.json');
fruits = JSON.parse(fruitBuffer).fruits;
//console.log(fruits);



function getRandom(array) {
  var index = Math.floor( Math.random() * array.length)
  return array[index];
}


//load .env
require('dotenv').config();

var config = {
  consumer_key: process.env.consumer_key,
  consumer_secret: process.env.consumer_secret,
  access_token: process.env.access_token,
  access_token_secret: process.env.access_token_secret,
};

var T = new Twit(config);

function tweet() {

  //twit message
  var msg = getRandom(colors) + ' ' + getRandom(animals) + 's eat yummy ' + getRandom(fruits) + 's.';
  
  T.post('statuses/update', {status: msg }, function(err, data, response) {
    console.log(data)
  });
  
}

setInterval(tweet, 1000 * 60 * 15);
tweet();