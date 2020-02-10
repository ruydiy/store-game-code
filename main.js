//създаване на нова игра
var game = new Phaser.Game( 
    1520, // ширина
    705, //височина
    Phaser.CANVAS, 
    'game',//име на играта
    {// обект с функиите към него
        preload: preload,// зарежда ресурсите за играта преди играта да е стартирала
        update: update, //обновява командите в играта
        create: create // зарежда началния старт на играта
    }
);

var map;
var layer;

var guy;
var cursors;

var fons;
var fences;
var wardrobe;
var text;

var textwardrobe;
var wall;
var imageOne;
var imageTwo;
var imageThree;

function preload(){
    game.load.tilemap('gameMap', 'assets/images/gameMap.json', null, Phaser.Tilemap.TILED_JSON); 
    game.load.image('gameTileset', 'assets/images/terrain_atlas.png');

    game.load.spritesheet('guy', 'assets/images/person.png', 64/4, 64/4);
    game.load.image('wardrobe', 'assets/images/wardrobe.png');
    game.load.image('wall', 'assets/images/white.jpg');

    game.load.image("fon", 'assets/images/creamy.jpg');
    game.load.image("ograda", 'assets/images/fance.png');

    game.load.image("image1", 'assets/images/wardrobe1.jpg');
    game.load.image("image2", 'assets/images/wardrobe2.jpg');
    game.load.image("image3", 'assets/images/wa.jpg');
    
    
    
}


function create() {
    map = game.add.tilemap('gameMap');
    map.addTilesetImage('gameTileset', 'gameTileset');
    layer = map.createLayer('worldLayer');
    game.world.setBounds(0, 0, 2500, 2500);  
    
    var x=100;
    var y=100;
    fons = game.add.physicsGroup();
    for (var x = 0; x < 20; x++) 
    {
        for (var y=0; y < 10; y++)
        {
        
          var fon = fons.create(x*100, y*100, 'fon');
          fon.scale.setTo(0.31);
        }
    } 
    
    
    wardrobe = game.add.sprite(750, 50, 'wardrobe');
    wardrobe.inputEnabled = true;
    wardrobe.scale.setTo(0.3);
    
    wall = game.add.sprite(750, 0, 'wall');
    wall.scale.setTo(1.2, 0.71);

    imageOne = game.add.sprite(800,250, 'image1');
    imageOne.visible=false;
    imageTwo = game.add.sprite(800,250, 'image2');
    imageTwo.visible=false;
    imageThree = game.add.sprite(800,250, 'image3');
    imageThree.visible=false;
    text = game.add.text(900, 40, 'Трикрилен гардероб - масив', { fill: '#e6b800' });
    textwardrobe = game.add.text(1180, 500, 'Трикрилен гардероб \n - масив \n - размери: 126/51/178 см. \n - цвят: натурален,  \n   състарен, орех    ', { fill: '#e6b800' ,  });
    textwardrobe.scale.setTo(0.71, 1);
    

    var i=500;
    var j=400;
    fences = game.add.group();
    fences.enableBody = true;
    for (var i=0; i<2; i++)
    {
        for(var j=1; j<9; j++)
        {
            var fence = fences.create( 2000, j*120, 'ograda');
           
            fence.scale.setTo(0.381);
            fence.anchor.setTo(0.5, 0.5);
            fence.angle = 90;
            fence.body.immovable = true;
        }
    }
    var fence = fences.create( 0, 1000,  'ograda');
    fence.scale.setTo(0.381);
    for (var i=0; i<2; i++)
    {
        for(var j=1; j<9; j++)
        {
            var fence = fences.create( j*220, 1000,  'ograda');
           
            fence.scale.setTo(0.381);
            //fence.anchor.setTo(0.5, 0.5);
            //fence.angle = 90;
            fence.body.immovable = true;
        }
    }

    guy = game.add.sprite(200, 200, 'guy');
    guy.scale.setTo(3.5);
    guy.enableBody=true;
    guy.physicsBodyType = Phaser.Physics.ARCADE;
    game.physics.arcade.enable(guy);
    guy.body.collideWorldBounds=true;
    guy.body.bounce.setTo(0.9, 0.9);

    guy.animations.add('left', [12, 13, 14, 15 ], 12, true);
    guy.animations.add('right', [8, 9, 10, 11], 12, true);
    guy.animations.add('up', [4, 5, 6, 7], 12, true);
    guy.animations.add('down', [0, 1, 2, 3], 12, true);
    guy.animations.add('stop',[0],12,true);
    
    game.physics.enable(guy, Phaser.Physics.ARCADE);
    game.camera.follow(guy);

    cursors = game.input.keyboard.createCursorKeys();
}



function update() {

    if (cursors.left.isDown)
{
    guy.animations.play('left');
    guy.x-=5;
}
else if (cursors.right.isDown)
{
    guy.animations.play('right');
    guy.x+=5;
}
else if (cursors.up.isDown)
{
    guy.animations.play('up')
    guy.y-=5;
}
else if (cursors.down.isDown)
{
    guy.animations.play('down');
    guy.y+=5;
}
else
{
    guy.animations.play('stop');
}

if (checkOverlap(guy, wardrobe))
{
    text.visible=true;
    textwardrobe.visible=true;
    wall.visible=true;
    wardrobe.scale.setTo(1.7, 1.39);
    wardrobe.y=0;
    wardrobe.x=750;
    imageOne.visible=true;
    imageTwo.visible=true;
    imageThree.visible=true;

    if (checkOverlap(guy,imageOne)){
        imageOne.scale.setTo(0.59);
        imageOne.y=110;
        imageThree.scale.setTo(0.17);
        imageThree.x=1050;
        imageThree.y=510;
        imageTwo.scale.setTo(0.17);
        imageTwo.x=910;
        imageTwo.y=510;
        // imageTwo.visible=false;
        // imageThree.visible=false;
    }
    else
    {
    imageOne.scale.setTo(0.17);
    imageOne.x=810;
    imageOne.y=510;
    }

    if(checkOverlap(guy,imageTwo)){
        imageTwo.y=110;
        imageTwo.scale.setTo(0.59);
        imageOne.scale.setTo(0.17);
        imageOne.x=810;
        imageOne.y=510;
        imageThree.scale.setTo(0.17);
        imageThree.x=1050;
        imageThree.y=510;
        // imageOne.visible=false;
        // imageThree.visible=false;
    }
    else
    {
        imageTwo.scale.setTo(0.17);
        imageTwo.x=910;
        imageTwo.y=510;
    }

    if(checkOverlap(guy,imageThree)){
        
        imageOne.scale.setTo(0.17);
        imageOne.x=810;
        imageOne.y=510;
        imageTwo.scale.setTo(0.17);
        imageTwo.x=910;
        imageTwo.y=510;
        imageThree.y=110;
        imageThree.x=950;
        imageThree.scale.setTo(0.59);
        // imageOne.visible=false;
        // imageTwo.visible=false;

    }
    else
    {
        imageThree.scale.setTo(0.17);
        imageThree.x=1050;
        imageThree.y=510;
    }

}
else
{
    text.visible = false;
    textwardrobe.visible=false;
    wall.visible=false;
    wardrobe.x= 750;
    wardrobe.y= 50;
    wardrobe.scale.setTo(0.4);
    imageOne.visible=false;
    imageTwo.visible=false;
    imageThree.visible=false;
}

}

function checkOverlap(spriteA, spriteB) {

    var boundsA = spriteA.getBounds();
    var boundsB = spriteB.getBounds();

    return Phaser.Rectangle.intersects(boundsA, boundsB);

}