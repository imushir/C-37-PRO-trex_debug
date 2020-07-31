var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score;
var gameState = "play";
var gameOver_img, gameOver, restart, restart_img;
var index = 0;

function preload() {
  trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  trex_collided = loadImage("trex_collided.png");

  groundImage = loadImage("ground2.png");

  cloudImage = loadImage("cloud.png");

  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");

  gameOver_img = loadImage("gameOver.png");
  restart_img = loadImage("restart.png");

}

function setup() {
  createCanvas(600, 200);

  trex = createSprite(40, 180, 20, 50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided", trex_collided);
  trex.scale = 0.5;

  ground = createSprite(300, 180, 600, 20);
  ground.addImage(groundImage);
  ground.x = ground.width / 2;
  ground.velocityX = -4;

  invisibleGround = createSprite(200, 190, 400, 10);

  invisibleGround.visible = false;

  cloudsGroup = new Group();
  obstaclesGroup = new Group();

  gameOver = createSprite(100, 50);
  restart = createSprite(100, 100);
  gameOver.addImage(gameOver_img);
  gameOver.scale = 0.5;
  restart.addImage(restart_img);
  restart.scale = 0.5;

  gameOver.visible = false;
  restart.visible = false;

  score = 0;
}

function draw() {
  background(180);

  if (gameState == "play") {
    score = score + Math.round(getFrameRate() / 60);

    if (keyDown("space")) {
      trex.velocityY = -10;
    }

    trex.velocityY = trex.velocityY + 0.8;

    //trex.velocityX = 3;
    //camera.position.x = trex.x;
    //camera.position.x = trex.x;
    //camera.position.y = height / 2;

    spawnClouds();
    spawnObstacles();

    if (obstaclesGroup.isTouching(trex)) {
      gameState = "end";

    }

  }
  else if (gameState == "end") {

    trex.velocityY = 0;
    trex.velocityX = 0;
    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
    trex.changeAnimation("collided");

    //change the trex animation
    centre_position = width / 2;
    trex.addImage(trex_collided);
    gameOver.visible = true;
    gameOver.x = centre_position;
    ground.velocityX = 0;
    restart.visible = true;
    restart.x = centre_position;

    //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
  }

  if (mousePressedOver(restart)) {
    reset();
  }

  text("Score: " + score, 500, 50);
  if (ground.x < 0){
    ground.x = ground.width/2;
  }

  //invisibleGround.x = trex.x;
  trex.collide(invisibleGround);

  drawSprites();
}

function reset() {
  gameState = "play";

  gameOver.visible = false;
  restart.visible = false;

  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  //trex = createSprite(40, 180, 20, 50);
  trex.changeAnimation("running", trex_running);
  score = 0;

}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var x = x + 60;
    var cloud = createSprite(trex.x + 400, 120, 40, 10);

    cloud.y = Math.round(random(80, 120));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -4;

    //assign lifetime to the variable
    cloud.lifetime = 200;

    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;

    //add each cloud to the group
    cloudsGroup.add(cloud);
  }

}

function spawnObstacles() {
  if (frameCount % 80 === 0) {
    var x = x + 60;
    var obstacle = createSprite(trex.x + 400, 165, 10, 40);

    //generate random obstacles
    var rand = Math.round(random(1, 6));
    switch (rand) {
      case 1: obstacle.addImage(obstacle1);
        break;
      case 2: obstacle.addImage(obstacle2);
        break;
      case 3: obstacle.addImage(obstacle3);
        break;
      case 4: obstacle.addImage(obstacle4);
        break;
      case 5: obstacle.addImage(obstacle5);
        break;
      case 6: obstacle.addImage(obstacle6);
        break;
      default: break;
    }

    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.4;
    obstacle.lifetime = 300;
    obstacle.velocityX = -4;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }

}