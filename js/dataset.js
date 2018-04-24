

loadingCsv = true;
planetData = null;

minYear = -1;
maxYear = -1;

Papa.parse("/data/planets.csv", {
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

  initTimeSlider(minYear, maxYear);

  //init charts
  //getCounts();
  initCountByYear(minYear, maxYear);
  initTotalByType();


  //start timeline animation
  startTimeAnimation();
}

function getCounts() {
  counts = []
  currentCount = 0;
  currentYear = minYear;
  for (i = 0; i < planetData.data.length; i++) {
    if (planetData.data[i].PDiscYear > currentYear) {
      for (j = currentYear; j < planetData.data[i].PDiscYear; j++) {
        counts.push(currentCount);
      }
      currentYear = planetData.data[i].PDiscYear;
      // currentCount = 0;
    }
    if (currentYear == 2018) {
      console.log("2018 planets being added - " + counts.length);
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