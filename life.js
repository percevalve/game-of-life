
var GameOfLife = function (pad,number_of_cells_per_line,number_of_lines_of_cells,square_dimension)
{
	var that = {};
//The rule : Status of the cell, Number of Neighbors, Decision (ie Dead or Alive)
	var rules = [];
    rules[0] = [];
    rules[1] = [];
    rules[0][3]=1;
//  rules[0][6]=1;
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
        var start = now();
        myNeighbors = myNeighbors.map(function(line,line_number) { 
            return line.map(function(value,row_number) { 
                return 0;
            }); 
        });
        //myNeighbors = initArray(number_of_cells_per_line,number_of_lines_of_cells,0);
        var end = now();
        $('#glider').append("<br>Neighbors to 0 : :" + (end - start));
        var start = now();
    	map_the_living_cells = myCells.map(all_the_one);
        var end = now();
        $('#glider').append("<br>Map the Ones  : : " + (end - start));
        var start = now();
    	map_the_living_cells.forEach(function(element,index) { update_neighbors_lines(index,element,1)})
        var end = now();
        $('#glider').append("<br>Update Neighbors : : " + (end - start));
    }


	that.who_is_alive = function(){
        myCells = myCells.map(function(line,line_number) { 
            return line.map(function(value,row_number) { 
                answer = rules[value][myNeighbors[line_number][row_number]] ;
                if(answer === 0 )
                    myDeath.push([line_number,row_number]);
                if(answer === 1 )
                    myBirth.push([line_number,row_number]);
                myNeighbors[line_number][row_number] = 0 ;
                return typeof answer === "undefined" ? value : answer;
            }); 
        });
//		for (var i = 0; i < number_of_cells_per_line ; i = i + 1) {
//			for (var j = 0; j < number_of_lines_of_cells ; j = j + 1) {
//				answer = rules[myCells[i][j]][myNeighbors[i][j]] ;
//
//				myCells[i][j] = typeof answer === "undefined" ? myCells[i][j] : answer;
//			}
//		}
	}

	that.generations = function()
	{
        var start = now();
        count = 0 ;
        myCells.forEach(function(e) { e.map(function(elt) {count = elt === 1 ? (count+1):count;})});
		var end = now();
        $('#glider').append("<br>Counting cells : :" + (end - start));
        timer(that.who_is_alive,"who_is_alive : "+count)();
		timer(that.complete_update,"complete_update : "+count)();
		timer(that.draw_change,"draw_change : "+count)();
        timer(that.draw,"draw : "+count)();
    }

////////////////////////
//Drawing the world.
////////////////////////

	color_code = function(n){
    	if(n > 0)
			color = "black";
		else
			color = "white";
		return color;
    }

    draw_cell = function(x,y,status)
    {
        my_color = color_code(status);
        $('#cell_'+x+'_'+y+'').css({background:my_color});
    	//pad.draw_rectangle(Coord(x*square_dimension,y*square_dimension),
		//				square_dimension, square_dimension, 0, color_code(0),my_color);
    }

	that.draw = function()
	{
		//pad.draw_rectangle(Coord(0, 0), pad.get_width(), pad.get_height(),0, color_code(0),color_code(0));
        $('div.columns div').css({background:'white'});
        map_the_living_cells.forEach(function(element,x) { 
				element.forEach(function(y,indice) {
					draw_cell(x,y,1);
				})
		});
	}

    that.draw_change = function()
    {
        myDeath.forEach(function(element) { 
                draw_cell(element[0],element[1],0);
            });
        myBirth.forEach(function(element) { 
                draw_cell(element[0],element[1],1);
            });
        myDeath = [];
        myBirth = [];
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
    	myCells = initArray(number_of_cells_per_line,number_of_lines_of_cells,0,my_two_sided_dice);
    	myNeighbors = initArray(number_of_cells_per_line,number_of_lines_of_cells,0,my_two_sided_dice);
    	that.complete_update();
    	that.draw();
    }

	var start = now();
    var myCells = initArray(number_of_cells_per_line,number_of_lines_of_cells,0.2,my_two_sided_dice);
    var end = now();
    $('#glider').append("<br>Create Celle  : : " + (end - start));
    var start = now();
	var myNeighbors = initArray(number_of_cells_per_line,number_of_lines_of_cells,0,my_two_sided_dice);
    var end = now();
    $('#glider').append("<br>First Neighbors  : : " + (end - start));
    myDeath = [];
    myBirth = [];
	var map_the_living_cells = [];
    map_the_living_cells = myCells.map(all_the_one);
    timer(that.draw,"Init draw : ")();that.draw();
	timer(that.complete_update,"Initial complete_update : ")();
	that.myNeighbors = function  (argument) {
		return myNeighbors;
	}
	return that;
}
 
	//int=setInterval(filming,1500);

