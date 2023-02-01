window.onload = function () {
    let savedResults = JSON.parse(localStorage.getItem("results")) || [];
    let resultsContainer = document.getElementById("saved-results");

    // resultsArray.forEach(function (result) {
    //     let resultDiv = document.createElement("div");
    //     resultDiv.innerHTML = result;
    //     resultsContainer.appendChild(resultDiv);
    // });

    // Loop through the saved results and create a Bootstrap card for each result
    for (var i = 0; i < savedResults.length; i++) {
        var result = savedResults[i];

        var card = document.createElement("div");
        card.setAttribute('id', `card-${i}`);
        card.classList.add("col-12");
        card.classList.add("col-lg-3");
        card.classList.add("col-md-4");
        card.classList.add("col-sm-6");
        card.classList.add("col-xs-12");
        card.classList.add("mb-3");
        card.innerHTML = `
            <div class="card h-100">
            <h5 class="card-header d-flex justify-content-between align-items-center">${i+1}
            <button class="btn btn-danger float-right" id="delete-{{index}}"><i class="bi bi-trash"></i></button>
            </h5>
            <div class="card-body">
                <p class="card-text">${result}</p>
            </div>
            </div>
        `;

        resultsContainer.appendChild(card);
    };

    // Get all the delete buttons
    const deleteButtons = document.querySelectorAll('.btn-danger');

    // Attach click event to each delete button
    deleteButtons.forEach((btn, index) => {
        btn.addEventListener('click', function () {
            // Get the corresponding card
            const card = document.getElementById(`card-${index}`);
            // Remove the card from the results container
            card.remove();
            // Remove the corresponding item from local storage
            savedResults.splice(index, 1);
            localStorage.setItem('results', JSON.stringify(savedResults));
        });
    });
};