var Poi = function(canvas){
	this.canvas = canvas;
	this.x =900;
	this.y = 450;
	this.fishArray = [];
	this.isUnderWater = false;
	this.isScooping = false;
	this.poiHealth = 30;
	this.type = 'poi';
	this.healthTimer = 0;
	this.isOverBowl = false;
	this.isBroken = false;
	this.radius = 75;
	this.container ='poi';
	console.log('Poi created!');	
};

Poi.prototype.update = function(event){
	this.x = event.offsetX;
	this.y = event.offsetY;
};

Poi.prototype.display = function(){
	var poiObj = this;
	// Create pattern
var patt = $('canvas').createPattern({
  // Define width/height of pattern (before repeating)
  width: 5, height: 5,
  source: function(context) {
    // Draw rectangle (which will repeat)
    if(!poiObj.isBroken){
	    $(this).drawRect({
	      //fillStyle: '#bcdeb2',
	      strokeStyle: '#f0f4dc',
	      //strokeWidth: 1,
	      x: 0, y: 0,
	      width: (poiObj.poiHealth+3)/5,
	      height: (poiObj.poiHealth+3)/5,
	      fromCenter: false,
	      //cornerRadius: 2
	    });
	}
  }
});

// Draw ellipse with pattern as fill style
$('canvas').drawArc({
  fillStyle: patt,
  strokeStyle: '#c0c4ac',
  strokeWidth: 5,
  x: this.x, y: this.y,
  radius: 75
});





var handleX = this.x +(Math.cos(0.7853981634)*75);
var handleY = this.y +(Math.sin(0.7853981634)*75);
var handleX2 = this.x +(Math.cos(0.7853981634)*200);
var handleY2 = this.y +(Math.sin(0.7853981634)*200);

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
	alert('The poi broke!');
};

Poi.prototype.takeFish = function(previousArray, index){
	var tempKey;
	if(this.fishArray.length<3) {
		this.fishArray = this.fishArray.filter(function(key){return key !== undefined;});
		this.fishArray.push(previousArray.splice(index, 1)[0]);
		try {
			var tempobj = this;
			this.fishArray.forEach(function(key){
				tempKey = key;
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


Poi.prototype.takeCloseFish = function(poolObj){
	//Setting poiObj to this allows use of the Poi object within callbacks
	var poiObj = this; 
	//Filter out all fish farther than the radius of the poi.
	var fishToTake = poolObj.fishArray.filter(function(key){
		return key.distanceToPoi<=75;
	});
	fishToTake.forEach(function(key){
		var tempIndex = poolObj.fishArray.indexOf(key);
		poiObj.takeFish(poolObj.fishArray, tempIndex);
	});

};

Poi.prototype.dropMyFish = function (target, distance){
	this.fishArray.splice(0).forEach(function(key){
		target.fishArray.push(key);
		key.targetX = target.x;
		key.targetY = target.y;
		key.getNewContainer(target, true, distance);
	});
	this.fishArray = [];
};