var $canvas = $('#gameCanvas');
//new Pools require a length, width, a number of fish, a color, and the canvas

var myPool = new Pool($canvas,620,600,16,'blue');
//New bowls require a canvas, x, y height, width, and a radius (optional)
var myBowl = new Bowl ($canvas,800,300,600,410,200);

var myPoi = new Poi($canvas);
$canvas.on('mousemove', function(event){
	myPoi.update(event);

	if(myPool.fishArray.length > 0) {
		myPool.fishArray.forEach(function(key){
			key.updatePoi(myPoi.x, myPoi.y);
		});
	}
	if(myPoi.x > myPool.width && myPoi.isUnderWater) myPoi.stopTimer();
});

$canvas.on('mousedown', function(){
	if(myPoi.x < myPool.width && !myPoi.isUnderWater && !myPoi.isBroken && (myPoi.fishArray.length ===0))	myPoi.startTimer();
	if(myPoi.x < myPool.width && myPoi.fishArray.length >=1) $('.timer').text('Place your fish in the bowl!');


	//get distance between the poi and the bowl
	var poiDistanceToBowl = Math.floor(Math.sqrt(Math.pow(myPoi.x-myBowl.x, 2)+Math.pow(myPoi.y-myBowl.y, 2)));
	//if the poi is over the bowl
	if(poiDistanceToBowl < 250 && myPoi.fishArray.length >= 1){
		myPoi.dropMyFish(myBowl, poiDistanceToBowl);
	}

});
$canvas.on('mouseup', function(){
	if(myPoi.x < myPool.width && myPoi.isUnderWater && !myPoi.isBroken) myPoi.takeCloseFish(myPool);
	if(myPoi.isUnderWater)myPoi.stopTimer();

});
//$canvas.mousemove(event, myPoi);
// $canvas.on('mousemove', function(event){});


var timerId = window.setInterval(function(){

		try {
			myPool.displayPool();
			myBowl.display();
			if(myPool.fishArray.length > 0) myPool.fishArray.forEach(function(key){key.display();});
			myPoi.display();
			if(myPoi.fishArray.length >0) {
				myPoi.fishArray = myPoi.fishArray.filter(function(key){return key !== undefined;});
				myPoi.fishArray.forEach(function(key){
					key.display();
					key.updatePoi(myPoi.x, myPoi.y);
				});
			}
			if(myBowl.fishArray.length >0) {
				myBowl.fishArray.forEach(function(key){
					key.display();
					key.updatePoi(myPoi.x, myPoi.y);
				});
			}
		}
		catch(e){
			console.log(e);
		}

},41);