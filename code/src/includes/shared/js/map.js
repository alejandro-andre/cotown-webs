function createMap(div, lat, lon, zoom) {

  // Crea el mapa
  var map = L.map(div).setView([lat, lon], zoom);

  // Openstreetmap
  L.tileLayer('{{globals.maps}}', { attribution: '{{globals.attribution|safe}}', maxZoom: 18, }).addTo(map);

  // Desactivar zoom con la rueda del ratón durante el scroll
  map.scrollWheelZoom.disable();
  map.on('blur', function () {
    map.scrollWheelZoom.disable();
  });  

  // Reactivar zoom con la rueda del ratón cuando no se hace scroll
  map.on('focus', function () {
    map.scrollWheelZoom.enable();
  });

  // Return
  return map;
}

function putMarker(map, lat, lon, popup) {

  // Custom icon
  var LeafIcon = L.Icon.extend({
    options: {
      iconSize:     [48, 55],
      iconAnchor:   [24, 55],
      popupAnchor:  [2, -50]
    }
  });

  // Crea el marcador
  var icon = new LeafIcon({ iconUrl: '{{root}}/assets/img/icono__otros_ubicacion_mapa.svg' })
  var marker = L.marker([lat, lon], {icon: icon}).addTo(map);
  if (popup) {
    marker.bindPopup(popup); 
  }

  // Return
  return marker;
}