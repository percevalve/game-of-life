# Game of Life
=====

The aim of the tool is to help discover the different [Conway's Game of Live](http://en.wikipedia.org/wiki/Conway's_Game_of_Life) patterns, see some of them in action.
Secondly, by allowing changing the rules during the games, we can see how the rules can shape the way "life" can develop itself and what organizatinal form are typical. The idea, is not only to change the rules.

## Usability:
Initially the "world" is empty, you need to add [patterns](http://en.wikipedia.org/wiki/Conway's_Game_of_Life#Examples_of_patterns) (or objects).
They are 3 different patterns for the moment:
* [Spaceships](http://www.conwaylife.com/wiki/Types_of_spaceships#Standard_spaceship) :
  * [Gliders](http://www.conwaylife.com/wiki/Glider) (going up and going down), moves in diagonal.
  * [Lightweight spaceship (LWSS)](http://www.conwaylife.com/wiki/Lightweight_spaceship), moves orthogonally.
* [Methuselahs](http://en.wikipedia.org/wiki/Methuselah_(cellular_automaton)) :
  * [Pentomino R](http://www.conwaylife.com/wiki/R-pentomino) , that from a very simple form, generates a fair amount of life.
All the object are randomly positionned.

## Rules:
The rules are stored in an array, with the results coded at 0 for death and 1 for life. This way we can think of an extension of the rules to bring some randomness, with life having 60% chance of appearing if a dead cell has 2 neighbors for example...

## World :
In order to prevent a border effect, the border of the world communicate, this also enable to have the objects "fly" around the space for a long period of time (like the gliders).

## The files :
### function.js
It contains the most generic functions used in life.js
### cell.js
It is in charge of creating Cells. Each cell has the same prototype "Rules" that contains all the rules and can be modified during the game. There is no need to instantiate any cell object directly. Everytime the cell changes state (during the game of because someone clicked), it calls a "callback" function that inform the GameOfLife object it has changed its status. Once the GameOfLife object receive the message, he makes sure the board is up to date and updates the neighboring cells.
### board.js
It is in charge of the representation of the Game. He has no clue on what is going on. The board is clickable.
### gameoflife.js
It contains a clojure with an array of cells and control the board. He serves as a relay between the board and the actual cell.





