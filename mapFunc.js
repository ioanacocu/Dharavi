var poly;
var map;
var propMarkers=[];
var dharavi;
var path=[];
var listener1;
	
function initialize() {
  geocoder = new google.maps.Geocoder();
var mapOptions = {
			center: new google.maps.LatLng(19.040208,72.85085040000001),
			zoom: 15,
			mapTypeId: google.maps.MapTypeId.SATELLITE,
			zoomControlOptions: {
				style: google.maps.ZoomControlStyle.LARGE,
				position: google.maps.ControlPosition.LEFT_CENTER
			},
			scaleControl: true,
			scaleControlOptions: {
				position: google.maps.ControlPosition.TOP_LEFT
			},

			panControl: true,
			panControlOptions: {
				position: google.maps.ControlPosition.LEFT_BOTTOM
			},
		};
		map = new google.maps.Map(document.getElementById("map-canvas"),mapOptions);
		var dharaviLimits = [
   				 {lat: 19.057832038234988 , lng: 72.8699605462316},
   				 {lat: 19.054100188123588 ,  lng: 72.8653686043981},
    			{lat: 19.05268044049228 , lng: 72.85798716518911},
    			{lat: 19.052599311689214 , lng: 72.85794424984487},
				{lat: 19.051625762958085 , lng: 72.85652804348501},
				{lat:19.051625762958085  , lng: 72.85652804348501},
				{lat:19.048826778535765  , lng: 72.8540389535192},
				{lat:19.048380559264437 , lng: 72.8540389535192},
				{lat: 19.046392840660875 , lng: 72.85069155666861},
				{lat: 19.045703218439815 , lng: 72.8483312127355 },
				{lat: 19.04614944491006 , lng:72.84794497463736 },
				{lat: 19.045703218439815 , lng: 72.84481215450796},
				{lat: 19.045338123162704 , lng:72.84434008572134 },
				{lat: 19.037062414981495 , lng: 72.84773039824358},
				{lat:19.039050245314115 , lng:72.85060572630755},
				{lat:19.035601953042036 , lng:72.85562682125601},
				{lat:19.05470864767462 , lng:72.8691880700353},
				{lat:19.05434357221181 , lng:72.86961722347769},
				{lat:19.0572641534169 , lng:72.87094759914907},
				{lat: 19.057832038234988 , lng: 72.8699605462316}
  					];

 dharavi = new google.maps.Polygon({
    paths: dharaviLimits
   
  });


  var dharaviContour = new google.maps.Polyline({
    path: dharaviLimits,
    geodesic: true,
    strokeColor: '#FF0000',
    strokeOpacity: 1.0,
    strokeWeight: 2
  });

 dharaviContour.setMap(map);
 fetch_dataset();
  //poly.setMap(map);
  
  //poly.setMap(dharaviContour);

  // Add a listener for the click event
  listener1=map.addListener('click', addLatLng);
}



function addLatLng(event) {
  path = poly.getPath();
  path.push(event.latLng);
 	console.log(event);
	var latitude = event.latLng.lat();
	var longitude = event.latLng.lng();
	console.log(latitude + ' ' + longitude);

      marker = new google.maps.Marker({
      position: event.latLng,
     // title: '#' + line.getLength(),
      map: map,
    });
      propMarkers.push(marker);
      poly.setMap(map);
    }

google.maps.event.addDomListener(window, 'load', initialize);
  