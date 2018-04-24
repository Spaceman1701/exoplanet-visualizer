var radiusByYearCtx = document.getElementById("radiusByYear").getContext('2d');
var radiusByYearChart;

var radiusByYearData;



function initRadiusByYear() {
    console.log("init radiusByYear");
    radiusByYearData = getAverageRadiusByYear();
    radiusByYearChart = new Chart(radiusByYearCtx, {
        type: 'line',
        data: {
            labels: createRadiusLabels(maxYear),
            datasets: [{
                backgroundColor: "#91558f",
                label: "Average Planet Radius (Earth Radii)",
                data: createRadiusByYearData(minYear),
                fill: false,
                spanGaps: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
        }
    });
}

function createRadiusLabels(toYear) {
    labels = []
    for (i = minYear; i <= toYear; i++) {
        labels.push(i);
    }
    return labels; 
}

function createRadiusByYearData(toYear) {
    return radiusByYearData.slice(0, toYear - minYear + 1);
}

function radiusByYearUpdateYear(newYear) {
    radiusByYearChart.data.datasets[0].data = createRadiusByYearData(newYear);
    radiusByYearChart.update();
}

