function place_marker(index, shape) {
		console.log('In place marker for shape ' +  shape);
		var latitude, longitude, name, type;
		if(shape == 'circle') {
			latitude = obstructions_circular[index].latitude;
			longitude = obstructions_circular[index].longitude;
			name = obstructions_circular[index].name;
			type = obstructions_circular[index].type;
			owner=obstructions_circular[index].owner;
		}
		else {
			latitude = (parseFloat(obstructions_rectangular[index].lat1) + parseFloat(obstructions_rectangular[index].lat2) + parseFloat(obstructions_rectangular[index].lat3) + parseFloat(obstructions_rectangular[index].lat4))/4.0;
			longitude = (parseFloat(obstructions_rectangular[index].long1) + parseFloat(obstructions_rectangular[index].long2) + parseFloat(obstructions_rectangular[index].long3) + parseFloat(obstructions_rectangular[index].long4))/4.0;
			name = obstructions_rectangular[index].name;
			type = obstructions_rectangular[index].type;
			owner=obstructions_rectangular[index].owner;
		}
		
		if(type=="NGO"){
			temp="redpin.png";
		}
		else if(type=="PVT"){
			temp="bluepin.png";
		}
		else{
			temp="greenpin.png";
		}
		var point = new google.maps.LatLng(latitude, longitude);
		console.log(point);
		var marker = new google.maps.Marker({
			position: point,
			icon: temp,
			title: 'Name: ' + name + ' , '+" Owner: "+ owner+','+ type + ' , ' + shape + ' , #' + index,
			map: map
		});
		if(shape == 'circle') {
			//markers_circular.push(marker);
			//var p1=new new google.maps.LatLng(obstructions_circular[index].latitude, obstructions_circular[index].longitude);
			var fig = new google.maps.Circle({
      					strokeColor: '#FF0000',
      					strokeOpacity: 0.8,
      					strokeWeight: 2,
      					fillColor: '#FF0000',
      					fillOpacity: 0.35,
     					center: point,
     				 radius: parseFloat(obstructions_circular[index].radial),
   					 });
			fig.setMap(map);
		}
		else {
			//markers_rectangular.push(marker);
			var quadCoords = [
				new google.maps.LatLng(obstructions_rectangular[index].lat1, obstructions_rectangular[index].long1),
				new google.maps.LatLng(obstructions_rectangular[index].lat2, obstructions_rectangular[index].long2),
				new google.maps.LatLng(obstructions_rectangular[index].lat3, obstructions_rectangular[index].long3),
				new google.maps.LatLng(obstructions_rectangular[index].lat4, obstructions_rectangular[index].long4),
			];

			// Construct the polygon.
			quadrilateral = new google.maps.Polygon({
				paths: quadCoords,
				strokeColor: '#FF0000',
				strokeOpacity: 0.8,
				strokeWeight: 2,
				fillColor: '#FF0000',
				fillOpacity: 0.35,
				map: map,
			});
			quadrilateral.setMap(map);
		}
		
	}
