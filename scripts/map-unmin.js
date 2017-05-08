let options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};

//const output = document.getElementById("myLocation");

function success(pos) {
	
	let latitude  = 53.0102971;
    let longitude = -2.1802611;
	let accuracy = pos.coords.accuracy;

    //output.innerHTML = `Latitude is ${latitude} and Longitude is ${longitude}. More or less ${accuracy} metres.`;
    
    console.log(document.getElementById("gMaps"));
    document.getElementById("gMaps").setAttribute("src", `https://maps.googleapis.com/maps/api/staticmap?center=${latitude},${longitude}&zoom=18&size=600x600&sensor=true&markers=color:blue%7Clabel:%7C ${latitude},${longitude}`);
};

function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
};

navigator.geolocation.getCurrentPosition(success, error, options);
