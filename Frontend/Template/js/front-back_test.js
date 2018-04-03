var map;

$("#connect").show();
$(document).ready(function () {

    console.log("document ready")
    $("#submit-button").on("click", function (event) {
        console.log("clicked")
        event.preventDefault();
        var userInput = $("#inputField").val();
        var queryURL = "https://api.data.charitynavigator.org/v2/Organizations?app_id=b3e49cae&app_key=9895f628abd6b37aff48c8eab486f7ed&search=" + userInput + "&rated=true&minRating=0&maxRating=4&pageSize=3";

        $.ajax({
            url: queryURL,
            method: "GET",
            success: function (data) {
                updateResult(data);
            },
            error: function () {
                alert('Error occured');
            }
        })
        // empty the input field
        $("#inputField").val("");
    });
});

function myMap() {
    var lat = 50;
    var long = 14;
    var myCenter = new google.maps.LatLng(lat, long);
    var mapCanvas = document.getElementById("map");
    var mapOptions = { center: myCenter, zoom: 2 };
    map = new google.maps.Map(mapCanvas, mapOptions);
}

var contentString;
var dataArray = [];


function updateResult(data) {
    for (var key in data) {
        // console.log(data[key].websiteURL);
        contentString('<div class="info-window">' + '<h5>' + data[key].charityName + '</h5>' +
            '<div class="info-content">' + '<strong>Rating: </strong>' + data[key].currentRating.rating + '<br>' + '<strong>Address: </strong>' + data[key].mailingAddress.streetAddress1 + ", " + data[key].mailingAddress.city + ", " + data[key].mailingAddress.stateOrProvince + ", " + data[key].mailingAddress.postalCode + '<br>' + "<strong>Tag line: </strong>" + data[key].tagLine + '<br>' + '<strong>Website: </strong>' + "<a href='" + data[key].websiteURL + "' target='_blank'>" + data[key].websiteURL + '</a>');
        // console.log(contentString);

        var geoCodingAddress = data[key].mailingAddress.streetAddress1 + "," + data[key].mailingAddress.city + "," + data[key].mailingAddress.stateOrProvince;

        // console.log(contentString);
        $.ajax({
            url: "https://maps.googleapis.com/maps/api/geocode/json?address=" + geoCodingAddress + "&key=AIzaSyDf5_ufIVYnnt4x6mjVhaVwXUncIyIRGxo",
            method: "GET",

            // sync ajax request instead of async works but browser freezes!! 

            success: function (data) {
                console.log(data);
                // contentString overrides !!! 
                //console.log(contentString);
                //updateLatLong(data,contentString);
                //updateLatLong(data);
                var lat = JSON.stringify(data.results[0].geometry.location.lat);
                var long = JSON.stringify(data.results[0].geometry.location.lng);
              
                dataArray.push();
            },
            error: function () {
                alert('Error occured');
            }
        })
    }
    //console.log(contentString)
    console.log(dataArray);
    console.log(dataArray.length);
    updateMap();
}

// function updateLatLong (data) {
//     dataArray.push({status: data.status, result: data.results[0]});
//     console.log(dataArray)
// }

function bindInfoWindow(marker, map, infowindow, content) {
    google.maps.event.addListener(marker, 'click', function () {
        infowindow.setContent(content);
        infowindow.open(map, marker);
    });
}



function updateMap() {
    console.log(dataArray)

    console.log("in updateMAP", dataArray.length)
    for (var i = 0; i < dataArray.length; i++) {
        console.log("inside for loopss")
        var data = dataArray[i];
        console.log(data)
        if (data.status == "OK") {
            var lat = JSON.stringify(data.results[0].geometry.location.lat);
            var long = JSON.stringify(data.results[0].geometry.location.lng);
            //console.log(lat, long)
            //latArray.push(lat)
            //latArray.push(long)

            var newPin = new google.maps.LatLng(lat, long);
            var marker = new google.maps.Marker({ position: newPin, map: map });
            marker.setMap(map);

            console.log(contentString[i])
            var infoWindow = new google.maps.InfoWindow();
            bindInfoWindow(marker, map, infoWindow, contentString[i]);
        }
    }


}
