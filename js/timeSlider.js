
function getSliderRangeMin() {
    return 1;
}

function getSliderRangeMax() {
    return 55;
}

var slider = document.getElementById("timeSlider");

// Update the current slider value (each time you drag the slider handle)
slider.oninput = function() {
    console.log(this.value);
}
