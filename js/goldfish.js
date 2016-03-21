// Required arguments are canvas, x, y, angle, targetX, targetY, and speed.
var Goldfish = function(canvas, x, y, theta, targetX, targetY, speed){
	this.canvas = canvas;
	this.x =x;
	this.y =y;
	this.length = 70;
	this.width = 35;
	this.targetX = targetX;
	this.targetY = targetY;
	this.speed = speed;
	this.theta = theta;
	this.radian = theta*Math.PI/180;
	this.isNormal = true;
	this.distanceToTarget =Math.atan2((this.x-this.targetX),(this.y-this.targetY));
	this.init(); //Sarts the fish logic
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
var workingTheta = this.theta;
var obj = this;
obj.timerId = window.setInterval(function(){
	workingTheta=(workingTheta+1)%360;
	obj.theta= (workingTheta-60)%360;
	obj.x = obj.targetX + (Math.cos(workingTheta*Math.PI/180))*100;
	obj.y = obj.targetY + (Math.sin(workingTheta*Math.PI/180))*100;
},(100/this.speed));	
};

var $canvas = $('#myCanvas');
// $canvas.drawArc({
//   fillStyle: 'black',
//   x: 10, y: 10,
//   radius: 50
// });


var b ={
  fillStyle: 'black',
  x: 200, y: 200,
  radius: 50
};



$canvas.drawArc(b);

// Required arguments are canvas, x, y, angle, targetX, targetY, and speed.

var sawa = new Goldfish($canvas, 250,250, 0, 300,300,5 );

var timer2Id = window.setInterval(function(){
	$canvas.clearCanvas();
	sawa.display();
},42);