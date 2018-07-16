var keys = require("./keys.js");
var typeado = process.argv.slice(3).join(" ");

// LA PARTE DE TWITTER //
var Twitter = require('twitter');

var getTwitter = function () {

    var twit = new Twitter({
        consumer_key: '9Xuqr5TUb1xz5a9Y77EUrdJvq',
        consumer_secret: 'knu6O8kifKtll2l8u6V8SJtyuQk8GwSWpsinOw80A3elrXdCSj',
        access_token_key: '364333944-m3r37PLPqu4kk9Kjkqv4xy9SqHOzckHXCT9Z0d2R',
        access_token_secret: 'uGrZq7L02GCD8ardJxMO7oBgVOKHLGnwbw26YNLSAUd9p'
    });

    var params = { screen_name: 'patriciohml' };
    twit.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {
            for (var i = 0; i < tweets.length; i++) {
                console.log(tweets[i].created_at);
                console.log(" ");
                console.log(tweets[i].text);
            }
        }
    });
}

// INICIA SPOTIFY //

var spotify = require('spotify');

var getArtistName = function(artist) {
    return artist.name;
}

var getSpotify = function(song) {
 
    spotify.search({ type: 'track', query: song }, function(err, data) {
        if ( err ) {
            console.log('Error occurred: ' + err);
            return;
        }
        var songResults = data.tracks.items;
        for(var i=0; i<songResults.length; i++) {
            console.log(i);
            console.log("Artist: "+ songResults[i].artist.map( getArtistName));
            console.log("Song Name " + songs[i].name)
            console.log("_____________________________________________");
        }
    });
}

// INICIA MOVIES //

var getMovie = function (movie) {
    var request = require('request');
    if (movie === "") {
        var movie = "Please type a movie";
    }

    var queryURL = "https://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy"
    request(queryURL, function (error, response, body) {
            if (response.statusCode == 200) {
            var bodyObj = JSON.parse(body);
            var write_text = [  
                    "Title: "+ bodyObj.Title,
                    "Year: "+ bodyObj.Year,
                    "IMDB Rating: "+ bodyObj.imdbRating,
                    "Country: "+ bodyObj.Country,
                    "Language: "+ bodyObj.Language,
                    "Plot: "+ bodyObj.Plot,
                    "Actors: "+ bodyObj.Actors
            ].join("\n\n");
            var commandtext = "movie-this" + movie;
            console.log("===========================");
            console.log(write_text);
        }
        else {
            console.log('statusCode:', response && response.statusCode);
        }
    });


  
};


// INICIA EL SWITCH

switch(process.argv[2]) {
    case "my-tweets":
        getTwitter();
        break;
    default:
        console.log("Please type one of the following:");
        console.log("my-tweets");
        console.log("spotify-this-song + a song name");
    case "spotify-this-song":
        getSpotify(typeado);
        break;
    case "movie-this":
        getMovie(typeado);
        break;
   
}




