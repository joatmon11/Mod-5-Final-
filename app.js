//  SEARCH BAR AND RANGE SLIDER JS

//  SEACH BAR 
let minValue = document.getElementById("min-value");
let maxValue = document.getElementById("max-value");

const rangeFill = document.querySelector(".range__fill");

const inputElements = document.querySelectorAll("input");

// sync search input into the filter title (only when search logo is clicked)
const searchBox = document.querySelector('.search__box');
const filterTitle = document.querySelector('.filter__title');
const searchLogo = document.querySelector('.search__logo');

let allMovies = []; // Store all fetched movies for filtering

function updateFilterTitle() {
    if (!filterTitle || !searchBox) return;  //  if either element is missing, do nothing
    const text = searchBox.value.trim();    //  text = the string in the search box, with whitespace removed from both ends
    const base = '<b>Search results:</b>';  //  base = the default title text, which is "Search results:" in bold
    let title = text ? base + ' ' + text : base;  //  if there is text, add it to the base, otherwise just show the base
    const minYear = parseInt(inputElements[1].value);
    const maxYear = parseInt(inputElements[2].value);
    title += ` (years: ${minYear}-${maxYear})`;
    filterTitle.innerHTML = title;
}

// initialize to the base text on load
updateFilterTitle();

// update only when the search logo is clicked
if (searchLogo) {
    searchLogo.addEventListener('click', function (e) {
        e.preventDefault();
        fetchMovies();
    });
}

// update when Enter key is pressed in the search box
if (searchBox) {
    searchBox.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            fetchMovies();
        }
    });
}

//  SLIDER 

//  function to validate the range
function validateRange() {
    const minInput = inputElements[1];
    const maxInput = inputElements[2];
    let minYear = parseInt(minInput.value);
    let maxYear = parseInt(maxInput.value);

    // if the min year is greater than the max year, push the min year up to the max year
    if (minYear > maxYear) {
        minYear = maxYear;
        minInput.value = maxYear;
    }

    //  Update the displayed min / max values
    minValue.textContent = minYear;
    maxValue.textContent = maxYear;

    // calculate percentages relative to the input's actual min/max attributes
    const range = parseInt(minInput.max) - parseInt(minInput.min);
    const low = Math.min(minYear, maxYear);
    const high = Math.max(minYear, maxYear);

    const lowPct = ((low - parseInt(minInput.min)) / range) * 100;
    const highPct = ((high - parseInt(minInput.min)) / range) * 100;

    rangeFill.style.left = lowPct + "%";
    rangeFill.style.width = (highPct - lowPct) + "%";

    updateFilterTitle();
    if (allMovies.length > 0) {
        displayFilteredMovies();
    }
}

//  update the range and display values whenever either input changes
inputElements.forEach((element) => {
    element.addEventListener("input", validateRange);
});

//  initialize the range display on page load
validateRange();

function displayFilteredMovies() {
    const minYear = parseInt(inputElements[1].value);
    const maxYear = parseInt(inputElements[2].value);
    const filtered = allMovies.filter(movie => {
        const year = parseInt(movie.Year);
        return year >= minYear && year <= maxYear;
    });
    const movieWrapper = document.querySelector('.movie__wrapper');
    movieWrapper.innerHTML = '';
    filtered.forEach(movie => {
        movieWrapper.innerHTML += displayMovies(movie);
    });
}

//  GET MOVIES FROM JSON FILE AND DISPLAY THEM


async function fetchMovies() {
    try {
         const keyword = document.getElementById('keyword').value.toLowerCase().trim();
         if (!keyword) {
             return alert("Please enter a search keyword.");
             return
         }

        const movies = await fetch(`https://www.omdbapi.com/?apikey=e3a5001&s=${keyword}`);

        if (!movies.ok) {
            throw new Error("Could not find movies");
        }

        const movieData = await movies.json();
        console.log(movieData);

        allMovies = movieData.Search || [];
        updateFilterTitle();
        displayFilteredMovies();

    } catch (error) {
        console.error(error);
    }
}

function displayMovies(movieData) {
    return `<div class="movie__card">
            <div class="movie__poster">
            <img class="poster__img" src="${movieData.Poster}" alt="Movie Poster">
            </div>
            <div class="movie__info">
              <h3 class="movie__title">${movieData.Title}</h3>
              <p class="movie__year">${movieData.Year}</p>
              <a href="https://www.imdb.com/title/${movieData.imdbID}" target="_blank" class="movie__id">imdbID: ${movieData.imdbID}</a>
              <div class="movie__type">Type: ${movieData.Type}
              </div>`;
}