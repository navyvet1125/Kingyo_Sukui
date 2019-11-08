var Poi = function(canvas){
	//The canvas to draw on
	this.canvas = canvas;
	this.x =900;
	this.y = 450;
	//To hold the fish
	this.fishArray = [];
	this.isUnderWater = false;
	this.isScooping = false;
	//Creates a reference point for total health
	this.poiMaxHealth = 30;
	//The poi starts out at full health
	this.poiHealth = this.poiMaxHealth;
	this.type = 'poi';
	this.healthTimer = 0;
	this.isOverBowl = false;
	this.isBroken = false;
	this.radius = 75;
	this.container ='poi';
	console.log('Poi created!');	
};

// Sets the poi's location to the mouse when the mouse is over the canvas
Poi.prototype.update = function(event){
	this.x = event.offsetX;
	this.y = event.offsetY;
};

// Display the poi and its health
Poi.prototype.display = function(){
	//Creates a reference for use within callbacks
	var poiObj = this;
	// Create pattern
	var patt = $('canvas').createPattern({
	  // Define width/height of pattern (before repeating)
	  width: 5, height: 5,
	  source: function(context) {
	    // Draw rectangle (which will repeat)
	    if(!poiObj.isBroken){
		    $(this).drawRect({
		      strokeStyle: '#f0f4dc',
		      x: 0, y: 0,
		      //Changes as health changes to indicate failing health
		      width: (poiObj.poiHealth+3)/5,
		      height: (poiObj.poiHealth+3)/5,
		      fromCenter: false,
		    });
		}
	  }
	});
	//Draw the loop of the poi
	this.canvas.drawArc({
	  //Adds the pattern created earlier
	  fillStyle: patt,
	  strokeStyle: '#c0c4ac',
	  strokeWidth: 5,
	  x: this.x, y: this.y,
	  radius: this.radius
	});

	//Generates textual poi health data
	if(this.poiHealth) {
		var heatlthText =  'Poi Health: '+ Math.floor((this.poiHealth/this.poiMaxHealth)*100)+'%';
		var healthNumber = Math.floor((this.poiHealth/this.poiMaxHealth)*100);

		//Create color to represent health from green to yellow to red
		var healthColor;
		//Generates a hex color code based on the poi's health
		if (healthNumber > 50) healthColor = '#' + Math.round(15-(Math.floor(healthNumber/2*0.3)-1)).toString(16) + 'f0';
		else if (healthNumber <= 50) healthColor  = '#f' + Math.round(healthNumber*0.3).toString(16) + '0';

		//Draw poi health text
		this.canvas.drawText({
		  fillStyle: healthColor,
		  strokeStyle:'#ccc',
		  strokeWidth: 2,
		  x: 805, y: 550,
		  fontSize: 50,
		  fontFamily: 'Arial, sans-serif',
		  text: heatlthText
		});
	}



	//Computes the cordinates needed for the handle of the poi
	//The number inside represents 45 degrees converted to radians.
	var handleX = this.x +(Math.cos(0.7853981634)*this.radius);
	var handleY = this.y +(Math.sin(0.7853981634)*this.radius);
	var handleX2 = this.x +(Math.cos(0.7853981634)*200);
	var handleY2 = this.y +(Math.sin(0.7853981634)*200);

	//Draws the line that represents the angle
	$('canvas').drawLine({
		strokeStyle: '#c0c4ac',
		strokeWidth: 10,
		x1: handleX, y1: handleY,
		x2: handleX2, y2: handleY2,
	});
};

//Returns whether the poi is devoid of fish or not
Poi.prototype.isEmpty = function(){
	return this.fishArray.length === 0;
};


//Starts the timer that indicates health loss
Poi.prototype.startTimer = function(){
	var poiObj = this;
	this.isUnderWater = true;
	if (!poiObj.isBroken)poiObj.poiHealth--;
	if (poiObj.poiHealth <= 0 && !poiObj.isBroken)poiObj.breakPoi();
	this.healthTimer = window.setInterval(function(){
		if (!poiObj.isBroken)poiObj.poiHealth--;
		if (poiObj.poiHealth <= 0 && !poiObj.isBroken)poiObj.breakPoi();
	},1000);
};

//stops the timer that deletes health
Poi.prototype.stopTimer = function() {
	window.clearInterval(this.healthTimer);
	this.isUnderWater = false;
};

//run when poi health reaches or passes 0.
Poi.prototype.breakPoi = function (){
	window.clearInterval(this.healthTimer);
	this.isBroken = true;
};



Poi.prototype.takeCloseFish = function(poolObj){
	//Setting poiObj to this allows use of the Poi object within callbacks
	var poiObj = this; 
	//Filter out all fish farther than the radius of the poi.
	var fishToTake = poolObj.fishArray.filter(function(key){
		return key.distanceToPoi<=75;
	});
	//Take the fish that are within range
	fishToTake.forEach(function(key){
		var tempIndex = poolObj.fishArray.indexOf(key);
		poiObj.takeFish(poolObj.fishArray, tempIndex);
	});

};

// Up to three fish within range of the poi are taken into the poi.
Poi.prototype.takeFish = function(previousArray, index){
	if(this.fishArray.length<3) {
		//Filters out any ghost fish in the poi.
		this.fishArray = this.fishArray.filter(function(key){return key !== undefined;});
		//Removes fish from the pool array and places them into the poi array.
		this.fishArray.push(previousArray.splice(index, 1)[0]);
		try {
			//Variable to refer to the poi within the callback
			var tempobj = this;
			this.fishArray.forEach(function(key){
				var tempKey = key;
				key.getNewContainer(tempobj,false, tempobj.radius);
			});
		
		}
		 catch(e){
		 	console.log(e);
		 	console.log(this.fishArray);
		 }
		// Fish weight slowly destroys the poi.
		this.poiHealth-=2;
	}
};

//Drops the fish into the bowl
Poi.prototype.dropMyFish = function (target, distance){
	//Splices all fish from the array at once
	//Takes the returned array and loads them into the new array (of the bowl).
	this.fishArray.splice(0).forEach(function(key){
		target.fishArray.push(key);
		//Sets the new target for the fish to orbit
		key.targetX = target.x;
		key.targetY = target.y;
		//Tell the fish where it is.
		key.getNewContainer(target, true, distance);
	});
};