// Store our API endpoint as queryUrl.
let importFile =
  "/data/Mindex_DMIRS_001_WA_GDA2020_Public.geojson";

// Perform a GET request to the query URL/
d3.json(importFile).then(function (data) {
  // Once we get a response, send the data.features object to the createFeatures function.
  createFeatures(data.features);

  function createFeatures(mineData) {
    // Define a function that we want to run once for each feature in the features array.
    // Give each feature a popup that describes the place, location and time of the earthquake.
    function onEachFeature(feature, layer) {
      layer.bindPopup(`<h3>${feature.properties.short_name}</h3> 
    Commodity: ${feature.properties.target_com} <br /> 
    URL: ${feature.properties.web_link} <br /> 
    DB Site Code: ${new Date(feature.properties.site_code)}</h4>`);
    }

    // Define function to create the circle radius based on the magnitude
    // function radiusSize(magnitude) {
    //   return magnitude * 50000;
    // }

    // Define function to set the circle color based on the depth of epicentre, mines with greater depth from surface (elevation) should appear darker in colour
    function circleColor(targetCom) {
      if (targetCom = "GOLD") {
        return "rgb(255,236,34)"; 
      } else if (targetCom = "NICKEL") {
        return "rgb(255,143,69)"; 
      } else if (targetCom = "IRON ORE") {
        return "rgb(145,19,29)";
      } else if (targetCom = "COPPER - LEAD - ZINC") {
        return "rgb(84,145,135)";
      } else if (targetCom = "TIN - TANTALUM - LITHIUM") {
        return "rgb(145,140,139)";
      } 
    }

    // Create a GeoJSON layer that contains the features array on the mineData object.
    // Run the onEachFeature function once for each piece of data in the array.

    let mines = L.geoJSON(mineData, {
      pointToLayer: function (mineData, latlng) {
        return L.circle(latlng, {
          radius: 5000,
          fillColor: circleColor(mineData.properties.target_com),
          fillOpacity: 0.65,
          stroke: false,
        });
      },
      onEachFeature: onEachFeature,
    });

    // Send our mines layer to the createMap function/
    createMap(mines);
  }

  function createMap(mines) {
    // Create the base layers.
    let street = L.tileLayer(
      "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }
    );

    let sattelite = L.tileLayer(
      'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      {
        attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
      }
    );

    // Create a baseMaps object.
    let baseMaps = {
      "Street": street,
      "Sattelite": sattelite,
    };

    // Create an overlay object to hold our overlay.
    let overlayMaps = {
      "Mine Sites": mines,
      
    };

    // Create our map, giving it the streetmap and mines layers to display on load.
    let myMap = L.map("map", {
      center: [-24, 120],
      zoom: 5,
      layers: [sattelite, mines],
    });

    // Create a layer control.
    L.control
      .layers(baseMaps, overlayMaps, {
        collapsed: false,
      })
      .addTo(myMap);

    // Set up the legend.

    // let legend = L.control({ position: "bottomright" });
    // legend.onAdd = function () {
    //   let div = L.DomUtil.create("div", "info legend"),
    //     legendScale = ["-10", "10", "30", "50", "70", "90"],

    //     labels = ["rgb(252,79,76)", 
    //               "rgb(214,64,61)", 
    //               "rgb(176,49,46)", 
    //               "rgb(138,34,31)",
    //               "rgb(100,19,16)",
    //               "rgb(62,0,0)",
    //             ];

    //   for (let i = 0; i < legendScale.length; i++) {
    //     div.innerHTML +=
    //     // "<h1> Depth from Surface </h1>"
    //       "<i style='background:" +

    //       labels[i] + "'></i> " + legendScale[i] +
    //       (legendScale[i + 1] ? "&ndash;" + legendScale[i + 1] + "<br>" : "+");
    //   }
    //   return div;

    // };
    // legend.addTo(myMap);
  }
});


