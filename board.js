//Board represents the actual board that represents the Game of Life
//It only can speak to the Game Object itself
//You should not need to interact with him, see the GameOfLife Object
Board = function(divIdName,cellsPerLine,lineOfCells,sizeOfCellDiameter,gameReference){
	var myBoard = {};
	var _cellMargin = 0.05;
	var _maxCellMargin = 3;
	if(DEBUG === 1){
		_boardBackgroundColor = "red" ;
		_cellInitialColor = "blue" ;
	} else {
		_boardBackgroundColor = "white" ;
		_cellInitialColor = "white" ;
	}
	var _margin = Math.min(Math.max(Math.floor(sizeOfCellDiameter*_cellMargin),1),_maxCellMargin);
	console.log(_margin);
	var _actualsize = sizeOfCellDiameter - 2*_margin;
	var _width = sizeOfCellDiameter * cellsPerLine ;
	var _height = sizeOfCellDiameter * lineOfCells ;
	$("#"+divIdName).width(_width);
	$("#"+divIdName).height(_height);
	$("#"+divIdName).css({background:_boardBackgroundColor});
	myBoard.initialCreation = function(){
		times(lineOfCells)(function(h){
			times(cellsPerLine)(function(g){
				$("<div/>",{
					"id" : 'cell_'+g+'_'+h ,
					click: function(){
						gameReference.clicked_cell(g,h);
					},
					css : { 
						width : _actualsize, 
						height: _actualsize, 
						margin: _margin + "px" , 
						background:_cellInitialColor}
				}).appendTo("#"+divIdName)
			})
		})
	}

	myBoard.draw_cell = function(x,y,myColor) {
		$('#'+divIdName+' div#cell_'+x+'_'+y+'').css({background:myColor});
	}

	return myBoard
}