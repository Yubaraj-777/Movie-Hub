const movieDetail = document.querySelector("#movie-detail");
const params = new URLSearchParams(location.search)
const imdbID = params.get("id");

if (imdbID) {
    searchMovie(imdbID.trim())
}
console.log(imdbID)

async function searchMovie(imdbID) {



    let response = await fetch(`http://www.omdbapi.com/?apikey=6bb85901&i=${imdbID}&plot=full`);
    let data = await response.json()

    console.log(data);
    if (data.Response === "True") {
        displayMovie(data);
    }
    else {
        movieDetail.innerHTML = `
        <p class="text-red-400 text-center py-8">
            ${data.Error || "Unable to load movie details."}
        </p>
    `;
    }


}



function displayMovie(data) {
    movieDetail.innerHTML = `

 
        <div class="flex flex-col md:flex-row gap-6 md:gap-8">

            <!-- Movie Poster -->
            <div class="w-full md:w-72 shrink-0">
                <img
                    src="${data.Poster !== "N/A" ? data.Poster : ""}"
                    alt="${data.Title}"
                    class="w-full max-w-xs mx-auto md:mx-0 rounded-xl object-cover shadow-lg"
                >
            </div>

            <!-- Movie Information -->
            <div class="flex-1 min-w-0">

                <h2 class="text-2xl sm:text-3xl font-bold text-white">
                    ${data.Title}
                </h2>

                <!-- Movie Metadata -->
                <section class="flex flex-wrap items-center gap-3 mt-4">
                    <p class="text-zinc-400 text-sm">${data.Released}</p>

                    <p class="text-zinc-300 text-xs border border-zinc-700 rounded-md px-2 py-1">
                        ${data.Rated}
                    </p>

                    <p class="text-zinc-300 text-sm">${data.Runtime}</p>

                    <p class="text-zinc-400 text-sm">${data.Genre}</p>
                </section>

                <!-- IMDb Rating -->
                <div class="mt-4 inline-flex items-center gap-2 bg-zinc-800 px-4 py-2 rounded-lg">
                    <span class="text-amber-400 text-lg">★</span>
                    <span class="text-white font-bold">${data.imdbRating}</span>
                    <span class="text-zinc-400 text-sm">/ 10 IMDb</span>
                </div>

                <!-- Plot -->
                <div class="mt-6">
                    <h3 class="text-red-500 text-sm font-bold uppercase tracking-widest mb-3">
                        Plot Overview
                    </h3>

                    <p class="text-zinc-300 text-sm sm:text-base leading-7">
                        ${data.Plot}
                    </p>
                </div>

                <!-- Director and Writer -->
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-6 border-t border-zinc-800 pt-5">

                    <section>
                        <p class="text-zinc-500 text-xs uppercase tracking-wider mb-2">
                            Director
                        </p>
                        <p class="text-zinc-200 font-medium">
                            ${data.Director}
                        </p>
                    </section>

                    <section>
                        <p class="text-zinc-500 text-xs uppercase tracking-wider mb-2">
                            Writer
                        </p>
                        <p class="text-zinc-200 font-medium">
                            ${data.Writer}
                        </p>
                    </section>

                </div>

                <!-- Actors -->
                <div class="mt-6 border-t border-zinc-800 pt-5">
                    <p class="text-zinc-500 text-xs uppercase tracking-wider mb-2">
                        Cast & Actors
                    </p>

                    <p class="text-zinc-200 leading-6">
                        ${data.Actors}
                    </p>
                </div>

                <!-- Language and Country -->
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-6 border-t border-zinc-800 pt-5">

                    <section>
                        <p class="text-zinc-500 text-xs uppercase tracking-wider mb-2">
                            Language
                        </p>
                        <p class="text-zinc-200 font-medium">
                            ${data.Language}
                        </p>
                    </section>

                    <section>
                        <p class="text-zinc-500 text-xs uppercase tracking-wider mb-2">
                            Country
                        </p>
                        <p class="text-zinc-200 font-medium">
                            ${data.Country}
                        </p>
                    </section>

                </div>

                <!-- IMDb Button -->
                <a
                    href="https://www.imdb.com/title/${data.imdbID}"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="inline-flex items-center justify-center mt-8 bg-red-600 hover:bg-red-700 active:scale-95 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-200"
                >
                    View on IMDb ↗
                </a>

            </div>
        </div>
    `;
}
