var Poi = function(canvas){
	this.canvas = canvas;
	this.x =900;
	this.y = 450;
	this.fishArray = [];
	this.isUnderWater = false;
	this.isScooping = false;
	this.poiHealth = 20;
	this.type = 'poi';
	this.healthTimer = 0;
	this.isOverBowl = false;
	this.isBroken = false;
	this.radius = 75;
	this.container ='poi';
};

Poi.prototype.update = function(event){
this.x = event.pageX;
this.y = event.pageY;
};

Poi.prototype.display = function(){
	// Create pattern
var patt = $('canvas').createPattern({
  // Define width/height of pattern (before repeating)
  width: 5, height: 5,
  source: function(context) {
    // Draw rectangle (which will repeat)
    $(this).drawRect({
      //fillStyle: '#bcdeb2',
      strokeStyle: '#f0f4dc',
      //strokeWidth: 1,
      x: 0, y: 0,
      width: 5, height: 5,
      fromCenter: false,
      //cornerRadius: 2
    });
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

Poi.prototype.startTimer = function(){
	var poiObj = this;
	console.log(poiObj.poiHealth);
	this.isUnderWater = true;
	$('.timer').text('The poi is under water!');
	this.healthTimer = window.setInterval(function(){
		$('.timer').text('The poi is still under water!');
		if (!poiObj.isBroken)poiObj.poiHealth--;
		console.log(poiObj.poiHealth);
		if (poiObj.poiHealth<=0)poiObj.breakPoi();
	},1000);
};

Poi.prototype.stopTimer = function() {
	window.clearInterval(this.healthTimer);
	this.isUnderWater = false;
	$('.timer').text('The poi has left the water');
};


Poi.prototype.breakPoi = function (){
	window.clearInterval(this.healthTimer);
	this.isBroken = true;
	alert('The poi broke!');
};

Poi.prototype.takeFish = function(previousArray, index){
	if(this.fishArray.length<3) {
		this.fishArray.push(previousArray.splice(index, 1)[0]);
		try {
			this.fishArray[this.fishArray.length-1].getNewContainer(this.container, false, this.radius);
			
		}
		 catch(e){
		 	$('.timer').text(e);
		 }
		// Fish weight slowly destroys the poi.
		this.poiHealth-=2;
	}

};


Poi.prototype.takeCloseFish = function(poolObj){
	var poiObj = this;
	var fishToTake = poolObj.fishArray.filter(function(key){
		return key.distanceToPoi<75;
	});

	fishToTake.forEach(function(key){
		var tempIndex = key.index;
		poiObj.takeFish(poolObj.fishArray, tempIndex);
	});
	// console.log(poolObj.fishArray.length);
	// console.log(poiObj.fishArray.length);
};