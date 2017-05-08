let options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};

//const output = document.getElementById("myLocation");

function success(pos) {
	
	let latitude  = pos.coords.latitude;
    let longitude = pos.coords.longitude;
	let accuracy = pos.coords.accuracy;

    //output.innerHTML = `Latitude is ${latitude} and Longitude is ${longitude}. More or less ${accuracy} metres.`;

    const img = new Image();
    img.src = "https://maps.googleapis.com/maps/api/staticmap?center=" + latitude + "," + longitude + "&zoom=13&size=300x300&sensor=false";

    console.getElementById("gmaps").appendChild(img);

};

function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
};

navigator.geolocation.getCurrentPosition(success, error, options);
