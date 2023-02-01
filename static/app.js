document.addEventListener("DOMContentLoaded", function () {
  var generateButton = document.getElementById("generate-button");
  var dateNightResult = document.getElementById("date-night-result");
  var bookmarkButton = document.getElementById("bookmark-button");

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
      preparation: document.getElementById("preparation-preference").checked
    }));
  });

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

});