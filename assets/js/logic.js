// API Read Access Token:eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwOTRjODRkYjU5N2RlYjQ5OGY4ZDkwYTI0NzQ1MTNmZSIsIm5iZiI6MTY1NTU4MDU1Mi44MzgsInN1YiI6IjYyYWUyNzg4YTZhNGMxMDBmMGFhYWNkYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.srm6rQi95Et7kAUp69oL7NFBB8ornMEwyab1kqgSdD4
// let APIKey = '094c84db597deb498f8d90a2474513fe';
// curl --request GET \
// --url 'https://api.themoviedb.org/3/movie/11' \
// --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwOTRjODRkYjU5N2RlYjQ5OGY4ZDkwYTI0NzQ1MTNmZSIsIm5iZiI6MTY1NTU4MDU1Mi44MzgsInN1YiI6IjYyYWUyNzg4YTZhNGMxMDBmMGFhYWNkYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.srm6rQi95Et7kAUp69oL7NFBB8ornMEwyab1kqgSdD4'

//variables declaration
const nowShowingDate = document.getElementById("now-showing-date");
const loadImg = document.getElementById("loadImg");
const topRated = document.getElementById("top-rated");
const searchButton = document.getElementById("searchButton");
let searchText = document.getElementById("searchText");
// const Poster_Name = document.querySelector("#top-rated");
// console.log(Poster_Name)

// logic
// async function getText(file) {
//     let myObject = await fetch(file);
//     let myText = await myObject.text();
//     myDisplay(myText);
// }

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
            nowShowingDate.innerHTML = '(' + data.dates.minimum + '~' + data.dates.maximum + ')';
        }
        if (data.results) {
            let movieArr = data.results;
            for (let i = 0; i < movieArr.length; i++) {
                let poster = movieArr[i].poster_path;
                let title = movieArr[i].title;
                let posterPath = 'https://media.themoviedb.org/t/p/w440_and_h660_face' + poster;
                // <figure class='figure'>
                let figurecontainer = document.createElement('figure');
                figurecontainer.setAttribute('class', 'figure');
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
        // console.log(data)
        if (data.results) {
            let movieArr = data.results;
            // console.log(movieArr);
            for (let i = 0; i < movieArr.length; i++) {
                let poster = movieArr[i].poster_path;
                let title = movieArr[i].original_title;
                let posterPath = 'https://media.themoviedb.org/t/p/w440_and_h660_face' + poster;
                // <figure class='figure'>
                let figurecontainer = document.createElement('figure');
                figurecontainer.setAttribute('class', 'figure');
                topRated.appendChild(figurecontainer);
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
            // let Poster_Name = document.getElementsByClassName("figure");
            // Poster_Name.addEventListener("click", clickPoster);
        }
    })
    .catch(err => console.error(err));

//click one movie poster
function clickPoster(event) {
    // console.log(event.target)
    if (event.target) {
        const title1 = event.target["alt"];
        const title2 = event.target.innerHTML;
        console.log(title1)
        console.log(title2)
    }
}

function searchFunction(event) {
    event.preventDefault();

    let searchText = document.getElementById("searchText").value;
    // search/movie (more)
    fetch('https://api.themoviedb.org/3/search/movie?query=' + searchText + '&include_adult=false&language=en-US&page=1', options)
        .then(res => res.json())
        .then(data => {
            if (data.results) {
                let movieArr = data.results;
                let container = document.getElementById('container');
                for (let i = 0; i < movieArr.length; i++) {
                    // div->class="movie-info"
                    let movieInfo = document.createElement("div");
                    movieInfo.classList.add('movie-info');
                    container.appendChild(movieInfo);
                    // h2->class="text-center"
                    let title = document.createElement('h2');
                    title.classList.add('text-center');
                    title.innerHTML = movieArr[i].original_title;
                    // title.setAttribute('class', 'text-center');
                    movieInfo.appendChild(title);
                    // div->class="row"
                    let movieRow = document.createElement("div");
                    movieRow.classList.add('row');
                    movieInfo.appendChild(movieRow);
                    // div->class="col-8 info"
                    let info = document.createElement('div');
                    info.classList.add('col-8', 'info');
                    movieRow.appendChild(info);
                    // p strong-> 
                    let synopsis = document.createElement('p');
                    synopsis.classList.add('synopsis')
                    synopsis.innerHTML = "Synopsis: \n" + movieArr[i].overview;
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
                    // p->language class="" 
                    let language = document.createElement('p');
                    language.innerHTML = "Language: " + movieArr[i].original_language
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
};

function cleanFunction() {
    // remove parts
    let r1 = document.querySelector('.now-showing-part');
    if (r1) {
        r1.remove();
    }
    let r2 = document.querySelector('.more-movies-part');
    if (r2) {
        r2.remove();
    }
    let r3 = document.querySelector('.contactUs');
    // r3.style = 'visibility:hidden';
    if (r3) {
        r3.remove();
    }



}

searchButton.addEventListener('click', searchFunction);
searchButton.addEventListener('click', cleanFunction);
// Poster_Name.addEventListener('click', clickPoster);
