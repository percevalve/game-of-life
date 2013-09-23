//Rules contains the rules applicable for all cells
//They can be changed during the game.
//You should not need to call Cell directly

var lawsOfLifeAndDeath = [];
lawsOfLifeAndDeath[0] = [];
lawsOfLifeAndDeath[1] = [];
lawsOfLifeAndDeath[0][3]=1;
lawsOfLifeAndDeath[1][0]=0;
lawsOfLifeAndDeath[1][1]=0;
lawsOfLifeAndDeath[1][4]=0;
lawsOfLifeAndDeath[1][5]=0;
lawsOfLifeAndDeath[1][6]=0;
lawsOfLifeAndDeath[1][7]=0;
lawsOfLifeAndDeath[1][8]=0;



Rules = {
	validStatus : ["dead","alive"],
	lawsOfLifeAndDeath : lawsOfLifeAndDeath
}

Cell = function(callback,reference) {
	var myCell = Object.create(Rules);	
	var status = myCell.validStatus[0];
	var neighbors = 0;
	var next_status = 0 ;

	myCell.evaluateSurvival = function(){
		var answer = myCell.lawsOfLifeAndDeath[myCell.valueOf()][neighbors] ;
		if(typeof answer !== "undefined"){
			next_status = answer;
		}
	}

	myCell.applySurvivalDecision = function(){
		if(myCell.valueOf() !== next_status){
			myCell.statusChange(next_status);
		}
	}

	myCell.status = function(){
		if(DEBUG === 1)
			return status;
	}

	myCell.next_status = function(){
		if(DEBUG === 1)
			return next_status;
	}

	myCell.neighbors = function(){
		if(DEBUG === 1)
			return neighbors;
	}

	//Killing the cell
	//takes into considerations evolution of the Rules with multiple "alive" status
	myCell.decreaseLife = function(){
		new_state = Math.max((myCell - 1) , 0);
		console.log(reference);
		return myCell.statusChange(new_state);
	}

	//Birth of the cell
	//takes into considerations evolution of the Rules with multiple "alive" status
	myCell.increaseLife = function(){
		var new_state = Math.min(myCell + 1 , (myCell.validStatus.length - 1));
		return myCell.statusChange(new_state);
	}

	myCell.increaseNeighbor = function(){
		neighbors = neighbors + 1;
		if(neighbors > 8)
			throw "Too much neighbors";

	}

	myCell.decreaseNeighbor = function(){
		neighbors = neighbors - 1;
		if(neighbors < 0)
			throw "Negative Number of neighbors";
	}

	//Goes through all the status of the cell
	//once reached the last "alive" status
	//goes back to the initial 0 or "dead" status

	myCell.statusWalk = function(){
		var new_state = (myCell + 1) % myCell.validStatus.length;
		return myCell.statusChange(new_state);
	}


	//Check if the new status is valid and if it is different from the previous status
	//Uses the Callback only in this case.
	//new_state is an integer, status is a string !

	myCell.statusChange = function(new_state){
		var answer = myCell.validStatus[new_state];
		if(typeof answer === "undefined")
			throw "Status does not exist : "+ new_state;
		if(answer !== status) {
			status = answer;
			next_status = new_state ;
			callback(reference,myCell.valueOf());
		}
		return status;
	}

	myCell.toString = function(){
		var msg = "This cell is " + status + ".";
		return msg;
	}

	myCell.valueOf = function(){
		return myCell.validStatus.indexOf(status);
	}
	
	return myCell;
}
