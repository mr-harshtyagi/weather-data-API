
document.getElementById("current-location").addEventListener("click", FindMe);
const body =document.getElementById("html");

function FindMe() {
  if (!navigator.geolocation) {
    console.log("Geolocation is not supported by your browser");
  } else {
    navigator.geolocation.getCurrentPosition(success, error);
    console.log("Location is available");
  }

  //success function
  function success(position) {
    const data = {
      lat: position.coords.latitude,
      long: position.coords.longitude,
    };
    async function postCoords(data){
      const response = await fetch("/currentlocation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
      });

      return response.text();
    }

    postCoords(data).then(data=> html.innerHTML = data)
    
  }

  //error function
  function error() {
    console.log("Unable to retrieve your location");
  }
}
