require("dotenv").config();
var authKeys = require("./keys.js");
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');

var spotify = new Spotify(authKeys.spotify);
var client = new Twitter(authKeys.twitter);

var request = require("request");
var nodeArgs = process.argv;

var action = nodeArgs[2];
var value = nodeArgs[3];
var movieName = "";


/* Main switch function that calls the appropriate function depending on the main argument */

switch (action) {
    case "movie-this":
      movieRequest();
      break;
  
    case "my-tweets":
      twitterRequest();
      break;
  /*
    case "spotify-this-song":
      spotifyRequests();
      break;
  
    case "do-what-it-says":
      randomTextCommand();
      break; */
  }

  /* OMDB API */
//===============================================
function movieRequest() {
   if (value==undefined){
       movieName = "Mr.Nobody"
       queryIMDB();    
   } else {
        for (var i=3; i<nodeArgs.length; i++){
            if(i>3 && i<nodeArgs.length){
                movieName = movieName + "+"+nodeArgs[i];
            }else {
                movieName+=nodeArgs[i];
            }
            queryIMDB();    
        }    
    }
}
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