/* Negotiation Code Begins */
	var temp_obstructions = [];
	var temp_obstructions_rectangular = [];
	var temp_costArray = [];

	var costArray_circular = [];
	var costArray_rectangular = [];
	var live_negotiations = [];
	var offer_string = " is ready to give you approval for proceeding with construction for $ ";
	var divopen = "<div>";
	var divclose = "</div>";
	var get_offer = "Submit your offer: <input type='text' id='offer_by_builder' name='offer'><button onclick='javascript:negotiate()'>Submit</button>";
	
function change_player() {
		$('#non-player').hide();
		$('#player').show();
		$('#addition').css('display' , 'none');
		$('#map-canvas').css('width' , '100%');
		
	}
function clearOverlay()
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
		}
		SafeFlightPathMarkers = [];
	}


function PopulateNegotiationPlaces()
	{
		$('#negotiation').css('display' , 'inline');
		$('#safe_path').css('display' , 'none');
		$('#wrapper').css('display' , 'none');
		$('#map-canvas').css('width' , '75%');
		$('#editRoads').css('display' , 'none');
		clearOverlay();
		remove();
		//$('#negotiation').css('display' , 'inline');
		//$('#map-canvas').css('width' , '75%');
		temp_obstructions=[];
		temp_costArray=[];
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

		for (var i=select.length-1; i>0;i--)
			select.remove(i);
		//console.log(temp_obstructions.length);
		for (var i = 0; i < temp_obstructions.length; i++)
		{
			var obstruction = temp_obstructions[i];
			console.log(obstruction);
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
	