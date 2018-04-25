var slider = document.getElementById("timeSlider");
var animTimeout;
var animationSpeed = 25;

var currentYear = 1988;

var totalCounts;

slider.oninput = function() {
    updateSlider();
}

function initTotalCounts() {
    totalCounts = getTotalCounts();
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
        document.getElementById("disctotal").textContent = totalCounts[val - minYear];
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