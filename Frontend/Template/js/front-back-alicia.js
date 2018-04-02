var geoCodingAddress;
var lat = 50;
var long = 14;
var contentString;

$("#connect").hide();

// var arrayLat = [];
// var arrayLong = [];

var map;

$("#submit-button").on("click", function (event) {

    event.preventDefault();
    var userInput = $("#inputField").val();
    var queryURL = "https://api.data.charitynavigator.org/v2/Organizations?app_id=b3e49cae&app_key=9895f628abd6b37aff48c8eab486f7ed&search=" + userInput + "&rated=true&minRating=0&maxRating=4";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (data) {

        console.log(data);

        for (var i = 0; i < data.length; i++) {

            contentString = '<div class="info-window">' + '<h5>' + data[i].charityName + '</h5>' +
                '<div class="info-content">' + '<strong>Rating: </strong>' + data[i].currentRating.rating + '<br>' + '<strong>Address: </strong>' + data[i].mailingAddress.streetAddress1 + ", " + data[i].mailingAddress.city + ", " + data[i].mailingAddress.stateOrProvince + ", " + data[i].mailingAddress.postalCode + '<br>' + "<strong>Tag line: </strong>" + data[i].tagLine + '<br>' + '<strong>Website: </strong>' + "<a href='" + data[i].websiteURL + "' target='_blank'>" + data[i].websiteURL + '</a>';

            console.log(contentString);

            // var i = 0;
            console.log("i is currently: " + i);
            // console.log(response[i].charityName);
            // console.log(response[i].mailingAddress);
            // console.log(response[i].mailingAddress.postalCode);
            // console.log(response[i].mission);
            // console.log(response[i].websiteURL);
            // console.log("Rating: " + response[i].currentRating.rating);
            // console.log(response[i].mailingAddress.streetAddress1 + ", " + response[i].mailingAddress.city + ", " + response[i].mailingAddress.stateOrProvince + ", " + response[i].mailingAddress.postalCode);

            geoCodingAddress = data[i].mailingAddress.streetAddress1 + ",+" + data[i].mailingAddress.city + ",+" + data[i].mailingAddress.stateOrProvince;
            console.log(geoCodingAddress);

            $.ajax({
                url: "https://maps.googleapis.com/maps/api/geocode/json?address=" + geoCodingAddress + "&key=AIzaSyDf5_ufIVYnnt4x6mjVhaVwXUncIyIRGxo",
                method: "GET"
                // async: false
            }).then(function (snapshot) {

                if (snapshot.status == "OK") {

                // var i = 0;
                // console.log("LOOK HERE! " + JSON.stringify(snapshot.results[i]));
                // console.log("Geocoding snapshot latitude: " + JSON.stringify(snapshot.results[0].geometry.location.lat));
                // console.log("Geocoding snapshot longitude: " + JSON.stringify(snapshot.results[0].geometry.location.lng));

                oneLat = JSON.stringify(snapshot.results[0].geometry.location.lat);
                oneLong = JSON.stringify(snapshot.results[0].geometry.location.lng);
                // arrayLat.push(lat);
                // arrayLong.push(long);

                myMap();

                }

            });

            // myMap(); 

        }

        // myMap(); 
        // console.log(arrayLat, arrayLong);

    });

    // myMap();

    $("#inputField").val("");

    // listen();

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
    var marker = new google.maps.Marker({
        position: newPin,
        map: map
    });
    // }

    var infowindow = new google.maps.InfoWindow({
        content: contentString,
        maxWidth: 400
    });

    marker.addListener('click', function () {
        infowindow.open(map, marker);
    });

}

// function listen() {
//     var infowindow = new google.maps.InfoWindow({
//         content: contentString,
//         maxWidth: 400
//     });

//     marker.addListener('click', function () {
//         infowindow.open(map, marker);
//     });
// }




// $("#submit-button").on("click", function (event) {

//     event.preventDefault();

//     $("#connect").show();

//     var userInput = $("#inputField").val();

//     var queryURL = "https://api.data.charitynavigator.org/v2/Organizations?app_id=b3e49cae&app_key=9895f628abd6b37aff48c8eab486f7ed&search=" + userInput + "&rated=true&minRating=0&maxRating=4";

//     $.ajax({
//         url: queryURL,
//         method: "GET"
//     }).then(function (response) {



//         var link = response[0].websiteURL


//         contentString = '<div class="info-window">' + '<h6>' + response[0].charityName + '</h6>' +
//         '<div class="info-content">' + 'Rating: ' + response[0].currentRating.rating + '<br>' + 'Address: ' + response[1].mailingAddress.streetAddress1 + ", " + response[1].mailingAddress.city + ", " + response[1].mailingAddress.stateOrProvince + ", " + response[1].mailingAddress.postalCode + '<br>' + "Tag line: " + response[0].tagLine + '<br>' + 'Website: '+'<a href="http://purrfectpals.org" target="_blank">' + response[0].websiteURL +'</a>';

//         $(contentString).append(link)
//         // Get reference to existing tbody element, create a new table row element
//         console.log(response);

//         console.log(response[0].charityName);

//         console.log(response[0].mailingAddress);

//         console.log(response[0].mailingAddress.postalCode);

//         console.log(response[0].mission);

//         console.log(response[0].websiteURL);

//         console.log("Rating: " + response[0].currentRating.rating);

//         console.log(response[1].mailingAddress.streetAddress1 + ", " + response[1].mailingAddress.city + ", " + response[1].mailingAddress.stateOrProvince + ", " + response[1].mailingAddress.postalCode);

//         geoCodingAddress = response[1].mailingAddress.streetAddress1 + ",+" + response[1].mailingAddress.city + ",+" + response[1].mailingAddress.stateOrProvince;

//         console.log('Website: ' + link)

//         // console.log(geoCodingAddress);

//         // https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=AIzaSyDf5_ufIVYnnt4x6mjVhaVwXUncIyIRGxo

//         // https://maps.googleapis.com/maps/api/geocode/json?address=14175+Southwest+Galbreath+Drive,+Sherwood,+OR&key=AIzaSyDf5_ufIVYnnt4x6mjVhaVwXUncIyIRGxo

//         $.ajax({
//             url: "https://maps.googleapis.com/maps/api/geocode/json?address=" + geoCodingAddress + "&key=AIzaSyDf5_ufIVYnnt4x6mjVhaVwXUncIyIRGxo",
//             method: "GET"
//         }).then(function (response) {

//             // console.log("Inner AJAX response: " + geoCodingAddress);

//             // https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=AIzaSyDf5_ufIVYnnt4x6mjVhaVwXUncIyIRGxo

//             // https://maps.googleapis.com/maps/api/geocode/json?address=14175+Southwest+Galbreath+Drive,+Sherwood,+OR&key=AIzaSyDf5_ufIVYnnt4x6mjVhaVwXUncIyIRGxo

//             console.log("Geocoding response latitude: " + JSON.stringify(response.results[0].geometry.location.lat));
//             console.log("Geocoding response longitude: " + JSON.stringify(response.results[0].geometry.location.lng));

//             lat = response.results[0].geometry.location.lat;
//             long = response.results[0].geometry.location.lng;

//             myMap();

//         });

//     });

//     $("#inputField").val("");

// });


// function myMap() {

//     var myCenter = new google.maps.LatLng(lat, long);

//     var mapCanvas = document.getElementById("map");

//     var mapOptions = { center: myCenter, zoom: 5 };
//     var map = new google.maps.Map(mapCanvas, mapOptions);
//     var marker = new google.maps.Marker({ position: myCenter });
//     marker.setMap(map);

//     var infowindow = new google.maps.InfoWindow({
//         content: contentString,
//         maxWidth: 400
//     });

//     marker.addListener('click', function () {
//         infowindow.open(map, marker);
//     });

// }



// $(function(){

//     $(".dropdown-menu").on('click', 'li a', function(){
//       $(".btn:first-child").text($(this).text());
//       $(".btn:first-child").val($(this).text());
//    });

// });
/*
$(function () {

    lightbox();
    // menuSliding();
    // utils();
    // map();
});


 Lightroom function 

function lightbox() {

    $(document).delegate('*[data-toggle="lightbox"]', 'click', function (event) {
        event.preventDefault();
        $(this).ekkoLightbox({
            left_arrow_class: '.fa .fa-chevron-left .arrow-left',
            right_arrow_class: '.fa .fa-chevron-right  .arrow-right'
        });
    });
}
*/

/* Map function */

// function map() {

//     if ($('#map').length > 0) {


//         function initMap() {

//             var location = new google.maps.LatLng(50.0875726, 14.4189987);

//             var mapCanvas = document.getElementById('map');
//             var mapOptions = {
//                 center: location,
//                 zoom: 2,
//                 panControl: false,
//                 scrollwheel: false,
//                 mapTypeId: google.maps.MapTypeId.ROADMAP
//             }
//             var map = new google.maps.Map(mapCanvas, mapOptions);

//             var markerImage = 'img/marker.png';

//             var marker = new google.maps.Marker({
//                 position: location,
//                 map: map,
//                 icon: markerImage
//             });

//             var contentString = '<div class="info-window">' +
//                 '<h3>Info Window Content</h3>' +
//                 '<div class="info-content">' +
//                 '<p>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.</p>' +
//                 '</div>' +
//                 '</div>';

//             var infowindow = new google.maps.InfoWindow({
//                 content: contentString,
//                 maxWidth: 400
//             });

//             marker.addListener('click', function () {
//                 infowindow.open(map, marker);
//             });

//             var styles = [{
//                 "featureType": "landscape",
//                 "stylers": [{
//                     "hue": "#FFBB00"
//                 }, {
//                     "saturation": 43.400000000000006
//                 }, {
//                     "lightness": 37.599999999999994
//                 }, {
//                     "gamma": 1
//                 }]
//             }, {
//                 "featureType": "road.highway",
//                 "stylers": [{
//                     "hue": "#FFC200"
//                 }, {
//                     "saturation": -61.8
//                 }, {
//                     "lightness": 45.599999999999994
//                 }, {
//                     "gamma": 1
//                 }]
//             }, {
//                 "featureType": "road.arterial",
//                 "stylers": [{
//                     "hue": "#FF0300"
//                 }, {
//                     "saturation": -100
//                 }, {
//                     "lightness": 51.19999999999999
//                 }, {
//                     "gamma": 1
//                 }]
//             }, {
//                 "featureType": "road.local",
//                 "stylers": [{
//                     "hue": "#FF0300"
//                 }, {
//                     "saturation": -100
//                 }, {
//                     "lightness": 52
//                 }, {
//                     "gamma": 1
//                 }]
//             }, {
//                 "featureType": "water",
//                 "stylers": [{
//                     "hue": "#0078FF"
//                 }, {
//                     "saturation": -13.200000000000003
//                 }, {
//                     "lightness": 2.4000000000000057
//                 }, {
//                     "gamma": 1
//                 }]
//             }, {
//                 "featureType": "poi",
//                 "stylers": [{
//                     "hue": "#00FF6A"
//                 }, {
//                     "saturation": -1.0989010989011234
//                 }, {
//                     "lightness": 11.200000000000017
//                 }, {
//                     "gamma": 1
//                 }]
//             }]

//             map.set('styles', styles);


//         }

//         google.maps.event.addDomListener(window, 'load', initMap);


//     }

// }



/* menu sliding IF DELETED MAP DOESN'T APPEAR ON PAGE*/
/*
function menuSliding() {


    $('.dropdown').on('show.bs.dropdown', function (e) {

        if ($(window).width() > 750) {
            $(this).find('.dropdown-menu').first().stop(true, true).slideDown();

        } else {
            $(this).find('.dropdown-menu').first().stop(true, true).show();
        }
    }

    );
    $('.dropdown').on('hide.bs.dropdown', function (e) {
        if ($(window).width() > 750) {
            $(this).find('.dropdown-menu').first().stop(true, true).slideUp();
        } else {
            $(this).find('.dropdown-menu').first().stop(true, true).hide();
        }
    });

}
*/
/* Utils function IF DELETED MAP DOESN'T APPEAR ON PAGE

function utils() {

    /* tooltips */

    // $('[data-toggle="tooltip"]').tooltip();

    /* click on the box activates the radio 

    $('#checkout').on('click', '.box.shipping-method, .box.payment-method', function (e) {
        var radio = $(this).find(':radio');
        radio.prop('checked', true);
    });
    /* click on the box activates the link in it 

    $('.box.clickable').on('click', function (e) {

        window.location = $(this).find('a').attr('href');
    });
    /* external links in new window

    $('.external').on('click', function (e) {

        e.preventDefault();
        window.open($(this).attr("href"));
    });  */
    /* animated scrolling 

    $('.scroll-to, .scroll-to-top').click(function (event) {

        var full_url = this.href;
        var parts = full_url.split("#");
        if (parts.length > 1) {

            scrollTo(full_url);
            event.preventDefault();
        }
    });

    function scrollTo(full_url) {
        var parts = full_url.split("#");
        var trgt = parts[1];
        var target_offset = $("#" + trgt).offset();
        var target_top = target_offset.top - 100;
        if (target_top < 0) {
            target_top = 0;
        }

        $('html, body').animate({
            scrollTop: target_top
        }, 1000);
    }
}

*/

