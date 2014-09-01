$(function() {
	NUMBER_OF_CELLS_PER_LINE = 20;
	NUMBER_OF_LINES_OF_CELLS = 15;
	DIAMETER = 20 ;
	DEBUG =  0;

	theGame = GameOfLife("canvas_container",
		NUMBER_OF_CELLS_PER_LINE,NUMBER_OF_LINES_OF_CELLS,
		DIAMETER);
	theControler = Controler(theGame,NUMBER_OF_CELLS_PER_LINE,NUMBER_OF_LINES_OF_CELLS);
	
	
	

var start = function(self)
{
	if(typeof theGameStatus === "undefined"){
		theGameStatus = window.setInterval(theGame.gameTurn,150);
		statusCheck(theGameStatus);
	}
}

var stop = function(self)
{
	if(typeof theGameStatus !== "undefined"){
		theGameStatus = window.clearInterval(theGameStatus);
		statusCheck(theGameStatus);
	}
}

var statusCheck = function(intStatus){
	if(typeof theGameStatus !== "undefined"){
		button_start.attr("disabled", true);
		button_stop.attr("disabled", false);
	}
	else{
		button_stop.attr("disabled", true);
		button_start.attr("disabled", false);
	}
}

var button_start = $('button#start')
var button_stop = $('button#stop')
button_start.click(start);
button_stop.click(stop);
statusCheck();
$('#spaceship').click(function() {theControler.spaceship_generator();});
$('#pento').click(function() {theControler.pentomino_r_generator();});
$('#myglider').click(function() {theControler.glider_generator();});

});
