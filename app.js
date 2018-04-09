var game = new Phaser.Game(window.innerWidth, window.innerHeight - 20, Phaser.arcade, '', { preload: preload, create: create, update: update });

var player;
var cheese, pepperoni, mushroom, basil, onion, pepper;
var cursors;
var toppings;
var menu;
var menuText;
var menuIngredients = "";
var level = 1;
var menuIngredientsArray = [];
var ingredientsCollected = "";
var pizzaArray = [];
var nextLevelText;
var emitter;
var toppingsCollected;
var win;
var tryAgain;
var tryAgainButton;
var resetLevel;

// load images of toppings + chef
function preload () {
    game.load.image('redwhite', 'images/redwhite.jpg');
    game.load.image('chef', 'images/chef.png');
    game.load.image('basil', 'images/basil.png');
    game.load.image('cheese', 'images/cheese.png');
    game.load.image('mushroom', 'images/mushroom.png');
    game.load.image('olives', 'images/olives.png');
    game.load.image('onion', 'images/onion.png');
    game.load.image('pepper', 'images/pepper.png');
    game.load.image('pepperoni', 'images/pepperoni.png');
}

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
    if (menuIngredientsArray.includes(topping.key)) {
         toppingsCollected = game.add.text(window.innerWidth-400, 100, ingredientsCollected, {font: '30px Parisienne, cursive', fill: 'green'});
    } else {
        toppingsCollected = game.add.text(window.innerWidth-400, 100, ingredientsCollected, {font: '30px Parisienne, cursive', fill: 'red'});
    }
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
    buildMenu();
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
                button = game.add.button(900, 500, 'button', goToNextLevel, this, null);
                win = game.add.text(game.world.centerX-350, game.world.centerY, "Molto bene! Well done! Click the button to move to the next level.", {font: '30px cursive', fill: 'black'});
            } else if 
                (level =3 && pizzaArray.toString() === menuIngredientsArray.toString()) {
                // console.log("pizzaArray = ", pizzaArray);
                // console.log('menuIngredientsArray = ', menuIngredientsArray);
                // console.log("You win!");
                button = game.add.button(900, 500, 'button', goToNextLevel, this, null);
                win = game.add.text(game.world.centerX-350, game.world.centerY, "BRAVISIMO! You did it! Chef says 'Graci!", {font: '30px cursive', fill: 'black'});

            } else {
                // console.log("pizzaArray = ", pizzaArray);
                // console.log('menuIngredientsArray = ', menuIngredientsArray);
                tryAgain = game.add.text(game.world.centerX-400, game.world.centerY, 'Mamma Mia... Try Again!', {font: '30px cursive', fill: 'black'});
                tryAgainButton = game.add.button(200, 500, 'button', resetLevel, this, null);
            return;
            }
        }
    }

// create the game
function create () {
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.add.tileSprite(0, 0, game.width, game.height, 'redwhite');

    // create chef and set his animations
    player = game.add.sprite(100, 450, 'chef'); 
    game.physics.arcade.enable(player);
    player.body.gravity.y = 300; 
    player.body.collideWorldBounds = true;

    player.animations.add('left', true);
    player.animations.add('right', true);
    cursors = game.input.keyboard.createCursorKeys();
  
    // create menu on screen
    menuText = game.add.text(20, 40, 'MENU',  { font: '35px cursive', fill: 'black' });
    buildMenu();

    toppingsCollectedText = game.add.text(window.innerWidth-400, 40, "TOPPINGS COLLECTED",  { font: '30px cursive', fill: 'black' });

    // Toppings fall from sky
    emitter = game.add.emitter(game.world.centerX, -200, 200);
    function Emitter(topping) {
        emitter.makeParticles(topping, [0], 10, true, false);
        emitter.minParticleScale = 0.6;
        emitter.maxParticleScale = 0.6;
        emitter.gravity = 100;
        emitter.flow(8000, 1000, 2, 80); // 2 particles emitted every 1000ms, each particle will live for 8000ms, will emit 50 particles in total then stop.
        // emitter.on = true;
    }

    // decides which toppings fall from sky (and in what order)
    function setToppingsToRain () { 
        switch (level) {
            case 1:
                cheese = new Emitter('cheese');
                pepperoni = new Emitter('pepperoni');
                break;
            case 2:
                cheese = new Emitter('cheese');
                pepperoni = new Emitter('pepperoni');
                mushroom = new Emitter('mushroom');
                cheese = new Emitter('cheese');
                olives = new Emitter('olives');
                pepper = new Emitter('pepper');
                break;
            case 3:
                cheese = new Emitter('cheese');
                pepperoni = new Emitter('pepperoni');
                olives = new Emitter('olives');
                onion = new Emitter('onion');
                basil = new Emitter('basil');
        }
    }
    setToppingsToRain();
}

 // give chef ability to move right and left; set the "overlap" function
function update () {
    player.body.velocity.x = 0;

    if (cursors.left.isDown) {
        player.body.velocity.x = -400;
    } else if (cursors.right.isDown) {
        player.body.velocity.x = 400;
    } else {
        player.animations.stop();
    }
    game.physics.arcade.overlap(player, emitter, addToPizza, null, this);
}


// STRETCH GOALS
// tint chef red when he hits unwated topping; tint him green when hits wanted topping
    // - player.tint=16000000 (red)
// Have chef bounce when waiting
// Add topping image to basket once collected
// emit all toppings at once/randomly, not in waves




    


