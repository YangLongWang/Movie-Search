//DOM 
var movieformEl = document.querySelector("#movie-form");
var movieInputEl = document.querySelector("#search-input");

//Array that holds api key and other verification
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'cfff8e47bbmsh52112d53558a8c6p18b44djsn557c06239ea5',
		'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com'
	}
};

let movieTerm ='';

var getWatchApi = function(movie){ 
     fetch("https://streaming-availability.p.rapidapi.com/search/basic?country=us&service=netflix&type=movie&keyword=" + movie  + "&page=1&output_language=en&language=en", options).then(function(response) {
        response.json().then(function(data) {
            console.log(data);
        movieTerm= data;    
            displayWatchInfo(movieTerm);
        });
       }
   )};

//display data
var displayWatchInfo = function(movieTerm) {
    console.log(movieTerm);


};


//search function
var movieSearchHandler = function(event) {
    event.preventDefault();
//get value from input element
 var movie = movieInputEl.value.trim();

    if (movie) {
        getWatchApi(movie);
        movieInputEl.value = "";
    }else {
        //**can we use alerts/prompts for this project?** 
        alert("Please enter a movie name");
    }
};

//event listener 
movieformEl.addEventListener("submit", movieSearchHandler);



//reference data
/*
fetch('https://streaming-availability.p.rapidapi.com/search/basic?country=us&service=netflix&type=movie&genre=18&page=1&output_language=en&language=en', options)
	.then(response => response.json())
	.then(response => console.log(response))
	.catch(err => console.error(err));
*/