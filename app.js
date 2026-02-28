let minValue = document.getElementById("min-value");
let maxValue = document.getElementById("max-value");

const rangeFill = document.querySelector(".range__fill");

const inputElements = document.querySelectorAll("input");

//  function to validate the range
function validateRange() {
    const minInput = inputElements[1];
    const maxInput = inputElements[2];
    let minPrice = parseInt(minInput.value);
    let maxPrice = parseInt(maxInput.value);

    // if the min price is greater than the max price, push the min price up to the max price
    if (minPrice > maxPrice) {
        minPrice = maxPrice;
        minInput.value = maxPrice;
    }

    //  Update the displayed min / max values
    minValue.textContent = "$" + minPrice;
    maxValue.textContent = "$" + maxPrice;

    // calculate percentages relative to the input's actual min/max attributes
    const range = parseInt(minInput.max) - parseInt(minInput.min);
    const low = Math.min(minPrice, maxPrice);
    const high = Math.max(minPrice, maxPrice);

    const lowPct = ((low - parseInt(minInput.min)) / range) * 100;
    const highPct = ((high - parseInt(minInput.min)) / range) * 100;

    rangeFill.style.left = lowPct + "%";
    rangeFill.style.width = (highPct - lowPct) + "%";
}

inputElements.forEach((element) => {
    element.addEventListener("input", validateRange);
});

validateRange();