//Required npms and global vairables
require("dotenv").config();
var authKeys = require("./keys.js");
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var fs = require("fs");

var spotify = new Spotify(authKeys.spotify);
var client = new Twitter(authKeys.twitter);

var request = require("request");
var nodeArgs = process.argv;

var action = nodeArgs[2];
var value = nodeArgs[3];
var movieName = "";
var songName = "";


/* Main switch function that calls the appropriate function depending on the main argument */

switch (action) {
    case "movie-this":
      movieRequest();
      break;
  
    case "my-tweets":
      twitterRequest();
      break;
  
    case "spotify-this-song":
      songSelection();
      break;
  
    case "do-what-it-says":
      randomTextCommand();
      break; 
}

  /* OMDB API */
//===============================================
//Function to pass a default argument and to string together a long movie name
function movieRequest() {
   if (value==undefined){
       movieName = "Mr.Nobody"
       console.log(nodeArgs);
       queryIMDB();    
   } else {
        for (var i=3; i<nodeArgs.length; i++){
            if(i>3 && i<nodeArgs.length){
                movieName = movieName + "+"+nodeArgs[i];
       console.log(nodeArgs);
                
            }else {
                movieName+=nodeArgs[i];
       console.log(nodeArgs);
                
            }
            queryIMDB();    
        }    
    }
}
//function to call OMDB result 
function queryIMDB(){
    var queryURL = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
    console.log(queryURL);

    request(queryURL, function(error, response, body) {
        if (!error && response.statusCode === 200) {
            var responseJSON = JSON.parse(body);
            var movieTitle = responseJSON.Title; 
            var movieYear = responseJSON.Year;
            var movieImdbRating = responseJSON.Ratings[0].Value;
            var movieRottenTomatoesRating = responseJSON.Ratings[1].Value;
            var movieCountry = responseJSON.Country;
            var movieLanguage = responseJSON.Language;
            var moviePlot = responseJSON.Plot;
            var movieActors = responseJSON.Actors
            console.log("Movie Title: " + movieTitle);
            console.log("Release Year: " + movieYear);
            console.log("IMDB Rating: " + movieImdbRating);
            console.log("Rotten Tomatoes Rating: " + movieRottenTomatoesRating);
            console.log("Country: " + movieCountry);
            console.log("Language: " + movieLanguage);
            console.log("Plot: " + moviePlot);
            console.log("Actors: " + movieActors);
        }
    });
}
  /* Twitter API */
//===============================================
function twitterRequest(){
    var params = {screen_name: 'Tweeting_Liri', count:20};
    client.get("statuses/user_timeline",params, function(error, tweets, response) {
        if(error) throw error;
        tweets.forEach(function(element){
            var myTweetsDate = element.created_at;
            var myTweetsText = element.text;
            console.log(myTweetsDate);
            console.log(myTweetsText);
            console.log("==========================");
        })
    });
}

  /* Spotify API */
//===============================================
//Function to pass a default argument and to string together a long song name
function songSelection() {
    if (value==undefined){
        songName = "The Sign";
        spotifyRequest();    
    } else {
         for (var i=3; i<nodeArgs.length; i++){
             if(i>3 && i<nodeArgs.length){
                 songName = songName + "%20"+nodeArgs[i];
                 console.log(songName);
             }else {
                 songName+=nodeArgs[i];
             }
             spotifyRequest();    
         }    
     }
 }
//Function to query Spotify API
function spotifyRequest(){
   
   
    spotify.search({ type: 'track', query: songName, limit:1}, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        } else {
            var returnedSong = data.tracks.items;
            var songArtist = returnedSong[0].album.artists[0].name;
            var songName = returnedSong[0].name;
            var songLink = returnedSong[0].href;
            var albumName = returnedSong[0].album.name;
            console.log("========================="); 
            console.log(songArtist); 
            console.log(songName); 
            console.log(songLink); 
            console.log(albumName); 
            console.log("========================="); 
        }
       
     
      });
}
  /* Random text command */
//===============================================
function randomTextCommand(){
    fs.readFile("random.txt", "utf8", function (err, data) {
        if (err) {
          return console.log(err);
        }
        var output = data.split(",");
        songName=(output[1]);
        spotifyRequest();
    });
}

/* Append each command to a log*/
//===============================================
fs.appendFile("log.txt", "\nCommand:"+action + ", Argument: "+ value , function(err) {

    if (err) {
      console.log(err);
    } else {
      console.log("Content Added!");
    }
  
  });