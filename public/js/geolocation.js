
var x = document.getElementById("geo");

function geoLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    }
    else {
    x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position) {
  var lat=position.coords.latitude;
  var lon=position.coords.latitude;
  var latlon = lat + "," + lon;
  x.innerHTML = "Latitude: " + lat + "<br>Longitude: " + lon;

  var img_url ="https://maps.googleapis.com/maps/api/staticmap?center="+latlon+"&zoom=8&size=400x300&sensor=false&key=AIzaSyDmd1CPGNTCmcH_iSQBQpYHSdBKckL76UQ";

  document.getElementById("mapholder").innerHTML = "<img src='"+img_url+"'>";
}
