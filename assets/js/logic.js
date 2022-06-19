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
var movieWriterEl = document.querySelector("#writers");
var movieTrailerEl = document.querySelector("#trailer");
var movieReviewEl = document.querySelector("#review_list");
var movieStreamEl = document.querySelector("#stream_list");
var movieShowtimeEl = document.querySelector("#local_list");
var movieLanguageEl = document.querySelector("#language");
var movieStarEl = document.querySelector("#star");
var searchBtnEl = document.getElementById("search-btn");
var searchInputEl = document.getElementById("search-input");
var filterBtnEl = document.getElementById("filter-btn");
var formEl = document.getElementById("movie-form");
var filterModalEl = document.getElementById("filter-modal");
var modalCloseBtn = document.getElementById("modal-cancel-btn");
var pageEl = document.querySelector("html");
var preferences = {};
var alertModalEl = document.getElementById("alert-modal");

// info(184126)

//movie now
window.onload = function () {
    let apiKey = '627ce180f6b942d38cd09ef7905db024';
    fetch('https://ipgeolocation.abstractapi.com/v1/?api_key=' + apiKey)
        .then(response => response.json())
        .then(data => {
            console.log((data))
            country = data.country_code;
            playingNow(country);
        });
}
var playingNow = function (country) {
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };
    fetch("https://api.themoviedb.org/3/movie/now_playing?api_key=094c84db597deb498f8d90a2474513fe&language=en-US&page=1&region=" + country, requestOptions)
        .then(function (response) {
            response.json().then(function (data) {
                console.log(data);
                // count: data.results.length
                for (var i = 0; i < data.results.length; i++) {
                    // console.log(data.results[i].poster_path);
                    var backImage = data.results[i].poster_path;
                    var backtitle = data.results[i].original_title;

                    var movieCardImage = "https://image.tmdb.org/t/p/w500" + backImage;

                    // console.log(movieCardImage);

                    var col = document.createElement("div");
                    col.classList.add("column", "is-narrow", "is-one-fifth");

                    var card = document.createElement("div");
                    card.classList.add("card");

                    var cardImage = document.createElement("div");
                    cardImage.classList.add("card-image");

                    var moviePoster = document.createElement("figure");
                    moviePoster.classList.add("image");

                    var pic = document.createElement("img");
                    pic.setAttribute("src", movieCardImage);

                    var cardContent = document.createElement("div");
                    cardContent.classList.add("card-content", "has-text-centered");

                    var contentTitle = document.createElement("p");
                    contentTitle.classList.add("title", "is-5");
                    contentTitle.textContent = backtitle;

                    cards.appendChild(col);
                    col.appendChild(card);
                    card.appendChild(cardImage);
                    cardImage.appendChild(moviePoster);
                    moviePoster.appendChild(pic);
                    card.appendChild(cardContent);
                    cardContent.appendChild(contentTitle);

                }
            })
        }).catch(error => console.log('error', error));
};

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
};

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
            Id = data.results[0].id.slice(7, 16);
            topTitle = data.results[0].title;
            passthrough = country
            MovieInfo(Id);
            trailer(Id);
            topCrew(Id);
            userReviews(Id)
            getWatchApi(Id, passthrough);
        })
};

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
};

//data value is set to movieTerm and used in var displayWatchInfo
let movieTerm = '';

//Watch API function
var getWatchApi = function (movie, country) {
    //keys for request
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'cfff8e47bbmsh52112d53558a8c6p18b44djsn557c06239ea5',
            'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com'
        }
    };
    //request
    fetch("https://streaming-availability.p.rapidapi.com/get/basic?country=" + country + "&imdb_id=" + movie + "&output_language=en", options)
        .then(function (response) {
            response.json().then(function (data) {
                //data format and display
                console.log(data);
                movieTerm = data;
                movieTitleEl.innerHTML = data.title;
                movieLanguageEl.innerHTML = data.originalLanguage;
                length = data.runtime;
                hour = Math.floor(length / 60);
                minute = length % 60;
                movieLengthEl.innerHTML = hour + ":" + minute
                console.log(movieLengthEl);
                //loop to display cast
                for (let i = 0; i < data.cast.length; i++) {
                    let li = document.createElement("li");
                    li.innerText = data.cast[i];
                    movieCastEl.appendChild(li);
                }
                //loop for available streaming platforms
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
            //reset lists from earlier
            movieCastEl.removeChild(movieCastEl.firstChild);
        };
        while (movieWriterEl.firstChild) {
            //reset lists from earlier
            movieWriterEl.removeChild(movieWriterEl.firstChild);
        };
        while (movieDirectorEl.firstChild) {
            //reset lists from earlier
            movieDirectorEl.removeChild(movieDirectorEl.firstChild);
        };
        while (movieReviewEl.firstChild) {
            //reset lists from earlier
            movieReviewEl.removeChild(movieReviewEl.firstChild);
        };
        while (movieGenreEl.firstChild) {
            //reset lists from earlier
            movieGenreEl.removeChild(movieGenreEl.firstChild);
        }
        GetLocation(movie);
        movieInputEl.value = "";
    };
};

//get trailer info
var trailer = function (id) {
    //key for request
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'cfff8e47bbmsh52112d53558a8c6p18b44djsn557c06239ea5',
            'X-RapidAPI-Host': 'online-movie-database.p.rapidapi.com'
        }
    };
    //request for trailer id
    fetch('https://online-movie-database.p.rapidapi.com/title/get-videos?tconst=' + id + '&limit=1&region=US', options)
        .then(response => response.json())
        .then(data => {
            videoId = data.resource.videos[0].id.slice(9);
            trailerDisplay(videoId);
        }).catch(err => console.error(err));
};

//display trailer on page
var trailerDisplay = function (id) {
    //key for request
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'cfff8e47bbmsh52112d53558a8c6p18b44djsn557c06239ea5',
            'X-RapidAPI-Host': 'online-movie-database.p.rapidapi.com'
        }
    };
    //display on page
    fetch('https://online-movie-database.p.rapidapi.com/title/get-video-playback?viconst=' + id, options)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            movieTrailerEl.setAttribute("type", data.resource.encodings[1].mimeType);
            movieTrailerEl.setAttribute("src", data.resource.encodings[1].playUrl);
        })
};

var topCrew = function (id) {
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'cfff8e47bbmsh52112d53558a8c6p18b44djsn557c06239ea5',
            'X-RapidAPI-Host': 'online-movie-database.p.rapidapi.com'
        }
    };

    fetch('https://online-movie-database.p.rapidapi.com/title/get-top-crew?tconst=' + id, options)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            for (i = 0; i < data.directors.length; i++) {
                let li = document.createElement("li");
                li.innerHTML = data.directors[i].name;
                movieDirectorEl.appendChild(li);
            };
            for (let i = 0; i < data.writers.length; i++) {
                let li = document.createElement("li");
                li.innerHTML = data.writers[i].name;
                movieWriterEl.appendChild(li);
            }
        })
        .catch(err => console.error(err));
}

var userReviews = function (id) {
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'cfff8e47bbmsh52112d53558a8c6p18b44djsn557c06239ea5',
            'X-RapidAPI-Host': 'online-movie-database.p.rapidapi.com'
        }
    };

    fetch('https://online-movie-database.p.rapidapi.com/title/get-user-reviews?tconst=tt0944947', options)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            for (let i = 0; i < 5; i++) {
                let li = document.createElement("li");
                li.setAttribute("id", "reviewItem");
                let author = document.createElement("p");
                author.innerHTML = "Author" + data.reviews[i].author.displayname;
                let rating = document.createElement("p");
                rating.innerHTML = data.reviews[i].authorRating;
                let title = document.createElement("p");
                title.innerHTML = data.reviews[i].reviewTitle;
                let text = document.createElement("p");
                text.innerHTML = data.reviews[i].reviewText;
                li.appendChild(author);
                li.appendChild(rating);
                li.appendChild(title);
                li.appendChild(text);
                movieReviewEl.appendChild(li);
            }
        })
        .catch(err => console.error(err));
}

//form submit event call
movieformEl.addEventListener("submit", movieSearchHandler);
var startSearch = function (event) {
    // console.log(searchInputEl.value.trim());
    event.preventDefault();

    // get input from user and store it in movieTitle
    var movieTitle = searchInputEl.value.trim();
    // console.log("searching");

    // if the user input something -not blank- call APIs
    if (movieTitle) {
        // call functions to fetch from APIs based on movieTitle
        // else alert user to input something
    } else {
        // start alert modal
        alertModalEl.classList.add("is-active");
        pageEl.classList.add("is-clipped");
    }
};

var callModal = function (event) {
    // console.log("filtering");
    filterModalEl.classList.add("is-active");
    pageEl.classList.add("is-clipped");

};

// var inputHandler = function(event) {
//     event.preventDefault();
//     // console.log(event.target.id);
//     var inputId = event.target.id;

//     if (inputId === "search-btn") {
//         // console.log("searching");
//         startSearch();
//     // } else if (inputId === "filter-btn") {
//     //     // console.log("filtering");
//     //     callModal();
//     }

// };


var loadPreferences = function () {
    preferences = JSON.parse(localStorage.getItem("search-preference"));
    // console.log(preferences);

    if (!preferences) {
        preferences = {};
        // this ensures that first users will see all checked boxes consistently
        savePreferences();
    }
    var cbPreferenceArr = document.querySelectorAll(".filter-option");

    for (var i = 0; i < cbPreferenceArr.length; i++) {
        // console.log(cbPreferenceArr[i].getAttribute("name"));
        if (preferences[cbPreferenceArr[i].getAttribute("name")] === true) {
            // console.log(cbPreferenceArr[i]);
            cbPreferenceArr[i].checked = true;
        } else {
            cbPreferenceArr[i].checked = false;
        }
    }

};

var savePreferences = function () {
    // select all checkboxes
    var cbPreferenceArr = document.querySelectorAll(".filter-option");
    // console.dir(cbPreferenceArr[0]);

    //loop through all of them
    for (var i = 0; i < cbPreferenceArr.length; i++) {
        // in loop, retrieve name and status
        var preferenceName = cbPreferenceArr[i].getAttribute("name");
        var preferenceState = cbPreferenceArr[i].checked;
        // console.log(preferenceName, preferenceState);
        // push to preference object
        preferences[preferenceName] = preferenceState;
    }
    // console.log(preferences);
    // save to local storage
    localStorage.setItem("search-preference", JSON.stringify(preferences));
};

// disabling for now
//formEl.addEventListener("click", inputHandler);

searchBtnEl.addEventListener("click", startSearch);

// modalCloseBtn.addEventListener("click", closeModal);

document.addEventListener('DOMContentLoaded', () => {
    // Functions to open and close a modal
    function openModal($el) {
        $el.classList.add('is-active');
        loadPreferences();
    }

    function closeModal($el) {
        $el.classList.remove('is-active');
        // add scrollbar back to main HTML
        pageEl.className = "";
        // save filter preferences
        // savePreferences();
    }

    function closeAllModals() {
        (document.querySelectorAll('.modal') || []).forEach(($modal) => {
            closeModal($modal);
        });
    }

    // Add a click event on buttons to open a specific modal
    (document.querySelectorAll('.js-modal-trigger') || []).forEach(($trigger) => {
        const modal = $trigger.dataset.target;
        const $target = document.getElementById(modal);

        $trigger.addEventListener('click', () => {
            event.preventDefault();
            openModal($target);
        });
    });

    // Add a click event on various child elements to close the parent modal
    (document.querySelectorAll('.modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button') || []).forEach(($close) => {
        const $target = $close.closest('.modal');

        $close.addEventListener('click', (event) => {
            if (event.target.id === "modal-save-btn") {
                // console.log("saving");
                savePreferences();
            }
            closeModal($target);
        });
    });

    // Add a keyboard event to close all modals
    document.addEventListener('keydown', (event) => {
        const e = event || window.event;

        if (e.keyCode === 27) { // Escape key
            closeAllModals();
        }
    });
});

// load from localStorage
loadPreferences();
