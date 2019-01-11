var map;
var markerArray = [];
var infoWindow = new google.maps.InfoWindow();

function initializeMap() {
  var marker, i;
  var options_googlemaps = {
    minZoom: 4,
    zoom: 3,
    center: new google.maps.LatLng(37.4419, -122.1419),
    maxZoom: 18,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    streetViewControl: false,
    styles: myStyles,
  }

  map = new google.maps.Map(document.getElementById('google-maps'), options_googlemaps);

  var clusterMarkers = [];
  for (var i = 0; i < 50; i++) {
    var dataPhoto = data.photos[i];
    var latLng = new google.maps.LatLng(dataPhoto.latitude,
      dataPhoto.longitude);
    var marker = new google.maps.Marker({
      position: latLng
    });
    clusterMarkers.push(marker);
    google.maps.event.addListener(marker, 'mouseover', (function (marker) {
      return function () {
        infoWindow.setContent('<center><img src="assets/images/Hyatt.webp"></center><br> Hyatt Hotel');
        infoWindow.open(map, this);
      }
    })(marker));
  }

  var options_markerclusterer = {
    gridSize: 20,
    maxZoom: 18,
    //zoomOnClick: false,
    imagePath: 'assets/images/m'
  };



  var markerCluster = new MarkerClusterer(map, clusterMarkers, options_markerclusterer);

  google.maps.event.addListener(markerCluster, 'mouseover', function (cluster) {

    var markers = cluster.getMarkers();
    if (map.getZoom() <= markerCluster.getMaxZoom()) {
      infoWindow.setContent(markers.length + "Hotels");
      infoWindow.setPosition(cluster.getCenter());
      infoWindow.open(map);
    }
  });
  google.maps.event.addListener(markerCluster, 'clusterclick', function (cluster) {
    infoWindow.close(map);
  });
}

var myStyles = [
  {
    featureType: "poi",
    elementType: "labels",
    stylers: [
      { visibility: "off" }
    ]
  }
];