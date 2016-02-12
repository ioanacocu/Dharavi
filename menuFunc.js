var current_points = [];
	var shape_entered, name_entered, type_entered, radial_entered, cost_entered, margin_entered;

function tag_dataset() {
		//remove();
		if(shape_entered == 'circle') {
			console.log('circle received at tag_dataset');
			$.simplyToast('Select the center of the circle');
			google.maps.event.addListener(map, 'click', function(event){
				console.log(event);
				var latitude = event.latLng.lat();
				var longitude = event.latLng.lng();
				current_points.push([latitude, longitude]);
				console.log(latitude + ' ' + longitude);
				$.simplyToast('Select the radius of the circle');
				if(current_points.length==2){
					var p1 = new google.maps.LatLng(current_points[0][0], current_points[0][1]);
					var p2 = new google.maps.LatLng(current_points[1][0], current_points[1][1]);
					$margin_entered =  google.maps.geometry.spherical.computeDistanceBetween(p1,p2);

					console.log(event);
					data = {};
					data['latitude'] = latitude;
					data['longitude'] = longitude;
					data['name'] = name_entered;
					data['type'] = type_entered;
					data['radial'] = radial_entered;
					data['cost'] = cost_entered;
					data['margin'] = margin_entered;
					current_points = [];
					remove();

					console.log('Printing data');
					console.log(data);

					$.ajax({
						url : 'http://127.0.0.1/urban_planning/insert_location_circular.php',
						type : 'POST',
						async : true,
						data : data,
						success : function(response){
							$.simplyToast('Object inserted', 'success');
						},
						error : function(response){
							console.log('Failed to insert data');
						}
					});
				}
				});
			}
		else {
			 poly = new google.maps.Polyline({
    				strokeColor: '#000000',
    				strokeOpacity: 1.0,
   					strokeWeight: 3
 					 });

			 map.addListener('click', addLatLng);
			console.log('rectangle received at tag_dataset');
			$.simplyToast('Select 4 points');
			google.maps.event.addListener(map, 'click', function(event){
				var latitude = event.latLng.lat();
				var longitude = event.latLng.lng();
				current_points.push([latitude, longitude]);
				console.log(current_points.length);

				if(current_points.length == 4) {
					data = {};
					data['lat1'] = current_points[0][0];
					data['long1'] = current_points[0][1];
					data['lat2'] = current_points[1][0];
					data['long2'] = current_points[1][1];
					data['lat3'] = current_points[2][0];
					data['long3'] = current_points[2][1];
					data['lat4'] = current_points[3][0];
					data['long4'] = current_points[3][1];
					data['name'] = name_entered;
					data['type'] = type_entered;
					data['cost'] = cost_entered;
					data['margin'] = margin_entered;
					console.log(data);
					current_points = [];
					remove();
					    var line = [];
					     line.push(poly);
					     for (i=0; i<line.length; i++) 
							{                           
 								 line[i].setMap(null); 
							}
							for (var i = 0; i < propMarkers.length; i++) {
    						propMarkers[i].setMap(null);
 							 }
						propMarkers=[];					
  						//ly.setMap(null);
					

					$.ajax({
						url : 'http://127.0.0.1/urban_planning/insert_location_rectangular.php',
						type : 'POST',
						async : true,
						data : data,
						success : function(response){
							$.simplyToast('Object inserted', 'success');
						},
						error : function(response){
							console.log('Failed to insert data');
						}
					});
				}
			});
		}
	}

	function remove(){
		google.maps.event.clearListeners(map, 'click');
		google.maps.event.clearListeners(map, 'polygoncomplete');
		//hide_manager();
	}