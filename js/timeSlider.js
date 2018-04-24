var slider = document.getElementById("timeSlider");
var animTimeout;

// Update the current slider value (each time you drag the slider handle)
slider.oninput = function() {
    updateSlider();
}

function updateSlider() {
    console.log(slider.value);
    totalByTypeUpdateYear(slider.value);
    countByYearUpdateYear(slider.value);
}


function initTimeSlider(min, max) {
    slider.min = min;
    slider.max = max;
}


function autoUpdateDate() {
    if (slider.value < maxYear) {
        slider.value++;
        updateSlider();
        setTimeout(autoUpdateDate, 750);
    } else {
        window.clearTimeout(animTimeout);
    }
}

function startTimeAnimation() {
    // animTimeout = setTimeout(autoUpdateDate, 750);
}