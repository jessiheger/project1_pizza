
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
  emitter.flow(8000, 1000, 2, 80); // 2 particles emitted every 1000ms, each particle will live for 8000ms, will emit 80 particles in total then stop.
  // emitter.on = true;
}

// check for a win or lose, display respective message on the screen
function checkWin (){
  if (pizzaArray.length === menuIngredientsArray.length) {
    if (level <=2 && pizzaArray.sort().toString() === menuIngredientsArray.sort().toString()) {
      button = game.add.button(game.width-400, 400, 'nextArrow', goToNextLevel, this, null);
      win = game.add.text(game.world.centerX-170, game.world.centerY, "Molto bene! Well done!", {font: '40px cursive', fill: 'black'});
    } else if (level === 3 && pizzaArray.sort().toString() === menuIngredientsArray.sort().toString()) {
      // button = game.add.button(game.width-900, 400, 'tryAgainArrow', goToNextLevel, this, null);
      win = game.add.text(game.world.centerX-450, game.world.centerY, "BRAVISIMO! You did it! Chef says 'Grazie!'", {font: '50px cursive', fill: 'black'});
    } else {
      button = game.add.button(game.width-900, 400, 'tryAgainArrow', resetLevel, this, null);
      tryAgain = game.add.text(game.world.centerX-200, game.world.centerY, 'Mamma Mia... Try Again!', {font: '40px cursive', fill: 'black'});
    }
    game.paused = true;
  }
}

// clear the menu (between levels)
function clearMenu () {
  menuIngredientsArray = [];
  menuIngredients = "";
  // menu.text = "";
}

function clearRound () {
  round = "";
  // menu.text = "";
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
    menuIngredientsArray.forEach(function(item, i) {
        game.add.text(20, 60 + (i+1)*40, "~ " + item, {font: '30px cursive', fill: 'black'});
        ingredientPos.push(60 + (i+1)*40);
      })
    };

function displayRound() {
   switch (level) {
        case 1:
            levelDisplay = 'Pizza 1 of 3'
            break;
        case 2:
            levelDisplay = 'Pizza 2 of 3'
            break;
        case 3:
            levelDisplay = 'Pizza 3 of 3'
    }
    round = game.add.text(game.width-250, 40, levelDisplay,  { font: '30px cursive', fill: 'black' });
  };

function addCheck (topping) {
  indexOfMenuItem = (menuIngredientsArray.indexOf(topping));
  console.log(60 + (indexOfMenuItem +1)*40);
  game.add.image(180, (60 + (indexOfMenuItem +1)*40), 'checkmark');
  }


function chefRed() {
  player.tint=16000000;
  game.time.events.add(500, function() {
    player.tint=16777215;
  } , this);
}

// record which toppings got "collected"
function addToPizza (player, topping) {
    topping.kill();
    if (pizzaArray.length < menuIngredientsArray.length) {
        pizzaArray.push(topping.key);
        ingredientsCollected += "~ " + topping.key + "\n";
    }
    if (menuIngredientsArray.slice(0, pizzaArray.length).toString() !== pizzaArray.toString()) {
      chefRed();
    } else {
      addCheck(topping.key);
    }
    checkWin();
}

// go on to next level with click of a button
function goToNextLevel() {
  game.paused = false;
  clearMenu();
  buildMenu();
  clearRound();
  displayRound();
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
