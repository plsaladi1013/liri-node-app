require("dotenv").config();
var inquirer = require("inquirer");
var Spotify = require('node-spotify-api');
var Twitter = require('twitter');
var request = require("request");
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

inquirer.prompt([
    {
        message: "What topics would you like to know today?",
        type: "checkbox",
        name: "topics",
        choices: ["my-tweets", "spotify-this-song", "movie-this", "do-what-it-says"]
    }
   
]).then(function(user){
    if(user.choices === "my-tweets") {
        console.log("my-tweets");
    }
});

function showTweets(){
    console.log("show Tweets");   
}

function showSpotify(){
    spotify.request('https://api.spotify.com/v1/tracks/7yCPwWs66K8Ba5lFuU2bcx')      
    .then(function(data) {
        console.log(data); 
    })
    .catch(function(err) {
        console.error('Error occurred: ' + err); 
    }); 
}

function showMovie(){
    request("http://www.omdbapi.com/?t=remember+the+titans&y=&plot=short&apikey=trilogy", function(error, response, body) {
        // If the request is successful (i.e. if the response status code is 200)
        if (!error && response.statusCode === 200) {
            // Parse the body of the site and recover just the imdbRating
            // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
            console.log("The movie's rating is: " + JSON.parse(body).imdbRating);
        }
    });
}

function showRandom(){
    fs.readFile('random.txt', 'utf8', function(error, data){
    if (error) throw err;
    console.log(data);
    });
}



          