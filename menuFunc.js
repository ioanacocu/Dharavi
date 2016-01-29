function initialize() {
		geocoder = new google.maps.Geocoder();
		var mapOptions = {
			center: new google.maps.LatLng(19.22047497928989,72.98046380281448),
			zoom: 20,
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
		/*drawingManager.setMap(map);
		hide_manager();*/
		set_param();
	}

	google.maps.event.addDomListener(window, 'load', initialize);