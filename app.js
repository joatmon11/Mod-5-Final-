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


function updateFilterTitle() {
    if (!filterTitle || !searchBox) return;  //  if either element is missing, do nothing
    const text = searchBox.value.trim();    //  text = the string in the search box, with whitespace removed from both ends
    const base = '<b>Search results:</b>';  //  base = the default title text, which is "Search results:" in bold
    filterTitle.innerHTML = text ? base + ' ' + text : base;  //  if there is text, add it to the base, otherwise just show the base
}

// initialize to the base text on load
updateFilterTitle();

// update only when the search logo is clicked
if (searchLogo) {
    searchLogo.addEventListener('click', function (e) {
        e.preventDefault();
        updateFilterTitle();
    });
}

// update when Enter key is pressed in the search box
if (searchBox) {
    searchBox.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            updateFilterTitle();
        }
    });
}

// allow clicking the plot text to expand it over the entire card and toggle a selected state so hidden paragraph becomes visible
document.addEventListener('click', function (e) {
    const target = e.target;
    if (target.classList.contains('movie__plot')) {
        const info = target.closest('.movie__info');
        if (info) {
            info.classList.toggle('expanded');
        }
        target.classList.toggle('selected');
    }
});

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
}

//  update the range and display values whenever either input changes
inputElements.forEach((element) => {
    element.addEventListener("input", validateRange);
});

//  initialize the range display on page load
validateRange();





