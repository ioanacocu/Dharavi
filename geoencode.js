function codeLatLng(input) {
    //var input = document.getElementById('latlng').value;
    //var latlngStr = input.split(',', 2);
    var lat = input[0]; //parseFloat(latlngStr[0]);
    var lng = input[1]; //parseFloat(latlngStr[1]);
    var latlng = new google.maps.LatLng(lat, lng);
    geocoder.geocode({
        'latLng': latlng
    }, function(results, status) {
        //console.log(google.maps.GeocoderStatus);
        if (status == google.maps.GeocoderStatus.OK) {
            if (results[1]) {
                //console.log(results[1])
                map.setZoom(18);
                marker = new google.maps.Marker({
                    position: latlng,
                    map: map,
                    title: results[1].formatted_address,
                    cost: 43055
                });
                var infowindow;
                var raise = "";
                if (check_for_pvt(results[1].formatted_address)) {
                    raise = "<br/>Objection Raised by PVT";
                    obstruction_cost += 5000000;
                }
                google.maps.event.addListener(marker, 'mouseover', function() {
                    infowindow = new google.maps.InfoWindow({
                        content: results[1].formatted_address + raise + "<br/>Cost per sq meter: 43500"
                    });

                    infowindow.open(map, this);
                    //alert("I am " + this.title);

                });
                google.maps.event.addListener(marker, 'mouseout', function() {
                    infowindow.close();
                });
                //infowindow.open(map, marker);
                // alert(results[1].formatted_address);
            } else {
                //   alert('No results found');
            }
        } else {
            console.log('Geocoder Failed');
        }
    });
}

function check_for_pvt(address) {
    var arr = ['Colony', 'colony', 'Residence', 'residence', 'Complex', 'complex', 'Apartment', 'apartment', 'Dham', 'dham', 'Bhavan', 'bhavan', 'Building', 'building', 'Society', 'society'];
    for (var i = 0; i < arr.length; i++) {
        if (address.indexOf(arr[i]) != -1)
            return true;
        return false;
    }
}