var map;

var snapshotLength;
var myDataArray = [];

$(document).ready(function () {

    // Enter key submits user input
    $(document).bind('keypress', function (e) {
        if (e.keyCode == 13) {
            $('#submit-button').trigger('click');
        }
    });

    // Listener for submit button
    $("#submit-button").on("click", function (event) {
        // console.log("clicked")
        event.preventDefault();
        var userInput = $("#inputField").val();
        var queryURL = "https://api.data.charitynavigator.org/v2/Organizations?app_id=b3e49cae&app_key=9895f628abd6b37aff48c8eab486f7ed&search=" + userInput + "&rated=true&minRating=0&maxRating=4&pageSize=100";

        // Clear the array on each new click
        myDataArray = [];

        // First ajax call gets charity information
        $.ajax({
            url: queryURL,
            method: "GET",
            success: function (snapshot) {

                // Loop through each charity
                for (var i = 0; i < snapshot.length; i++) {

                    // snapshotLength is a counter used to track how many items go into the array, we are subtracting the number of P.O. boxes from this counter below each time response.status is not "OK"
                    snapshotLength = snapshot.length;

                    // updateResult takes the charity navigator address ready and then passes it into geocoding
                    // The inputs include the ith chairty and a callback function
                    // The "data" from function(data) refers to... not really sure tbh
                    updateResult(snapshot[i], function(data){

                        // console.log('after callback', data);

                        // Pushing callback data into our array 
                        myDataArray.push(data);

                        // Once the array is finished, place pins on the map
                        // myDataArray.length starts at 0 and goes up by one each time we add to the array
                        // snapshotLength starts at 100 and reduces by one each time response.status is not "OK"
                        // When they are equal, only then do we draw pins on the map bc the array is complete
                        if(myDataArray.length === snapshotLength) {
                            // console.log(myDataArray);
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

// This is the initial map when the page is first loaded
function myMap() {

    // Center around the USA bc all charities are located here (but might operate elsewhere)
    var lat = 35;
    var long = -98;
    var myCenter = new google.maps.LatLng(lat, long);
    var mapCanvas = document.getElementById("map");
    var mapOptions = { center: myCenter, zoom: 3.2 };
    map = new google.maps.Map(mapCanvas, mapOptions);
}

// This function takes in the data from the first ajax and a callback function
function updateResult(data, callback) {

        // We are currently inside the first ajax call, saving the charity address as a string to pass into geocoding
        var geoCodingAddress = data.mailingAddress.streetAddress1 + "," + data.mailingAddress.city + "," + data.mailingAddress.stateOrProvince;

        // Geocoding ajax call takes in address as a string and spits out lat/long coordinates
        $.ajax({
            url: "https://maps.googleapis.com/maps/api/geocode/json?address=" + geoCodingAddress + "&key=AIzaSyDf5_ufIVYnnt4x6mjVhaVwXUncIyIRGxo",
            method: "GET",
            success: function (response) {

                // Check to make sure not a P.O box
                if(response.status === "OK") {

                    // Get lat and long from geocoding
                    var lat = JSON.stringify(response.results[0].geometry.location.lat);
                    var long = JSON.stringify(response.results[0].geometry.location.lng);
    
                    // Take all pertinent info from chrities (from first ajax call) and keep in a string
                    // I placed each part of the contentString on it's own line to help understand what exactly each piece represents
                    // I also added two closing div tags at the end
                    var contentString = '<div class="scrollFix" class="info-window">' + 
                    '<h5>' + data.charityName + '</h5>' +
                    '<div class="info-content">' + 
                    '<strong>Rating: </strong>' + data.currentRating.rating + 
                    '<br>' + 
                    '<strong>Address: </strong>' + data.mailingAddress.streetAddress1 + ", " + data.mailingAddress.city + ", " + data.mailingAddress.stateOrProvince + ", " + data.mailingAddress.postalCode + 
                    '<br>' + 
                    "<strong>Tag line: </strong>" + data.tagLine + 
                    '<br>' + 
                    '<strong>Website: </strong>' + "<a href='" + data.websiteURL + "' target='_blank'>" + data.websiteURL + '</a></div></div>';

                    // We use a callback function because it is guaranteed to run LAST in this ajax call (at least I think this is why)
                    // This takes the lat, long, and content string and puts them together in an object, later we push each obj to our array   
                    callback({lat: lat, long: long, contentString: contentString});
                }

                // If we do have a P.O. box, subtract from the snapshotLength counter
                else{
                    snapshotLength--;
                }
            },
            error: function () {
                alert('Error occured');
            }
        });
}

// This function deals with the info window
// All inputs come from the function call inside updateMap(), content = myDataArray[j].contentString
function bindInfoWindow(marker, map, infowindow, content) {

    // Listening for clicks on the markers
    google.maps.event.addListener(marker, 'click', function () {
        // Display content on infowindow
        infowindow.setContent(content);
        // Open infowindow
        infowindow.open(map, marker);
    });

    // Set to null because... not sure tbh
    currentWindow = null;

    // Listening for clicks on the marker
    marker.addListener('click', function () {

        // If currentWindow is true, run this code
        // There should be { } around this if statement, but putting them there breaks the code
        if (currentWindow){
            currentWindow.close();
            infowindow.open(map, marker);
        }

            currentWindow=infowindow;
        
    });

    // Listening for clicks on the map, this closes info windows when someone clicks outside the window
    google.maps.event.addListener(map, 'click', function () {
        if (infowindow != null) { 
            infowindow.close(); 
        }
    });

};

function updateMap() {
    
    // Loop through our array of objects which look like this: {lat, long, contentString} for each index
    for (var j = 0; j < myDataArray.length; j++) {
 
            // Placing a new pin on the map for each item in our array, using lat and long
            var newPin = new google.maps.LatLng(myDataArray[j].lat, myDataArray[j].long);
            var marker = new google.maps.Marker({ position: newPin, map: map });

            // Google Maps allowing an info window
            var infoWindow = new google.maps.InfoWindow();

            // Call bindInfoWindow funcion above and pass in contentString key from our array
            bindInfoWindow(marker, map, infoWindow, myDataArray[j].contentString);  
    }
}