var Twit = require('twit');
var fs = require('fs');

//load crayols.json
var dogBuffer = fs.readFileSync('./corpora/crayola.json');
dogs = JSON.parse(dogBuffer).dogs;
console.log(dogs);

function getRandom(array) {
  var index = Math.floor( Math.random() * array.length)
  return array[index];
}

console.log(getRandom(dogs));
//dont tweet, just testing
return;

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

  //make the request to worknik to get a random word
  var url = 'http://api.wordnik.com:80/v4/words.json/randomWords?hasDictionaryDef=false&includePartOfSpeech=adjective&minCorpusCount=0&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=5&maxLength=-1&limit=1&api_key=' + process.env.wordnik_key;
  
  //make http request with callback gotWord
  request(url, gotWord);
  
  function gotWord(error, response, body) {
    if (error) return;
    
    var word = JSON.parse(body).word;
    
    //This is the string we will tweet
    var msg = randomChoice(moods) + ' ' + randomChoice(jobs)+ ' ' + word;
  }
  
  //twit message
  var msg = 'I love the color ' + getRandom(crayola);
  
  T.post('statuses/update', {status: msg }, function(err, data, response) {
    console.log(data)
  });
}

setInterval(tweet, 1000 * 60 * 5);
tweet();