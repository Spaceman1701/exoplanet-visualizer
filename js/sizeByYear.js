var sizeByYearCtx = document.getElementById("sizeByYear").getContext('2d');
var sizeByYearChart;

var sizeByYearData;



function initSizeByYear() {
    console.log("init size by year");
    sizeByYearData = getAverageSizeByYear();
    sizeByYearChart = new Chart(sizeByYearCtx, {
        type: 'line',
        data: {
            labels: createSizesLabels(maxYear),
            datasets: [{
                borderColor: "#d65c6e",
                label: "Mean Planet Mass (Earth Masses)",
                data: createSizesByYearData(minYear),
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

function createSizesLabels(toYear) {
    labels = []
    for (i = minYear; i <= toYear; i++) {
        labels.push(i);
    }
    return labels; 
}

function createSizesByYearData(toYear) {
    return sizeByYearData.slice(0, toYear - minYear + 1);
}

function sizesByYearUpdateYear(newYear) {
    sizeByYearChart.data.datasets[0].data = createSizesByYearData(newYear);
    sizeByYearChart.update();
}