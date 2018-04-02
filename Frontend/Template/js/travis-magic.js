var map;

var counter = 0;
var subtract = 0;
var snapshotLength;
var myDataArray = [];
// $("#connect").show();

$(document).ready(function () {

    //Enter key submits user input
    $(document).bind('keypress', function (e) {
        if (e.keyCode == 13) {
            $('#submit-button').trigger('click');
        }
    });

    //Listener for submit button
    $("#submit-button").on("click", function (event) {
        console.log("clicked")
        event.preventDefault();
        var userInput = $("#inputField").val();
        var queryURL = "https://api.data.charitynavigator.org/v2/Organizations?app_id=b3e49cae&app_key=9895f628abd6b37aff48c8eab486f7ed&search=" + userInput + "&rated=true&minRating=0&maxRating=4&pageSize=100";

        myDataArray = [];

        $.ajax({
            url: queryURL,
            method: "GET",
            success: function (snapshot) {
                // updateResult(snapshot);
                for (var i = 0; i < snapshot.length; i++) {
                    snapshotLength = snapshot.length;
                    updateResult(snapshot[i], function(data){
                        // console.log('after callback', data);
                        myDataArray.push(data);
                        if(myDataArray.length === snapshotLength) {
                            console.log(myDataArray);
                            // put the pins on the map
                            // using the myDataArray
                            updateMap();
                        }
                    });
                }

               
            },
            error: function () {
                alert('Error occured');
            }
        })
        // empty the input field
        $("#inputField").val("");
    });

        // $('#submit-button').on('click', function() { CELESTE
    //     if ($(this).hasClass('clicked')) {
    //         myMap(null);
    //         console.log("cool");
    //      }
    //    });
});

function myMap() {
    var lat = 35;
    var long = -98;
    var myCenter = new google.maps.LatLng(lat, long);
    var mapCanvas = document.getElementById("map");
    var mapOptions = { center: myCenter, zoom: 3.2 };
    map = new google.maps.Map(mapCanvas, mapOptions);
}

var contentString;

// var obj = {
//     lat, long, contentString
//  };

// Don't need this anymore
var myMapArray = [];

function updateResult(data, callback) {
    // for (var i = 0; i < data.length; i++) {

        var geoCodingAddress = data.mailingAddress.streetAddress1 + "," + data.mailingAddress.city + "," + data.mailingAddress.stateOrProvince;

        $.ajax({
            url: "https://maps.googleapis.com/maps/api/geocode/json?address=" + geoCodingAddress + "&key=AIzaSyDf5_ufIVYnnt4x6mjVhaVwXUncIyIRGxo",
            method: "GET",
            success: function (response) {
                if(response.status === "OK") {
                    var lat = JSON.stringify(response.results[0].geometry.location.lat);
                    var long = JSON.stringify(response.results[0].geometry.location.lng);
    
                    // console.log(lat);
                    // console.log(long);
    
                    // console.log(data.charityName);
    
                    // console.log("value of i is: " + i);
    
                    var contentString = '<div class="info-window">' + '<h5>' + data.charityName + '</h5>' +
                    '<div class="info-content">' + '<strong>Rating: </strong>' + data.currentRating.rating + '<br>' + '<strong>Address: </strong>' + data.mailingAddress.streetAddress1 + ", " + data.mailingAddress.city + ", " + data.mailingAddress.stateOrProvince + ", " + data.mailingAddress.postalCode + '<br>' + "<strong>Tag line: </strong>" + data.tagLine + '<br>' + '<strong>Website: </strong>' + "<a href='" + data.websiteURL + "' target='_blank'>" + data.websiteURL + '</a>';
    
                    // console.log(contentString);
                    callback({lat: lat, long: long, contentString: contentString});
                }
                else{
                    snapshotLength--;
                }
            },
            error: function () {
                alert('Error occured');
            }
        });
    // }

}

// updateResult(data)




function bindInfoWindow(marker, map, infowindow, content) {
    google.maps.event.addListener(marker, 'click', function () {
        infowindow.setContent(content);
        infowindow.open(map, marker);
    });

    currentWindow = null;

    marker.addListener('click', function () {
        if (currentWindow) currentWindow.close();
        infowindow.open(map, marker);
        currentWindow=infowindow;
    });

    google.maps.event.addListener(map, 'click', function () {
        if
        (infowindow != null) { infowindow.close(); }
    });

}



function updateMap() {

    for (var j = 0; j < myDataArray.length; j++) {
        console.log(myDataArray[j]);
 
            var newPin = new google.maps.LatLng(myDataArray[j].lat, myDataArray[j].long);
            var marker = new google.maps.Marker({ position: newPin, map: map });
            // // marker.setMap(map);

            var infoWindow = new google.maps.InfoWindow();

            bindInfoWindow(marker, map, infoWindow, myDataArray[j].contentString);
        
    }


}