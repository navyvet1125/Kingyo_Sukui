//New bowls require a canvas, x, y height, width, and a radius (optional)
var Bowl = function(canvas, x, y, height, width, radius){
	this.canvas = canvas;
	this.x = x;
	this.y = y;
	this.height = height;
	this.width = width;
	if(radius) this.radius= radius;
	else if(!radius)this.radius = 260;
	this.fishArray = [];
	this.init();
};

Bowl.prototype.init = function(){
	console.log(this);
};

Bowl.prototype.display = function() {
this.canvas.drawRect({
		  fillStyle: '#e0e4cc',
		  strokeStyle:'black',
		  x: this.width,
		  y: this.height,
		  width: this.radius*2,
		  height: this.height*2,
		  fromCenter: true
	});
	this.canvas.drawArc({
	  fillStyle: '#a7dbd8',
	  strokeStyle: 'black',
	  strokeWidth: 5,
	  x: this.width, 
	  y: this.height,
	  radius: this.radius
	});
};