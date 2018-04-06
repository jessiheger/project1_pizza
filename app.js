var game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, '', { preload: preload, create: create, update: update });

 // var config = {
 //        type: Phaser.AUTO,
 //        width: window.innerWidth,
 //        height: window.innerHeight,
 //        parent: "game-canvas",
 //        physics: {
 //            default: 'arcade',
 //            arcade: {
 //                gravity: { y: 200 },
 //                debug: false
 //            }
 //        },
 //        scene: {
 //            preload: preload,
 //            create: create,
 //            update: update
 //        }
 //    };

// var game = new Phaser.Game(config);

var player;
var cheese, pepperoni, mushroom, basil, onion, pepper;




function preload () {
    game.load.image('redwhite', 'images/redwhite.jpg');
    game.load.image('chef', 'images/chef3.png');
    game.load.image('basil', 'images/basil.png');
    game.load.image('cheese', 'images/cheese.png');
    game.load.image('mushroom', 'images/mushroom.png');
    game.load.image('olives', 'images/olives.png');
    game.load.image('onion', 'images/onion.png');
    game.load.image('pepper', 'images/pepper.png');
    game.load.image('pepperoni', 'images/pepperoni.png');


}

function create () {
    game.physics.startSystem(Phaser.Physics.ARCADE);

    game.add.image(400, 300, 'redwhite');

    var text = game.add.text(20, 50, 'MENU',  { font: 'Bold 40px Arial', fill: 'black' });

    var menuIngredientsArray = ["cheese", "pepperoni", "mushroom"];

    var menuIngredients = ""

    menuIngredientsArray.forEach(function(item) {
        menuIngredients += "-" + item + "\n";
    });

    var menu = game.add.text(20, 100, menuIngredients, {font: '26px Arial', fill: 'black'});

    player = game.add.sprite(100, 450, 'chef'); // 
    game.physics.arcade.enable(player);

    player.body.setCollideWorldBounds = true;
    player.body.gravity.y(300); 

    player.animations.add('left', true);
    player.animations.add('right', true);

    cursors = game.input.keyboard.createCursorKeys();

    cheese = game.add.group();
    cheese.enableBody = true;
    for (var i=0; i < 5; i++) { // creates 5 cheeses, spaced 100 px apart
        var cheese = cheese.create(i * 100, 0, 'cheese');
        cheese.body.gravity.y = 6;
    }

    pepperoni = game.add.group();
    pepperoni.enableBody = true;
    for (var i=0; i < 5; i++) { // creates 5 cheeses, spaced 100 px apart
        var pepperoni = pepperoni.create(i * 100, 0, 'pepperoni');
        pepperoni.body.gravity.y = 6;
    }

    mushroom = game.add.group();
    mushroom.enableBody = true;
    for (var i=0; i < 5; i++) { // creates 5 cheeses, spaced 100 px apart
        var mushroom = mushroom.create(i * 100, 0, 'mushroom');
        mushroom.body.gravity.y = 6;
    }

    basil = game.add.group();
    basil.enableBody = true;
    for (var i=0; i < 5; i++) { // creates 5 cheeses, spaced 100 px apart
        var basil = basil.create(i * 100, 0, 'basil');
        basil.body.gravity.y = 6;
    }

    onion = game.add.group();
    onion.enableBody = true;
    for (var i=0; i < 5; i++) { // creates 5 cheeses, spaced 100 px apart
        var onion = onion.create(i * 100, 0, 'onion');
        onion.body.gravity.y = 6;
    }

    pepper = game.add.group();
    pepper.enableBody = true;
    for (var i=0; i < 5; i++) { // creates 5 cheeses, spaced 100 px apart
        var pepper = pepper.create(i * 100, 0, 'pepper');
        pepper.body.gravity.y = 6;
    }

    olives = game.add.group();
    olives.enableBody = true;
    for (var i=0; i < 5; i++) { // creates 5 cheeses, spaced 100 px apart
        var olives = olives.create(i * 100, 0, 'olives');
        olives.body.gravity.y = 6;
    }

    

    game.physics.arcade.overlap(player, cheese, addToPizza, null, game);
    game.physics.arcade.overlap(player, pepperoni, addToPizza, null, game);
    game.physics.arcade.overlap(player, mushroom, addToPizza, null, game);
    game.physics.arcade.overlap(player, basil, addToPizza, null, game);
    game.physics.arcade.overlap(player, onion, addToPizza, null, game);
    game.physics.arcade.overlap(player, pepper, addToPizza, null, game);
    game.physics.arcade.overlap(player, olives, addToPizza, null, game);



}
function update () {

    player.body.velocity.x = 0;

    if (cursors.left.isDown)
    {
        player.body.velocity.x= -400;
        player.animations.play('left');
    }
    else if (cursors.right.isDown)
    {
        player.body.velocity.x = 300;
        player.animations.play('right');
    }
};

function addToPizza (player, topping) {
    topping.kill();    
    console.log("Caught the", topping.texture.key);
    // add green check mark next to cheese menu item

    //add to player's current pizza
}


