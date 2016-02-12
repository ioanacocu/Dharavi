function new_marker() {
		google.maps.event.removeListener(listener_manager);
		var polyOptions = {
			strokeColor: '#000000',
			strokeOpacity: 1.0,
			strokeWeight: 3
		}
		poly = new google.maps.Polyline(polyOptions);
		poly.setMap(map);
		line_lisner = google.maps.event.addListener(map, 'click', addLatLng);
	}

	function addLatLng(event) {
		line = poly.getPath();
		line.push(event.latLng);
		var new_point = [event.latLng.lat(), event.latLng.lng()];
		marked_byuser.push(new_point);
		//intermediatePoints.push(new_point);
		if (marked_byuser.length > 1) {
			var p1 = new google.maps.LatLng(marked_byuser[marked_byuser.length-2][0], marked_byuser[marked_byuser.length-2][1]);
			var p2 = new google.maps.LatLng(marked_byuser[marked_byuser.length-1][0], marked_byuser[marked_byuser.length-1][1]);
			var dis_in_metres =  google.maps.geometry.spherical.computeDistanceBetween(p1,p2);
			road_length+=dis_in_metres;
			//console.log('Calling getintermediatepts ');
			getintermediatepts(marked_byuser[marked_byuser.length - 2], marked_byuser[marked_byuser.length - 1], factor);
			//alert(intermediatePoints.length);
		}
		
		marker = new google.maps.Marker({
			position: event.latLng,
			title: '#' + line.getLength(),
			map: map,
		});
		//markersArray.push(marker);
	}

	function getintermediatepts(pq, rs, k) {
	    var p = pq[0];
	    var q = pq[1];
	    var r = rs[0];
	    var s = rs[1];
	    var dis = (r - p) * (r - p) + (s - q) * (s - q);
	    //alert(dis);
	    if (k * k >= (r - p) * (r - p) + (s - q) * (s - q))
	        return;
	    //console.log('getintermediatepts called');
	    var a = (s - q) / (r - p);
	    var b = q - a * p;
	    var det_b = 2 * a * (b - q) - 2 * p;
	    var det_c = p * p + (b - q) * (b - q) - k * k;
	    var det_a = (1 + a * a);
	    var x1 = ((-1 * det_b) + Math.sqrt((det_b * det_b) - (4 * det_a * det_c))) / (2 * det_a);
	    var x2 = ((-1 * det_b) - Math.sqrt((det_b * det_b) - (4 * det_a * det_c))) / (2 * det_a);
	    var content = intermediatePoints.length;
	    if (x1 >= p && x1 <= r) {
	        var temp = [x1, a * x1 + b];
	        var latlng = new google.maps.LatLng(temp[0], temp[1]);
    	    marker = new google.maps.Marker({
                position: latlng,
                map: map,
                title: '#' + content,
                icon: 'http://www.googlemapsmarkers.com/v1/FFFF00/'
            });
			intermediatePoints.push(temp);
	    } else {
	        var temp1 = [x2, a * x2 + b];
	        var latlng = new google.maps.LatLng(temp1[0], temp1[1]);
	        marker = new google.maps.Marker({
                position: latlng,
                map: map,
                title: '#' + content,
                icon: 'http://www.googlemapsmarkers.com/v1/FFFF00/'
            });
	        intermediatePoints.push(temp1);
	    }
	    getintermediatepts(pq, rs, k + factor);
	}


	var typeflag=0;
	var map;
	var radial=50;
	var infowindow;
	var factor=0.00009;
	var listener_manager;
	var intermediatePoints = [];
	var marked_byuser = [];
	var distancepoints = [];
	var geocoder;

	var width_of_road;
	var budget=0;
	var dedctd_construction;
	var road_length=0;
	var rate_sqmt = 43055;
	var obstruction_cost=0;

 function evaluate()
	{
		
		if(budget - NegotiationCost >= 0)
		{
			var v = budget - NegotiationCost;
			alert("You are left with " + v + " units with " + live_negotiations.length + " negotiations pending.");
		}
		else
		{
			var v = NegotiationCost - budget;
			alert("You lose by " + v + " points.");
		}
	}
	var NegotiationCost = 0;
	
	

	markers_circular = [];
	markers_rectangular = [];

	function place_marker(index, shape) {
		console.log('In place marker for shape ' +  shape);
		var latitude, longitude, name, type;
		if(shape == 'circle') {
			latitude = obstructions_circular[index].latitude;
			longitude = obstructions_circular[index].longitude;
			name = obstructions_circular[index].name;
			type = obstructions_circular[index].type;
		}
		else {
			latitude = (parseFloat(obstructions_rectangular[index].lat1) + parseFloat(obstructions_rectangular[index].lat2) + parseFloat(obstructions_rectangular[index].lat3) + parseFloat(obstructions_rectangular[index].lat4))/4.0;
			longitude = (parseFloat(obstructions_rectangular[index].long1) + parseFloat(obstructions_rectangular[index].long2) + parseFloat(obstructions_rectangular[index].long3) + parseFloat(obstructions_rectangular[index].long4))/4.0;
			name = obstructions_rectangular[index].name;
			type = obstructions_rectangular[index].type;
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
			title: 'Name: ' + name + ' , ' + type + ' , ' + shape + ' , #' + index,
			map: map
		});
		if(shape == 'circle') {
			markers_circular.push(marker);
		}
		else {
			markers_rectangular.push(marker);
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
		}
	}

	
	
 
 	var obstructions_circular;
 	var obstructions_rectangular;
	function fetch_dataset() {
		$.ajax({
			url : 'http://127.0.0.1/urban_planning/fetch_location_circular.php',
			type : 'GET',
			async : false,
			success : function(response) {
				obstructions_circular = JSON.parse(response);
				for (var i = 0; i < obstructions_circular.length; i++) {
					place_marker(i, "circle");
				};
			},
			error : function(response) {
				console.log('Failed to load Dataset');
			}
		});
		$.ajax({
			url : 'http://127.0.0.1/urban_planning/fetch_location_rectangular.php',
			type : 'GET',
			async : false,
			success : function(response) {
				obstructions_rectangular = JSON.parse(response);
				for (var i = 0; i < obstructions_rectangular.length; i++) {
					place_marker(i, "rectangle");
				};
			},
			error : function(response) {
				console.log('Failed to load Dataset');
			}
		});
	}
	
	var details_circular = {};
	var details_rectangular = {};

	function find_intersection() {
		find_intersection_circular();
		find_intersection_rectangular();
	}

	function construction_cost() {
		var total = 0;
		for (var i = 0; i < costArray_rectangular.length; i++) {
			total+=costArray_rectangular[i];
		};
		for (var i = 0; i < costArray_circular.length; i++) {
			total+=costArray_circular[i];
		};
		if(total < budget) {
			$.simplyToast('Total Construction Cost: ' + total + '<br/>' + 'Total Budget Remanining: ' + budget  + '<br/>' + 'Negotiations Remanining ' + live_negotiations.length, 'success', {'delay' : 7000});	
		}
		else {
			$.simplyToast('Total Construction Cost: ' + total + '<br/>' + 'Total Budget: ' + budget + '<br/>' + 'Negotiations Remanining ' + live_negotiations.length, 'danger', {'delay' : 7000});
		}
		//$.simplyToast('Total construction cost: ' + total, 'info', {'delay' : 7000});
		//$.simplyToast('Total Budget: ' + budget, 'info', {'delay' : 7000});
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

			for (var j = 0; j < intermediatePoints.length; j++) {
				var p2 = new google.maps.LatLng(intermediatePoints[j][0], intermediatePoints[j][1]);
				if(google.maps.geometry.poly.containsLocation(p2, rectangle)) {
					details_rectangular[i][j] = parseInt(obstructions_rectangular[i].cost, 10); // hack
					total+=details_rectangular[i][j];
				}
			};
			costArray_rectangular.push(Math.ceil(total));
			// negotiation for rectangles to be taken care of
		};

		if(markers_rectangular == []) {
			return;
		}

		for (var i = 0; i < markers_rectangular.length; i++) {
			// add code here
			var marker = markers_rectangular[i];
			var infowindow = new google.maps.InfoWindow({
				width: "80px"
			});
			
			google.maps.event.addListener(marker, 'mouseover', function(event) {
				console.log(event.latLng.lat() + ' % ' + event.latLng.lng());
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
				var content = '<div class="scrollFix">Cost details_rectangular<br />';
				var total = 0;
				for (points in details_rectangular[index]) {
					flag = true;
					console.log(points + ' ' + details_rectangular[index][points]);
					content+= '#' + points + ' ' + details_rectangular[index][points] + '<br/>';
					total+= parseInt(details_rectangular[index][points]);
				}
				if(flag) {
					content+= 'Total Cost: ' + total;
					content+='</div>'
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
					details_circular[i][j] = (parseInt(obstructions_circular[i].radial) - parseInt(distance))*parseInt(obstructions_circular[i].cost);
					total+=parseInt(details_circular[i][j], 10);
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
					console.log(points + ' ' + details_circular[index][points]);
					content+= '#' + points + ' ' + details_circular[index][points] + '<br/>';
					total+= parseInt(details_circular[index][points]);
				}
				if(flag) {
					content+= 'Total Cost: ' + total;
					content+='</div>'
					infowindow.setContent(content);
	    			infowindow.open(map, this);
	    		}
			});

			google.maps.event.addListener(marker,'mouseout',function() {
				infowindow.close(map,this);
			});
		}
	}

	function find_cost_of_new_road() {
		var new_total = 0;
		for (var i = 0; i < obstructions_circular.length; i++) {
			var p1 = new google.maps.LatLng(obstructions_circular[i].latitude, obstructions_circular[i].longitude);
			for (var j = 0; j < SafePathPoints.length; j++) {
				var p2 = SafePathPoints[j][1];
				var distance = google.maps.geometry.spherical.computeDistanceBetween(p1,p2);
				if (distance < obstructions_circular[i].radial) {
					var temp = (parseInt(obstructions_circular[i].radial) - parseInt(distance))*parseInt(obstructions_circular[i].cost);
					new_total+=Math.ceil(temp);
				}
			}
		}

		for (var i = 0; i < obstructions_rectangular.length; i++) {
			var rectCoords = [
				new google.maps.LatLng(obstructions_rectangular[i].lat1, obstructions_rectangular[i].long1),
				new google.maps.LatLng(obstructions_rectangular[i].lat2, obstructions_rectangular[i].long2),
				new google.maps.LatLng(obstructions_rectangular[i].lat3, obstructions_rectangular[i].long3),
				new google.maps.LatLng(obstructions_rectangular[i].lat4, obstructions_rectangular[i].long4),
			];

			var rectangle = new google.maps.Polygon({
				paths: rectCoords
			});

			for (var j = 0; j < SafePathPoints.length; j++) {
				var p2 = SafePathPoints[j][1];
				if(google.maps.geometry.poly.containsLocation(p2, rectangle)) {
					new_total+=Math.ceil(obstructions_rectangular[i].cost); // hack
				}
			};
		};
		//console.log('~ ' + new_total);
		$.simplyToast('Cost of this suggested route is ' + new_total, 'success', {'delay' : 10000});
	}

	function change_player() {
		$('#non-player').hide();
		$('#player').show();
		fetch_dataset();
	}

	function new_marker() {
		google.maps.event.removeListener(listener_manager);
		var polyOptions = {
			strokeColor: '#000000',
			strokeOpacity: 1.0,
			strokeWeight: 3
		}
		poly = new google.maps.Polyline(polyOptions);
		poly.setMap(map);
		line_lisner = google.maps.event.addListener(map, 'click', addLatLng);
	}

	function addLatLng(event) {
		line = poly.getPath();
		line.push(event.latLng);
		var new_point = [event.latLng.lat(), event.latLng.lng()];
		marked_byuser.push(new_point);
		if (marked_byuser.length > 1) {
			var p1 = new google.maps.LatLng(marked_byuser[marked_byuser.length-2][0], marked_byuser[marked_byuser.length-2][1]);
			var p2 = new google.maps.LatLng(marked_byuser[marked_byuser.length-1][0], marked_byuser[marked_byuser.length-1][1]);
			var dis_in_metres =  google.maps.geometry.spherical.computeDistanceBetween(p1,p2);
			road_length+=dis_in_metres;
			getintermediatepts(marked_byuser[marked_byuser.length - 2], marked_byuser[marked_byuser.length - 1], factor);
		}
		
		marker = new google.maps.Marker({
			position: event.latLng,
			title: '#' + line.getLength(),
			map: map,
		});
	}

	Number.prototype.toRad = function() {
		return this * Math.PI / 180;
	}

	Number.prototype.toDeg = function() {
		return this * 180 / Math.PI;
	}

	google.maps.LatLng.prototype.destinationPoint = function(brng, dist) {
		dist = dist / 6371;  
		brng = brng.toRad();

   		var lat1 = this.lat().toRad(), lon1 = this.lng().toRad();
   		var lat2 = Math.asin(Math.sin(lat1) * Math.cos(dist) + 
                        Math.cos(lat1) * Math.sin(dist) * Math.cos(brng));

   		var lon2 = lon1 + Math.atan2(Math.sin(brng) * Math.sin(dist) *
                                Math.cos(lat1), 
                                Math.cos(dist) - Math.sin(lat1) *
                                Math.sin(lat2));

   		if (isNaN(lat2) || isNaN(lon2)) return null;
   		return new google.maps.LatLng(lat2.toDeg(), lon2.toDeg());
	}

	function find_changed_point(sourceIndex) {
		console.log('Source Received is ' +  sourceIndex);
		/*// find a point from
		obstructions_circular[sourceIndex]['latitude'];
		obstructions_circular[sourceIndex]['longitude'];

		// in direction of
		intermediatePoints[destinationIndex][0];
		intermediatePoints[destinationIndex][1];

		// at a distance of
		obstructions_circular[sourceIndex]['radial'];*/

		var pointA = new google.maps.LatLng(obstructions_circular[sourceIndex]['latitude'], obstructions_circular[sourceIndex]['longitude']);
		var dist = obstructions_circular[sourceIndex]['radial'];

		var pointB = pointA.destinationPoint(90, dist/1000);
		console.log('new point is ' + pointB);
		return [pointB.k, pointB.B];
	}

	function getintermediatepts(pq, rs, k) {
	    var p = pq[0];
	    var q = pq[1];
	    var r = rs[0];
	    var s = rs[1];
	    var dis = (r - p) * (r - p) + (s - q) * (s - q);
	    if (k * k >= (r - p) * (r - p) + (s - q) * (s - q))
	        return;
	    var a = (s - q) / (r - p);
	    var b = q - a * p;
	    var det_b = 2 * a * (b - q) - 2 * p;
	    var det_c = p * p + (b - q) * (b - q) - k * k;
	    var det_a = (1 + a * a);
	    var x1 = ((-1 * det_b) + Math.sqrt((det_b * det_b) - (4 * det_a * det_c))) / (2 * det_a);
	    var x2 = ((-1 * det_b) - Math.sqrt((det_b * det_b) - (4 * det_a * det_c))) / (2 * det_a);
	    var content = intermediatePoints.length;
	    if (x1 >= p && x1 <= r) {
	        var temp = [x1, a * x1 + b];
	        var latlng = new google.maps.LatLng(temp[0], temp[1]);
    	    marker = new google.maps.Marker({
                position: latlng,
                map: map,
                title: '#' + content,
                icon: 'http://www.googlemapsmarkers.com/v1/FFFF00/'
            });
			intermediatePoints.push(temp);
	    } else {
	        var temp1 = [x2, a * x2 + b];
	        var latlng = new google.maps.LatLng(temp1[0], temp1[1]);
	        marker = new google.maps.Marker({
                position: latlng,
                map: map,
                title: '#' + content,
                icon: 'http://www.googlemapsmarkers.com/v1/FFFF00/'
            });
	        intermediatePoints.push(temp1);
	    }
	    getintermediatepts(pq, rs, k + factor);
	}

	/* Negotiation Code Begins */
	var temp_obstructions = [];
	var temp_obstructions_rectangular = [];
	var temp_costArray = [];

	var costArray_circular = [];
	var costArray_rectangular = [];
	var live_negotiations = [];
	var offer_string = " is ready to give you approval for proceeding with construction for Rs. ";
	var divopen = "<div>";
	var divclose = "</div>";
	var get_offer = "Submit your offer: <input type='text' id='offer_by_builder' name='offer'><button onclick='javascript:negotiate()'>Submit</button>";
	
	function PopulateNegotiationPlaces()
	{
		$('#negotiation').css('display' , 'inline');
		$('#safe_path').css('display' , 'none');
		$('#map-canvas').css('width' , '75%');
		clearOverlays();
		remove();
		//$('#negotiation').css('display' , 'inline');
		//$('#map-canvas').css('width' , '75%');

		for (var i = 0; i < costArray_circular.length; i++) {
			if (costArray_circular[i]!=0) {
				temp_obstructions.push(obstructions_circular[i]);
				temp_costArray.push(costArray_circular[i]);
			}
		};

		for (var i = 0; i < costArray_rectangular.length; i++) {
			if (costArray_rectangular[i]!=0) {
				temp_obstructions.push(obstructions_rectangular[i]);
				temp_costArray.push(costArray_rectangular[i]);
			}
		};

		var select = document.getElementById("negotiation-places");
		//console.log(temp_obstructions.length);
		for (var i = 0; i < temp_obstructions.length; i++)
		{
			var obstruction = temp_obstructions[i];
			//console.log(obstruction['name']);
			var linear_step =  Math.round((temp_costArray[i] - Math.round((temp_costArray[i]*(100-obstruction['margin']))/100))/5);
			var pres_negotiation = {done: 0, minimum_final: Math.round((temp_costArray[i]*(100-obstruction['margin']))/100),
			pres_offered_to_builder: temp_costArray[i],  pres_offered_by_builder: 0, step : linear_step};
			live_negotiations.push(pres_negotiation); 
			var op = document.createElement("option");
			op.textContent = obstruction.name;
			op.value = obstruction.name;
			select.appendChild(op);
		}
	}

	function UpdateNegotiationPanel()
	{
		var negotiationPanel = document.getElementById('ongoing_negotiation');
		var select = document.getElementById('negotiation-places').selectedIndex;
		if(select==0)
		{
			negotiationPanel.innerHTML = "";
		}
		else
		{
			console.log(select-1);
			negotiationPanel.innerHTML = divopen + temp_obstructions[select-1].name + offer_string + 
			live_negotiations[select-1].pres_offered_to_builder	+ divclose 
			if(live_negotiations[select-1].pres_offered_to_builder<=live_negotiations[select-1].minimum_final)
			{
				negotiationPanel.innerHTML+=divopen + "<b>FINAL OFFER<b>" + divclose
			}
			negotiationPanel.innerHTML+= divopen + get_offer + divclose;
		}
	}
	
	function negotiationselectionchanged()
	{
		//alert("selection changed");
		var select = document.getElementById('negotiation-places').selectedIndex;
		
		if(live_negotiations[select-1].done == 0)
		{
			UpdateNegotiationPanel();
		}
		console.log(temp_obstructions[select-1].name);
	}
	
	function dealdone(select, offerMade)
	{
		
		if(NegotiationCost + offerMade > budget)
		{
			$.simplyToast('Out of Your Budget :(', 'warning');
		}
		else
		{
			$.simplyToast('Dealdone for ' + offerMade, 'success');
			NegotiationCost += offerMade;
			budget -= offerMade;
			document.getElementById("negotiation-places").remove(select);
			live_negotiations.splice(select-1,1);
			temp_obstructions.splice(select-1,1);
		}
	}
	
	function negotiate()
	{
		var offerMade = parseInt(document.getElementById("offer_by_builder").value);
		var select = document.getElementById('negotiation-places').selectedIndex;
		if(offerMade < live_negotiations[select-1].pres_offered_by_builder)
		{
			alert('invalid offer: less than your last offer');
		}
		else
		{
			live_negotiations[select-1].pres_offered_by_builder = offerMade;
			if(offerMade >= live_negotiations[select-1].pres_offered_to_builder)
			{
				dealdone(select, offerMade);
			}
			else
			{
				//live_negotiations[select-1].pres_offered_to_builder -= live_negotiations[select-1].minimum_final 
				//+ (live_negotiations[select-1].pres_offered_to_builder - live_negotiations[select-1].minimum_final)/2;
				live_negotiations[select-1].pres_offered_to_builder -= live_negotiations[select-1].step;
				live_negotiations[select-1].pres_offered_to_builder = Math.floor(live_negotiations[select-1].pres_offered_to_builder);
				//live_negotiations[select-1].pres_offered_to_builder = Math.floor(live_negotiations[select-1].pres_offered_to_builder);
				if(live_negotiations[select-1].pres_offered_to_builder <= offerMade)
				{
					dealdone(select, offerMade);
				}
			}
			UpdateNegotiationPanel();
		}
		console.log(offerMade);
	}
	/* Negotiation Code Ends */

	/* Safe Path Code Starts */
	var SafePathPoints = [];
	var obstructions_present = [];
	var SelectedObstructions_circular;
	var SelectedObstructions_rectangular;
	var SafePathMarkers = [];
	var SafeFlightPathMarkers = [];
	var SafePathMarkers_index = [];
	function PopulateObstructionsForSafePath()
	{
		$('#negotiation').css('display' , 'none');
		$('#safe_path').css('display' , 'inline');
		$('#map-canvas').css('width' , '75%');

		for (var i = 0; i < costArray_circular.length; i++) {
			if (costArray_circular[i]!=0) {
				obstructions_present.push([i,obstructions_circular[i],'c']);
			}
		};
		for (var i = 0; i < costArray_rectangular.length; i++) {
			if (costArray_rectangular[i]!=0) {
				obstructions_present.push([i,obstructions_rectangular[i],'r']);
			}
		};
		var form = document.getElementById("obstructions_checklist");
		console.log(obstructions_present.length);
		for (var i = 0; i < obstructions_present.length; i++)
		{
			var obstruction = obstructions_present[i];
			console.log(obstruction[1]['name']);
			var cb =  document.createElement('input');
			cb.type = 'checkbox';
			cb.id = i;
			cb.value = obstruction[1]['name'];
			var label = document.createElement('label')
			label.htmlFor = obstruction[0];
			label.appendChild(document.createTextNode(obstruction[1]['name']));
			form.appendChild(label);
			form.appendChild(cb);

			form.appendChild(document.createElement("br"));
			form.appendChild(document.createElement("br"));
		}
		var submit = document.createElement('input');
		submit.type = "submit";
		submit.name = "submitButton";
		submit.value = "Find Safe Path";
		form.appendChild(submit);
	}
	function costOf(p)
	{
		var cost = 0;
		for(var i = 0; i < obstructions_circular.length; i++)
		{
			var p1 = new google.maps.LatLng(obstructions_circular[i].latitude, obstructions_circular[i].longitude);
			var distance = google.maps.geometry.spherical.computeDistanceBetween(p1,p);
				if (distance < obstructions_circular[i].radial) {
					cost += (parseInt(obstructions_circular[i].radial) - distance)*parseInt(obstructions_circular[i].cost);
				}
		}
		// TODO:
		for (var i = 0; i < obstructions_rectangular.length; i++) {
			//cost+=SelectedObstructions_rectangular[i]
			
			//var ind = obstructions_rectangular[i][0];
			var ind = i;
			var rectCoords = [
				new google.maps.LatLng(obstructions_rectangular[ind].lat1, obstructions_rectangular[ind].long1),
				new google.maps.LatLng(obstructions_rectangular[ind].lat2, obstructions_rectangular[ind].long2),
				new google.maps.LatLng(obstructions_rectangular[ind].lat3, obstructions_rectangular[ind].long3),
				new google.maps.LatLng(obstructions_rectangular[ind].lat4, obstructions_rectangular[ind].long4),
			];

			var rectangle = new google.maps.Polygon({
				paths: rectCoords
			});

			if(google.maps.geometry.poly.containsLocation(p, rectangle)) {
					//details_rectangular[i][j] = obstructions_rectangular[i].cost; // hack
					cost += parseInt(obstructions_rectangular[i].cost);
			}
		};
		return cost;
	}

	function GetPointOnRectangle(p, vertices, ind,k) {
		var x1 = p.lat();
		var y1 = p.lng();
		var x2, y2;
		if(ind > 0)
		{
			x2 = intermediatePoints[ind-1][0];
			y2 = intermediatePoints[ind-1][1];
		}
		else
		{
			x2 = intermediatePoints[ind+1][0];
			y2 = intermediatePoints[ind+1][1];
			//console.log('here');	
		}
		for(var i = 0; i < 4; i++)
		{
			p1 = vertices.getAt(i);
			p2 = vertices.getAt((i+1)%4);
			var m = (p2.lng() - p1.lng())/(p2.lat() - p1.lat());
			var c = p1.lng() - m*(p1.lat());
			var m1 = (x1 - x2)/(y2 - y1);
			var m2 = (-1)/m1;
			var px = (m1*x1 + c - y1)/(m1- m);
			var py = m*px + c;
			var sign = py - m2*px - (y1 - m2*x1);
			var pt = new google.maps.LatLng(px,py);
			var minn = 1000000000;
			var minpt;
			//console.log(k + ' sign: ' + sign);
			if((k == 0 && sign >= 0) || (k == 1 && sign <= 0))
			{
				if(google.maps.geometry.spherical.computeDistanceBetween(p,pt) < minn)
				{
					minn = google.maps.geometry.spherical.computeDistanceBetween(p,pt);
					minpt = pt;

				}
			}
		}
		//console.log('out of loop' + minpt.lat() + minpt.lng());
		return minpt;
	}

	function GetRadialPoint_circular(p1, p2, radial_dist, ind, distance, cost, ob_ind)
	{
		console.log(radial_dist);
		radial_dist = parseInt(radial_dist, 10) + 5.0;
		console.log(radial_dist);
		var interpolated = google.maps.geometry.spherical.interpolate(p1, p2, (radial_dist/distance));
		//var interpolated = myExtrapolate(p1, p2, radial_dist, radial_dist - distance);
		console.log(google.maps.geometry.spherical.computeDistanceBetween(p1,interpolated) + ' and ' + radial_dist);
		console.log([interpolated.lat(), interpolated.lng(	)]);
		if(costOf(interpolated) < SafePathPoints[ind][0])
		{
			SafePathPoints[ind] = [costOf(interpolated), interpolated, ob_ind, 'c'];
			console.log('For obstruction ' + [p1.lat(),p1.lng()] + ' and intermediate ' 
			+ [p2.lat(), p2.lng()] + ' safe point: ' + SafePathPoints[ind]);
		}
	}
	
	function myExtrapolate(p1, p2, m, n) {
		var x1 = p1.lat();
		var y1 = p1.lng();
		var x2 = p2.lat();
		var y2 = p2.lng();
		var x = ((m*x2 - n*x1)/(m - n));
		var y = ((m*y2 - n*y1)/(m - n)); 
		return new google.maps.LatLng(x,y);
	}

	function GetRadialPoint_rectangular(rectangle, p, ind, ob_ind,pos) {
			// TODO: 
			
			var vertices = rectangle.getPath();
			//console.log(vertices);
			var midPoint = GetPointOnRectangle(p,vertices,ind,pos);
		
			var dist = google.maps.geometry.spherical.computeDistanceBetween(p,midPoint);
			//var interpolated = google.maps.geometry.spherical.interpolate(p, midPoint, 2.0);
			var interpolated = myExtrapolate(p, midPoint, dist + 5.0, 5.0);
			if(costOf(interpolated) <= SafePathPoints[ind][0])
			{
				SafePathPoints[ind] = [costOf(interpolated), interpolated, ob_ind, 'r'];
				console.log('updated Safepathpoint for a rect at ' + interpolated.lat() + ' ' + interpolated.lng() + ' ' + pos);
			}
	}

	function clearOverlays()
	{
		console.log(' in clearOverlays ');
		for(var i = 0; i < SafePathMarkers.length; i++)
		{
			SafePathMarkers[i].setMap(null);
			SafePathMarkers[i] = null;
		}
		SafePathMarkers = [];
		SafePathPoints = [];
		for (var i = 0; i < SafeFlightPathMarkers.length; i++) {
			SafeFlightPathMarkers[i].setMap(null);
			SafeFlightPathMarkers[i]=null;
		};
		SafeFlightPathMarkers = [];
	}

	function isBetter(path1, path2)
	{
		var dis1;
		var dis2;
		dis1 = 0;
		dis2 = 0;
		for(var i = 0; i < intermediatePoints.length; i++)
		{
			var p = new google.maps.LatLng(intermediatePoints[i][0], intermediatePoints[i][1]);
			dis1 = dis1 +  google.maps.geometry.spherical.computeDistanceBetween(p, path1[i][1]);
			dis2 = dis2 +  google.maps.geometry.spherical.computeDistanceBetween(p, path2[i][1]);
			//console.dir(path1[1]);
		}
		console.log(dis1 + ' ' + dis2);
		if(dis1 <= dis2)
			return true;
		return false;
	}

	function CreateSafePath()
	{
		clearOverlays();
		for(var i = 0; i < intermediatePoints.length; i++)
		{
			SafePathPoints.push([1000000000, new google.maps.LatLng(intermediatePoints[i][0], intermediatePoints[i][1]), -1, 't']);
		}
		SelectedObstructions_circular = [];
		SelectedObstructions_rectangular = [];

		var form = document.getElementById('obstructions_checklist');
		for(var i = 0; i < form.elements.length; i++)
		{
			if(form.elements[i].type == 'checkbox' && form.elements[i].checked == true)
			{
				if(obstructions_present[parseInt(form.elements[i].id, 10)][2] == 'c') {
					// index doubt
					SelectedObstructions_circular.push([obstructions_present[parseInt(form.elements[i].id, 10)][0], obstructions_present[parseInt(form.elements[i].id, 10)][1]]);
				}
				else {
					SelectedObstructions_rectangular.push([obstructions_present[parseInt(form.elements[i].id, 10)][0], obstructions_present[parseInt(form.elements[i].id, 10)][1]]);
				}
				//SelectedObstructions.push([parseInt(form.elements[i].id, 10), obstructions[parseInt(form.elements[i].id, 10)]]);
			}
		}
		//console.log(SelectedObstructions.length);
		for (var i = 0; i < SelectedObstructions_circular.length; i++) 
		{
			var p1 = new google.maps.LatLng(SelectedObstructions_circular[i][1].latitude, SelectedObstructions_circular[i][1].longitude);
			for (var j = 0; j < intermediatePoints.length; j++) 
			{
				var p2 = new google.maps.LatLng(intermediatePoints[j][0], intermediatePoints[j][1]);
				var distance = google.maps.geometry.spherical.computeDistanceBetween(p1,p2);
				if (distance < SelectedObstructions_circular[i][1].radial)  
				{
					GetRadialPoint_circular(p1,p2,SelectedObstructions_circular[i][1].radial,j,distance,details_circular[SelectedObstructions_circular[i][0]][j], SelectedObstructions_circular[i][0]);
				}
			}
		}
		// TODO
		for (var i = 0; i < SelectedObstructions_rectangular.length; i++) {
			//SelectedObstructions_rectangular[i]
			var ind = SelectedObstructions_rectangular[i][0];
			var rectCoords = [
				new google.maps.LatLng(obstructions_rectangular[ind].lat1, obstructions_rectangular[ind].long1),
				new google.maps.LatLng(obstructions_rectangular[ind].lat2, obstructions_rectangular[ind].long2),
				new google.maps.LatLng(obstructions_rectangular[ind].lat3, obstructions_rectangular[ind].long3),
				new google.maps.LatLng(obstructions_rectangular[ind].lat4, obstructions_rectangular[ind].long4),
			];

			var rectangle = new google.maps.Polygon({
				paths: rectCoords
			});
			var tempSafePath;
			for(var k=0; k < 2; k++)
			{
				for (var j = 0; j < intermediatePoints.length; j++) {
					var p = new google.maps.LatLng(intermediatePoints[j][0], intermediatePoints[j][1]);
					//console.log('Log Check');
					if(google.maps.geometry.poly.containsLocation(p, rectangle)) {
						//console.log('Obstructed');
						GetRadialPoint_rectangular(rectangle, p, j, SelectedObstructions_rectangular[i][0],k);
					}
				};
				if(k==0)
				{
					tempSafePath = SafePathPoints.slice();
					//for(var it = 0; it < SafePathPoints.)
				}
				else
				{
					if(!isBetter(SafePathPoints, tempSafePath))
					{
						console.log('better: false');
						SafePathPoints = [];
						SafePathPoints = tempSafePath.slice();
						console.log('better: false2');
					}
				}
			}
		}
		
		for(var i = 0; i < SafePathPoints.length; i++)
		{
			//console.log(SafePathPoints[i][0] + ' '  + SafePathPoints[i][1] + ' '  + SafePathPoints[i][2] + ' '  );
			if(SafePathPoints[i][2] != -1)
			{
				var title_to_display;
				var old_path_latitude;
				var old_path_longitude;
				//var old_pos;
				if(SafePathPoints[i][3] == 'c') {
					title_to_display='From ' + obstructions_circular[SafePathPoints[i][2]]['name'] + ' , circular';
					//old_pos = intermediatePoints[i];
					old_path_latitude = intermediatePoints[i][0];
					old_path_longitude = intermediatePoints[i][1];
				}
				else {
					title_to_display='From ' + obstructions_rectangular[SafePathPoints[i][2]]['name'] + ' , rectangular';
					//old_pos = intermediatePoints[i];
					old_path_latitude = intermediatePoints[i][0];
					old_path_longitude = intermediatePoints[i][1];
				}
				//console.log(old_path_latitude + ' ' + old_path_longitude + 'old_path');
				
				var to_be_inserted_marker = new google.maps.Marker({
					position: SafePathPoints[i][1],
					map: map,
					title: title_to_display,
					icon: 'http://www.googlemapsmarkers.com/v1/FFFFFF/'
				})
				
				SafePathMarkers.push(to_be_inserted_marker);
				SafePathMarkers_index.push(i);

				google.maps.event.addListener(to_be_inserted_marker, 'mouseover', function(event) {
					//console.log('over registered');
					var lat = event.latLng.lat();
					var lng = event.latLng.lng();
					for(var j = 0; j < SafePathPoints.length; j++) {
						if(SafePathPoints[j][1].lat() == lat && SafePathPoints[j][1].lng() == lng) {
							//console.log('found_over');
							var obstruction_index = SafePathPoints[j][2];
							var entity_type = SafePathPoints[j][3];

							if(entity_type == 'c') {
								var changed_marker = markers_circular[obstruction_index];
								changed_marker.setAnimation(google.maps.Animation.BOUNCE);
							}
							else {
								var changed_marker = markers_rectangular[obstruction_index];
								changed_marker.setAnimation(google.maps.Animation.BOUNCE);
							}
							break;
						}
					}
				});
				
				google.maps.event.addListener(to_be_inserted_marker, 'mouseout', function(event) {
					var lat = event.latLng.lat();
					var lng = event.latLng.lng();
					
					
					for (var j = 0; j < SafePathMarkers.length; j++) {
						console.dir(this);
						if(this == SafePathMarkers[j]) {
							console.log('found ' + j);
							var new_index = SafePathMarkers_index[j];
							if(SafePathPoints[new_index][2] != -1) {
								var obstruction_index = SafePathPoints[new_index][2];
								var entity_type = SafePathPoints[new_index][3];
								if(entity_type == 'c') {
									markers_circular[obstruction_index].setAnimation(null);
								}
								else {
									markers_rectangular[obstruction_index].setAnimation(null);
								}
								break;	
							}
						}
					};
				});
				
				console.log('~ ' + old_path_latitude + ' ' + old_path_longitude);
				
				var flightPlanCoordinates = [
					new google.maps.LatLng(old_path_latitude, old_path_longitude),
					SafePathPoints[i][1],
				];
				var flightPath = new google.maps.Polyline({
					path: flightPlanCoordinates,
					strokeColor: '#FFFFFF',
					strokeOpacity: 1.0,
					strokeWeight: 2,
					map: map,
				});
				SafeFlightPathMarkers.push(flightPath);
			}
		}
		find_cost_of_new_road();
	}
	/* Safe Path Code Ends */