let movies = [];

function searchMovie() {
    const movieName = document.getElementById("searchInput").value;

    if (movieName === "") {
        alert("Please enter movie name");
        return;
    }

    fetch(`https://www.omdbapi.com/?s=${movieName}&apikey=2a897907`)
        .then(res => res.json())
        .then(data => {
            if (data.Response === "False") {
                document.getElementById("movieContainer").innerHTML = "<h3>Movie not found</h3>";
            } else {
                movies = data.Search;
                displayMovies(movies);
            }
        });
}

function displayMovies(movieList) {
    const container = document.getElementById("movieContainer");
    container.innerHTML = "";

    movieList.forEach(movie => {
        container.innerHTML += `
        <div class="card">
            <img src="${movie.Poster}" width="100%">
            <h3>${movie.Title}</h3>
            <p>Year: ${movie.Year}</p>
        </div>`;
    });
}

function sortMovies() {
    const value = document.getElementById("sort").value;

    if (value === "year") {
        movies.sort((a,b) => a.Year - b.Year);
    }
    displayMovies(movies);
}



// code for hover effect and movie details on click
function displayMovies(list) {
  const container = document.getElementById("movieContainer");
  container.innerHTML = "";

  list.forEach(movie => {
    container.innerHTML += `
      <div class="card" onclick="getDetails('${movie.imdbID}')">
        <img src="${movie.Poster}">
        <h3>${movie.Title}</h3>
        <p>Year: ${movie.Year}</p>
      </div>`;
  });
}
function getDetails(id) {
  fetch(`https://www.omdbapi.com/?i=${id}&apikey=2a897907`)
    .then(res => res.json())
    .then(data => {
      alert(`
Title: ${data.Title}
Rating: ${data.imdbRating}
Genre: ${data.Genre}
Plot: ${data.Plot}
      `);
    });
}