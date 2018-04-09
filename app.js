var game = new Phaser.Game(window.innerWidth, window.innerHeight - 20, Phaser.arcade, '', { preload: preload, create: create, update: update });

var player;
// var cursors;
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

function clearMenu () {
    menuIngredientsArray = [];
    menuIngredients = "";
}

function clearPizzaArray () {
    pizzaArray = [];
    toppingsCollected = "";
    ingredientsCollected = "";
}

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

    menu = game.add.text(20, 100, menuIngredients, {font: '30px Parisienne, cursive', fill: 'black'});
}


function addToPizza (player, topping) {
    topping.kill();    
    // add green check mark next to cheese menu item
    if (pizzaArray.length < menuIngredientsArray.length) {
        pizzaArray.push(topping.key); 
            ingredientsCollected += "~ " + topping.key + "\n";
    };
    if (menuIngredientsArray.includes(topping.key)) {
            toppingsCollected = game.add.text(window.innerWidth-400, 100, ingredientsCollected, {font: '30px Parisienne, cursive', fill: 'green'});
    } else {
            toppingsCollected = game.add.text(window.innerWidth-400, 100, ingredientsCollected, {font: '30px Parisienne, cursive', fill: 'red'});

    };
    checkWin();
    };
// }
    // console.log(pizzaArray);

    // if (checkWin()) {
    //     console.log("Buon Apetito! Press the button to move to the next level.");
    //     console.log(pizzaArray);
    //     console.log(menuIngredientsArray)
    //     // pepperoni.on = false;
    //     // cheese.on = false;
    // } else {
    //     console.log("Try again");
    //     console.log(pizzaArray);
    //     console.log(menuIngredientsArray)
    // }

function goToNextLevel() {
    clearMenu();
    clearPizzaArray();
    level +=1;
    console.log("level is now " + level);
    create();
} 

function resetLevel() {
    clearMenu();
    clearPizzaArray();
    level = level;
    create();
    console.log("level is now " + level);
}

function checkWin (){
    if (pizzaArray.length === menuIngredientsArray.length) {
            if (pizzaArray.toString() === menuIngredientsArray.toString()) {
                // console.log("pizzaArray = ", pizzaArray);
                // console.log('menuIngredientsArray = ', menuIngredientsArray);
                // console.log("You win!");
                button = game.add.button(900, 500, 'button', goToNextLevel, this, null);
                win = game.add.text(game.world.centerX-300, game.world.centerY-200, "Bravo! Click the button to move to the next level.", {font: '30px cursive', fill: 'black'});
            } else {
                // console.log("pizzaArray = ", pizzaArray);
                // console.log('menuIngredientsArray = ', menuIngredientsArray);
                tryAgain = game.add.text(game.world.centerX-300, game.world.centerY-150, 'Mamma Mia... Try Again!', {font: '30px cursive', fill: 'black'});
                tryAgainButton = game.add.button(200, 500, 'button', resetLevel, this, null);
            return;
            }
        }
    }



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


// TINT CHEF RED
// player.tint=16000000 




    





// create toppings that fall from sky
    // toppings = game.add.group();
    // toppings.enableBody = true;
    // for ( let i=0; i < 3; i++) {
    //     cheese = toppings.create(i * 200, 0, 'cheese');
    //     cheese.body.gravity.y = 200;
    // }
    // for (let i=0; i < 5; i++) { 
    //     pepperoni = toppings.create(i * 300, 0, 'pepperoni');
    //     pepperoni.body.gravity.y = 50;
    // }
    // for (let i=0; i < 3; i++) { 
    //     mushroom = toppings.create(i * 1500, 0, 'mushroom');
    //     mushroom.body.gravity.y = 80;
    // }
    // for (let i=0; i<5; i++) {
    //     basil = toppings.create(i * 250, 0, 'basil');
    //     basil.body.gravity.y = 150;
    // }
    // for (var i=0; i < 5; i++) { 
    //     onion = toppings.create(i * 250, 0, 'onion');
    //     onion.body.gravity.y = 100;
    // }
    // for (var i=0; i < 5; i++) { 
    //     pepper = toppings.create(i * 350, 0, 'pepper');
    //     pepper.body.gravity.y = 75;
    // }
    // for (var i=0; i < 5; i++) { 
    //     olives = toppings.create(i * 400, 0, 'olives');
    //     olives.body.gravity.y = 100;
    // }

