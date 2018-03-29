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

        console.log(response[0].charityName);

        console.log(response[0].mailingAddress);

        console.log(response[0].mailingAddress.postalCode);

        console.log(response[0].mission);

        console.log(response[0].websiteURL);

        console.log("Rating: " + response[0].currentRating.rating);
    });

    $("#inputField").val("");

});

// // W3 Schools no marker

// function myMap() {
    
//     var mapProp= {
//         center:new google.maps.LatLng(51.508742,-0.120850),
//         zoom:5,
//     };

//     var map=new google.maps.Map(document.getElementById("googleMap"),mapProp);
//     }


// // W3 Schools with marker

function myMap() {
    var myCenter = new google.maps.LatLng(20, -116);

    var mapCanvas = document.getElementById("map");

    var mapOptions = {center: myCenter, zoom: 5};
    var map = new google.maps.Map(mapCanvas, mapOptions);
    var marker = new google.maps.Marker({position:myCenter});
    marker.setMap(map);
  }








// // Google Maps API
// function initMap() {
//     var uluru = {lat: 33, lng: -117};
//     var map = new google.maps.Map(document.getElementById('map'), {
//       zoom: 4,
//       center: uluru
//     });
//     var marker = new google.maps.Marker({
//       position: uluru,
//       map: map
//     });
//   }

//   initMap();

// // Template Guy
// $(function () {

//     function initMap() {

//         var location = new google.maps.LatLng(50.0875726, 14.4189987);

//         var mapCanvas = document.getElementById('map');
//         var mapOptions = {
//             center: location,
//             zoom: 16,
//             panControl: false,
//             mapTypeId: google.maps.MapTypeId.ROADMAP
//         }
//         var map = new google.maps.Map(mapCanvas, mapOptions);

//     }

//     google.maps.event.addDomListener(window, 'load', initMap);
// });


