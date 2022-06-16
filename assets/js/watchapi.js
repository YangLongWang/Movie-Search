//DOM 
var movieformEl = document.getElementById("#movie-form");
var movieInputEl = document.getElementById("#search-input");

//Array that holds api key and other verification
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'cfff8e47bbmsh52112d53558a8c6p18b44djsn557c06239ea5',
		'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com'
	}
};



var getWatchApi = function(){ 
    var response= fetch('https://streaming-availability.p.rapidapi.com/search/basic?country=us&service=netflix&type=movie&genre=18&page=1&output_language=en&language=en', options).then(function(response) {
        response.json().then(function(data) {
            console.log(data);
        });
       }
   )};

//getWatchApi();


//search function
var movieSearchHandler = function(event) {
    event.preventDefault();
    console.log(event);
}


//reference data
/*
fetch('https://streaming-availability.p.rapidapi.com/search/basic?country=us&service=netflix&type=movie&genre=18&page=1&output_language=en&language=en', options)
	.then(response => response.json())
	.then(response => console.log(response))
	.catch(err => console.error(err));
*/