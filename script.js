

// setting the div as the map and setting the latitude and longitude and the zoom level
var map = L.map('map').setView([39.61, -105.02], 19);




// BaseMaps importing
var osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

var osmHot = L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

var openTopoMap = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: 'Map data: © OpenStreetMap contributors, SRTM | Map style: © OpenTopoMap (CC-BY-SA)'
});
// -----------------basemaps importing done
// ---------------Marker Icon

// click to get a marker
const markerGroup = L.layerGroup().addTo(map); 
// creating a group which will keep all the points as a basket



// -----------count of the points
function updateMarkerCount() {
    let count = markerGroup.getLayers().length;
    document.getElementById('markerCount').innerText = `Points: ${count}`;
}

// what happens when I click on the map a marker is added and If I right click on the marker the marker disappears and the 
// length of the count is reduced
function markerOnClick(e){
    const marker = L.marker(e.latlng);   

    // Remove marker on right-click
    marker.on('contextmenu', function () {
        markerGroup.removeLayer(marker);
        // or simply: marker.remove();
        updateMarkerCount()
    });

    marker.addTo(markerGroup);
    updateMarkerCount()
};


// the map tracks the mouse location wherever you put it constantly locating it
function mouseLoc(e){
    var latitude = e.latlng.lat.toFixed(2)
    var longitude = e.latlng.lng.toFixed(2)
    console.log([latitude,longitude])
    return {latitude,longitude}
}



map.on('mousemove',mouseLoc)


map.on('click',markerOnClick)





var basemaps = {
    'OpenStreetMap': osm,
    'OpenStreetMap_Hot':osmHot,
    'OpenTopo':openTopoMap
}
var points = {
    'points' : markerGroup
}

L.control.layers(basemaps,points).addTo(map)



function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(map);
}

map.on('click', onMapClick);