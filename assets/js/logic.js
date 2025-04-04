// API Read Access Token:eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwOTRjODRkYjU5N2RlYjQ5OGY4ZDkwYTI0NzQ1MTNmZSIsIm5iZiI6MTY1NTU4MDU1Mi44MzgsInN1YiI6IjYyYWUyNzg4YTZhNGMxMDBmMGFhYWNkYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.srm6rQi95Et7kAUp69oL7NFBB8ornMEwyab1kqgSdD4
let APIKey = '094c84db597deb498f8d90a2474513fe';
// curl --request GET \
// --url 'https://api.themoviedb.org/3/movie/11' \
// --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwOTRjODRkYjU5N2RlYjQ5OGY4ZDkwYTI0NzQ1MTNmZSIsIm5iZiI6MTY1NTU4MDU1Mi44MzgsInN1YiI6IjYyYWUyNzg4YTZhNGMxMDBmMGFhYWNkYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.srm6rQi95Et7kAUp69oL7NFBB8ornMEwyab1kqgSdD4'

//variables declaration
// document.getElementById("").
const figureImg = document.getElementsByClassName("figure-img");

//now playing 

// logic
async function getText(file) {
    let myObject = await fetch(file);
    let myText = await myObject.text();
    myDisplay(myText);
}

// let search = document.getElementById("search");
// search.addEventListener("click", fetchAPI());
// function fetchAPI() {
//     fetch('https://api.themoviedb.org/3/movie/11?' + 'api_key=' + APIKey)
//         .then(response => response.json())
//         .then(data => {
//             console.log(data)
//         })
// };
const nowShowingDate = document.getElementById("now-showing-date");
const loadImg = document.getElementById('loadImg');

const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwOTRjODRkYjU5N2RlYjQ5OGY4ZDkwYTI0NzQ1MTNmZSIsIm5iZiI6MTY1NTU4MDU1Mi44MzgsInN1YiI6IjYyYWUyNzg4YTZhNGMxMDBmMGFhYWNkYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.srm6rQi95Et7kAUp69oL7NFBB8ornMEwyab1kqgSdD4'
    }
};

fetch('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1', options)
    .then(res => res.json())
    .then(data => {
        console.log(data)
        if (data.dates) {
            //console.log(data.dates.maximum); //2025-04-09
            //console.log(data.dates.minimum);
            nowShowingDate.innerHTML = '(' + data.dates.minimum + '-' + data.dates.maximum + ')';
        }
        if (data.results) {
            let movieArr = data.results;
            console.log(movieArr);
            const movieObject = {};

            for (let i = 0; i < movieArr.length; i++) {
                let poster = movieArr[i].poster_path;
                let title = movieArr[i].title;
                let posterPath = 'https://media.themoviedb.org/t/p/w440_and_h660_face' + poster;
                console.log(poster, title, posterPath);
                // <figure class='figure'>
                let figurecontainer = document.createElement('figure');
                figurecontainer.setAttribute('class', 'figure');
                loadImg.appendChild(figurecontainer);
                // <img src=posterPath class='figure-img img-fluid rounded' alt='movie poster>
                let imgcontainer = document.createElement('img');
                imgcontainer.setAttribute('class', 'figure-img img-fluid rounded');
                imgcontainer.setAttribute('src', posterPath);
                imgcontainer.setAttribute('alt', 'Movie Poster');
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