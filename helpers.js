
// decides which toppings fall from sky (and in what order)
function setToppingsToRain () {
  menuIngredientsArray.forEach(function(topping){
    switch (topping) {
      case 'olives':
        olives = new Emitter('olives');
        break;
      case 'mushroom':
        mushroom = new Emitter('mushroom');
        break;
      case 'pepper':
        pepper = new Emitter('pepper');
        break;
      case 'cheese':
        cheese = new Emitter('cheese');
        break
      case 'onion':
        onion = new Emitter('onion');
        break;
      case 'basil':
        basil = new Emitter('basil');
        break;
      case 'pepperoni':
        pepperoni = new Emitter('pepperoni');
        break;
    }
  });
}

function Emitter(topping) {
  emitter.makeParticles(topping, [0], 10, true, false);
  emitter.minParticleScale = 0.6;
  emitter.maxParticleScale = 0.6;
  emitter.gravity = 100;
  emitter.flow(8000, 1000, 2, 80); // 2 particles emitted every 1000ms, each particle will live for 8000ms, will emit 50 particles in total then stop.
  // emitter.on = true;
}

// check for a win or lose, display respective message on the screen
function checkWin (){
  if (pizzaArray.length === menuIngredientsArray.length) {
    if (level <=2 && pizzaArray.sort().toString() === menuIngredientsArray.sort().toString()) {
      button = game.add.button(900, 500, 'button', goToNextLevel, this, null);
      win = game.add.text(game.world.centerX-350, game.world.centerY, "Molto bene! Well done! Click the button to move to the next level.", {font: '30px cursive', fill: 'black'});
    } else if (level == 3 && pizzaArray.sort().toString() === menuIngredientsArray.sort().toString()) {
      button = game.add.button(900, 500, 'button', goToNextLevel, this, null);
      win = game.add.text(game.world.centerX-350, game.world.centerY, "BRAVISIMO! You did it! Chef says 'Graci!", {font: '30px cursive', fill: 'black'});
    } else {
      tryAgain = game.add.text(game.world.centerX-400, game.world.centerY, 'Mamma Mia... Try Again!', {font: '30px cursive', fill: 'black'});
      tryAgainButton = game.add.button(200, 500, 'button', resetLevel, this, null);
    }
    game.paused = true;
  }
}


// clear the menu (between levels)
function clearMenu () {
  menuIngredientsArray = [];
  menuIngredients = "";
  menu.text = "";
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
    menuIngredients = "";
    menuIngredientsArray.forEach(function(item) {
        menuIngredients += "~ " + item + "\n";
    });
    if(menu){
      menu.text = menuIngredients;
    }
}

// record which toppings got "collected"
function addToPizza (player, topping) {
    topping.kill();
    // add green check mark next to cheese menu item
    if (pizzaArray.length < menuIngredientsArray.length) {
        pizzaArray.push(topping.key);
        ingredientsCollected += "~ " + topping.key + "\n";
    }
    if (menuIngredientsArray.includes(topping.key)) {
         toppingsCollected = game.add.text(window.innerWidth-400, 100, ingredientsCollected, {font: '30px Parisienne, cursive', fill: 'green'});
    } else {
        toppingsCollected = game.add.text(window.innerWidth-400, 100, ingredientsCollected, {font: '30px Parisienne, cursive', fill: 'red'});
    }
    checkWin();
}

// go on to next level with click of a button
function goToNextLevel() {
  game.paused = false;
  clearMenu();
  buildMenu();
  clearPizzaArray();
  level +=1;
  console.log("level is now " + level);
  create();
}

// reset the menu according to level
function resetLevel() {
  game.paused = false;
  clearMenu();
  buildMenu();
  clearPizzaArray();
  create();
  console.log("level is now " + level);
}
