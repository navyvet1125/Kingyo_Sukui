//New bowls require a canvas, x, y height, width, and a radius (optional)
var Bowl = function(canvas, x, y, height, width, radius){
	this.canvas = canvas;
	this.x = x;
	this.y = y;
	this.height = height;
	this.width = width;
	this.radius = radius;
	this.fishArray = [];
	this.type = 'bowl';
	console.log('Bowl created!');
};

Bowl.prototype.display = function() {
	// Draw the table the bowl rests on.
	this.canvas.drawRect({
		fillStyle: '#e0e4cc',
		strokeStyle:'black',
		x: this.x,
		y: this.y,
		width: this.width,
		height: this.height,
		fromCenter: true
	});
	//Draw a bowl full of water
	this.canvas.drawArc({
		fillStyle: '#a7dbd8',
		strokeStyle: 'black',
		strokeWidth: 5,
		x: this.x, 
		y: this.y,
		radius: this.radius
	});
	//Draw the number of fish in the bowl
	this.canvas.drawText({
	  fillStyle: '#a7dbd8',
	  strokeStyle: '#69d2e7',
	  strokeWidth: 2,
	  x: 800, y: 70,
	  fontSize: 48,
	  fontFamily: 'Arial, sans-serif',
	  text: 'Fish collected: '+this.getFishNum()
	});
};
//Check if the bowl is empty
Bowl.prototype.isEmpty = function(){
	return this.fishArray.length === 0;
};
//Get the number of fish in the bowl
Bowl.prototype.getFishNum= function(){
	return this.fishArray.length;
};