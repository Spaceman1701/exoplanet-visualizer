var countByYearCtx = document.getElementById("countByYear").getContext('2d');
var countByYearChart;
var countByYearData;

function initCountByYear(minYear, maxYear) {
    countByYearData = getCounts();
    countByYearChart =new Chart(countByYearCtx, {
        type: 'bar',
        data: {
            labels: createCountsLabels(minYear),
            datasets: [{
                label: '# planets',
                data: createCountsData(minYear),
                backgroundColor: 'rgba(134,159,152, 1)',
                borderColor: 'rgba(134,159,152, 1)',
                hoverBackgroundColor: 'rgba(230, 236, 235, 0.75)',
                hoverBorderColor: 'rgba(230, 236, 235, 0.75)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true
                    }
                }]
            },
            responsive:true,
            maintainAspectRatio: false
        }
        
    });
}


function createCountsData(toYear) {
    return countByYearData.slice(0, toYear - minYear + 1);
}

function createCountsLabels(toYear) {
    labels = []
    for (i = minYear; i <= toYear; i++) {
        labels.push(i);
    }
    return labels; 
}

function countByYearUpdateYear(newYear) {
    countByYearChart.data.datasets[0].data = createCountsData(newYear);
    countByYearChart.data.labels = createCountsLabels(newYear);
    countByYearChart.update();
}