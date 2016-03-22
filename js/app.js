var $canvas = $('#gameCanvas');
//new Pools require a length, width, a number of fish, a color, and the canvas
//Sawa no Puuru  means "Sawa's Pool" in Japanese
var sawaNoPuuru = new Pool($canvas,700,800,12,'blue');
//New bowls require a canvas, x, y height, width, and a radius (optional)
var sawaNoBouru = new Bowl ($canvas,970,400,800,550,260);

var sawaNoPoi = new Poi($canvas);
$canvas.on('mousemove', function(event){
	sawaNoPoi.update(event);
	sawaNoPuuru.fishArray.forEach(function(key){
		key.updatePoi(sawaNoPoi.x, sawaNoPoi.y);
	});
	if(sawaNoPoi.x > sawaNoPuuru.width && sawaNoPoi.isUnderWater) sawaNoPoi.stopTimer();
});

$canvas.on('mousedown', function(){
	//if(sawaNoPoi.x < sawaNoPuuru.width && !sawaNoPoi.isUnderWater) sawaNoPoi.startTimer();
	if(sawaNoPoi.x < sawaNoPuuru.width && !sawaNoPoi.isUnderWater && sawaNoPoi.poiHealth > 0)	sawaNoPoi.startTimer();
});
$canvas.on('mouseup', function(){
	sawaNoPoi.stopTimer();
});
//$canvas.mousemove(event, sawaNoPoi);
// $canvas.on('mousemove', function(event){});


var timer2Id = window.setInterval(function(){

		try {
			sawaNoPuuru.displayPool();
			sawaNoBouru.display();
			sawaNoPuuru.fishArray.forEach(function(key){key.display();});
			sawaNoPoi.display();

		}
		catch(e){
			console.log(poolObj.fishArray);
		}

},41);