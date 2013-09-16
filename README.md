proj1
=====

function.js contains the most generic functions used in life.js
life.js contains the closure that have all the information to generate the game and control.
play.js is the particular game that is displayed.

World :
In order to prevent a border effect, the border of the world communicate, this also enable to have the objects "fly" around the space for a long period of time (like the gliders).
In order to have a fast enough refresh, I have decided to "look" for the living cell rather than go throught the complete board each time.
I still have nested "for" loops to decide if a cell is dead or alive, but the aim would be to "look for" the cells rather that scroll the complete board each generations.

Usability:
When starting from a randomly generated world, the action tends to stabilize fast, so I added 2 types of "moving" objects : gliders (going up and going down) and a shapeship. The aim is to have then collide and re-created life.
I also added pentomino R object, that from a very simple form, generates a fair amount of life.
All the ibject are randomly positionned.

