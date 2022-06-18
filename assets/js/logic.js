//variables declaration
var movieformEl = document.querySelector("#movie-form");
var movieInputEl = document.querySelector("#search-input");
var movieTitleEl = document.querySelector("#movie_title");
var movieInfoEl = document.querySelector("#synopsis");
var movieLengthEl = document.querySelector("#length");
var movieDateEl = document.querySelector("#date");
var movieGenreEl = document.querySelector("#genre");
var movieRatingEl = document.querySelector("#rating");
var movieCastEl = document.querySelector("#cast");
var moviePosterEl = document.querySelector("#poster");
var movieDirectorEl = document.querySelector("#director");
var movieTrailerEl = document.querySelector("#trailer");
var movieReviewEl = document.querySelector("#review_list");
var movieStreamEl = document.querySelector("#stream_list");
var movieShowtimeEl = document.querySelector("#local_list");
var movieLanguageEl = document.querySelector("#language");
var movieStarEl = document.querySelector("#star");

// info(184126)

//IP adress look up API
var GetLocation = function (movie) {
    let apiKey = '627ce180f6b942d38cd09ef7905db024';
    fetch('https://ipgeolocation.abstractapi.com/v1/?api_key=' + apiKey)
        .then(response => response.json())
        .then(data => {
            console.log((data))
            country = data.country_code;
            passthrough = movie;
            idSearch(passthrough, country);
        });
}

//API key declaration
key2 = "cfff8e47bbmsh52112d53558a8c6p18b44djsn557c06239ea5";

//function to look up IMDB ID
var idSearch = function (movie, country) {
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'cfff8e47bbmsh52112d53558a8c6p18b44djsn557c06239ea5',
            'X-RapidAPI-Host': 'online-movie-database.p.rapidapi.com'
        }
    };
    fetch('https://online-movie-database.p.rapidapi.com/title/find?q=' + movie + '', options)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            topId = data.results[0].id.slice(7, 16);
            topTitle = data.results[0].title;
            passthrough = country
            MovieInfo(topId);
            trailer(topId);
            getWatchApi(topId, passthrough);
        })
}

//function for movie info
var MovieInfo = function (id) {
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'cfff8e47bbmsh52112d53558a8c6p18b44djsn557c06239ea5',
            'X-RapidAPI-Host': 'online-movie-database.p.rapidapi.com'
        }
    };

    fetch('https://online-movie-database.p.rapidapi.com/title/get-overview-details?tconst=' + id + '&currentCountry=CA', options)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            info = data;

            movieInfoEl.innerHTML = data.plotSummary.text;
            movieDateEl.innerHTML = data.releaseDate;
            moviePosterEl.setAttribute("src", data.title.image.url)
            movieStarEl.innerHTML = data.ratings.rating;
            movieRatingEl.innerHTML = data.certificates.US[0].certificate;

            for (i = 0; i < data.genres.length; i++) {
                let li = document.createElement("li");
                li.innerHTML = data.genres[i];
                movieGenreEl.appendChild(li);
            }
        })
}

//Array that holds api key and other verification
const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': 'cfff8e47bbmsh52112d53558a8c6p18b44djsn557c06239ea5',
        'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com'
    }
};

//data value is set to movieTerm and used in var displayWatchInfo
let movieTerm = '';

//Makes fetch call 
var getWatchApi = function (movie, country) {
    fetch("https://streaming-availability.p.rapidapi.com/get/basic?country=" + country + "&imdb_id=" + movie + "&output_language=en", options)
        .then(function (response) {
            response.json().then(function (data) {
                console.log(data);
                movieTerm = data;
                movieTitleEl.innerHTML = data.title;
                movieLanguageEl.innerHTML = data.originalLanguage;
                length = data.runtime;
                hour = Math.floor(length / 60);
                minute = length % 60;
                movieLengthEl.innerHTML = hour + ":" + minute
                console.log(movieLengthEl);

                for (let i = 0; i < data.cast.length; i++) {
                    let li = document.createElement("li");
                    li.innerText = data.cast[i];
                    movieCastEl.appendChild(li);
                }

                if (data.streamingInfo == null || data.streamingInfo == "") {
                    console.log("good");
                }

                for (let i = 0; i < data.streamingInfo.length; i++) {
                    let li = Document.createElement("li");
                    li.innerText = data.streamingInfo[i];
                    movieStreamEl.appendChild(li);
                }
            });
        }
        )
};


//event handler function
var movieSearchHandler = function (event) {
    event.preventDefault();
    //get value from input element and eliminates extra spaces 
    var movie = movieInputEl.value.trim();
    if (movie) {
        while (movieCastEl.firstChild) {
            movieCastEl.removeChild(movieCastEl.firstChild);
        }
        GetLocation(movie);
        movieInputEl.value = "";
    } else {
        //**can we use alerts/prompts for this project?** 
        alert("Please enter a movie name");
    }
};

//movie trailer
var trailer = function (id) {
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'cfff8e47bbmsh52112d53558a8c6p18b44djsn557c06239ea5',
            'X-RapidAPI-Host': 'online-movie-database.p.rapidapi.com'
        }
    };
    fetch('https://online-movie-database.p.rapidapi.com/title/get-videos?tconst=' + id + '&limit=1&region=US', options)
        .then(response => response.json())
        .then(data => {
            videoId = data.resource.videos[0].id.slice(9);
            trailerDisplay(videoId);
        }).catch(err => console.error(err));
}

var trailerDisplay = function (id) {
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'cfff8e47bbmsh52112d53558a8c6p18b44djsn557c06239ea5',
            'X-RapidAPI-Host': 'online-movie-database.p.rapidapi.com'
        }
    };
    fetch('https://online-movie-database.p.rapidapi.com/title/get-video-playback?viconst=' + id, options)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            movieTrailerEl.setAttribute("type", data.resource.encodings[1].mimeType);
            movieTrailerEl.setAttribute("src", data.resource.encodings[1].playUrl);
        })
}

//event handler function call
movieformEl.addEventListener("submit", movieSearchHandler);



//reference data
/*
fetch('https://streaming-availability.p.rapidapi.com/search/basic?country=us&service=netflix&type=movie&genre=18&page=1&output_language=en&language=en', options)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));
*/
