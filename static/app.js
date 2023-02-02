document.addEventListener("DOMContentLoaded", function () {
  var generateButton = document.getElementById("generate-button");
  var dateNightResult = document.getElementById("date-night-result");
  var bookmarkButton = document.getElementById("bookmark-button");
  var geoButton = document.getElementById("geo-button");

  // Button logic to call flask API to generate results 
  generateButton.addEventListener("click", function (event) {
    event.preventDefault();

    // Send a POST request to the server to generate the date night suggestions
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/generate", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        var data = JSON.parse(xhr.responseText);
        var result = "<b>Activity:</b> " + data.activity + "<br>" +
          "<b>Food:</b> " + data.food + "<br>" +
          "<b>Treat:</b> " + data.treat + "<br>" +
          "<b>Dress:</b> " + data.dress;
        document.getElementById("result").innerHTML = result;
        dateNightResult.style.display = "block";
      } else if (xhr.status === 500) {
        document.getElementById("result").innerHTML = "No results found, please try again with different inputs.";
        dateNightResult.style.display = "block";
      }
    };

    xhr.send(JSON.stringify({
      formality: document.getElementById("formality-preference").value,
      budget: document.getElementById("budget-preference").value,
      alcohol: document.getElementById("alcohol-preference").checked,
      location: document.getElementById("location-preference").value,
      geo: document.getElementById("geo-preference").value,
      preparation: document.getElementById("preparation-preference").checked
    }));

  });

  // Bookmark button logic 
  bookmarkButton.addEventListener("click", function (event) {
    event.preventDefault();

    // Save the result div to local storage
    function saveResult(result) {
      let resultsArray = JSON.parse(localStorage.getItem("results")) || [];
      if (!resultsArray.includes(result))
        resultsArray.push(result);
      localStorage.setItem("results", JSON.stringify(resultsArray));
    }

    let result = document.getElementById("result").innerHTML;

    saveResult(result);

  });

  // Geo locator for the location button
  geoButton.addEventListener("click", function (event) {
    event.preventDefault();

    function getLocation() {
      if (navigator.geolocation) {
        document.getElementById("geo-preference").value = "Retrieving location...";
        var timeoutVal = 10 * 1000;
        navigator.geolocation.getCurrentPosition(
          showPosition,
          showError, {
            enableHighAccuracy: true,
            timeout: timeoutVal,
            maximumAge: 0
          }
        );
      } else {
        document.getElementById("geo-preference").value = "Geolocation is not supported by this browser.";
      }
    }

    function showPosition(position) {
      document.getElementById("geo-preference").value = position.coords.latitude + ", " + position.coords.longitude;
    }

    function showError(error) {
      switch (error.code) {
        case error.PERMISSION_DENIED:
          document.getElementById("geo-preference").value = "User denied the request for Geolocation.";
          break;
        case error.POSITION_UNAVAILABLE:
          document.getElementById("geo-preference").value = "Location information is unavailable.";
          break;
        case error.TIMEOUT:
          document.getElementById("geo-preference").value = "The request to get user location timed out.";
        case error.UNKNOWN_ERROR:
          document.getElementById("geo-preference").value = "An unknown error occurred.";
          break;
      }
    }

    getLocation();

  });

});