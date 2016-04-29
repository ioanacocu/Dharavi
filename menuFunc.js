var current_points = [];
var shape_entered, name_entered, type_entered, radial_entered, cost_entered, margin_entered;
var newCircles=[];
var newRectangles=[];

function tag_dataset() {
		//remove();
		if(shape_entered == 'circle') {
			 poly = new google.maps.Polyline({
    				strokeColor: '#000000',
    				strokeOpacity: 1.0,
   					strokeWeight: 3
 					 });
			map.addListener('click', addLatLng);
			var latCirc;
			var longCirc;
			 console.log('circle received at tag_dataset');
			$.simplyToast('Select the center of the circle');
			google.maps.event.addListener(map, 'click', function(event){
				console.log(event);
				
				var latitude = event.latLng.lat();
				var longitude = event.latLng.lng();
				if(google.maps.geometry.poly.containsLocation(event.latLng, dharavi)) {

				current_points.push([latitude, longitude]);
				console.log(latitude + ' ' + longitude);

				}
				else
					{$.simplyToast('Please select a point inside the Dharavi area');
					path.pop();
					 propMarkers[propMarkers.length-1].setMap(null);
						}
				if(current_points.length==1){
				$.simplyToast('Select the radius of the circle');
				latCirc=latitude;
				longCirc=longitude;
				}
				if(current_points.length==2){
					var p1 = new google.maps.LatLng(current_points[0][0], current_points[0][1]);
					var p2 = new google.maps.LatLng(current_points[1][0], current_points[1][1]);
					radial_entered =  google.maps.geometry.spherical.computeDistanceBetween(p1,p2);

					console.log(event);
					var currCircle=new Object();
					currCircle.latitude = latCirc;
					currCircle.longitude= longCirc;
					currCircle.nameP = name_entered;
					currCircle.typeP = type_entered;
					currCircle.radial = radial_entered;
					currCircle.cost = cost_entered;
					currCircle.margin = margin_entered;
					currCircle.owner=user;
					var fig = new google.maps.Circle({
      					strokeColor: '#FF0000',
      					strokeOpacity: 0.8,
      					strokeWeight: 2,
      					fillColor: '#FF0000',
      					fillOpacity: 0.35,
     					center: p1,
     				 radius: radial_entered
   					 });
					currCircle.figure=fig;
					currCircle.figure.setMap(map);
					
					//data = {};
					newCircles.push(currCircle);
					
					current_points = [];
					remove();

					console.log('Printing data');
					console.log(currCircle);
					console.log(newCircles.length);
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

					
				}
				});
			}
		else {
			 poly = new google.maps.Polyline({
    				strokeColor: '#000000',
    				strokeOpacity: 1.0,
   					strokeWeight: 3
 					 });

			
			console.log('rectangle received at tag_dataset');
			$.simplyToast('Select 4 points');
			map.addListener('click', addLatLng);
			google.maps.event.addListener(map, 'click', function(event){
				var latitude = event.latLng.lat();
				var longitude = event.latLng.lng();

				if(google.maps.geometry.poly.containsLocation(event.latLng, dharavi)) {
					 
				current_points.push([latitude, longitude]);
				console.log(latitude + ' ' + longitude);

				}
				else
					{
						$.simplyToast('Please select a point inside the Dharavi area');
						var line = [];
					     line.push(poly);
					     console.log(path.length);
					     path.pop();
						 propMarkers[propMarkers.length-1].setMap(null);
 							}
				console.log(current_points.length);

				if(current_points.length == 4) {
					//data = {};
					var currRectangle=new Object();
					currRectangle.lat1 = current_points[0][0];
					currRectangle.long1 = current_points[0][1];
					currRectangle.lat2 = current_points[1][0];
					currRectangle.long2 = current_points[1][1];
					currRectangle.lat3 = current_points[2][0];
					currRectangle.long3 = current_points[2][1];
					currRectangle.lat4 = current_points[3][0];
					currRectangle.long4 = current_points[3][1];
					currRectangle.nameP = name_entered;
					currRectangle.typeP = type_entered;
					currRectangle.cost = cost_entered;
					currRectangle.margin = margin_entered;
					currRectangle.owner=user;
					var Pth = [new google.maps.LatLng(current_points[0][0], current_points[0][1]),
					 new google.maps.LatLng(current_points[1][0], current_points[1][1]),
					 new google.maps.LatLng(current_points[2][0], current_points[2][1]),
					 new google.maps.LatLng(current_points[3][0], current_points[3][1]),
					 new google.maps.LatLng(current_points[0][0], current_points[0][1])];
					var fig = new google.maps.Polygon({
						paths:Pth,
      					strokeColor: '#FF0000',
      					strokeOpacity: 0.8,
      					strokeWeight: 2,
      					fillColor: '#FF0000',
      					fillOpacity: 0.35,
     				 });
					currRectangle.figure=fig;
					currRectangle.figure.setMap(map);
					newRectangles.push(currRectangle);
					
					current_points = [];
					remove();

					console.log('Printing data');
					console.log(currRectangle);
					console.log(newRectangles.length);
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
					

				}
			});
		}
	}

	function remove(){
		google.maps.event.clearListeners(map, 'click');
		google.maps.event.clearListeners(map, 'polygoncomplete');
		//hide_manager();
	}



	function PopulateNewSelections()
	{
		$('#addition').css('display' , 'block');
		$('#safe_path').css('display' , 'none');
		$('#map-canvas').css('width' , '75%');

		//clearOverlays();
		remove();
		//$('#negotiation').css('display' , 'inline');
		//$('#map-canvas').css('width' , '75%');

		var select=[];
		select = document.getElementById("add-places");
		for (var i=select.length-1; i>0;i--)
			select.remove(i);
		//console.log(temp_obstructions.length);
		for (var i = 0; i < newCircles.length; i++)
		{
			var figure = newCircles[i];
			var op = document.createElement("option");
			op.textContent = figure.nameP;
			op.value = figure.nameP;
			//op.value[1]="circle";
			select.appendChild(op);
		}

		for (var i = 0; i < newRectangles.length; i++)
		{
			var figure = newRectangles[i];
			var op = document.createElement("option");
			op.textContent = figure.nameP;
			op.value = figure.nameP;
			//op.value[1]="rectangle";
			select.appendChild(op);
		}


		$("#finishAdd").click(function(){
			var element=document.getElementById("addition");
			element.style.display='none';
			$('#map-canvas').css('width' , '100%');


		});

		$("#addbtn").click(function(){
			var index = document.getElementById('add-places').selectedIndex;
			var select = document.getElementById('add-places');
			if(select.length-1==(newRectangles.length+newCircles.length)){
			if(index<=newCircles.length) {

				  $.post("insert_location_circular.php",{ name: newCircles[index-1].nameP, latitude: parseFloat(newCircles[index-1].latitude), longitude:parseFloat(newCircles[index-1].longitude), 
				  	type:newCircles[index-1].typeP, radial:parseFloat(newCircles[index-1].radial), cost:parseInt(newCircles[index-1].cost), 
				  	margin:parseInt(newCircles[index-1].margin), owner:newCircles[index-1].owner},
				  	function(data) {
		   if(data=='You have Successfully Registered.....')
		   {
			$("form")[0].reset();
		   }
		   alert(data);
		});

		 	    
				
				console.log("inserting");
				newCircles[index-1].figure.setOptions({strokeWeight: 2.0, fillColor: 'blue'});
				newCircles.splice(index-1,1);
			}
			
			 else
			 {
			 	 $.post("insert_location_rectangular.php",{ name: newRectangles[index-1-newCircles.length].nameP, 
			 	 	lat1: parseFloat(newRectangles[index-1-newCircles.length].lat1), long1:parseFloat(newRectangles[index-1-newCircles.length].long1),
			 	 	lat2: parseFloat(newRectangles[index-1-newCircles.length].lat2), long2:parseFloat(newRectangles[index-1-newCircles.length].long2),
			 	 	lat3: parseFloat(newRectangles[index-1-newCircles.length].lat3), long3:parseFloat(newRectangles[index-1-newCircles.length].long3),
			 	 	lat4: parseFloat(newRectangles[index-1-newCircles.length].lat4), long4:parseFloat(newRectangles[index-1-newCircles.length].long4),
			 	 	type:newRectangles[index-1-newCircles.length].typeP, 
			 	 	cost:parseInt(newRectangles[index-1-newCircles.length].cost), margin:parseInt(newRectangles[index-1-newCircles.length].margin), 
			 	 	owner:newRectangles[index-1-newCircles.length].owner},
			 	  	function(data) {
		    if(data=='You have Successfully Registered.....')
		    {
			 $("form")[0].reset();
		    }
		   alert(data);
		});

		 	    
				
				console.log("inserting");
				newRectangles[index-1-newCircles.length].figure.setOptions({strokeWeight: 2.0, fillColor: 'blue'});
				newRectangles.splice(index-1-newCircles.length,1);

			}}
		}


		);
		$('#deletebtn').click(function(){
			var index = document.getElementById('add-places').selectedIndex;
			var select = document.getElementById('add-places');
			if(select.length-1==(newRectangles.length+newCircles.length)){
			if(index<=newCircles.length) {
				console.log(newCircles[index-1]);
				newCircles[index-1].figure.setMap(null);
				newCircles.splice(index-1,1);
				select.removeChild(select[index]);
			}
			else {
				console.log(newRectangles[index-newCircles.length-1]);
				newRectangles[index-1-newCircles.length].figure.setMap(null);
				newRectangles.splice(index-1-newCircles.length,1);
				select.removeChild(select[index]);
			}
		}

		});}
		
		var obstructions_circular;
		var obstructions_rectangular;


	function additionselectionchanged(){

		var select = document.getElementById('add-places');
		var index = document.getElementById('add-places').selectedIndex;
		var value=select.options[index].value;
		for (var i=0 ;i<newCircles.length; i++)
		{
			newCircles[i].figure.setOptions({strokeWeight: 2.0, fillColor: 'red'});
		}
		for (var i=0 ;i<newRectangles.length; i++)
		{
			newRectangles[i].figure.setOptions({strokeWeight: 2.0, fillColor: 'red'});
		}
		if(select.length-1==(newRectangles.length+newCircles.length)){
			if(index<=newCircles.length) {
				console.log(newCircles[index-1]);
				newCircles[index-1].figure.setOptions({strokeWeight: 2.0, fillColor: 'green'});
			}
			else {
				console.log(newRectangles[index-newCircles.length-1]);
				newRectangles[index-1-newCircles.length].figure.setOptions({strokeWeight: 2.0, fillColor: 'green'});
			}
		}

		console.log(select.length);
		console.log(newCircles.length);
		console.log(newRectangles.length);
		fetch_dataset();
		 
		
	}

function fetch_dataset(){
	$.ajax({
		 	url : 'fetch_location_circular.php',
		 	type : 'GET',
		 	async : true,
		 	success : function(response) {
		 		obstructions_circular = JSON.parse(response);
		 		for (var i = 0; i < obstructions_circular.length; i++) {
		 			place_marker(i, "circle");
		 			console.log(obstructions_circular[i]);
		 		};
		 	},
		 	error : function(response) {
		 		console.log('Failed to load Dataset');
		 	}
		 });
		$.ajax({
		 	url : 'fetch_location_rectangular.php',
		 	type : 'GET',
		 	async : true,
		 	success : function(response) {
		 		obstructions_rectangular = JSON.parse(response);
		 		for (var i = 0; i < obstructions_rectangular.length; i++) {
		 			console.log(obstructions_rectangular[i]);
		 			place_marker(i, "rectangle");

		 		};
		 	},
		 	error : function(response) {
		 		console.log('Failed to load Dataset');
		 	}
		 });
		
}

