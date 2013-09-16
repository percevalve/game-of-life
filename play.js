( function(){
	// create the drawing pad object and associate with the canvas
	pad = Pad(document.getElementById('canvas'));

	//The size of the cells
	var DIAMETER = 5 ;

	pad.clear();
	var MAX_X = pad.get_width() ;
	var MAX_Y = pad.get_height();
	black = Color(0,0,0);
	// draw a box
	pad.draw_rectangle(Coord(0, 0), pad.get_width(), pad.get_height(),0, black,black);
	// number of the cells and 
	var number_of_cells = Math.floor(MAX_Y/DIAMETER) *Math.floor(MAX_X/DIAMETER)
	var number_of_cells_per_line = Math.floor(MAX_X / (DIAMETER))
	var number_of_lines_of_cells = Math.floor(MAX_Y / (DIAMETER))
    myGame = GameOfLife(pad,number_of_cells_per_line,number_of_lines_of_cells,DIAMETER);
	myGame.draw();
})();

start = function()
{
	if(typeof int === "undefined")
		int=window.setInterval(myGame.generations,50);
}

start();