var player,playerImg,playerEnd;
 var ground,groundImg;
 var ghost,ghostImg;
 var ghostGroup,bulletGroup;
 var bullet,bulletImg;
 var gameState = "play";
 var lives = 3;

  function preload(){
    playerImg = loadAnimation("p1.png","p2.png","p3.png","p4.png")
    playerEnd = loadAnimation("playerdead.png")
    groundImg = loadImage("ground.png")
    ghostImg = loadAnimation("ghost1.png","ghost2.png","ghost3.png","ghost4.png","ghost5.png")
    bulletImg = loadImage("bullet.png");
  }


function setup() {
  createCanvas(1100,800);

  ground = createSprite(600,400,1100,800)
  ground.addImage(groundImg);
  
  ground.scale = 1.4;

  player= createSprite(250, 300, 50, 50);
  player.addAnimation("running",playerImg);
  player.addAnimation("ending",playerEnd);
  player.scale = 0.6; 
  player.debug = true;

ghostGroup = new Group();
bulletGroup = new Group();
}

function draw() {
  background(0); 
  if (gameState==="play"){
    ground.velocityX = -12;
   
  if(ground.x<300){
    ground.x = 400;
  }
  spawnEnemies();
  if(keyDown(UP_ARROW)){
    spawnBullets();
  }
  if(ghostGroup.isTouching(bullet)){
    ghost.velocityX=0
    }
  if (ghostGroup.isTouching(player)){
    gameState = "end";
 
  }
}
else if (gameState === "end"){
ground.velocityX = 0;
player.velocityX = 0;
player.changeAnimation("ending",playerEnd)
player.scale = 1;
//ghostGroup.setVelocityXEach(0);
//ghostGroup.setLifetimeEach(-1);
ghostGroup.destroyEach();
}
  drawSprites();
}

function spawnEnemies(){
if (frameCount%150===0){
  ghost = createSprite(1000,300,50,50);
  ghost.addAnimation("jumping",ghostImg);
  ghost.velocityX = -6;
  ghost.scale = 0.5
  ghost.debug = true;
  ghost.setCollider("rectangle",0,0,ghost.width-70,ghost.height)
  ghost.lifetime = 1100;
  ghostGroup.add(ghost)
}
}

function spawnBullets(){
  //if (frameCount%150===0){
    bullet = createSprite(player.x+140,player.y-40,50,50);
    bullet.addImage(bulletImg);
    bullet.velocityX = 6;
    bullet.scale = 0.2
    //bullet.lifetime = 1100;
  //bulletGroup.add(bullet)
  bullet.debug = true;
 

  //}
  }