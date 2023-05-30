function createMap(div, lat, lon, zoom) {
  var map = L.map(div).setView([lat, lon], zoom);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
    maxZoom: 18,
  }).addTo(map);
  return map;
}

function putMarker(map, lat, lon) {
  var LeafIcon = L.Icon.extend({
    options: {
      iconSize:     [38, 44],
      iconAnchor:   [38, 0],
      popupAnchor:  [0, -80]
    }
  });
  var icon = new LeafIcon({ iconUrl: '/assets/icons/marker.png' })
  var marker = L.marker([lat, lon], {icon: icon}).addTo(map);
  return marker;
}