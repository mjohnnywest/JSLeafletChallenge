// Create the 'basemap' tile layer that will be the background of our map.
let myMap = L.map("map", {
  center: [38.8, -98.5],
  zoom: 5
}); //Creates a blank "map", zoom and coordinates


// OPTIONAL: Step 2
// Create the 'street' tile layer as a second background of the map


// Create the map object with center and zoom options.


// Then add the 'basemap' tile layer to the map.

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap); //actually layers on the continents countries, and gives a source

// OPTIONAL: Step 2
// Create the layer groups, base maps, and overlays for our two sets of data, earthquakes and tectonic_plates.
// Add a control to the map that will allow the user to change which layers are visible.


// Make a request that retrieves the earthquake geoJSON data.

d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(function (data) {
  features = data.features
  
  // creating a new array of objects that are more useful
  let featuresArray = []
  console.log(features)
  
  //creating a new object of only items I need
  for (let i = 0; i < features.length; i++){
    coordinates = features[i].geometry.coordinates.slice(0,2)
    magnitude = features[i].properties.mag 
    depth = features[i].geometry.coordinates[2]
    let featureObject = {coordinates, magnitude, depth}
    featuresArray.push(featureObject)
  }
  console.log(featuresArray)
  for (let i = 0; i< featuresArray.length; i++){
    let feature = featuresArray[i] // does not work with  . notaton. no idea why
    // latutude and longitude are flipped for some reason
    let latLong = [feature.coordinates[1],feature.coordinates[0]]
    
    let deep = feature.depth;
    let fColor = ""; 
    if (deep <= 10) {fColor = "#90EF90"}
    else if (deep <= 40) { fColor = "#FAB733"}
    else if (deep <= 80) {fColor = "#FFCCCB"}
    else {fColor = "#FC6C85"}

    L.circle(latLong,{
      radius: 5000 * feature.magnitude, 
      color: "black",
      fillColor: fColor,
      fillOpacity: .5
    }).bindTooltip(`Depth: ${deep} <br> Location: ${latLong} <br> Magnitude: ${feature.magnitude}`)
    .addTo(myMap)

    }
  

  // This function returns the style data for each of the earthquakes we plot on
  // the map. Pass the magnitude and depth of the earthquake into two separate functions
  // to calculate the color and radius.
  function styleInfo(feature) {

  }

  // This function determines the color of the marker based on the depth of the earthquake.
  function getColor(depth) {

  }

  // This function determines the radius of the earthquake marker based on its magnitude.
  function getRadius(magnitude) {

  }

  // Add a GeoJSON layer to the map once the file is loaded.
  L.geoJson(data, {
    // Turn each feature into a circleMarker on the map.
    pointToLayer: function (feature, latlng) {

    },
    // Set the style for each circleMarker using our styleInfo function.
    style: styleInfo,
    // Create a popup for each marker to display the magnitude and location of the earthquake after the marker has been created and styled
    onEachFeature: function (feature, layer) {

    }
  // OPTIONAL: Step 2
  // Add the data to the earthquake layer instead of directly to the map.
  }).addTo(map);

  // Create a legend control object.
  let legend = L.control({
    position: "bottomright"
  });

  // Then add all the details for the legend
  legend.onAdd = function () {
    let div = L.DomUtil.create("div", "info legend");

    // Initialize depth intervals and colors for the legend


    // Loop through our depth intervals to generate a label with a colored square for each interval.


    return div;
  };

  // Finally, add the legend to the map.


  // OPTIONAL: Step 2
  // Make a request to get our Tectonic Plate geoJSON data.
  d3.json("https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json").then(function (plate_data) {
    // Save the geoJSON data, along with style information, to the tectonic_plates layer.


    // Then add the tectonic_plates layer to the map.

  });
});
