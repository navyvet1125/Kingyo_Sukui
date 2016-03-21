var Goldfish = function(canvas, x, y, theta){
	this.canvas = canvas;
	this.x =x;
	this.y =y;
	this.length = 70;
	this.width = 35;
	this.targetX = 0;
	this.targetY = 0;
	this.speed = 5;
	this.theta = theta;
	this.isNormal = true;
	this.isLively = (Math.floor(Math.random()*2)===0);
};

Goldfish.prototype.display =function(obj){
var x1 = obj.x;
var y1 = obj.y;
var direction = obj.theta;
$canvas.drawEllipse({
  fillStyle: '#fa6900',
  strokeStyle: '#f38630',
  strokeWidth: 1,
  x: x1, y: y1,
  width: 70, height: 35,
  rotate:direction
});




var x2 = x1 + (Math.cos(direction*Math.PI/180))*50;
var y2 = y1 + (Math.sin(direction*Math.PI/180))*50;

// fish tail... fishtail.x = body.x + (cos(body.direction)*50); fishtail.y = body.y + (sin(body.direction)*50)
$canvas.drawPolygon({
  fillStyle: '#f38630',
  strokeStyle:'#fa6900',
  strokeWidth: 1,
  x: x2, y: y2,
  radius: 25,
  sides: 3,
  rotate: direction+30
});

};

Goldfish.prototype.action = function(obj){
	console.log(obj);
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

var fishes = [];
for (var i =0; i<40; i++){
	var x = Math.floor(Math.random()*650)+100;
	var y = Math.floor(Math.random()*650)+100;
	var theta = Math.floor(Math.random()*360);
	fishes.push(new Goldfish($canvas, x, y, theta));
}

fishes.forEach(function(key){key.display(key);});