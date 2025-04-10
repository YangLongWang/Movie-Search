//variables declaration
const nowShowingDate = document.getElementById("now-showing-date");
const loadImg = document.getElementById("loadImg");
const topRated = document.getElementById("top-rated");
const searchButton = document.getElementById("searchButton");
const nowShowingPart = document.getElementById('now-showing-part');
const moreMoviesPart = document.getElementById('more-movies-part');
const movies = document.getElementById('movies');
const contactUs = document.getElementById('contact-us');
const searchText = document.getElementById("searchText");

const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwOTRjODRkYjU5N2RlYjQ5OGY4ZDkwYTI0NzQ1MTNmZSIsIm5iZiI6MTY1NTU4MDU1Mi44MzgsInN1YiI6IjYyYWUyNzg4YTZhNGMxMDBmMGFhYWNkYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.srm6rQi95Et7kAUp69oL7NFBB8ornMEwyab1kqgSdD4'
    }
};

// now playing movies
fetch('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1', options)
    .then(res => res.json())
    .then(data => {
        if (data.dates) {
            nowShowingDate.innerHTML = '(' + data.dates.minimum + ' ~ ' + data.dates.maximum + ')';
        }
        if (data.results) {
            let movieArr = data.results;
            for (let i = 0; i < movieArr.length; i++) {
                let movieId = movieArr[i].id;
                let poster = movieArr[i].poster_path;
                let title = movieArr[i].title;
                let posterPath = 'https://media.themoviedb.org/t/p/w440_and_h660_face' + poster;
                // <figure class='figure'>
                let figurecontainer = document.createElement('figure');
                figurecontainer.setAttribute('class', 'figure');
                figurecontainer.setAttribute('id', movieId);
                loadImg.appendChild(figurecontainer);
                // <img src=posterPath class='figure-img img-fluid rounded' alt='movie poster>
                let imgcontainer = document.createElement('img');
                imgcontainer.setAttribute('class', 'figure-img img-fluid rounded');
                imgcontainer.setAttribute('src', posterPath);
                imgcontainer.setAttribute('alt', title);
                figurecontainer.appendChild(imgcontainer);
                // <figcaption class='figure-caption'>title</figcaption>
                let figtext = document.createElement('figcaption');
                let figcontent = document.createTextNode(title);
                figtext.setAttribute('class', 'figure-caption');
                figtext.appendChild(figcontent);
                figurecontainer.appendChild(figtext);
            }
        }
    })
    .catch(err => console.error(err));

// top rated movies
fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options)
    .then(res => res.json())
    .then(data => {
        if (data.results) {
            let movieArr = data.results;
            // class->row row-cols-2 row-cols-lg-5 g-2 g-lg-3
            let topRow = document.createElement('div');
            topRow.classList.add('row', 'row-cols-2', 'row-cols-lg-5', 'g-2', 'g-lg-3', 'justify-content-between');
            topRated.appendChild(topRow);
            for (let i = 0; i < movieArr.length; i++) {
                let movieId = movieArr[i].id;
                let poster = movieArr[i].poster_path;
                let title = movieArr[i].original_title;
                let posterPath = 'https://media.themoviedb.org/t/p/w440_and_h660_face' + poster;
                // <figure class='figure'>
                let figurecontainer = document.createElement('figure');
                figurecontainer.setAttribute('class', 'figure');
                figurecontainer.setAttribute('id', movieId);
                topRow.appendChild(figurecontainer);
                // <img src=posterPath class='figure-img img-fluid rounded' alt='movie poster>
                let imgcontainer = document.createElement('img');
                imgcontainer.setAttribute('class', 'figure-img img-fluid rounded');
                imgcontainer.setAttribute('src', posterPath);
                imgcontainer.setAttribute('alt', title);
                figurecontainer.appendChild(imgcontainer);
                // <figcaption class='figure-caption'>title</figcaption>
                let figtext = document.createElement('figcaption');
                let figcontent = document.createTextNode(title);
                figtext.setAttribute('class', 'figure-caption');
                figtext.appendChild(figcontent);
                figurecontainer.appendChild(figtext);
            }
        }
    })
    .catch(err => console.error(err));

// click movie poster
function clickPoster(event) {
    event.preventDefault();

    if (event.target.parentElement.tagName === 'FIGURE') {
        let movieId = event.target.parentElement['id'];
        fetch(`https://api.themoviedb.org/3/movie/${movieId}?language=en-US`, options)
            .then(res => res.json())
            .then(data => {
                if (data) {
                    let movieDetails = data;
                    // div->class="movie-info"
                    let movieInfo = document.createElement("div");
                    movieInfo.classList.add('movie-info');
                    movies.appendChild(movieInfo);
                    // div->class="row"
                    let movieRow = document.createElement("div");
                    movieRow.classList.add('row');
                    movieInfo.appendChild(movieRow);
                    // div->class="col-8 info"
                    let info = document.createElement('div');
                    info.classList.add('col-8', 'info');
                    movieRow.appendChild(info);
                    // h2->class="text-center"
                    let title = document.createElement('h2');
                    title.classList.add('text-center');
                    title.innerHTML = movieDetails.original_title;
                    info.appendChild(title);
                    // p strong-> 
                    let synopsis = document.createElement('p');
                    synopsis.classList.add('synopsis')
                    synopsis.innerHTML = `Synopsis: \n ${movieDetails.overview}`;
                    info.appendChild(synopsis);
                    // aside->class="col-4 text-center"
                    let aside = document.createElement('aside');
                    aside.classList.add("col-4", "text-center");
                    movieRow.appendChild(aside);
                    // figure->class="figure-big"
                    let figureBig = document.createElement('figure');
                    figureBig.classList.add('figure-big');
                    aside.appendChild(figureBig);
                    // img->class="figure-img img-fluid rounded" src="" alt=""
                    let posterPath = 'https://image.tmdb.org/t/p/original/' + movieDetails.poster_path;
                    let moviePoster = document.createElement('img');
                    moviePoster.classList.add('figure-img', 'img-fluid', 'rounded');
                    moviePoster.setAttribute('alt', movieDetails.title);
                    moviePoster.setAttribute('src', posterPath);
                    figureBig.appendChild(moviePoster);
                    // p->language class="" id="languageValue" 
                    let language = document.createElement('p');
                    let languageValue = document.createElement('span');
                    languageValue.setAttribute('id', 'languageValue');
                    language.classList.add('language');
                    language.innerHTML = "Language: ";
                    languageValue.innerHTML = movieDetails.original_language;
                    aside.appendChild(language);
                    language.appendChild(languageValue);
                    // p->score class=""  
                    let score = document.createElement('p');
                    score.innerHTML = "Score: " + movieDetails.vote_average;
                    aside.appendChild(score);
                    // p->release date class=""  
                    let releaseDate = document.createElement('p');
                    releaseDate.innerHTML = "Release Date: " + movieDetails.release_date;
                    aside.appendChild(releaseDate);

                }
            })
            .catch(err => console.error(err));
    }
}


// search/movie (more)
function searchFunction(event) {
    event.preventDefault();

    let textValue = searchText.value;
    fetch(`https://api.themoviedb.org/3/search/movie?query=${textValue}&include_adult=false&language=en-US&page=1`, options)
        .then(res => res.json())
        .then(data => {
            if (data.results) {
                let movieArr = data.results;
                for (let i = 0; i < movieArr.length; i++) {
                    // div->class="movie-info"
                    let movieInfo = document.createElement("div");
                    movieInfo.classList.add('movie-info');
                    movies.appendChild(movieInfo);
                    // div->class="row"
                    let movieRow = document.createElement("div");
                    movieRow.classList.add('row');
                    movieInfo.appendChild(movieRow);
                    // div->class="col-8 info"
                    let info = document.createElement('div');
                    info.classList.add('col-8', 'info');
                    movieRow.appendChild(info);
                    // h2->class="text-center"
                    let title = document.createElement('h2');
                    title.classList.add('text-center');
                    title.innerHTML = movieArr[i].original_title;
                    info.appendChild(title);
                    // p strong->class="synopsis"
                    let synopsis = document.createElement('p');
                    synopsis.classList.add('synopsis')
                    synopsis.innerHTML = `Synopsis: \n ${movieArr[i].overview}`;
                    info.appendChild(synopsis);
                    // aside->class="col-4 text-center"
                    let aside = document.createElement('aside');
                    aside.classList.add("col-4", "text-center");
                    movieRow.appendChild(aside);
                    // figure->class="figure-big"
                    let figureBig = document.createElement('figure');
                    figureBig.classList.add('figure-big');
                    aside.appendChild(figureBig);
                    // img->class="figure-img img-fluid rounded" src="" alt=""
                    let posterPath = 'https://image.tmdb.org/t/p/original/' + movieArr[i].poster_path;
                    let moviePoster = document.createElement('img');
                    moviePoster.classList.add('figure-img', 'img-fluid', 'rounded');
                    moviePoster.setAttribute('alt', movieArr[i].title);
                    moviePoster.setAttribute('src', posterPath);
                    figureBig.appendChild(moviePoster);
                    // p->language class="language" 
                    let language = document.createElement('p');
                    language.classList.add('language');
                    let languageValue = document.createElement('span');
                    languageValue.setAttribute('class', 'languageValue');
                    language.innerHTML = "Language: ";
                    languageValue.innerHTML = movieArr[i].original_language;
                    language.appendChild(languageValue);
                    aside.appendChild(language);
                    // p->score class=""  
                    let score = document.createElement('p');
                    score.innerHTML = "Score: " + movieArr[i].vote_average;
                    aside.appendChild(score);
                    // p->release date class=""  
                    let releaseDate = document.createElement('p');
                    releaseDate.innerHTML = "Release Date: " + movieArr[i].release_date;
                    aside.appendChild(releaseDate);
                }
            }
        })
        .catch(err => console.error(err));
    document.getElementById('searchText').value = '';
};

// remove parts
function cleanFunction() {
    nowShowingPart.remove();
    moreMoviesPart.remove();
    contactUs.remove();
    while (movies.hasChildNodes()) {
        movies.removeChild(movies.childNodes[0])
    }
}

searchButton.addEventListener('click', searchFunction);
searchButton.addEventListener('click', cleanFunction);
nowShowingPart.addEventListener("click", clickPoster);
nowShowingPart.addEventListener("click", cleanFunction);
moreMoviesPart.addEventListener("click", clickPoster);
moreMoviesPart.addEventListener("click", cleanFunction);