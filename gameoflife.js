//GameOfLife contains an Array of Cells and the Board that represents the game.
//You just need to associate a new Object with a Div of you page, than use the command
//gameTurn()
GameOfLife = function(divIdName,cellsPerLine,lineOfCells,sizeOfCellDiameter) {
	var myGame = {};
	var _world = [];
	var myBoard = Board(divIdName,cellsPerLine,lineOfCells,sizeOfCellDiameter,myGame)
	
	//the 
	myGame.update_cell = function(ref,integerStatus){
    	var color = ["white","black"][integerStatus];
    	if(typeof color === "undefined")
			throw "Integer Value of Status does not exist : value was " + integerStatus ;
    	myBoard.draw_cell(ref[0],ref[1],color);
    	update_neighbors_cell(ref[0],ref[1],integerStatus);

    }

	var update_neighbors_cell = function(x,y,integerStatus)
    {
    	for(var h= (-1) ; h <= 1 ; h = h + 1) {
			for(var v= (-1) ; v <= 1 ; v = v +1 ) {
				xx = positive_mod((x + h),cellsPerLine) ;
				yy = positive_mod((y + v),lineOfCells) ;
				if(xx !== x || yy !== y){
					if(integerStatus === 0)
						_world[xx][yy].decreaseNeighbor();
					if(integerStatus === 1)
						_world[xx][yy].increaseNeighbor();

				}
			}
		}
    }

    myGame.clicked_cell = function(i,j)
    {
    	_world[i][j].statusWalk();
    }

    var testAllSurvival = function() {
    	for(var i = 0; i < cellsPerLine; i += 1)
		{
			for(var j = 0; j < lineOfCells; j += 1)
				_world[i][j].evaluateSurvival();
		}
    }

    var whoDidSurvive = function() {
    	for(var i = 0; i < cellsPerLine; i += 1)
		{
			for(var j = 0; j < lineOfCells; j += 1)
				_world[i][j].applySurvivalDecision();
		}
    }

    myGame.gameTurn = function (){
    	testAllSurvival();
    	whoDidSurvive();
    }


    myGame.myCells = function(){
    	if(DEBUG === 1)
    		return _world;
    }

    for(var i = 0; i < cellsPerLine; i += 1)
		{
			_world[i] = [];
			for(var j = 0; j < lineOfCells; j += 1)
				_world[i][j] = Cell(myGame.update_cell,[i,j]);
		}

    myBoard.initialCreation();

	return myGame;
}