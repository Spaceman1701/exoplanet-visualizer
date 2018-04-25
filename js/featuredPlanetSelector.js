
var planetBuckets;

var featuredName = document.getElementById("featuedname");
var featuredMass = document.getElementById("featuedmass");
var featuredRadius = document.getElementById("featuedradius");
var featuredLocation = document.getElementById("featuredlocation");
var featuredHabitable = document.getElementById("featuredhabitable");
var featuredType = document.getElementById("featuredtype");
var featuredOrbit = document.getElementById("featuredorbit");
var featuredGravity = document.getElementById("featuredgravity");

var planetImg = document.getElementById("planetimg");


var jovianImgs = ["images/jovian1.png", "images/jovian2.png"];
var neptuneImgs = ["images/neptunian1.png", "images/neptunian2.png"];
var supertImgs = ["images/superterran1.png", "images/superterran2.png"];
var terranImgs = ["images/terran1.png", "images/terran2.png"];


function initFeaturedPlanetSelector() {
    planetBuckets = getPlanetBuckets();
    updateFeaturedPlanet(minYear);
}

function updateFeaturedPlanet(year) {  
    planets = planetBuckets.get(parseInt(year));
    if (planets != null) {
        featured = planets[Math.floor(Math.random() * planets.length)];
        updateFeaturePlanetUi(featured);
    }
}

function updateFeaturePlanetUi(planet) {
    name = planet.Pname;
    planetLocation = planet.PZoneClass;
    habitbale = planet.Phabitable;
    type = planet.PMassClass;
    orbitDist = planet.PSemMajorAxis;
    radius = planet.Pradius;
    mass = planet.PMass;
    gravity = planet.PGravity;

    featuredName.textContent = "Name: " + name;
    featuredLocation.textContent = "Location: " + planetLocation;
    featuredType.textContent = "Type: " + type;
    featuredOrbit.textContent = "Orbit (AU): " + orbitDist;
    featuredRadius.textContent = "Radius (EU): " + radius;
    featuredMass.textContent = "Mass (EU): " + mass;
    featuredGravity.textContent = "Gravity: " + gravity;
    habitaleString = habitbale == 1 ? "Yes" : "No";
    featuredHabitable.textContent = "Habitable: " + habitaleString;

    //images
    if (type == "Jovian") {
        planetImg.src = jovianImgs[Math.floor(Math.random() * jovianImgs.length)];
    } else if (type == "Neptunian") {
        planetImg.src = neptuneImgs[Math.floor(Math.random() * neptuneImgs.length)];
    } else if (type == "Superterran") {
        planetImg.src = supertImgs[Math.floor(Math.random() * supertImgs.length)];
    } else if (type == "Terran") {
        planetImg.src = terranImgs[Math.floor(Math.random() * terranImgs.length)];
    }
}