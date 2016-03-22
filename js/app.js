var $canvas = $('#gameCanvas');
//new Pools require a length, width, a number of fish, a color, and the canvas
//Sawa no Puuru  means "Sawa's Pool" in Japanese
var sawaNoPuuru = new Pool($canvas,700,800,12,'blue');
//New bowls require a canvas, height, width, and a radius (optional)
var sawaNoBouru = new Bowl ($canvas,960,400,260);
	


var timer2Id = window.setInterval(function(){

		try {
			sawaNoPuuru.displayPool();
			sawaNoBouru.display();
			sawaNoPuuru.fishArray.forEach(function(key){key.display();});
			
		}
		catch(e){
			console.log(poolObj.fishArray);
		}

},41);