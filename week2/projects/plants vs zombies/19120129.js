/* Javascript JQUERY AND JQUERY UI */
/* Chinese Chess - Xianqi */
/* 
Họ và tên   : Huỳnh Minh Thắng
MSSV        : 19120129
*/
"use strict";
var plantLists = [];
var bulletLists = [];
var zombieLists = [];
var lawnmoverLists = [];
var width = 100; //Width of a square
var startX = 140; //Board starts from left=410
var startY = 70; //Board starts from left=410
var endY = startY + width * 5;
var endX = startX + width * 11;
var unitPadding = 30; //Padding so that units stay centered
var currentGold = 500;
//OnLoad - This always starts after everything is loaded
$(function () {
  drawBoard();
  $(".gold-number").text(currentGold);
});
var board = [];
for (let i = 0; i < 5; i++) {
  board[i] = [];
  for (let j = 0; j < 11; j++) {
    board[i][j] = 0;
  }
}

//This Function DrawBoard On Canvas
function drawBoard() {
  //Get Canvas From HTML
  var canvas = document.getElementsByTagName("canvas")[0];
  var ctx = canvas.getContext("2d");
  //Make Canvas Fullscreen
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  ctx.beginPath();
  //Orange Background
  ctx.fillStyle = "#27ae60";
  ctx.fillRect(startX - width / 4, startY - width / 4, width * 11 + width / 2, width * 5 + width / 2);
  //Crossline
  drawCrossline(ctx, startX, startY, width);
  ctx.stroke();
}
function drawCrossline(ctx, startX, startY, width) {
  for (let i = 0; i < 6; i++) {
    ctx.moveTo(startX, startY + i * width);
    ctx.lineTo(startX + width * 11, startY + i * width);
  }
  for (let i = 0; i < 12; i++) {
    ctx.moveTo(startX + i * width, startY);
    ctx.lineTo(startX + i * width, startY + width * 5);
  }
}
//if on click
let currentUnitSelected;
let isUnit1Clicked = false;
let isUnit2Clicked = false;
$(".unitGroup").click(function () {
  let text = $(this).text().trim();
  if (text === "50g" && currentGold >= 50) {
    isUnit1Clicked = true;
    currentUnitSelected = this;
    //make this opacity 0.5
    $(this).css("opacity", "0.5");
  } else if (text === "100g" && currentGold >= 100) {
    isUnit2Clicked = true;
    currentUnitSelected = this;
    //make this opacity 0.5
    $(this).css("opacity", "0.5");
  }
});
//if click anywhere on the screen
$(document).click(function (e) {
  if (isUnit1Clicked) {
    //get position of mouse
    let x = e.pageX;
    let y = e.pageY;
    //add square1 to position top =0, left=0
    let realX = Math.floor((x - startX) / width);
    let realY = Math.floor((y - startY) / width);
    if (realX >= 0 && realX < 11 && realY >= 0 && realY < 5) {
      if (currentGold >= 50) {
        new Sunflower(realX, realY);
        // var newImage = document.createElement("img");
        // newImage.setAttribute("src", "./images/50g.gif");
        // newImage.setAttribute("class", "sunflower");
        // newImage.style.left = startX + realX * width + 30 + "px";
        // newImage.style.top = startY + realY * width + 30 + "px";
        // newImage.width = newImage.height = 60;
        // document.body.appendChild(newImage);
        currentGold -= 50;
        $(".gold-number").text(currentGold);
      }

      currentUnitSelected.style.opacity = "1";
      isUnit1Clicked = false;
    }
  }
  if (isUnit2Clicked) {
    //get position of mouse
    let x = e.pageX;
    let y = e.pageY;
    //add square1 to position top =0, left=0
    let realX = Math.floor((x - startX) / width);
    let realY = Math.floor((y - startY) / width);
    if (realX >= 0 && realX < 11 && realY >= 0 && realY < 5 && board[realY][realX] === 0) {
      if (currentGold >= 100) {
        new Plant(realX, realY);
        // var newImage = document.createElement("img");
        // newImage.setAttribute("src", "./images/100g.gif?" + Math.random());
        // newImage.setAttribute("class", "peashooter");
        // newImage.style.left = startX + realX * width + 30 + "px";
        // newImage.style.top = startY + realY * width + 30 + "px";
        // newImage.width = newImage.height = 60;
        // document.body.appendChild(newImage);
        currentGold -= 100;
        $(".gold-number").text(currentGold);
      }
      currentUnitSelected.style.opacity = "1";
      isUnit2Clicked = false;
    }
  }
});

class Zombie {
  constructor(
    x,
    y,
    speed = 5,
    health = 100,
    damage = 5,
    image = "./images/zombie.gif?" + Math.random(),
    image2 = "./images/zombie_eat.gif?" + Math.random()
  ) {
    this.x = startX + x * width;
    this.y = startY + y * width;
    this.speed = speed;
    this.baseHealth = this.health = health;
    this.damage = damage;
    this.image = image;
    this.image2 = image2;
    this.isActive = false;
    this.unitToAttack = null;
  }
  takeDamage(damage) {
    this.health -= damage;
    //find class healthbar and change width
    let percentHealth = (this.health / this.baseHealth) * 100;
    let healthbarStyle = this.zombieBody.querySelector(".healthbar").style;
    if (percentHealth < 50) {
      healthbarStyle.backgroundColor = "red";
    }
    this.zombieBody.querySelector(".healthbar").style.width = (this.health / this.baseHealth) * 100 + "px";
    if (this.health <= 0) {
      this.die();
    }
  }
  die() {
    //set opacity to 0
    this.zombieBody.style.opacity = "0";
    //remove zombie from zombieLists
    this.isActive = false;
    zombieLists.splice(zombieLists.indexOf(this), 1);
  }
  move() {
    if (this.unitToAttack) {
      if (this.unitToAttack.isActive) {
        this.unitToAttack.takeDamage(this.damage);
        return;
      } else {
        this.unitToAttack = null;
        console.log("Change state to move");
        this.zombieImage.setAttribute("src", this.image);
      }
    }
    this.x -= this.speed;
    this.zombieBody.style.left = this.x + "px";
    var thisZombie = this;
    let plantSameRowLists = plantLists.filter(function (plant) {
      return plant.y === thisZombie.y;
    });

    if (plantSameRowLists.length > 0) {
      for (let i = 0; i < plantSameRowLists.length; i++) {
        if (Math.abs(plantSameRowLists[i].x - thisZombie.x) < width / 2) {
          this.unitToAttack = plantSameRowLists[0];
          console.log("Change state to attack");
          this.zombieImage.setAttribute("src", this.image2);
        }
      }
    }
  }
  spawn() {
    window.setTimeout(() => {
      this.draw();
    }, randomIntFromInterval(1000, 10000));
  }
  draw() {
    var entireZombieBody = document.createElement("div");
    var newImage = document.createElement("img");
    newImage.setAttribute("src", this.image);
    newImage.setAttribute("class", "zombie");
    newImage.width = newImage.height = 90;
    //relative position
    entireZombieBody.style.position = "relative";
    $("<div class='healthbar'></div>").appendTo(entireZombieBody);
    entireZombieBody.style.left = this.x + "px";
    entireZombieBody.style.top = this.y + "px";
    // entireZombieBody.appendChild(newDiv);
    entireZombieBody.appendChild(newImage);
    //get div in entireZombieBody
    document.body.appendChild(entireZombieBody);
    this.zombieBody = entireZombieBody;
    this.zombieImage = newImage;
    zombieLists.push(this);
    this.isActive = true;
  }
}

function isHit(preX, newX, enemyX) {
  const delta = 30;
  if (preX < enemyX + delta && newX > enemyX - delta) {
    return true;
  } else if (preX > enemyX - delta && newX < enemyX + delta) {
    return true;
  } else {
    return false;
  }
}
class Plant {
  constructor(
    x,
    y,
    bulletSpeed = 30,
    health = 100,
    damage = 10,
    image = "./images/100g.gif?" + Math.random(),
    image2 = "./images/100g_shoot.gif?" + Math.random()
  ) {
    board[y][x] = 1;
    this.boardLocation = { x: x, y: y };
    this.x = startX + x * width;
    this.y = startY + y * width;
    this.bulletSpeed = bulletSpeed;
    this.health = health;
    this.damage = damage;
    this.image = image;
    this.image2 = image2;
    this.isActive = true;
    this.draw();
    this.shootWithInterval();
  }
  takeDamage(damage) {
    this.health -= damage;
    if (this.health <= 0) {
      this.die();
    }
  }
  die() {
    this.plantBody.style.opacity = "0";
    this.isActive = false;
    plantLists.splice(plantLists.indexOf(this), 1);
    board[this.boardLocation.y][this.boardLocation.x] = 0;
  }
  shootWithInterval() {
    var plant = this;
    window.setInterval(function () {
      shoot(plant);
    }, 3000);
  }
  draw() {
    this.plantBody = document.createElement("img");
    this.plantBody.setAttribute("src", this.image);
    this.plantBody.setAttribute("class", "peashooter");
    this.plantBody.style.left = this.x + 30 + "px";
    this.plantBody.style.top = this.y + 30 + "px";
    this.plantBody.width = this.plantBody.height = 60;
    document.body.appendChild(this.plantBody);
    plantLists.push(this);
  }
}
class Bullet {
  constructor(x, y, speed = 30, damage = 10, image = "./images/pea.png") {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.damage = damage;
    this.image = image;
    this.isActive = true;
    this.draw();
    this.moveWithInterval();
  }
  moveWithInterval() {
    var bullet = this;
    window.setInterval(function () {
      moveBullet(bullet);
    }, 100);
  }
  dealDamage(zombie) {
    zombie.takeDamage(this.damage);
  }
  die() {
    this.bulletBody.style.opacity = "0";
    bulletLists.splice(bulletLists.indexOf(this), 1);
    this.isActive = false;
  }
  draw() {
    this.bulletBody = document.createElement("img");
    this.bulletBody.setAttribute("src", this.image);
    this.bulletBody.setAttribute("class", "bullet");
    this.bulletBody.width = this.bulletBody.height = 30;
    this.bulletBody.style.left = this.x + "px";
    this.bulletBody.style.top = this.y + "px";
    document.body.appendChild(this.bulletBody);
    bulletLists.push(this);
  }
}
function moveBullet(bullet) {
  if (bullet.isActive) {
    const preBulletX = bullet.x;
    bullet.x += bullet.speed;
    bullet.bulletBody.style.left = bullet.x + "px";
    if (bullet.x > endX) {
      bullet.die();
    }
    var zombieInSameRow = zombieLists.filter(function (zombie) {
      return zombie.y === bullet.y - 35;
    });
    for (const zombie of zombieInSameRow) {
      if (isHit(preBulletX, bullet.x, zombie.x)) {
        bullet.dealDamage(zombie);
        bullet.die();
      }
    }
  }
}
function shoot(plant) {
  //if there is no zombie in the same row, don't shoot
  var zombieInSameRow = zombieLists.filter(function (zombie) {
    return zombie.y === plant.y;
  });
  if (zombieInSameRow.length === 0) {
    return;
  }
  if (plant.isActive) {
    plant.plantBody.setAttribute("src", plant.image2);
    setTimeout(() => {
      if (plant.isActive) {
        new Bullet(plant.x + 68, plant.y + 35, plant.bulletSpeed, plant.damage);
        setTimeout(() => {
          plant.plantBody.setAttribute("src", plant.image);
        }, 120);
      }
    }, 750);
  }
}
class Sunflower extends Plant {
  constructor(x, y, bulletSpeed = 30, health = 100, damage = 10, image = "./images/50g.gif") {
    super(x, y, bulletSpeed, health, damage, image);
  }
  shootWithInterval() {
    var plant = this;
    window.setInterval(function () {
      produceSunflower(plant);
    }, 20000);
  }
}
function produceSunflower(plant) {
  new Sun(plant.x + 10, plant.y + 5, false);
}
class Sun {
  constructor(x = randomIntFromInterval(startX, endX), y = 0, willFall = true) {
    this.x = x;
    this.y = y;
    this.isActive = true;
    this.draw();
    if (willFall) {
      this.startFalling();
    }
  }
  draw() {
    this.sunBody = document.createElement("img");
    this.sunBody.setAttribute("src", "./images/sun.png");
    this.sunBody.setAttribute("class", "sun");
    this.sunBody.width = this.sunBody.height = 50;
    this.sunBody.style.left = this.x + "px";
    this.sunBody.style.top = this.y + "px";
    var thisSun = this;
    this.sunBody.addEventListener("mouseover", function () {
      if (thisSun.isActive) {
        currentGold += 50;
        $(".gold-number").text(currentGold);
        thisSun.die();
      }
    });
    document.body.appendChild(this.sunBody);
  }
  die() {
    this.sunBody.style.opacity = "0";
    this.isActive = false;
  }
  startFalling() {
    var sun = this;
    window.setInterval(function () {
      fall(sun);
    }, 100);
  }
}
function fall(sun) {
  if (sun.isActive) {
    sun.sunBody.style.top = sun.y + "px";
    sun.y += 10;
    if (sun.y > endY) {
      sun.die();
    }
  }
}
//create Zombies
window.setInterval(moveZombie, 300);
function moveZombie() {
  for (const i of zombieLists) {
    i.move();
  }
}
//create Suns
window.setInterval(createSun, 3000);
function createSun() {
  setTimeout(() => {
    new Sun();
  }, randomIntFromInterval(0, 3000));
}

function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}
//zombie Wave
var zombieWave1 = [];
var zombieWave2 = [];
for (let i = 0; i < 2; i++) {
  zombieWave1.push(new Zombie(11, randomIntFromInterval(0, 4)));
}
//create 15 zombies
for (let i = 0; i < 15; i++) {
  zombieWave2.push(new Zombie(11, randomIntFromInterval(0, 4)));
}
for (const zombie of zombieWave1) {
  zombie.spawn();
}
//spawn zombieWave2 after 20 seconds
setTimeout(() => {
  for (const zombie of zombieWave2) {
    zombie.spawn();
  }
}, 20000);
class LawnMover {
  constructor(x, y, speed = 10, image = "./images/lawnmover.png") {
    this.x = startX + x * width;
    this.y = startY + y * width;
    this.speed = speed;
    this.image = image;
    this.isActive = true;
    this.draw();
    // this.moveWithInterval();
  }
  moveWithInterval() {
    var lawnmover = this;
    window.setInterval(function () {
      moveLawnMover(lawnmover);
    }, 100);
  }
  draw() {
    this.lawnmoverBody = document.createElement("img");
    this.lawnmoverBody.setAttribute("src", this.image);
    this.lawnmoverBody.setAttribute("class", "lawnmover");
    this.lawnmoverBody.width = this.lawnmoverBody.height = 100;
    this.lawnmoverBody.style.left = this.x + "px";
    this.lawnmoverBody.style.top = this.y + "px";
    document.body.appendChild(this.lawnmoverBody);
    lawnmoverLists.push(this);
  }
  move() {
    if (this.isActive) {
      this.lawnmoverBody.style.left = this.x + "px";
      this.x += this.speed;
      if (this.x > endX) {
        this.die();
      }
    }
  }
  die() {
    this.lawnmoverBody.style.opacity = "0";
    lawnmoverLists.splice(lawnmoverLists.indexOf(this), 1);
    this.isActive = false;
  }
}
function moveLawnMover() {
  for (const lawnmover of lawnmoverLists) {
    lawnmover.move();
  }
}
// new LawnMover(0, 0);
