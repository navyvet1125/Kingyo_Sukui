var gameWon;
$('.start-button').click(function(){
	console.log('Game Start');
	$('.start-button').toggle();
	$canvas.toggleClass('hide-cursor');	
	gameWon = gameStart();
	
});
var $canvas = $('#gameCanvas');



var gameStart = function (){
	var gameWin = false;
	//new Pools require a length, width, a number of fish, a color, and the canvas

	var myPool = new Pool($canvas,620,600,10);
	//New bowls require a canvas, x, y height, width, and a radius (optional)
	var myBowl = new Bowl ($canvas,800,300,600,410,200);

	var myPoi = new Poi($canvas);
	$canvas.on('mousemove', function(event){
		myPoi.update(event);

		if(!myPool.isEmpty()) {
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

	var stopGame = function(){
		if(!myPool.isEmpty()) myPool.fishArray.forEach(function(key){key.die();});	
		if(!myPoi.isEmpty()) myPoi.fishArray.forEach(function(key){key.die();});	
		if(!myBowl.isEmpty()) myBowl.fishArray.forEach(function(key){key.die();});
		window.clearInterval(displayTimer);
		$('.start-button').toggle();
		$canvas.toggleClass('hide-cursor');
	};


	var displayTimer = window.setInterval(function(){
			if(myPoi.isBroken) {
				gameWin = false;
				stopGame();
				console.log('You Lose!');
			}
			try {
				myPool.displayPool();
				myBowl.display();
				if(!myPool.isEmpty()){
					myPool.fishArray.forEach(function(key){key.display();});
				} else {
					if(myBowl.getFishNum()===myPool.numberOfFish){
						gameWin = true;
						stopGame();
						console.log('You Win!');
					}
				}
				myPoi.display();
				if(!myPoi.isEmpty()) {
					//Filter out undefined objects
					myPoi.fishArray = myPoi.fishArray.filter(function(key){return key !== undefined;});
					myPoi.fishArray.forEach(function(key){
						key.display();
						key.updatePoi(myPoi.x, myPoi.y);
					});
				}
				if(!myBowl.isEmpty()) {
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
	console.log(gameWin);
	return gameWin;
};



