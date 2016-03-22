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
	//this.init();
};

Bowl.prototype.init = function(){
	//console.log(this);
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
};