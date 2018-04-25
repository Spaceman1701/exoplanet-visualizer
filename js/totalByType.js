var totalByTypeCtx = document.getElementById("totalByType").getContext('2d');
var totalByTypeChart;

var totalByTypeData;


function initTotalByType() {
    console.log("init doughnut chart");
    totalByTypeData = getPlanetTypesByYear()
    totalByTypeChart = new Chart(totalByTypeCtx, {
        type: 'doughnut',
        data: {
            datasets: [{
                data: totalByTypeData[0],
                backgroundColor: ['#2a82e0', '#af9866', '#77c471', '#c95d1e'],
                borderColor: 'rgba(0, 0, 0, 0)'
            }],
            // These labels appear in the legend and in the tooltips when hovering different arcs
            labels: ["Neptunian", "Terran", "Superterran", "Jovian"]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            title: {
                text: "Planet Types (Total)",
                display: true,
            }
        }
    });
}

function totalByTypeUpdateYear(newYear) {
    totalByTypeChart.data.datasets[0].data = totalByTypeData[newYear - minYear];
    totalByTypeChart.update();
}