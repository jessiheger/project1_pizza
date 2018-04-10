# Pizza Time! - Project 1

## Project Proposal
A single player game in which the goal is to "build a pizza" by catching certain toppings and avoiding others. Each round is complete once you've succesfully built the pizza prescribed by the menu on the screen. 

## Wireframes
![image](https://user-images.githubusercontent.com/13025907/38573060-cb563646-3ca9-11e8-90d2-921cb33e155f.png)

![image](https://user-images.githubusercontent.com/13025907/38572981-914e2116-3ca9-11e8-819c-0f889390e0d7.png)

![screen shot 2018-04-10 at 10 51 28 am](https://user-images.githubusercontent.com/13025907/38574254-35b48c1a-3cad-11e8-96c7-061d63132178.png)



## Game Objective
As Player 1 (i.e. the Chef), your goal is to collect the toppings that are prescribed on the menu - in the order they are listed - and dodge the toppings that are not listed. You will have three pizzas in total to "build", and each round, the toppings will be progressively more complex.

### Instructions
- Use *left* and *right* arrows to move the chef back and forth across the screen.
- Catch only the toppings (one at at time!) that are prescribed by the menu on the screen.
- Dodge the toppings that you don't want.

### How to win/ move onto the next level
- Catch the correct toppings until your pizza is complete. 
### How to lose
- Catch an incorrect topping (by neglecting to dodge it).

### Technologies and Tools Used
- Pizza Time was created with HTML, CSS, and JavaScript.
- The images are from a site that allows free PNG downloads.
- Phaser.io was used to implement much of the game functionality (with JavaScript), including the "overlap" between the chef and the toppings, the topping "particles" themselves, and the chef's movements with the arrow keys.

### Development Approach
1. Find and download PNG files of the chef, each of the toppings, and the background.
2. Program the chef to move back and forth across the screen.
3. Use a JavaScript constructor to produce "emitters" (i.e. the toppings falling from the sky).
4. The menu and toppings collected are both stored into arrays.
5. Upon an overlap between the chef and topping, add that specific topping to the pizza array and check to see if it matches the menu array.
6. Based on the outcome of #5, either display a green check mark next to the pizza menu, or make the chef turn red (to imply an incorrect topping).
7. Allow the user to start a round over if they did not catch the toppings in the correct order. Upon winning a round, allow the user to move onto the next.
8. Create three (progressively harder) rounds in total.

### If I had more time...
- Add sound effects to the chef, (a positive sound (e.g. "Yahoo!" for a correct topping and a negative sound (e.g. "Oh no!" for an incorrect topping).

