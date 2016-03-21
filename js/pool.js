//new Pools require a length, width, a number of fish, and a color


var Pool = function(length, width, numberOfFish, color){
	this.length = length;
	this.width = width;
	this.numberOfFish = numberOfFish;
	this.color = color;
	this.fishArray = [];

};

Pool.prototype.init =  function(){
	for(var i = 0; i<this.numberOfFish; i++){
		
	}

};