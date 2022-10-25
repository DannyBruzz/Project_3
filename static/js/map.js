// An array of cities and their locations
let cities = [
  {
    name: "Perth",
    location: [-31.943447067351986, 115.737218695386]
  },
  {
    name: "Albany",
    location: [-35.06420847839147, 117.78005221796197]
  },
  {
    name: "Margaret River",
    location: [-33.961986936847815, 115.11503589663192]
  },
  {
    name: "Kalgoorie",
    location: [-30.774630677675194, 121.51314901048652]
  }
];

// An array that will store the created cityMarkers
let cityMarkers = [];

for (let i = 0; i < cities.length; i++) {
  // loop through the cities array, create a new marker, and push it to the cityMarkers array
  cityMarkers.push(
    L.marker(cities[i].location).bindPopup("<h4>" + cities[i].name + "</h4>")
  );
}

// Add all the cityMarkers to a new layer group.
// Now, we can handle them as one group instead of referencing each one individually.
let cityLayer = L.layerGroup(cityMarkers);

// Define variables for our tile layers.
let street = L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
	maxZoom: 19,
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Tiles style by <a href="https://www.hotosm.org/" target="_blank">Humanitarian OpenStreetMap Team</a> hosted by <a href="https://openstreetmap.fr/" target="_blank">OpenStreetMap France</a>'
});

let sattelite = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
});

// Only one base layer can be shown at a time.
let baseMaps = {
  Street: street,
  Sattelite: sattelite
};

// Overlays that can be toggled on or off
let overlayMaps = {
  Cities: cityLayer
};


// Create a map object, and set the default layers.
let myMap = L.map("map", {
  center: [-24, 120],
  zoom: 5,
  layers: [street, cityLayer]
});

// Pass our map layers into our layer control.
// Add the layer control to the map.
L.control.layers(baseMaps, overlayMaps, {
  collapsed: false
    }).addTo(myMap);

