
var GameOfLife = function (pad,number_of_cells_per_line,number_of_lines_of_cells,square_dimension)
{
	var that = {};
//The rule : Status of the cell, Number of Neighbors, Decision (ie Dead or Alive)
	var rules = [];
	rules[0] = [];
	rules[1] = [];
	rules[0][3]=1;
	rules[1][0]=0;
	rules[1][1]=0;
	rules[1][4]=0;
	rules[1][5]=0;
	rules[1][6]=0;
	rules[1][7]=0;
	rules[1][8]=0;


    update_neighbors_cell = function(x,y,value)
    {
    	for(var h= (-1) ; h <= 1 ; h = h + 1) {
			for(var v= (-1) ; v <= 1 ; v = v +1 ) {
				xx = positive_mod((x + h),number_of_cells_per_line) ;
				yy = positive_mod((y + v),number_of_lines_of_cells) ;
				myNeighbors[xx][yy] = myNeighbors[xx][yy] + value ;
			}
		}
		//The actual value was also added, need to be corrected.
		myNeighbors[x][y] -= value;
    }

    update_neighbors_lines = function(x,y_table,value)
    {
    	y_table.forEach(function(element,index) {update_neighbors_cell(x,element,value)});
    }

    that.complete_update = function()
    {
    	myNeighbors = initArray(number_of_cells_per_line,number_of_lines_of_cells,0);
    	map_the_living_cells = myCells.map(all_the_one);
    	map_the_living_cells.forEach(function(element,index) { update_neighbors_lines(index,element,1)})
    }


//Still done in nested for loops, but should be done in the samed
	who_is_alive = function(){
		for (var i = 0; i < number_of_cells_per_line ; i = i + 1) {
			for (var j = 0; j < number_of_lines_of_cells ; j = j + 1) {
				answer = rules[myCells[i][j]][myNeighbors[i][j]] ;
				myCells[i][j] = typeof answer === "undefined" ? myCells[i][j] : answer;
			}
		}
	}

	that.generations = function()
	{
		who_is_alive();
		that.complete_update();
		that.draw();
	}

////////////////////////
//Drawing the world.
////////////////////////

	color_code = function(n){
    	if(n > 0)
			color = Color(255,255,255);
		else
			color = Color(0,0,0);
		return color;
    }

    draw_cell = function(x,y,status)
    {
    	my_color = color_code(status);
    	pad.draw_rectangle(Coord(x*square_dimension,y*square_dimension),
						square_dimension, square_dimension, 0, color_code(0),my_color);
    }

    that.myCells = function(){
     return myCells;
 }

	that.draw = function()
	{
		pad.draw_rectangle(Coord(0, 0), pad.get_width(), pad.get_height(),0, color_code(0),color_code(0));
		map_the_living_cells.forEach(function(element,x) { 
				element.forEach(function(y,indice) {
					draw_cell(x,y,1);
				})
		});
	}


////////////////////////
//Adding some objects and special behavior
////////////////////////
	engine_generator = function(x,y,engin_def,h,v)
    {
    	x = typeof x === "undefined" ? Math.floor(Math.random()*number_of_cells_per_line) : x;
    	y = typeof y === "undefined" ? Math.floor(Math.random()*number_of_lines_of_cells) : y;
    	for(var i = 0; i < engin_def.length ; i = i + 1)
    	{
    		h = positive_mod(x+engin_def[i][0],number_of_cells_per_line)
    		v = positive_mod(x+engin_def[i][1],number_of_lines_of_cells)
    		myCells[h][v] = engin_def[i][2];
    	}
    	that.complete_update();
    	that.draw();
    }

    that.spaceship_generator = function(x,y)
    {
    	spaceship = [] ;
    	spaceship.push([0,0,1]);
    	spaceship.push([0,3,1]);
    	spaceship.push([1,4,1]);
    	spaceship.push([2,0,1]);
    	spaceship.push([2,4,1]);
    	spaceship.push([3,1,1]);
    	spaceship.push([3,2,1]);
    	spaceship.push([3,3,1]);
    	spaceship.push([3,4,1]);
    	engine_generator(x,y,spaceship);
    }

    that.pentomino_r_generator = function(x,y)
    {
    	spaceship = [] ;
    	spaceship.push([0,1,1]);
    	spaceship.push([1,1,1]);
    	spaceship.push([1,2,1]);
    	spaceship.push([2,0,1]);
    	spaceship.push([2,1,1]);
    	engine_generator(x,y,spaceship);
    }


    that.glider_generator = function(x,y)
    {
    	if(Math.random() > 0.5)
    		message = glider_generator_a(x,y);
    	else
    		message = glider_generator_b(x,y);
    	that.complete_update();
    	return message;
    }


    glider_generator_a = function(x,y)
    {
    	var a = 6;
    	var b = 5;
    	spaceship = [] ;
    	for(var i = 0; i < 6 ; i = i + 1 )
    	{
    		spaceship.push([i,0,1]);
    	}
    	for(var i = 0; i < 5 ; i = i + 1 ) {
    		spaceship.push([i,1,1]);
    	}
    	engine_generator(x,y,spaceship);
    	return "Last glider A lauched at :" + x + " / " + y;
    }

    glider_generator_b = function(x,y)
    {
    	var a = 6;
    	var b = 5;
    	spaceship = [] ;
    	for(var i = 0; i < b ; i = i + 1 )
    	{
    		spaceship.push([0,i,1]);
    		
    	}
    	for(var i = 0; i < a ; i = i + 1 ) {
    		spaceship.push([1,i,1]);
 
    	}
    	engine_generator(x,y,spaceship);
    	return "Last glider B lauched at :" + x + " / " + y;
    }

//this will take out all live from the board
    that.armageddon = function()
    {
    	myCells = initArray(number_of_cells_per_line,number_of_lines_of_cells,0);
    	myNeighbors = initArray(number_of_cells_per_line,number_of_lines_of_cells,0);
    	that.complete_update();
    	that.draw();
    }

	var myCells = initArray(number_of_cells_per_line,number_of_lines_of_cells,0.1);
	var myNeighbors = []
	var map_the_living_cells = []
	that.complete_update();
	return that;
}
 
	//int=setInterval(filming,1500);

