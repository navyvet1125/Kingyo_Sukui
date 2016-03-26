$('.start-button').click(function(){
	console.log('Game Start');
	//Hide the start button
	$('.start-button').toggleClass('hide-it');
	//hide the cursor when over the canvas
	$canvas.toggleClass('hide-cursor');
	//start the game function
	gameStart();

});
var $canvas = $('#gameCanvas');

var gameStart = function (){

	//new Pools require a length, width, a number of fish, a color, and the canvas
	var myPool = new Pool($canvas,620,600,10);
	//New bowls require a canvas, x, y height, width, and a radius (optional)
	var myBowl = new Bowl ($canvas,810,300,600,400,185);
	//New pois require a canvas
	var myPoi = new Poi($canvas);

	//Even Handlers
	//Mouse movement
	$canvas.on('mousemove', function(event){
		//Move the poi to the mouse coordinates within the canvas
		myPoi.update(event);

		//Tell all the fish in the pool the coordinates of the poi
		if(!myPool.isEmpty()) {
			myPool.fishArray.forEach(function(key){
				key.updatePoi(myPoi.x, myPoi.y);
			});
		}
		//Bug Prevention:
		//Remove the poi from the pool if it moves outside of the pool while
		//under water
		if(myPoi.x > myPool.width && myPoi.isUnderWater) myPoi.stopTimer();
	});

	//Mouse button press
	$canvas.on('mousedown', function(){
		//If the poi is over the pool, lower it into the pool.
		if(myPoi.x < myPool.width && !myPoi.isUnderWater && !myPoi.isBroken && (myPoi.fishArray.length ===0))	myPoi.startTimer();
		//get distance between the poi and the bowl
		var poiDistanceToBowl = Math.floor(Math.sqrt(Math.pow(myPoi.x-myBowl.x, 2)+Math.pow(myPoi.y-myBowl.y, 2)));
		//if the poi is over the bowl
		if(poiDistanceToBowl < (myBowl.radius-5) && !myPoi.isEmpty()) myPoi.dropMyFish(myBowl, poiDistanceToBowl);

	});

	//Mouse button release
	$canvas.on('mouseup', function(){
		//if the poi is in the water, check to see which fish are in range
		if(myPoi.x < myPool.width && myPoi.isUnderWater && !myPoi.isBroken) myPoi.takeCloseFish(myPool);
		//Bring the poi out of the water
		if(myPoi.isUnderWater)myPoi.stopTimer();

	});

	//End the game
	var stopGame = function(){
		//fix the Poi health.  Used to prevent ghost poi errors.
		myPoi.poiHealth = 30;
		//Search for and stop all fish logics to help keep memory clean.
		if(!myPool.isEmpty()) myPool.fishArray.forEach(function(key){key.die();});
		if(!myPoi.isEmpty()) myPoi.fishArray.forEach(function(key){key.die();});
		if(!myBowl.isEmpty()) myBowl.fishArray.forEach(function(key){key.die();});
		//Stop the display timer
		window.clearInterval(displayTimer);
		//Show the start button
		$('.start-button').toggleClass('hide-it');
		//unhide cursor
		$canvas.toggleClass('hide-cursor');
	};

	//This timer is for displaying things to canvas
	var displayTimer = window.setInterval(function(){
			//Check to see if the poi is broken first.
			//If the poi is broken, then end the game with a loss

      // Attempt to display all objects
      try {
        //Draw the pool.
        myPool.displayPool();
        //Draw the bowl
        myBowl.display();

        //Draw the fish in the pool if there are any
        if(!myPool.isEmpty()){
          myPool.fishArray.forEach(function(key){key.display();});
        } else {
          //If the pool is empty then end the game with a win.
          if(myBowl.getFishNum()===myPool.numberOfFish){
            stopGame();
            alert('You Win!');
            console.log('Good job!  Let\'s play again!');
          }
        }
        //Show the poi
        myPoi.display();
        //Render all fish in the poi
        if(!myPoi.isEmpty()) {
          //Filter out undefined objects
          myPoi.fishArray = myPoi.fishArray.filter(function(key){return key !== undefined;});
          //update poi location
          myPoi.fishArray.forEach(function(key){
            //display the fish in the poi
            key.display();
            //update fish in the poi of the poi's position
            key.updatePoi(myPoi.x, myPoi.y);
          });
        }
        //Display the fish in the bowl if any
        if(!myBowl.isEmpty()) {
          myBowl.fishArray.forEach(function(key){ key.display(); });
        }
			if(myPoi.isBroken) {
				stopGame();
				console.log('Try again!');
			}
      }
			//If there was an error, log it into the console.
			catch(e){
				console.log(e);
			}
	//Display Timer updates at approximately 24 frames per second.
	//This is because the human eye see things at 24 frames per second.
	},41);
};



