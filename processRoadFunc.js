var details_circular = {};
var details_rectangular = {};
markers_circular = [];
markers_rectangular = [];
markers_circular_figure = [];
markers_rectangular_figure = [];


function find_intersection() {
		find_intersection_circular();
		find_intersection_rectangular();
		
	}

function find_intersection_rectangular() {
		for (var i = 0; i < obstructions_rectangular.length; i++) {
			details_rectangular[i] = {};
			var total = 0;

			var rectCoords = [
				new google.maps.LatLng(obstructions_rectangular[i].lat1, obstructions_rectangular[i].long1),
				new google.maps.LatLng(obstructions_rectangular[i].lat2, obstructions_rectangular[i].long2),
				new google.maps.LatLng(obstructions_rectangular[i].lat3, obstructions_rectangular[i].long3),
				new google.maps.LatLng(obstructions_rectangular[i].lat4, obstructions_rectangular[i].long4),
			];

			var rectangle = new google.maps.Polygon({
				paths: rectCoords
			});
			console.log(intermediatePoints.length);
			for (var j = 0; j < intermediatePoints.length; j++) {
				var p2 = new google.maps.LatLng(intermediatePoints[j][0], intermediatePoints[j][1]);
				if(google.maps.geometry.poly.containsLocation(p2, rectangle)) {
					markers_rectangular.push(p2);
					console.log(p2);
					var content 
					details_rectangular[i][j] = parseInt(obstructions_rectangular[i].cost, 10); // hack
					total+=details_rectangular[i][j];
					content= j+' ' + details_rectangular[i][j] ;
			// add code here
			var marker = new google.maps.Marker({
                		position: p2,
               			map: map,
                		title: '#'+content,
                		icon: 'http://www.googlemapsmarkers.com/v1/FFFF00/'
            			});
			markers_rectangular_figure.push(marker);
						
					
				}
			};
			costArray_rectangular.push(Math.ceil(total));
			// negotiation for rectangles to be taken care of
		};

		if(markers_rectangular == []) {
			return;
		}


		for (var i = 0; i < markers_rectangular.length; i++) {

			var infowindow = new google.maps.InfoWindow({
				width: "80px"
			});
			
			google.maps.event.addListener(marker, 'mouseover', function(event) {
				//console.log(event.latLng.lat() + ' % ' + event.latLng.lng());
				var markerLatitude = event.latLng.lat();
				var markerLongitude = event.latLng.lng();

				for (var j = 0; j < obstructions_rectangular.length; j++) {
					var p2 = new google.maps.LatLng(markerLatitude, markerLongitude);

					var rectCoords = [
						new google.maps.LatLng(obstructions_rectangular[j].lat1, obstructions_rectangular[j].long1),
						new google.maps.LatLng(obstructions_rectangular[j].lat2, obstructions_rectangular[j].long2),
						new google.maps.LatLng(obstructions_rectangular[j].lat3, obstructions_rectangular[j].long3),
						new google.maps.LatLng(obstructions_rectangular[j].lat4, obstructions_rectangular[j].long4),
					];

					var rectangle = new google.maps.Polygon({
						paths: rectCoords
					});
					var index;
					if(google.maps.geometry.poly.containsLocation(p2, rectangle)) {
						index=j;
						break;
					}
				};

				var flag = false;
				
				var total = 0;
				for (points in details_rectangular[index]) {
					flag = true;
					//console.log(points + ' ' + details_rectangular[index][points]);
					//content+= '#' + points + ' ' + details_rectangular[index][points] + '<br/>';
					total+= parseInt(details_rectangular[index][points]);
				}
				if(flag) {
					//content+= 'Total Cost: ' + total;
					//content+='</div>'
					infowindow.setContent(content);
	    			infowindow.open(map, this);
	    		}
			});

			google.maps.event.addListener(marker,'mouseout',function() {
				infowindow.close(map,this);
			});
		};
	}

	function find_intersection_circular() {
		//console.log(intermediatePoints.length);
		for (var i = 0; i < obstructions_circular.length; i++) {
			details_circular[i] = {};
			var total = 0;
			var p1 = new google.maps.LatLng(obstructions_circular[i].latitude, obstructions_circular[i].longitude);
			for (var j = 0; j < intermediatePoints.length; j++) {
				var p2 = new google.maps.LatLng(intermediatePoints[j][0], intermediatePoints[j][1]);
				var distance = google.maps.geometry.spherical.computeDistanceBetween(p1,p2);
				if (distance < obstructions_circular[i].radial) {
					details_circular[i][j] = parseInt(obstructions_circular[i].cost);
					//details_circular[i][j] = (parseInt(obstructions_circular[i].radial) - parseInt(distance))*parseInt(obstructions_circular[i].cost);
					total+=details_circular[i][j];
					var content ;
					content= j+' ' + details_circular[i][j] ;
			// add code here
			var marker = new google.maps.Marker({
                		position: p2,
               			map: map,
                		title: '#'+content,
                		icon: 'http://www.googlemapsmarkers.com/v1/FFFF00/'
            			});
			markers_circular_figure.push(marker);
				}
			}
			costArray_circular.push(Math.ceil(total));
		}

		if(markers_circular == []) {
			return;
		}
		
		for (var i = 0; i < markers_circular.length; i++) {
			var marker = markers_circular[i];
			var infowindow = new google.maps.InfoWindow({
				width: "50px"
			});
		
			google.maps.event.addListener(marker, 'mouseover', function(event) {
				console.log(event.latLng.lat() + ' % ' + event.latLng.lng());
				var markerLatitude = event.latLng.lat();
				var markerLongitude = event.latLng.lng();
				var index=-1;
				for (var k = 0; k < obstructions_circular.length; k++) {
					if (obstructions_circular[k]['latitude'] == markerLatitude && obstructions_circular[k]['longitude'] == markerLongitude) {
						index = k;
						break;
					}
				}
				var flag = false;
				var content = '<div class="scrollFix">Cost details_circular<br />';
				var total = 0;
				for (points in details_circular[index]) {
					flag = true;
					//console.log(points + ' ' + details_circular[index][points]);
					//content+= '#' + points + ' ' + details_circular[index][points] + '<br/>';
					total+= parseInt(details_circular[index][points]);
				}
				if(flag) {
					//content+= 'Total Cost: ' + total;
					//content+='</div>'
					infowindow.setContent(content);
	    			infowindow.open(map, this);
	    		}
			});

			google.maps.event.addListener(marker,'mouseout',function() {
				infowindow.close(map,this);
			});
		}
	}
