require("dotenv").config();
var inquirer = require("inquirer");
var Spotify = require('node-spotify-api');
var Twitter = require('twitter');
var request = require("request");
var keys = require("./keys.js");
var figlet = require('figlet');
var spotify = require('spotify');
var fs = require("fs");
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);
var omdb = require('omdb');
var input = process.argv;
var command = input[2];
function checkcommand(){
    if(command === "my-tweets") {
        console.log("my-tweets");
        showTweets();
    }
    if(command === "spotify-this-song"){
        console.log("spotify-this-song");
        showSpotify();
    }
    if(command === "movie-this"){
        showMovie();
    }
}
    if(command === "do-what-it-says"){
        console.log("do-what-it-says");
        showRandom();
    }
 
checkcommand();    
function showTweets(){
    console.log("show Tweets"); 
    var params = {screen_name: 'pushpal41268038'};
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
            //console.log(tweets);
            var formattedTweets = [];
            for(var i=0; i<tweets.length; i++){
                var tweet = {
                    createdAt : tweets[i].created_at,
                    text : tweets[i].text
                }
                formattedTweets.push(tweet);
            }
            console.log(formattedTweets);
        }
    });   
}

function showSpotify(){
    var songTitle = input[3];
    // if(input.length>3){
    //     for( i = 4; i<input.length; i++ ){
    //          songTitle = songTitle + "+" + input[i];
    //     }
    // }
    if(!songTitle ){
        songTitle = "delicate";
    }
    spotify.search({ type: 'track', query: songTitle }, function(err, data) {
            if ( err ) {
                console.log('Error occurred: ' + err);
                return;
            }
            var songData = data.tracks.items[0];
            var song = {
                artistName: songData.artists[0].name, 
                songName: songData.name,
                preview: songData.preview_url,
                album: songData.album.name
            }
            
            console.log(song);
            
            // Do something with 'data'
    });  
}

function showMovie(){
    
    var movie = input[3];
    if(input.length>3){
    for( i = 4; i<input.length; i++ ){
         movie = movie + "+" + input[i];
    }
    }
    figlet(movie, function(err, data) {
        if (err) {
            console.log('Something went wrong...');
            console.dir(err);
            return;
        }
        console.log(data)
    });
    request("http://www.omdbapi.com/?t=" +movie+" &y=&plot=short&apikey=trilogy", function(error, response, body) {
        // If the request is successful (i.e. if the response status code is 200)
        if (!error && response.statusCode === 200) {
            // Parse the body of the site and recover just the imdbRating
            // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
            console.log("========================================");
            console.log("Title of the movie: " + JSON.parse(body).Title );
            console.log("Year the movie came out: " + JSON.parse(body).Year);
            console.log("IMDB Rating of the movie: " + JSON.parse(body).imdbRating);
            console.log("Rotten Tomatoes Rating of the movie: "+ JSON.parse(body).Ratings[1].Value);
            console.log("Country where the movie was produced: " + JSON.parse(body).Production);
            console.log("Language of the movie: " + JSON.parse(body).Language);
            console.log("Plot of the movie: " + JSON.parse(body).Plot);
            console.log("Actors in the movie: " + JSON.parse(body).Actors);
            console.log("========================================");
        }
    });
}

function showRandom(){
    // fs is a core Node package for reading and writing files
// This block of code will read from the "random.txt" file.
// It's important to include the "utf8" parameter or the code will provide stream data (garbage)
// The code will store the contents of the reading inside the variable "data"
    fs.readFile("random.txt", "utf8", function(error, data) {
// If the code experiences any errors it will log the error to the console.
        if (error) {
        return console.log(error);
        }
  // We will then print the contents of data
    console.log(data);

  // Then split it by commas (to make it more readable)
    var dataArr = data.split(",");

  // We will then re-display the content as an array for later use.
  //console.log(dataArr);
  //console.log("dataArr:" +dataArr[0]);
  command = dataArr[0];
  checkcommand();
    });
    

}



          