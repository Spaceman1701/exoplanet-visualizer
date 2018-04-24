
var planetBuckets;

var featuredName = document.getElementById("featuedname");
var featuredMass = document.getElementById("featuedmass");
var featuredRadius = document.getElementById("featuedradius");
var featuredLocation = document.getElementById("featuredlocation");
var featuredHabitable = document.getElementById("featuredhabitable");
var featuredType = document.getElementById("featuredtype");
var featuredOrbit = document.getElementById("featuredorbit");
var featuredGravity = document.getElementById("featuredgravity");


function initFeaturedPlanetSelector() {
    planetBuckets = getPlanetBuckets();
}

function updateFeaturedPlanet(year) {
    console.log(planetBuckets);
    console.log(typeof year);
    planets = planetBuckets.get(parseInt(year));
    if (planets != null) {
        featured = planets[Math.floor(Math.random() * planets.length)];
        console.log(featured);
        updateFeaturePlanetUi(featured);
    } else {
        console.log(planets);
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
    featuredGravity.textContent = "Surface Gravity: " + gravity;
    habitaleString = habitbale == 1 ? "Yes" : "No";
    featuredHabitable.textContent = "Habitable: " + habitaleString;
}