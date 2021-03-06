
if (!(location.hostname === "localhost" || location.hostname === "127.0.0.1") && location.protocol != 'https:')
{
 location.href = 'https:' + window.location.href.substring(window.location.protocol.length);
}


Chart.defaults.global.defaultFontColor = '#E3EAEE';
Chart.defaults.global.defaultFontFamily = 'monospace';

loadingCsv = true;
planetData = null;
var bucketedData;

minYear = -1;
maxYear = -1;

Papa.parse(window.location.href + "/data/planets.csv", {
  download: true,
  header: true,
  dynamicTyping: true,
	complete: function(results) {
    planetData = results;
    initDataViz();
	}
});


function compareDate(a, b) {
  return a.PDiscYear - b.PDiscYear;
}

function initDataViz() {
  console.log("init dataset");

  planetData.data.sort(compareDate);
  minYear = planetData.data[0].PDiscYear;
  maxYear = planetData.data[planetData.data.length - 2].PDiscYear; //idk one is undefined at the end and I don't care enough
  console.log(minYear);
  console.log(maxYear);

  bucketedData = createPlanetBuckets();

  initTimeSlider(minYear, maxYear);

  //init charts
  //getCounts();
  initCountByYear(minYear, maxYear);
  initTotalByType();
  initSizeByYear();
  initRadiusByYear();
  initFeaturedPlanetSelector();

  initTotalCounts();
  //start timeline animation
  startTimeAnimation();
}

function getCounts() {
  counts = []
  currentCount = 0;
  currentYear = minYear;
  buckets = bucketedData;
  for (i = minYear; i <= maxYear; i++) {
    if (buckets.get(i) != null) {
      counts.push(buckets.get(i).length);
    } else {
      counts.push(0);
    }
  }
  return counts;
  // return counts;
  // counts = []
  // currentCount = 0;
  // currentYear = minYear;
  // for (i = 0; i < planetData.data.length; i++) {
  //   if (planetData.data[i].PDiscYear > currentYear) {
  //     for (j = currentYear; j < planetData.data[i].PDiscYear - 1; j++) {
  //       counts.push(0);
  //     }
  //     counts.push(currentCount);
  //     currentYear = planetData.data[i].PDiscYear;
  //     currentCount = 0;
  //   }
  //   if (currentYear == 2018) {
  //     console.log("2018 planets being added - " + counts.length);
  //   }
  //   currentCount++;
  // }
  // counts.push(currentCount);
  // console.log(counts[0]);
  // return counts;
}

function getTotalCounts() {
  counts = []
  currentCount = 0;
  currentYear = minYear;
  for (i = 0; i < planetData.data.length; i++) {
    if (planetData.data[i].PDiscYear > currentYear) {
      for (j = currentYear; j < planetData.data[i].PDiscYear; j++) {
        counts.push(currentCount);
      }
      currentYear = planetData.data[i].PDiscYear;
    }
    currentCount++;
  }
  counts.push(currentCount);
  console.log(counts[0]);
  return counts;
}

function getPlanetTypesByYear() {
  types = []
  currentData = [0, 0, 0, 0];
  currentYear = minYear;
  for (i = 0; i < planetData.data.length; i++) {
    planet = planetData.data[i];
    if (planet.PDiscYear > currentYear) {
      currentYear++;
      types.push(currentData);
      currentData = currentData.slice(0);
      if (currentYear > maxYear) {
        break;
      }
    }
    if (planet.PMassClass == "Neptunian") {
        currentData[0]++;
    } else if (planet.PMassClass == "Terran") {
        currentData[1]++;
    } else if (planet.PMassClass == "Superterran") {
      currentData[2]++;
    } else if (planet.PMassClass == "Jovian") {
      currentData[3]++;
    }
  }
  types.push(currentData);
  return types;
}

function getAverageSizeByYear() {
  sizes = [];
  // currentAvg = 0;
  // currentCount = 0;
  // currentYear = minYear;

  for (i = minYear; i <= maxYear; i++) {
    currentYearData = bucketedData.get(i);
    if (currentYearData != null) {

      avg = 0;
      realCount = 0;
      for (j = 0; j < currentYearData.length; j++) {
        if (currentYearData[j].PMass != null) {
          avg += currentYearData[j].PMass;
          realCount++;
        }
      }

      sizes.push(avg / realCount);
    } else {
      sizes.push(null);
    }
  }
  return sizes;

  // for (i = 0; i < planetData.data.length; i++) {
  //   planet = planetData.data[i];
  //   if (planet.PDiscYear > currentYear) {
  //     for (j = currentYear; j < planet.PDiscYear - 1; j++) {
  //       sizes.push(null);
  //     }
  //     avg = currentAvg / currentCount;
  //     sizes.push(avg);
  //     currentAvg = 0;
  //     currentCount = 0;
  //     currentYear = planet.PDiscYear;
  //   }

  //   currentAvg += planet.PMass;
  //   currentCount++;
  // }
  // sizes.push(currentAvg / currentCount);
  // console.log("sizes length " + sizes.length);
  // return sizes;
}

function getAverageRadiusByYear() {
  // sizes = [];
  // currentAvg = 0;
  // currentCount = 0;
  // currentYear = minYear;

  // for (i = 0; i < planetData.data.length; i++) {
  //   planet = planetData.data[i];
  //   if (planet.PDiscYear > currentYear) {
  //     for (j = currentYear; j < planet.PDiscYear - 1; j++) {
  //       sizes.push(null);
  //     }
  //     avg = currentAvg / currentCount;
  //     sizes.push(avg);
  //     currentAvg = 0;
  //     currentCount = 0;
  //     currentYear = planet.PDiscYear;
  //   }

  //   currentAvg += planet.Pradius;
  //   currentCount++;
  // }
  // sizes.push(currentAvg / currentCount);
  // console.log("sizes length " + sizes.length);
  // return sizes;
  sizes = [];
  // currentAvg = 0;
  // currentCount = 0;
  // currentYear = minYear;

  for (i = minYear; i <= maxYear; i++) {
    currentYearData = bucketedData.get(i);
    if (currentYearData != null) {

      avg = 0;
      realCount = 0;
      for (j = 0; j < currentYearData.length; j++) {
        if (currentYearData[j].Pradius != null) {
          avg += currentYearData[j].Pradius;
          realCount++;
        } 
      }

      sizes.push(avg / realCount);
    } else {
      sizes.push(null);
    }
  }
  return sizes;
}

function createPlanetBuckets() {
  currentList = [];
  currentAvg = 0;
  currentCount = 0;
  currentYear = minYear;

  buckets = new Map();

  for (i = 0; i < planetData.data.length; i++) {
    planet = planetData.data[i];
    if (planet.PDiscYear > currentYear) {
      buckets.set(currentYear, currentList);
      currentYear = planet.PDiscYear;
      currentList = []
    }
    currentList.push(planet);
  }
  buckets.set(currentYear, currentList);
  return buckets;
}

function getPlanetBuckets() {
  return bucketedData;
}