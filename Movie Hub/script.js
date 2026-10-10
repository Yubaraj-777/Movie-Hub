const movieForm = document.querySelector("#movieForm");
const movieInput = document.querySelector("#movieInput");
const movieHub = document.querySelector("#movieHub");
const hamburger = document.querySelector("#hamburger");
const options = document.querySelector("#options");

const NO_POSTER = "https://placehold.co/300x450/18181b/a1a1aa?text=No+Poster";

movieForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let query = movieInput.value.trim();
    if (!query) {
        return;
    }
    searchMovies(query);
});

async function searchMovies(movieName) {
    movieHub.innerHTML = `<div class="col-span-full flex justify-center py-20"><span class="loader"></span></div>`;

    try {
        let response = await fetch(`https://www.omdbapi.com/?apikey=3eed3bad&s=${encodeURIComponent(movieName)}`);
        let data = await response.json();

        if (data.Response === "True") {
            displayMovies(data.Search);
        } else {
            movieHub.innerHTML = `<p class="col-span-full text-center text-red-400 py-16 text-lg">${data.Error || 'No movies found.'}</p>`;
        }
    } catch (error) {
        movieHub.innerHTML = `<p class="col-span-full text-center text-red-400 py-16 text-lg">Error loading movies. Please try again.</p>`;
    }
}

function displayMovies(movies) {
    movieHub.innerHTML = "";

    movies.forEach((movie) => {
        const div = document.createElement("div");

        div.dataset.imdbID = movie.imdbID;
        div.className = "movie-card bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden hover:border-red-500 hover:scale-105 cursor-pointer transition flex flex-col group";

        const poster = (movie.Poster && movie.Poster !== "N/A") ? movie.Poster : NO_POSTER;
        console.log({poster , mp :movie.Poster });

        div.innerHTML = `
            <img 
                src="${poster}" 
                alt="${movie.Title}" 
                class="w-full h-80 object-cover"
            >
            <div class="p-4 flex-1 flex flex-col justify-between">
                <h3 class="font-semibold text-white text-base group-hover:text-red-500 transition-colors">${movie.Title}</h3>
                <p class="text-sm text-red-500 font-medium mt-2">${movie.Year}</p>
            </div>
        `;
        movieHub.append(div);
    });
}

movieHub.addEventListener("click", (e) => {
    e.stopPropagation();
    const movieCard = e.target.closest(".movie-card");
    if (movieCard && movieCard.dataset.imdbID) {
        const imdbID = movieCard.dataset.imdbID;
        location.href = `movie-details.html?id=${imdbID}`;
    }
});

async function loadSamuraiMovies() {
    const movieIds = [
        "tt0047478",
        "tt0055630",
        "tt1436045",
        "tt0056058",
        "tt0325710"
    ];

    try {
        const movies = await Promise.all(
            movieIds.map(async (id) => {
                const response = await fetch(
                    `https://www.omdbapi.com/?apikey=3eed3bad&i=${id}`
                );

                const movie = await response.json();

                return {
                    Title: movie.Title,
                    Year: movie.Year,
                    imdbID: movie.imdbID,
                    Type: movie.Type,
                    Poster: movie.Poster
                };
            })
        );

        displayMovies(
            movies.filter(movie => movie.Title && movie.Response !== "False")
        );
    } catch (error) {
        console.error("Samurai movies error:", error);
    }
}

loadSamuraiMovies();

if (hamburger && options) {
    hamburger.addEventListener("click", (e) => {
        e.stopPropagation();
        options.classList.toggle("hidden");
        options.classList.toggle("flex");
    });
}