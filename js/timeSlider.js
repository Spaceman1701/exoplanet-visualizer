var slider = document.getElementById("timeSlider");
var animTimeout;
var animationSpeed = 15;

var currentYear = 1988;

// Update the current slider value (each time you drag the slider handle)
slider.oninput = function() {
    updateSlider();
}

function updateSlider() {
    val = Math.floor(slider.value / 1000);
    if (val != currentYear) {
        console.log(slider.value);
        totalByTypeUpdateYear(val);
        countByYearUpdateYear(val);
        sizesByYearUpdateYear(val);
        radiusByYearUpdateYear(val);
        updateFeaturedPlanet(val);
    
        document.getElementById("date").textContent = val;
        currentYear = val;
    }
}


function initTimeSlider(min, max) {
    slider.min = min * 1000;
    slider.max = max * 1000;
}


function autoUpdateDate() {
    if (slider.value < maxYear * 1000) {
        slider.value = parseInt(slider.value) + 50;
        updateSlider();
        setTimeout(autoUpdateDate, animationSpeed);
    } else {
        window.clearTimeout(animTimeout);
    }
}

function startTimeAnimation() {
    animTimeout = setTimeout(autoUpdateDate, animationSpeed);
}