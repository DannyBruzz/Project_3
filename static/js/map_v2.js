// Create the tile layer that will be the background of our map.
let streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

// Initialise all the LayerGroups that we'll use.
let layers = {
  GOLD: new L.LayerGroup(),
  NICKEL: new L.LayerGroup(),
  IRON: new L.LayerGroup(),
  COPPER_LEAD_ZINC: new L.LayerGroup(),
  TIN_TANTALUM_LITHIUM: new L.LayerGroup()
};

// Create the map with our layers.
let map = L.map("map-id", {
  center: [-24, 120],
  zoom: 5,
  layers: [
    layers.GOLD,
    layers.NICKEL,
    layers.IRON,
    layers.COPPER_LEAD_ZINC,
    layers.TIN_TANTALUM_LITHIUM
  ]
});

// Add our "streetmap" tile layer to the map.
streetmap.addTo(map);

// Create an overlays object to add to the layer control.
let overlays = {
  "Gold": layers.GOLD,
  "Nickel": layers.NICKEL,
  "Iron Ore": layers.IRON,
  "Copper - Lead - Zinc": layers.COPPER_LEAD_ZINC,
  "Tin - Tantalum - Lithium": layers.TIN_TANTALUM_LITHIUM
};

// Create a control for our layers, and add our overlays to it.
L.control.layers(null, overlays).addTo(map);

// Create a legend to display information about our map.
let info = L.control({
  position: "bottomright"
});

// When the layer control is added, insert a div with the class of "legend".
info.onAdd = function() {
  let div = L.DomUtil.create("div", "legend");
  return div;
};
// Add the info legend to the map.
info.addTo(map);

// Initialise an object that contains icons for each layer group.
let icons = {
  GOLD: L.ExtraMarkers.icon({
    icon: "ion-settings",
    iconColor: "white",
    markerColor: "yellow",
    shape: "star"
  }),
  NICKEL: L.ExtraMarkers.icon({
    icon: "ion-android-bicycle",
    iconColor: "white",
    markerColor: "red",
    shape: "circle"
  }),
  IRON: L.ExtraMarkers.icon({
    icon: "ion-minus-circled",
    iconColor: "white",
    markerColor: "blue-dark",
    shape: "penta"
  }),
  COPPER_LEAD_ZINC: L.ExtraMarkers.icon({
    icon: "ion-android-bicycle",
    iconColor: "white",
    markerColor: "orange",
    shape: "circle"
  }),
  TIN_TANTALUM_LITHIUM: L.ExtraMarkers.icon({
    icon: "ion-android-bicycle",
    iconColor: "white",
    markerColor: "green",
    shape: "circle"
  })
};

// Perform an API call
d3.json("Resources/Mindex_DMIRS_001_WA_GDA2020_Public.geojson.json").then(function(mineData) {
    // Once we get a response, send the data.features object to the createFeatures function.
    createFeatures(mineData.features);

    function createFeatures(mineDataPop) {
        // Define a function that we want to run once for each feature in the features array.
        // Give each feature a popup that describes the place, location and time of the earthquake.
        function onEachFeature(feature, layer) {
          layer.bindPopup(`<h3>${feature.properties.short_name}</h3> 
        Commodity: ${feature.properties.target_com} <br /> 
        URL: ${feature.properties.web_link} <br /> 
        Site Code: ${new Date(feature.properties.site_code)}</h4>`);
        }


  // When the first API call completes, perform another call to the Citi Bike station status endpoint.
//   d3.json("https://gbfs.citibikenyc.com/gbfs/en/station_status.json").then(function(statusRes) {
//     let updatedAt = infoRes.last_updated;
//     let stationStatus = statusRes.data.stations;
//     let stationInfo = infoRes.data.stations;

    // Create an object to keep the number of markers in each layer.
    // let stationCount = {
    //   COMING_SOON: 0,
    //   EMPTY: 0,
    //   LOW: 0,
    //   NORMAL: 0,
    //   OUT_OF_ORDER: 0
    // };

    // Initialise stationStatusCode, which will be used as a key to access the appropriate layers, icons, and station count for the layer group.
    let stationStatusCode;

    // Loop through the stations (they're the same size and have partially matching data).
    for (let i = 0; i < stationInfo.length; i++) {

      // Create a new station object with properties of both station objects.
      let station = Object.assign({}, stationInfo[i], stationStatus[i]);
      // If a station is listed but not installed, it's coming soon.
      if (!station.is_installed) {
        stationStatusCode = "COMING_SOON";
      }
      // If a station has no available bikes, it's empty.
      else if (!station.num_bikes_available) {
        stationStatusCode = "EMPTY";
      }
      // If a station is installed but isn't renting, it's out of order.
      else if (station.is_installed && !station.is_renting) {
        stationStatusCode = "OUT_OF_ORDER";
      }
      // If a station has less than five bikes, it's status is low.
      else if (station.num_bikes_available < 5) {
        stationStatusCode = "LOW";
      }
      // Otherwise, the station is normal.
      else {
        stationStatusCode = "NORMAL";
      }

      // Update the station count.
      stationCount[stationStatusCode]++;
      // Create a new marker with the appropriate icon and coordinates.
      let newMarker = L.marker([station.lat, station.lon], {
        icon: icons[stationStatusCode]
      });

      // Add the new marker to the appropriate layer.
      newMarker.addTo(layers[stationStatusCode]);

      // Bind a popup to the marker that will  display on being clicked. This will be rendered as HTML.
      newMarker.bindPopup(station.name + "<br> Capacity: " + station.capacity + "<br>" + station.num_bikes_available + " Bikes Available");
    }

    // Call the updateLegend function, which will update the legend!
    updateLegend(updatedAt, stationCount);
  });
});

// Update the legend's innerHTML with the last updated time and station count.
function updateLegend(time, stationCount) {
  document.querySelector(".legend").innerHTML = [
    "<p>Updated: " + moment.unix(time).format("h:mm:ss A") + "</p>",
    "<p class='out-of-order'>Out of Order Stations: " + stationCount.OUT_OF_ORDER + "</p>",
    "<p class='coming-soon'>Stations Coming Soon: " + stationCount.COMING_SOON + "</p>",
    "<p class='empty'>Empty Stations: " + stationCount.EMPTY + "</p>",
    "<p class='low'>Low Stations: " + stationCount.LOW + "</p>",
    "<p class='healthy'>Healthy Stations: " + stationCount.NORMAL + "</p>"
  ].join("");
}
