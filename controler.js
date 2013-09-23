Controler = function(myGame,maxX,maxY){
	myControler = {};
	var engine_generator = function(engin_def,x,y,h,v)
    {
    	x = typeof x === "undefined" ? Math.floor(Math.random()*maxX) : x;
    	y = typeof y === "undefined" ? Math.floor(Math.random()*maxY) : y;
    	for(var i = 0; i < engin_def.length ; i = i + 1)
    	{
    		h = positive_mod(x+engin_def[i][0],maxX)
    		v = positive_mod(y+engin_def[i][1],maxY)
    		myGame.clicked_cell(h,v)
    	}
    }

    myControler.spaceship_generator = function(x,y)
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
    	engine_generator(spaceship,x,y);
    }

    myControler.pentomino_r_generator = function(x,y)
    {
    	spaceship = [] ;
    	spaceship.push([0,1,1]);
    	spaceship.push([1,1,1]);
    	spaceship.push([1,2,1]);
    	spaceship.push([2,0,1]);
    	spaceship.push([2,1,1]);
    	engine_generator(spaceship,x,y);
    }

    myControler.glider_generator = function(x,y)
    {
    	if(Math.random() > 0.5)
    		glider_generator_a(x,y);
    	else
    		glider_generator_b(x,y);
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
    	engine_generator(spaceship,x,y);
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
    	engine_generator(spaceship,x,y);
    }

    return myControler;
}