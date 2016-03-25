// Required arguments are canvas, x, y, angle, targetX, targetY, speed, if it is in water, and what container is it in.
var Goldfish = function(canvas, x, y, theta, targetX, targetY, speed, isInWater, container){
	//fish display variables
	this.canvas = canvas;
	this.length = 25;
	this.width = 50;
	this.tailLength = this.width * 0.71;
	// Fish logic variables
	this.x =x;
	this.y =y;
	this.targetX = targetX;
	this.targetY = targetY;
	this.speed = speed;
	this.theta = theta;
	//calculate fish distance to target
	this.distanceToTarget = this.distanceTo(this.targetX, this.targetY);
	//More variables needed for fish logic
	this.container= container;
	this.distanceToPoi = 0;
	this.poiX = 0;
	this.poiY = 0;
	// whether or not the fish is in water
	this.isInWater = isInWater;
	console.log('Fish created!');
	//Starts the fish logic
	this.init(); 
	

};

//Display the goldfish in the canvas
Goldfish.prototype.display =function(){
	//create reference to this object for use within callbacks
	var fishObj = this;
	//create a direct reference to the theta of the fish
	var direction = fishObj.theta;
	//Draws the body of the fish
	fishObj.canvas.drawEllipse({
	  fillStyle: '#fa6900',
	  strokeStyle: '#f38630',
	  strokeWidth: 1,
	  x: fishObj.x, y: fishObj.y,
	  width: fishObj.width, height: fishObj.length,
	  rotate:direction
	});
	// Draw the tail of the fish
	// behind the body of the fish based fish position
	fishObj.canvas.drawPolygon({
	  fillStyle: '#f38630',
	  strokeStyle:'#fa6900',
	  strokeWidth: 1,
	  x: fishObj.x + (Math.cos(direction*Math.PI/180))*fishObj.tailLength,
	  y: fishObj.y + (Math.sin(direction*Math.PI/180))*fishObj.tailLength,
	  radius: fishObj.tailLength/2,
	  sides: 3,
	  rotate: direction+30 //To make it attach correctly add 30 degrees
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
		//The fish will know where the poi is while they are in the pool
		if(obj.container === 'pool') {
			obj.distanceToPoi = obj.distanceTo(obj.poiX, obj.poiY);
		}
		//If the fish is in the poi, then its position should equal the poi's position
		else if(obj.container === 'poi') {
			obj.x = obj.poiX;
			obj.y = obj.poiY;
		}

	//fish speed determines how quickly the interval is called
	},(100/this.speed));	
};

//Stops  fish logic
Goldfish.prototype.die = function(){
	//clears logic timer
	window.clearInterval(this.timerId);
};

//Sets fish state to outside of water
Goldfish.prototype.outOfWater = function (){
	this.isInWater = false;
};

//Sets fish state to inside a body of water
Goldfish.prototype.inWater = function (){
	this.isInWater = true;
};


//Run this to let the fish know it is in a new container
Goldfish.prototype.getNewContainer = function (container, hasWater, radius){
	//Update fish on its new habitat
	this.container = container.type;
	//Give it a point to swim around if it can swim.
	this.targetX = container.x;
	this.targetY = container.y;
	//let it know how far away it is from the target point.
	this.distanceToTarget = radius;
	//Restart fish logic.
	this.die();
	this.init();
	//Update fish state of being in or out of the water
	if(!hasWater) this.outOfWater();
	else this.inWater();
};

//Updates fish on its disance to the poi.
Goldfish.prototype.poiDistance = function(x, y){
	this.distanceToPoi = this.distanceTo(x,y);
};

//Updatess fish on the poi's location.
Goldfish.prototype.updatePoi = function(x,y){
	this.poiX = x;
	this.poiY = y;
};