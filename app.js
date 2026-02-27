let minValue = document.getElementById("min-value");
let maxValue = document.getElementById("max-value");

const rangeFill = document.querySelector(".range-fill");

const inputElements = document.querySelectorAll("input");

//  function to validate the range
function validateRange() {
    let minPrice = parseInt(inputElements[1].value);
    let maxPrice = parseInt(inputElements[2].value);

//  Swap values if minPrice is greater than maxPrice
    if (minPrice > maxPrice) {
        let tempValue = maxPrice;
        maxPrice = minPrice;
        minPrice = tempValue;
    }

//  Update the displayed min max values
    minValue.innerHTML = "$" + minPrice;
    maxValue.innerHTML = "$" + maxPrice;

    const minPercentage = ((minPrice - 10) / 490) * 100;
    const maxPercentage = ((maxPrice - 10) / 490) * 100;

    rangeFill.style.left = minPercentage + "%";
    rangeFill.style.width = maxPercentage - minPercentage + "%";
}

inputElements.forEach((element) => {
    element.addEventListener("input", validateRange);
});

validateRange();