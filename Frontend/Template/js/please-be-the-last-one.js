var map;
$(document).ready(function () {
    $(document).bind('keypress', function (e) {
        if (e.keyCode == 13) {
            $('#submit-button').trigger('click');
        }
    });
    $("#submit-button").on("click", function (event) {
        console.log("clicked");
        event.preventDefault();
        var userInput = $("#inputField").val();
        var queryURL = "https://api.data.charitynavigator.org/v2/Organizations?app_id=b3e49cae&app_key=9895f628abd6b37aff48c8eab486f7ed&search=" + userInput + "&rated=true&minRating=0&maxRating=4&pageSize=50";
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
    var lat = 40;
    var long = -98;
    var myCenter = new google.maps.LatLng(lat, long);
    var mapCanvas = document.getElementById("map");
    var mapOptions = { center: myCenter, zoom: 3.2 };
    map = new google.maps.Map(mapCanvas, mapOptions);
}

function updateResult(data, callback) {

        var geoCodingAddress = data.mailingAddress.streetAddress1 + "," + data.mailingAddress.city + "," + data.mailingAddress.stateOrProvince;

        $.ajax({
            url: "https://maps.googleapis.com/maps/api/geocode/json?address=" + geoCodingAddress + "&key=AIzaSyDf5_ufIVYnnt4x6mjVhaVwXUncIyIRGxo",
            method: "GET",
            success: function (response) {
                if(response.status === "OK") {
                    var lat = JSON.stringify(response.results[0].geometry.location.lat);
                    var long = JSON.stringify(response.results[0].geometry.location.lng);
    
                    var contentString = '<div class="info-window">' + '<h5>' + data.charityName + '</h5>' +
                    '<div class="info-content">' + '<strong>Rating: </strong>' + data.currentRating.rating + '<br>' + '<strong>Address: </strong>' + data.mailingAddress.streetAddress1 + ", " + data.mailingAddress.city + ", " + data.mailingAddress.stateOrProvince + ", " + data.mailingAddress.postalCode + '<br>' + "<strong>Tag line: </strong>" + data.tagLine + '<br>' + '<strong>Website: </strong>' + "<a href='" + data.websiteURL + "' target='_blank'>" + data.websiteURL + '</a>';
    
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
}

// function bindInfoWindow(marker, map, infowindow, content) {
//     google.maps.event.addListener(marker, 'click', function () {

//         infowindow.setContent(content);
//         infowindow.open(map, marker);

//         if (currentWindow) {
//             currentWindow.close();
//                 infowindow.open(map, marker);
//             currentWindow = infowindow;
//         }
    
//         google.maps.event.addListener(map, 'click', function () {
//             if (infowindow != null) {
//                 infowindow.close();
//             }
//             });
//     });
// };

function updateMap() {

    for (var j = 0; j < myDataArray.length; j++) {
        console.log(myDataArray[j]);

        var newPin = new google.maps.LatLng(myDataArray[j].lat, myDataArray[j].long);
        var marker = new google.maps.Marker({ position: newPin, map: map });
        // // marker.setMap(map);

        var infoWindow = new google.maps.InfoWindow({
            content: '<div class="scrollFix">' + myDataArray[j].contentString + '</div>',
            maxWidth: 400
        });

        currentWindow = null;

        // bindInfoWindow(marker, map, infoWindow, myDataArray[j].contentString);

        // google.maps.event.addListener(marker, 'click', function () {
        
        marker.addListener("click", function(){

            infoWindow.setContent(infoWindow.content);
            infoWindow.open(map, marker);
    
            if (currentWindow) {
                //closes the current window
                currentWindow.close();
                //this opens a new infoWindow (the one that was clicked)
                infoWindow.open(map, marker);
                //current window becomes the new one just opened
                currentWindow = infoWindow;
            }

        });
        
            
        google.maps.event.addListener(map, 'click', function () {
                //if user clicks outside of the current window it closes
                if (infoWindow != null) {
                    infoWindow.close();
                }
        });
    }

}



// function updateLatLong(data, contentString) {
//     // console.log(contentString);
//     // console.log(data);
//     if (data.status == "OK") {
//         var lat = JSON.stringify(data.results[0].geometry.location.lat);
//         var long = JSON.stringify(data.results[0].geometry.location.lng);
//         //console.log(lat, long)
//         var newPin = new google.maps.LatLng(lat, long);
//         var marker = new google.maps.Marker({ position: newPin, map: map });
//         marker.setMap(map);

//         var infowindow = new google.maps.InfoWindow({
//             content:'<div class="scrollFix">'+contentString+'</div>',
//             maxWidth: 400
//         });

//         currentWindow = null;
//         marker.addListener('click', function () {
//             if (currentWindow) currentWindow.close();
//             infowindow.open(map, marker);
//             currentWindow=infowindow;
//         });
//         google.maps.event.addListener(map, 'click', function () {
//             if
//             (infowindow != null) { infowindow.close(); }
//         });
//     }
// }

// $("#delete-markers").on("click", function(){ CELESTE 
//     console.log("working");
//     myMap(null);
// });
// function clearMarkers() { CELESTE
//     myMap(null);
//   }
// function deleteMarkers() { CELESTE
//     clearMarkers();
//     var marker = new google.maps.Marker({ position: myCenter });
//     marker.setMap(map);
//   }
