proj1
=====

The aim of the tool is to help discover the different Game of Live structures, see some of them in action and test some different configuration.
Secondly, by allowing changing the rules during the games, we can see how the rules can shape the way "life" can develop itself and what organizatinal form are typical. The idea, is not only to change the rules.


function.js contains the most generic functions used in life.js
life.js contains the closure that have all the information to generate the game and control.
play.js is the particular game that is displayed.

World :
In order to prevent a border effect, the border of the world communicate, this also enable to have the objects "fly" around the space for a long period of time (like the gliders).
In order to have a fast enough refresh, I have decided to "look" for the living cell rather than go throught the complete board each time.

Usability:
When starting from a randomly generated world, the action tends to stabilize fast, so I added 2 types of "moving" objects : gliders (going up and going down) and a shapeship. The aim is to have then collide and re-created life.
I also added pentomino R object, that from a very simple form, generates a fair amount of life.
All the ibject are randomly positionned.

Rules:
Rather than use if rules, the rules are stored in an array, with the results coded at 0 for deatha and 1 for life. This way we can think of an extension of the rules to bring some randomness, with life having 60% chance of appearing if a dead cell has 2 neighbors for example...

