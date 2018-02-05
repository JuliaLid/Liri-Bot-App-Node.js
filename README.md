# Liri-Node-App
## Project Overview
LIRI is like iPhone's SIRI. However, while SIRI is a Speech Interpretation and Recognition Interface, LIRI is a Language Interpretation and Recognition Interface. LIRI is a command line `Node.js` app that takes in arguments and gives you back data.
## LIRI Commands
* `my-tweets` 
    * This will show your last 20 tweets and when they were created at in your terminal/bash window.
* `spotify-this-song` followed by a song name. 
    * This will display information about the song in the terminal/bash window.
* `movie-this` followed by a movie name.
    * This will display information about the movie in the terminal/bash window.
* `do-what-it-says`
    * This will take the text inside of `random.txt` and then use it to call one of LIRI's commands.

## Technology Stack
* JavaScript 
* Node.js
* npm packages
    * [node-spotify-api](https://www.npmjs.com/package/node-spotify-api)
    * [twitter](https://www.npmjs.com/package/twitter)
    * [request](https://www.npmjs.com/package/request)
    * [dotenv](https://www.npmjs.com/package/dotenv)
## Comments
* I'm impressed with node's modular structure. It allows for great flexibility in design.
* I was able to refactor my code for capturing multi-worded input by creating a utility function that it evoked for both Spotify and OMDB APIs.
## Challenges
* One of the assignment's requirements was to use the song "The Sign" by Ace of Base as a default argument. However, `node-spotify-api` does not provide functionality to search by both track name AND artist. Therefore, the search returns the first matching track.

## Feedback and Questions
* I welcome overall code structure feedback.

