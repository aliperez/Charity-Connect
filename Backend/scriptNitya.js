var map;

$(document).ready(function(){
    $("#submit-button").on("click", function (event) {
        event.preventDefault();        
        var userInput = $("#inputField").val();
        var queryURL = "https://api.data.charitynavigator.org/v2/Organizations?app_id=b3e49cae&app_key=9895f628abd6b37aff48c8eab486f7ed&search=" + userInput + "&rated=true&minRating=0&maxRating=4";
       
        $.ajax({
            url: queryURL,
            method: "GET",
            success: function(data) {            
                updateResult(data);
            },
            error: function() {
                alert('Error occured');
            }
        })
    });
});

function myMap() {
	var lat  = 50
	var long =  14
    var myCenter = new google.maps.LatLng(lat, long);
    var mapCanvas = document.getElementById("map");
    var mapOptions = { center: myCenter, zoom: 2 };
    map = new google.maps.Map(mapCanvas, mapOptions);
}

function updateResult(data) {
    for (var key in data) {
        var geoCodingAddress = data[key].mailingAddress.streetAddress1 + "," + data[key].mailingAddress.city + "," + data[key].mailingAddress.stateOrProvince;
        $.ajax({
                url: "https://maps.googleapis.com/maps/api/geocode/json?address=" + geoCodingAddress + "&key=AIzaSyDf5_ufIVYnnt4x6mjVhaVwXUncIyIRGxo",
                method: "GET",
                success: function(data) {
                        updateLatLong(data);
                    },
                    error: function() {
                        alert('Error occured');
                    }
        })
    }
}

function updateLatLong(data) {
	console.log(data)
    if (data.status == "OK") {
        var lat = JSON.stringify(data.results[0].geometry.location.lat);
        var long = JSON.stringify(data.results[0].geometry.location.lng);
        //console.log(lat, long)
        
        var newPin = new google.maps.LatLng(lat, long);
        var marker = new google.maps.Marker({ position: newPin,map: map});
        marker.setMap(map);
    }
}