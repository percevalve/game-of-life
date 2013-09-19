$(function(){
	// create the drawing pad object and associate with the canvas
	//pad = Pad(document.getElementById('canvas'));

	//The size of the cells
	var DIAMETER = 6 ;

	//pad.clear();
	//var MAX_X = pad.get_width() ;
	//var MAX_Y = pad.get_height();
	black = Color(0,0,0);
	WIDTH = 857 ;
	HEIGHT = 390 ;
	$("#canvas_container").width(WIDTH);
	$("#canvas_container").height(HEIGHT);
	
	// draw a box
	//pad.draw_rectangle(Coord(0, 0), pad.get_width(), pad.get_height(),0, black,black);
    var number_of_cells = Math.floor(HEIGHT/DIAMETER)*Math.floor(WIDTH/DIAMETER);
	var number_of_cells_per_line = Math.floor(WIDTH / (DIAMETER))
	var number_of_lines_of_cells = Math.floor(HEIGHT / (DIAMETER))
for(var i = 0; i < number_of_lines_of_cells; i += 1)
{
	for(var j = 0; j < number_of_cells_per_line; j += 1)
 $('<div id="cell_'+j+'_'+i+'">').appendTo("#canvas_container").css({ width : 4, height:4, margin:"1px"});
 }
	
    var start = now();
    myGame = GameOfLife("OK",number_of_cells_per_line,number_of_lines_of_cells,DIAMETER);
    var end = now();
    $('#glider').append("<br>Init all : :" + (end - start));

	//cellule = myGame.myCells();
    //count = 0 ;
    //cellule.forEach(function(e) { e.map(function(elt) {count = elt === 1 ? (count+1):count;})});
});

start = function()
{
	if(typeof int === "undefined")
		int=window.setInterval(myGame.generations,50);
}

$(function(){
	$('#start').click(start);
});



//start();