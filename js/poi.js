var Poi = function(canvas){
	this.canvas = canvas;
	this.x =900;
	this.y = 450;
	this.centerArray = [];
	this.outerArray = [];
	this.isCenter = true;
	this.isOuter = true;
	this.isUnderWater = false;
	this.centerHealth = 40;
	this.outerHealth = 80;
	this.type = 'poi';
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