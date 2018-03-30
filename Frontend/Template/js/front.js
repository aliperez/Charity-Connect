
$(function () {

    lightbox();
    menuSliding();
    utils();
    map();
});


/* Lightroom function */

function lightbox() {

    $(document).delegate('*[data-toggle="lightbox"]', 'click', function (event) {
        event.preventDefault();
        $(this).ekkoLightbox({
            left_arrow_class: '.fa .fa-chevron-left .arrow-left',
            right_arrow_class: '.fa .fa-chevron-right  .arrow-right'
        });
    });
}


/* Map function */

function map() {

    if ($('#map').length > 0) {


        function initMap() {

            var location = new google.maps.LatLng(50.0875726, 14.4189987);

            var mapCanvas = document.getElementById('map');
            var mapOptions = {
                center: location,
                zoom: 2,
                panControl: false,
                scrollwheel: false,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            }
            var map = new google.maps.Map(mapCanvas, mapOptions);

            var markerImage = 'img/marker.png';

            var marker = new google.maps.Marker({
                position: location,
                map: map,
                icon: markerImage
            });

            var contentString = '<div class="info-window">' +
                '<h3>Info Window Content</h3>' +
                '<div class="info-content">' +
                '<p>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.</p>' +
                '</div>' +
                '</div>';

            var infowindow = new google.maps.InfoWindow({
                content: contentString,
                maxWidth: 400
            });

            marker.addListener('click', function () {
                infowindow.open(map, marker);
            });

            var styles = [{
                "featureType": "landscape",
                "stylers": [{
                    "hue": "#FFBB00"
                }, {
                    "saturation": 43.400000000000006
                }, {
                    "lightness": 37.599999999999994
                }, {
                    "gamma": 1
                }]
            }, {
                "featureType": "road.highway",
                "stylers": [{
                    "hue": "#FFC200"
                }, {
                    "saturation": -61.8
                }, {
                    "lightness": 45.599999999999994
                }, {
                    "gamma": 1
                }]
            }, {
                "featureType": "road.arterial",
                "stylers": [{
                    "hue": "#FF0300"
                }, {
                    "saturation": -100
                }, {
                    "lightness": 51.19999999999999
                }, {
                    "gamma": 1
                }]
            }, {
                "featureType": "road.local",
                "stylers": [{
                    "hue": "#FF0300"
                }, {
                    "saturation": -100
                }, {
                    "lightness": 52
                }, {
                    "gamma": 1
                }]
            }, {
                "featureType": "water",
                "stylers": [{
                    "hue": "#0078FF"
                }, {
                    "saturation": -13.200000000000003
                }, {
                    "lightness": 2.4000000000000057
                }, {
                    "gamma": 1
                }]
            }, {
                "featureType": "poi",
                "stylers": [{
                    "hue": "#00FF6A"
                }, {
                    "saturation": -1.0989010989011234
                }, {
                    "lightness": 11.200000000000017
                }, {
                    "gamma": 1
                }]
            }]

            map.set('styles', styles);


        }

        google.maps.event.addDomListener(window, 'load', initMap);


    }

}



/* menu sliding IF DELETED MAP DOESN'T APPEAR ON PAGE*/

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

/* Utils function IF DELETED MAP DOESN'T APPEAR ON PAGE*/

function utils() {

    /* tooltips */

    $('[data-toggle="tooltip"]').tooltip();

    /* click on the box activates the radio */

    $('#checkout').on('click', '.box.shipping-method, .box.payment-method', function (e) {
        var radio = $(this).find(':radio');
        radio.prop('checked', true);
    });
    /* click on the box activates the link in it */

    $('.box.clickable').on('click', function (e) {

        window.location = $(this).find('a').attr('href');
    });
    /* external links in new window*/

    $('.external').on('click', function (e) {

        e.preventDefault();
        window.open($(this).attr("href"));
    });
    /* animated scrolling */

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


