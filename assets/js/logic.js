var searchBtnEl = document.getElementById("search-btn");
var searchInputEl = document.getElementById("search-input");
var filterBtnEl = document.getElementById("filter-btn");
var formEl = document.getElementById("movie-form");
var filterModalEl = document.getElementById("filter-modal");
var modalCloseBtn = document.getElementById("close-modal");


var startSearch = function(event) {
    // console.log(searchInputEl.value.trim());

    // get input from user and store it in movieTitle
    var movieTitle = searchInputEl.value.trim();
    // console.log("searching");

    // if the user input something -not blank- call APIs
    if (movieTitle) {
        // call functions to fetch from APIs based on movieTitle
    // else alert user to input something
    } else {
        alert("Please enter a movie name");
    }
};

var callModal = function(event) {
    console.log("filtering");
    filterModalEl.className = "modal is-active is-clipped";

};

var inputHandler = function(event) {
    event.preventDefault();
    // console.log(event.target.id);
    var inputId = event.target.id;

    if (inputId === "search-btn") {
        // console.log("searching");
        startSearch();
    } else if (inputId === "filter-btn") {
        // console.log("filtering");
        callModal();
    }

};

var closeModal = function() {
    filterModalEl.className = "modal";
};

// added listener directly to btn
// searchBtnEl.addEventListener("click", startSearch);
// filterBtnEl.addEventListener("click", callModal);

formEl.addEventListener("click", inputHandler);

modalCloseBtn.addEventListener("click", closeModal);