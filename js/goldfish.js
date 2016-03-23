// Required arguments are canvas, x, y, angle, targetX, targetY, speed, if it is in water, what container is it in, and it's number.
var Goldfish = function(canvas, x, y, theta, targetX, targetY, speed, isInWater, container, index){
	this.canvas = canvas;
	this.x =x;
	this.y =y;
	this.length = 70;
	this.width = 35;
	this.targetX = targetX;
	this.targetY = targetY;
	this.speed = speed;
	this.theta = theta;
	this.isNormal = true;
	// whether or not the fish is in water
	this.isInWater = isInWater;
	//calculate fish distance to target
	this.distanceToTarget = this.distanceTo(this.targetX, this.targetY);
	this.container= container;
	this.distanceToPoi = 0;
	this.poiX = 0;
	this.poiY = 0;
	this.index = index;
	//Sarts the fish logic
	this.init(); 
	
	// this.isLively = (Math.floor(Math.random()*2)===0);
};

//Display the goldfish in the canvas
Goldfish.prototype.display =function(){
	var obj = this;
	var direction = obj.theta;
	//Draws the body of the fish
	$canvas.drawEllipse({
	  fillStyle: '#fa6900',
	  strokeStyle: '#f38630',
	  strokeWidth: 1,
	  x: obj.x, y: obj.y,
	  width: 70, height: 35,
	  rotate:direction
	});
	// Draw the tail of the fish
	$canvas.drawPolygon({
	  fillStyle: '#f38630',
	  strokeStyle:'#fa6900',
	  strokeWidth: 1,
	  x: obj.x + (Math.cos(direction*Math.PI/180))*50,
	  y: obj.y + (Math.sin(direction*Math.PI/180))*50,
	  radius: 25,
	  sides: 3,
	  rotate: direction+30
	});
};


//Returns the distance between the fish and a coordinate pair using the Pythagorean Theorem.
Goldfish.prototype.distanceTo = function(objX,objY){
	return Math.sqrt(Math.pow(this.x-objX,2)+Math.pow(this.y-objY,2));
};

// Goldfish logic.  Makes each goldfish keep track of it's own individual logic
Goldfish.prototype.init = function(){

//Allows us to take the current theta from the fish, to calculate the movements of the fish
var workingTheta = this.theta;

//Allows us to continue working with this particular object within the setInterval anonymous callback
var obj = this;

// creates a timer that updates the fish movements based on the speed of the fish.
obj.timerId = window.setInterval(function(){
	//If the fish is in a body of water, then it can move around.
	if(obj.isInWater){

		//Updates the working theta so that the fish will orbit the target
		//Updates obj.theta so that the fish appears to be orbiting the target coordinates
		workingTheta = (workingTheta + 1) % 360;
		obj.theta = (workingTheta - 60 ) % 360;

		//Converts angle from degrees to radians to determine where the fish should be placed
		obj.x = obj.targetX + (Math.cos(workingTheta*Math.PI/180))*obj.distanceToTarget;
		obj.y = obj.targetY + (Math.sin(workingTheta*Math.PI/180))*obj.distanceToTarget;
	}
	if(obj.container === 'pool') {
		obj.distanceToPoi = obj.distanceTo(obj.poiX, obj.poiY);
	}
	else if(obj.container === 'poi') {
		obj.x = obj.poiX;
		obj.y = obj.poiY;
	}
else if(obj.container === 'bowl') {
		// obj.x = obj.poiX;
		// obj.y = obj.poiY;
	}

//fish speed determines how quickly the interval is called
},(100/this.speed));	
};

Goldfish.prototype.outOfWater = function (){
	this.isInWater = false;
};
Goldfish.prototype.inWater = function (){
	this.isInWater = true;
};


Goldfish.prototype.getNewContainer = function (container, hasWater, radius){
	this.container = container.type;
	this.targetX = container.x;
	this.targetY = container.y;
	this.distanceToTarget = radius;
	
	if(!hasWater) this.outOfWater();
	else this.inWater();
};
Goldfish.prototype.poiDistance = function(x, y){
	this.distanceToPoi = this.distanceTo(x,y);
};

Goldfish.prototype.updatePoi = function(x,y){
	this.poiX = x;
	this.poiY = y;
};