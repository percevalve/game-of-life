
//randomness will have some cell at a of 1, randomness 1 means all of them are alive, 0 all are dead
	initArray = function(width,height,randomness,callback) {
		return recursiveArray(width,randomness,callback).map(function () {return recursiveArray(height,randomness,callback);});
	}



//Create the lines of the world
	recursiveArray = function(n,randomness,callback) { 
		if(n<=0) return []; 
		var result = [callback(randomness)]; 
		return result.concat(recursiveArray(n-1,randomness,callback));
	}

    my_two_sided_dice = function(fate){
        if(fate === 0 )
            return 0;
        if(fate === 1)
            return 1;
        return Math.random() < fate ? 1 : 0;
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

    times = function(n) {
        return function(f) {
            fromTo (0, n, f);
        }
    }

    var fromTo = function (from, to, f) {
        for (var i = from; i < to; i = i+1)
            f(i); 
    };

//this returns the index of all the value one in a given array
    all_the_one = function(table) { 
    	var needle = 1 ;
		return all_the_values(table,needle);
    }

    now = function () {
        return new Date().getTime();
    }


    timer = function (f,text) {
        return function (i) {
            var start = now();
            var result = f(i);
            var end = now();
            $('#glider').append("<br>"+ text + " : " + (end - start));
            return result;
        }
    }

//From http://stackoverflow.com/questions/15313418/javascript-assert
    function assert(condition, message) {
    if (!condition) {
        throw message || "Assertion failed";
    }
}
