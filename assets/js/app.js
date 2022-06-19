// API Key: 094c84db597deb498f8d90a2474513fe
// https://api.themoviedb.org/3/movie/550?api_key=094c84db597deb498f8d90a2474513fe

var cards = document.querySelector("#now");

function render_page(move_data) {
    
}

function open() {

    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };
    
    fetch("https://api.themoviedb.org/3/movie/now_playing?api_key=094c84db597deb498f8d90a2474513fe&language=en-US&page=1&region=US", requestOptions).then(function(response) {
        response.json().then(function(data) { 
            // console.log(data);
            // count: data.results.length
            for (var i=0; i<data.results.length; i++) {
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
}

open();

// https://image.tmdb.org/t/p/w500/kAVRgw7GgK1CfYEJq8ME6EvRIgU.jpg
// /wo3l9p0S7pcvwlzlndtKgq0peRJ.jpg
// "id": 507086
// "original_title": "Jurassic World Dominion"
// "poster_path": "/kAVRgw7GgK1CfYEJq8ME6EvRIgU.jpg"
// https://image.tmdb.org/t/p/w500
// "backdrop_path": "/wo3l9p0S7pcvwlzlndtKgq0peRJ.jpg"