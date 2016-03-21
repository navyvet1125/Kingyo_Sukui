var $canvas = $('#myCanvas');

	// Required arguments are canvas, x, y, angle, targetX, targetY, and speed.

	var sawa = [];

	


	var timer2Id = window.setInterval(function(){
		$canvas.drawRect({
			  fillStyle: '#69d2e7',
			  x: 0, y: 0,
			  width: 2500,
			  height: 1400
			});
		$canvas.drawRect({
			  fillStyle: '#e0e4cc',
			  x: 950, y: 0,
			  width: 550,
			  height: 2000
			});


		$canvas.drawArc({
		  fillStyle: '#a7dbd8',
		  strokeStyle: 'black',
		  strokeWidth: 5,
		  x: 950, y: 400,
		  radius: 250
		});
		try {
			sawa.forEach(function(key){key.display();});
			
		}
		catch(e){
			console.log(sawa);
		}
	},42);