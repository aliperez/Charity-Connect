// // Celeste's key just in case we need it later...
// var queryURL = "https://api.data.charitynavigator.org/v2/Organizations?app_id=290c7176&app_key=8e151b01fb2a821c90c46ee1498a8215&search=" + userInput + "&rated=true&minRating=0&maxRating=4";


$("#submit-button").on("click", function (event) {

    event.preventDefault();

    var userInput = $("#inputField").val();

    var queryURL = "https://api.data.charitynavigator.org/v2/Organizations?app_id=b3e49cae&app_key=9895f628abd6b37aff48c8eab486f7ed&search=" + userInput + "&rated=true&minRating=0&maxRating=4";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        // Get reference to existing tbody element, create a new table row element
        console.log(response);
    });

});



