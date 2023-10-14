document.addEventListener("DOMContentLoaded", function () {
  const searchTitle = document.getElementById("searchTitle");
  const searchButton = document.getElementById("searchButton");
  const searchInput = document.getElementById("searchInput");
  const movieList = document.getElementById("movieList");

  // Fetch and display trending movies on page load
  fetchTrendingMovies();

  searchButton.addEventListener("click", function () {
    const searchTerm = searchInput.value;
    if (searchTerm.trim() !== "") {
      searchMovies(searchTerm);
    }
  });

  searchTitle.addEventListener("click", function () {
    location.reload();
  });

  function fetchTrendingMovies() {
    // You can fetch trending movies from an API or use a predefined list
    const trendingMovies = [
      {
        Title: "Mission Raniganj",
        Poster:
          "https://upload.wikimedia.org/wikipedia/en/thumb/e/ee/Mission_Raniganj_film_poster.jpg/220px-Mission_Raniganj_film_poster.jpg",
        imdbRating: "7.5",
        Released: "6 October 2023",
        Actors: "Akshay Kumar, Parineeti Chopra",
        Genre: "Drama",
        Language: "Hindi",
      },
      {
        Title: "OMG 2",
        Poster:
          "https://m.media-amazon.com/images/M/MV5BYWI0ZjhmNjMtMTdhNy00MGE5LTg0MWItYzA5ZDIwZmI4YjhhXkEyXkFqcGdeQXVyMTA1NTY0NzQ0._V1_.jpg",
        imdbRating: "7.9",
        Released: "11 August 2023",
        Actors: "Akshay Kumar, Pankaj Tripathi",
        Genre: "Drama",
        Language: "Hindi",
      },
      {
        Title: "Khufiya",
        Poster:
          "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcT5wasTY7WMpc-mMl_epKMKNLYPYEiouEmtwPIZfk-XvY7pCJYo",
        imdbRating: "6.9",
        Released: "05 Octobor 2023",
        Actors: "Ali Fazal",
        Genre: "Drama",
        Language: "Hindi",
      },

      // Add more trending movies as needed
    ];

    movieList.innerHTML = "";
    trendingMovies.forEach((movie) => {
      const movieCard = createMovieCard(movie);
      movieList.appendChild(movieCard);
    });
  }

  function searchMovies(searchTerm) {
    const apiKey = "7fcd9e99";
    const apiUrl = `http://www.omdbapi.com/?s=${searchTerm}&apikey=${apiKey}`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        if (data.Search) {
          movieList.innerHTML = "";
          data.Search.forEach((movie) => {
            fetchMovieDetails(movie.imdbID, apiKey);
          });
        } else {
          movieList.innerHTML = "<p>No results found</p>";
        }
      })
      .catch((error) => console.error(error));
  }

  function fetchMovieDetails(imdbID, apiKey) {
    const apiUrl = `http://www.omdbapi.com/?i=${imdbID}&apikey=${apiKey}`;
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        const movieCard = createMovieCard(data);
        movieList.appendChild(movieCard);
      })
      .catch((error) => console.error(error));
  }

  function createMovieCard(movie) {
    const movieCard = document.createElement("div");
    movieCard.classList.add("movie-card");

    const title = document.createElement("h2");
    title.innerText = movie.Title;

    const poster = document.createElement("img");
    poster.classList.add("poster");
    poster.src = movie.Poster;

    const releaseDate = document.createElement("p");
    releaseDate.innerText = `Release Date: ${movie.Released}`;

    const actors = document.createElement("p");
    actors.innerText = `Actors: ${movie.Actors}`;

    const genre = document.createElement("p");
    genre.innerText = `Genre: ${movie.Genre}`;

    const language = document.createElement("p");
    language.innerText = `Language: ${movie.Language}`;

    const rating = document.createElement("p");
    rating.innerText = `Rating: ${movie.imdbRating}`;

    movieCard.appendChild(poster);
    movieCard.appendChild(title);
    movieCard.appendChild(releaseDate);
    movieCard.appendChild(actors);
    movieCard.appendChild(genre);
    movieCard.appendChild(language);
    movieCard.appendChild(rating);

    return movieCard;
  }
});
