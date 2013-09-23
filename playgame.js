$(function() {
	NUMBER_OF_CELLS_PER_LINE = 20;
	NUMBER_OF_LINES_OF_CELLS = 15;
	DIAMETER = 20 ;
	DEBUG =  1;

	theGame = GameOfLife("canvas_container",
		NUMBER_OF_CELLS_PER_LINE,NUMBER_OF_LINES_OF_CELLS,
		DIAMETER);
	
	
	

start = function()
{
	if(typeof int === "undefined")
		int=window.setInterval(theGame.gameTurn,150);
}

stop = function()
{
	if(typeof int !== "undefined")
		int = window.clearInterval(int);
}

$('#start').click(start);
$('#stop').click(stop);
});
