//variables declaration
key2 = "cfff8e47bbmsh52112d53558a8c6p18b44djsn557c06239ea5";
let btn = document.querySelector(".button");
// info(184126)

//IP adress look up API
// let apiKey = '627ce180f6b942d38cd09ef7905db024';
// fetch('https://ipgeolocation.abstractapi.com/v1/?api_key=' + apiKey)
//     .then(response => response.json())
//     .then(data => {
//         console.log((data))
//         lat = data.latitude.toString();
//         long = data.longitude.toString();
//         let location = lat + ";" + long;
//         return location;
//     });

//function for live search
function search(input) {
    let apiKey = '627ce180f6b942d38cd09ef7905db024';
    fetch('https://ipgeolocation.abstractapi.com/v1/?api_key=' + apiKey)
        .then(response => response.json())
        .then(data => {
            console.log((data))
            inputPass = input
            lat = data.latitude.toString();
            long = data.longitude.toString();
            var today = new Date();
            var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
            var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds() + ":" + today.getMilliseconds();
            var dateTime = date + 'T' + time + "Z";
            console.log(dateTime);
            let location = lat + ";" + long;
            moviesearch(inputPass, location, dateTime)
        });
};


function idSearch(input) {
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'cfff8e47bbmsh52112d53558a8c6p18b44djsn557c06239ea5',
            'X-RapidAPI-Host': 'online-movie-database.p.rapidapi.com'
        }
    };

    fetch('https://online-movie-database.p.rapidapi.com/title/find?q=' + input + '', options)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            topId = data.results[0].id.slice(7, 16);
            topTitle = data.results[0].title;
            MovieInfo(topId);
        })
}

function MovieInfo(id) {
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
        })
}

btn.addEventListener("click", function () {
    UserInput = document.querySelector("input").value;
    idSearch(UserInput);
})
