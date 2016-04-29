var listener_manager;
var intermediatePoints = [];
var marked_byuser = [];
var distancepoints = [];
var geocoder;
var roadMarkers=[];
var roads_info=[];

var width_of_road;
var budget=0;
var dedctd_construction;
var road_length=0;
var rate_sqmt = 43055;
var obstruction_cost=0;

var SafePathPoints = [];
var obstructions_present = [];
var SelectedObstructions_circular;
var SelectedObstructions_rectangular;
var SafePathMarkers = [];
var SafeFlightPathMarkers = [];
var SafePathMarkers_index = [];

var allRoads=[];
var pathsR=[];
var ids=[];
var roadsContour=[];
var currRoad;

function new_marker() {
		//google.maps.event.removeListener(listener_manager);
		//map.removeListener(listener1);
		google.maps.event.clearListeners(map, 'click');
		var polyOptions = {
			strokeColor: '#000000',
			strokeOpacity: 1.0,
			strokeWeight: 3
		}
		poly = new google.maps.Polyline(polyOptions);
		poly.setMap(map);
		
		line_lisner =  map.addListener('click', addLatLngR);
	}

function reset(){
	var line = [];
	line.push(poly);
	
	 for (i=0; i<roadMarkers.length; i++) 
		{                           
 			 roadMarkers[i].setMap(null); 
		}
	roadMarkers=[];
	if (line.length>1){
	 for (i=0; i<line.length; i++) 
		{                           
 			try{ line[i].setMap(null); }
 			finally{}
		}}
	 for (var i = 0; i < markers_circular_figure.length; i++) {
    		markers_circular_figure[i].setMap(null);
 				 }
	//markers_circular=[];
	markers_circular_figure=[];	
		for (var i = 0; i < markers_rectangular_figure.length; i++) {
    		markers_rectangular_figure[i].setMap(null);
 				 }	
 	//markers_rectangular=[];
 	markers_rectangular_figure=[];
 	details_rectangular=[];
 	details_circular=[];
 	costArray_rectangular=[];
 	costArray_circular=[];
 	temp_obstructions=[];
 	temp_costArray=[];
 	live_negotiations=[];
 	//obstructions_circular=[];
 	//obstructions_rectangular=[];
 	marked_byuser=[];
 	intermediatePoints=[];

}

function addRoad(){
	
  
	 $.post("insert_road.php",{  owner:user, points:marked_byuser},
	 	function(data) {
		   
		   alert(data);
		});
	 //retrieveRoad();

}
function retrieveRoad(){
	
	 pathsR=[];
	$.ajax({
		 	url : 'fetch_road.php',
		 	type : 'GET',
		 	async : true,
		 	success : function(response) {
		 		roads_info = JSON.parse(response);
		 		var roadId=roads_info[0]["id"];
		 		 allRoads=[];
		 		 ids=[];
		 		 ids.push(roadId);
		 		for (var i = 0; i < roads_info.length; i++) {
		 			console.log(roads_info[i]);
		 			var pt=new google.maps.LatLng(roads_info[i]["lat"],roads_info[i]["long1"]);
		 			if ((roadId==roads_info[i]["id"]))
		 			{
		 				pathsR.push(pt);
		 				
		 			}
		 			
		 			if (!(roadId==roads_info[i]["id"]))
		 			{
		 				allRoads.push(pathsR);
		 				roadId=roads_info[i]["id"];
 						pathsR=[];
 					    pathsR.push(pt);
 					ids.push(roadId);}
 					}
 				allRoads.push(pathsR);
 					//console.log(allRoads[3]);
 					for (var j = 0; j < roadsContour.length; j++)
					{
 					roadsContour[j].setOptions({visible: false});}
 						
 					 roadsContour=[];
 					for (var j = 0; j < allRoads.length; j++)
					{
					roadsContour[j]= new google.maps.Polyline({
   					path: allRoads[j],
    				geodesic: true,
    				strokeColor: '#FF0000',
    				strokeOpacity: 1.0,
    					strokeWeight: 2,
    					visible: true
  					});
		 			//roadsContour.push(cr);
		 			//roadsContour[j].setMap(null);
 					roadsContour[j].setMap(map);
 					
		 			}

		 			//console.log((roads_info[i]["id"]));
		 			
		 		
		 		

		 			
 
		 			//place_marker(i, "rectangle");

		 		
		 	},
		 	error : function(response) {
		 		console.log('Failed to load Dataset');
		 	}
		 });
	
	
	

  
 }

function PopulateRoadList()
	{
		$('#editRoads').css('display' , 'inline');
		$('#safe_path').css('display' , 'none');
		$('#wrapper').css('display' , 'none');
		$('#map-canvas').css('width' , '75%');
		clearOverlay();
		remove();
		retrieveRoad();
		
 					
 					
		//$('#negotiation').css('display' , 'inline');
		//$('#map-canvas').css('width' , '75%');

		
		var select = document.getElementById("roads-list");

		for (var i=select.length-1; i>0;i--)
			select.remove(i);
		//console.log(temp_obstructions.length);
		for (var i = 0; i < ids.length; i++)
		{
			
			var op = document.createElement("option");
			op.textContent = ids[i];
			op.value = ids[i];
			select.appendChild(op);
		}
		//reset();
		//selectedRoad();

		$("#DeleteRoad").click(function(){
			deleteRoad();
			for (var j = 0; j < allRoads.length; j++)
 						{
		 		

 						if(ids[j]==currRoad)
					{
			roadsContour[j].setOptions({strokeOpacity: 0.0});
			roadsContour[j].setOptions({visible: false});	
			//map.clear();
			roadsContour[j].setMap(null);
			//roadsContour.remove(roadsContour[j]);
		}
		}

		});
	}

function deleteRoad()
{
	 $.post("delete_own_roads.php",{idR:currRoad},
	 	function(data) {
		   
		   alert(data);
		});
}

function selRoad() 
{
	//line = poly.getPath();
	//line.push(event.latLng);
	for (var j = 0; j < allRoads.length; j++){
		if(ids[j]==currRoad){
			for (var i=0; i<allRoads[j].length; i++){
			var new_point = [allRoads[j][i].lat(), allRoads[j][i].lng()];
			marked_byuser.push(new_point);
		}
		}
	
}
var l=marked_byuser.length;
while (l> 1) {
		var p1 = new google.maps.LatLng(marked_byuser[marked_byuser.length-2][0], marked_byuser[marked_byuser.length-2][1]);
		var p2 = new google.maps.LatLng(marked_byuser[marked_byuser.length-1][0], marked_byuser[marked_byuser.length-1][1]);
		var dis_in_metres =  google.maps.geometry.spherical.computeDistanceBetween(p1,p2);
		road_length+=dis_in_metres;
			//console.log('Calling getintermediatepts ');
		getintermediatepts(marked_byuser[l- 2], marked_byuser[l - 1], factor);
		l=l-2;
			//alert(intermediatePoints.length);
	}
		
	marker = new google.maps.Marker({
		position: event.latLng,
		title: '#' + line.getLength(),
		map: map,
	});
	roadMarkers.push(marker);
}
		//intermediatePoints.push(new_point);


function select_roads_changed(){

 	var select = document.getElementById('roads-list');
		var index = document.getElementById('roads-list').selectedIndex;
		currRoad=select.options[index].value;
		console.log(currRoad);
		
 					for (var j = 0; j < allRoads.length; j++)
 						{
		 		

 						if(ids[j]==currRoad)
					{
					roadsContour[j].setOptions({strokeColor:'black'});

						console.log(allRoads[j]);
						reset();
						selRoad();
						
		 			 
		 			//roadsContour[j].setMap(null);
 					//roadsContour[j].setMap(map);
 					
		 			}
		 			else {
		 				roadsContour[j].setOptions({strokeColor:'#FF0000'});
		 				//roadsContour[j].setMap(null);
 					//roadsContour[j].setMap(map);
 					
		 			}
		 			 
 					
		 			}
		}
function addLatLngR(event) {
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
	roadMarkers.push(marker);
		//markersArray.push(marker);
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
    	   /* marker = new google.maps.Marker({
                position: latlng,
                map: map,
                title: '#' + content,
                icon: 'http://www.googlemapsmarkers.com/v1/FFFF00/'
            });*/
			intermediatePoints.push(temp);
	    } else {
	        var temp1 = [x2, a * x2 + b];
	        var latlng = new google.maps.LatLng(temp1[0], temp1[1]);
	       /* marker = new google.maps.Marker({
                position: latlng,
                map: map,
                title: '#' + content,
                icon: 'http://www.googlemapsmarkers.com/v1/FFFF00/'
            });*/
	        intermediatePoints.push(temp1);
	    }
	    getintermediatepts(pq, rs, k + factor);
	}