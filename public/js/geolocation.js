
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
  var lon=position.coords.longitude;
  var latlon = lat + "," + lon;
  x.innerHTML = "Latitude: " + lat + "<br>Longitude: " + lon;

  var img_url ="https://maps.google.com/maps?q="+latlon+"&t=&z=10&ie=UTF8&iwloc=&output=embed";

  $("#mapholder").html('<iframe src='+img_url+'></iframe>');
}
