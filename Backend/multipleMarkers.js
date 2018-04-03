// // Celeste's key just in case we need it later...
// var queryURL = "https://api.data.charitynavigator.org/v2/Organizations?app_id=290c7176&app_key=8e151b01fb2a821c90c46ee1498a8215&search=" + userInput + "&rated=true&minRating=0&maxRating=4";

// $(document).ready(function(){

var geoCodingAddress;
var lat = 50;
var long = 14;

var arrayLat = [];
var arrayLong = [];

var map;

$("#submit-button").on("click", function (event) {

    event.preventDefault();
    var userInput = $("#inputField").val();
    var queryURL = "https://api.data.charitynavigator.org/v2/Organizations?app_id=b3e49cae&app_key=9895f628abd6b37aff48c8eab486f7ed&search=" + userInput + "&rated=true&minRating=0&maxRating=4";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

        console.log(response);

        for (var i = 0; i < response.length; i++) {

            // var i = 0;
            console.log("i is currently: " + i);
            // console.log(response[i].charityName);
            // console.log(response[i].mailingAddress);
            // console.log(response[i].mailingAddress.postalCode);
            // console.log(response[i].mission);
            // console.log(response[i].websiteURL);
            // console.log("Rating: " + response[i].currentRating.rating);
            // console.log(response[i].mailingAddress.streetAddress1 + ", " + response[i].mailingAddress.city + ", " + response[i].mailingAddress.stateOrProvince + ", " + response[i].mailingAddress.postalCode);

            geoCodingAddress = response[i].mailingAddress.streetAddress1 + ",+" + response[i].mailingAddress.city + ",+" + response[i].mailingAddress.stateOrProvince;
            console.log(geoCodingAddress);

            $.ajax({
                url: "https://maps.googleapis.com/maps/api/geocode/json?address=" + geoCodingAddress + "&key=AIzaSyDf5_ufIVYnnt4x6mjVhaVwXUncIyIRGxo",
                method: "GET"
            }).then(function (snapshot) {

                // var i = 0;
                // console.log("LOOK HERE! " + JSON.stringify(snapshot.results[i]));
                // console.log("Geocoding snapshot latitude: " + JSON.stringify(snapshot.results[0].geometry.location.lat));
                // console.log("Geocoding snapshot longitude: " + JSON.stringify(snapshot.results[0].geometry.location.lng));

                oneLat = JSON.stringify(snapshot.results[0].geometry.location.lat);
                oneLong = JSON.stringify(snapshot.results[0].geometry.location.lng);
                // arrayLat.push(lat);
                // arrayLong.push(long);

                myMap(); 
                
            });

            // myMap(); 

        }

        // myMap(); 
        console.log(arrayLat, arrayLong);

    });

    // myMap();

    $("#inputField").val("");

});


function initMap() {

    var myCenter = new google.maps.LatLng(lat, long);
    var mapCanvas = document.getElementById("map");
    var mapOptions = { center: myCenter, zoom: 2 };
    map = new google.maps.Map(mapCanvas, mapOptions);

}

function myMap() {
    // var myCenter = new google.maps.LatLng(50, 14);
    // var mapCanvas = document.getElementById("map");
    // var mapOptions = {  center: myCenter, zoom: 2 };
    // var map = new google.maps.Map(mapCanvas, mapOptions);

    // console.log("MY MAP WAS CALLED");

    // for (var j = 0; j < 50; j++){
    var newPin = new google.maps.LatLng(oneLat, oneLong);
    var marker = new google.maps.Marker({ position: newPin,
    map: map});
    // }

}


// // We think we need a loop to scan through the array and create a marker for each pair of lat&long

// function forLoop() {
//     for (var j = 0; j < 1; j++) {

//         // var myCenter = new google.maps.LatLng(lat, long);

//         // var mapCanvas = document.getElementById("map");
//         // var mapOptions = { center: myCenter, zoom: 2 };

//         // var map = new google.maps.Map(mapCanvas, mapOptions);

//         newMarker = new google.maps.Marker({
//             position: new google.maps.LatLng(arrayLat[j], arrayLong[j]),
//             map: map
//         })

//         // console.log("For loop: " + j);
//     }
// }

