// Required arguments are canvas, x, y, angle, targetX, targetY, and speed.
var Goldfish = function(canvas, x, y, theta, targetX, targetY, speed, isInWater){
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
	this.distanceToTarget = Math.sqrt(Math.pow(this.x-this.targetX,2)+Math.pow(this.y-this.targetY,2));

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

//fish speed determines how quickly the interval is called
},(100/this.speed));	
};

Goldfish.prototype.outOfWater = function (){
	this.isInWater = false;
};


