
document.getElementById("current-location").addEventListener("click", FindMe);

function FindMe() {
  if (!navigator.geolocation) {
    console.log("Geolocation is not supported by your browser");
  } else {
    navigator.geolocation.getCurrentPosition(success, error);
    console.log("Location is available");
  }
  function success(position) {
    const data = {
      lat: position.coords.latitude,
      long: position.coords.longitude,
    };
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    fetch("/currentlocation", options).then((res) => {
      console.log(res); //logs on client side because geolocation.js runs on client
    });
  }
  function error() {
    console.log("Unable to retrieve your location");
  }
}
