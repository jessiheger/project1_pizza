<<<<<<< master
=======
// clear the menu (between levels)
function clearMenu () {
    menuIngredientsArray = [];
    menuIngredients = "";
}

// clear your collected toppings
function clearPizzaArray () {
    pizzaArray = [];
    toppingsCollected = "";
    ingredientsCollected = "";
}

// build menu according to level
function buildMenu () {
    switch (level) {
        case 1:
            menuIngredientsArray = ["cheese", "pepperoni"];
            break;
        case 2:
            menuIngredientsArray = ["cheese", "mushroom", "pepper"];
            break;
        case 3:
            menuIngredientsArray = ["cheese", "pepperoni", "olives", "onion", "basil"];
    }
    menuIngredientsArray.forEach(function(item) {
        menuIngredients += "~ " + item + "\n";
    });
    // writes menu ingredints onto page
    menu = game.add.text(20, 100, menuIngredients, {font: '30px Parisienne, cursive', fill: 'black'});
}

// record which toppings got "collected"
function addToPizza (player, topping) {
    topping.kill();    
    // add green check mark next to cheese menu item
    if (pizzaArray.length < menuIngredientsArray.length) {
        pizzaArray.push(topping.key); 
        ingredientsCollected += "~ " + topping.key + "\n";
    }
    if (pizzaArray.includes(topping.key)) {
        toppingsCollected = game.add.text(window.innerWidth-400, 100, ingredientsCollected, {font: '30px Parisienne, cursive', fill: 'red'}
    }
    // if (menuIngredientsArray.includes(topping.key) && (pizzaArray.indexOf(topping.key) === pizzaArray.lastIndexOf(topping.key))) {
    //      toppingsCollected = game.add.text(window.innerWidth-400, 100, ingredientsCollected, {font: '30px Parisienne, cursive', fill: 'green'}); 
    // } else {
    //     toppingsCollected = game.add.text(window.innerWidth-400, 100, ingredientsCollected, {font: '30px Parisienne, cursive', fill: 'red'});
    // }
    checkWin();
}

// go on to next level with click of a button
function goToNextLevel() {
    clearMenu();
    clearPizzaArray();
    level +=1;
    console.log("level is now " + level);
    create();
} 

// reset the menu according to level
function resetLevel() {
    clearMenu();
    clearPizzaArray();
    // level = level;
    create();
    console.log("level is now " + level);
}

// check for a win or lose, display respective message on the screen
function checkWin (){
    if (pizzaArray.length === menuIngredientsArray.length) {
            if (level <=2 && pizzaArray.toString() === menuIngredientsArray.toString()) {
                // console.log("pizzaArray = ", pizzaArray);
                // console.log('menuIngredientsArray = ', menuIngredientsArray);
                // console.log("You win!");
                button = game.add.button(850, 400, 'nextArrow', goToNextLevel, this, null);
                win = game.add.text(game.world.centerX-170, game.world.centerY, "Molto bene! Well done!", {font: '40px cursive', fill: 'black'});
                emitter.destroy(true);
            } else if 
                (level === 3 && pizzaArray.toString() === menuIngredientsArray.toString()) {
                // console.log("pizzaArray = ", pizzaArray);
                // console.log('menuIngredientsArray = ', menuIngredientsArray);
                // console.log("You win!");
                button = game.add.button(10, 400, 'tryAgainArrow', goToNextLevel, this, null);
                win = game.add.text(game.world.centerX-400, game.world.centerY, "BRAVISIMO! You did it! Chef says 'Graci!", {font: '50px cursive', fill: 'black'});
                emitter.destroy(true);
            } else {
                // console.log("pizzaArray = ", pizzaArray);
                // console.log('menuIngredientsArray = ', menuIngredientsArray);
                tryAgain = game.add.text(game.world.centerX-200, game.world.centerY, 'Mamma Mia... Try Again!', {font: '40px cursive', fill: 'black'});
                tryAgainButton = game.add.button(10, 400, 'tryAgainArrow', resetLevel, this, null);
                emitter.destroy(true);
            return;
            }
        }
    }

>>>>>>> master


<<<<<<< master
=======
    function Emitter(topping) {
        emitter.makeParticles(topping, [0], 10, true, false);
        emitter.minParticleScale = 0.6;
        emitter.maxParticleScale = 0.6;
        emitter.gravity = 100;
        emitter.flow(8000, 1000, 2, 80); // 2 particles emitted every 1000ms, each particle will live for 8000ms, will emit 80 particles in total then stop.
        // emitter.on = true;
    }
>>>>>>> master