
let map = L.map('map').setView([42.361145, -71.057083], 12);
let lat, long;


//SHOW MAP
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: 'Map data © OpenStreetMap contributors'
}).addTo(map);
map.scrollWheelZoom.disable();
L.geoJSON(data).addTo(map);


//HOVER FUNCTIONS
function onEachFeature(feature, layer) {
    if (feature.properties && feature.properties.Callsign) {
      var popupContent = "<strong>Callsign: </strong>" + feature.properties.Callsign + "<br>" +
                         "<strong>Licensee: </strong>" + feature.properties.Licensee + "<br>" +
                         "<strong>Location: </strong>" + feature.properties.LocAdd;
      layer.on('click', function(e) {e.target.bindPopup(popupContent).openPopup();});
    }
}

L.geoJSON(data, {onEachFeature: onEachFeature}).addTo(map);


//USER INPUT
function findTower(){
    lat = document.getElementById("lat").value;
    long = document.getElementById("long").value;
    console.log(lat);
    console.log(long);
    map.setView([lat, long], 12);
}


function findFrequency() {
    const userCallsign = document.getElementById('callsign').value.trim().toUpperCase();
    const matchingFrequencies = fdata.filter(record => record["Call Sign"] === userCallsign);
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = ''; // Clear previous results

    if (matchingFrequencies.length > 0) {
        resultsDiv.innerHTML += `Call Sign: ${userCallsign}<br><br>`;
        matchingFrequencies.forEach(record => {
            resultsDiv.innerHTML += `Frequency: ${record["Frequency Assigned"]}<br>`;
        });
    } else {resultsDiv.innerHTML = 'No frequencies found for this callsign.';}
}






