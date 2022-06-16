var searchBtnEl = document.getElementById("search-btn");
var searchInputEl = document.getElementById("search-input");


var startSearch = function(event) {
    // console.log(searchInputEl.value.trim());

    // get input from user and store it in movieTitle
    var movieTitle = searchInputEl.value.trim();

    // if the user input something -not blank- call APIs
    if (movieTitle) {
        // call functions to fetch from APIs based on movieTitle
    // else alert user to input something
    } else {
        alert("Please enter a movie name");
    }
}

// added listener directly to btn
searchBtnEl.addEventListener("click", startSearch);