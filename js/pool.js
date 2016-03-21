//new Pools require a canvas, height, width, a number of fish, and a color


var Pool = function(canvas, height, width, numberOfFish, color){
	this.height = height;
	this.width = width;
	this.numberOfFish = numberOfFish;
	this.color = color;
	this.fishArray = [];
	this.canvas = canvas;
	//Generate the pool immediately
	this.init();
	this.displayPool();

};


//creates a new pool and populates it with the required number of fish
Pool.prototype.init =  function(){
	var halfWidth = this.width/2;
	var halfHeight = this.height/2;
	for(var i = 0; i<this.numberOfFish; i++){

		var x = Math.floor(Math.random()*halfWidth)+100;
		var y = Math.floor(Math.random()*halfHeight)+100;
		var angle = Math.floor(Math.random()*360);
		var targetX = halfWidth;
		var targetY = halfHeight;
		var speed = Math.floor(Math.random()*10);
		this.fishArray.push(new Goldfish(this.canvas,x,y,angle,300,300,speed));
	}

};



Pool.prototype.displayPool = function(){
	var poolObj = this;
	var timer2Id = window.setInterval(function(){
		poolObj.canvas.drawRect({
			  fillStyle: '#69d2e7',
			  strokeStyle:'black',
			  x: poolObj.height/2,
			  y: poolObj.width/2,
			  width: poolObj.height,
			  height: poolObj.width,
			  fromCenter: true
			});
		// console.log(poolObj.width/2);
		// poolObj.canvas.drawRect({
		// 	  fillStyle: '#e0e4cc',
		// 	  x: poolObj.width,
		// 	  y: poolObj.height,
		// 	  width: 550,
		// 	  height: 2000
		// 	});


		poolObj.canvas.drawArc({
		  fillStyle: '#a7dbd8',
		  strokeStyle: 'black',
		  strokeWidth: 5,
		  x: 950, y: 400,
		  radius: 250
		});
		try {
			poolObj.fishArray.forEach(function(key){key.display();});
			
		}
		catch(e){
			console.log(poolObj.fishArray);
		}
	},41);
};