// Initialize map
const map = L.map('map').setView([22.5726, 88.3639], 12);

// Add OpenStreetMap basemap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// LayerGroup to store markers


// Add marker on left-click
map.on('click', function (e) {
    const marker = L.marker(e.latlng);

    // Remove marker on right-click
    marker.on('contextmenu', function () {
        markerGroup.removeLayer(marker);
        // or simply: marker.remove();
    });

    marker.addTo(markerGroup);
});