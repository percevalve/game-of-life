
//randomness will have some cell at a of 1, randomness 1 means all of them are alive, 0 all are dead
	initArray = function(width,height,randomness) {
		return recursiveArray(width,randomness).map(function () {return recursiveArray(height,randomness);});
	}

//Create the lines of the world
	recursiveArray = function(n,randomness) { 
		if(n<=0) return []; 
		var result = [Math.random() < randomness ? 1 : 0]; 
		return result.concat(recursiveArray(n-1,randomness));
	}
   
//this returns positive value for a modulo
    positive_mod = function(n,mod) {
    	return (((n % mod) + mod ) % mod);
    }

    all_the_values = function(table,needle) { 
    	var last = table.lastIndexOf(needle) ; 
    	if(last === -1)
    		return [];
    	var recursion = all_the_one(table.slice(0,last),needle);
		return recursion.concat([last]);
    }



//this returns the index of all the value one in a given array
    all_the_one = function(table) { 
    	var needle = 1 ;
		return all_the_values(table,needle);
    }
