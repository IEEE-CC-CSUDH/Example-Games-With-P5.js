/*
*
*   This template was created for your reference in the IEEE CC Game Jam
*   Name: script.
*    
*   Name: script.js
*   Description: This project is meant to serve as a basis
*                to create your own games using p5.js (please
*                view index.html for more details on how to 
*                import p5.js)
*   Date: 04/15/2021
*
*/

/* global variables */
let player;
let enemiesList = [];

let windowWidth = 500;
let windowHeight = 500;

let START_COUNTER = 200;
let counter = START_COUNTER;

/* Classes */

/* Represent an Enemy that the player must avoid */
class Enemy
{

    // The constructor of an Enemy Object
    constructor(speed)
    {
        console.log("Creating an enemy");
        this.positionX = int(random(2)) * windowWidth;
        this.positionY = random(0, windowHeight);
        this.size = 30;
        this.speed = speed;
    }

    // Draw the enemy
    draw()
    {

        fill(255, 0, 0);
        circle(this.positionX, this.positionY, this.size);
   
    }

    // Move the enemy accordingly to a player's x and y position
    move(playerX, playerY)
    {
        if (playerX >= this.positionX)
        {

            this.positionX += (this.speed * 0.5);
        
        }
        else
        {

            this.positionX += (-0.5 * this.speed);
        
        }

        if (playerY >= this.positionY)
        {

            this.positionY += (this.speed * 0.5);
        
        }
        else
        {

            this.positionY += (-0.5 * this.speed);
        
        }
    }

}

/* Class definition of a Player */
class Player
{

    // The constructor of a Player object
    constructor(speed)
    {

        console.log("Creating a player");

        // Class fields (current object variables)
        this.positionX = windowWidth / 2;
        this.positionY = windowHeight / 2;
        this.size = 30;
        this.SPEED = speed;
        this.velocityX = 0;
        this.velocityY = 0;
        this.isDead = false;

    }
    
    // Draw a white circle to represent the player
    draw()
    {

        fill(255, 255, 255);
        circle(this.positionX, this.positionY, this.size);
    
    }
    
    move()
    {

        
        this.positionX += this.velocityX;
        this.positionY += this.velocityY;

    }

    setVelocity(x, y)
    {

        this.velocityX = x;
        this.velocityY = y;

    }

    // Check if the player collided with an enemy
    checkCollision(enemy)
    {

        if (Math.abs(this.positionX - enemy.positionX) < 15 && Math.abs(this.positionY - enemy.positionY) < 15)
        {
            this.killPlayer();
        }

    }

    // Kill the player
    killPlayer()
    {

        this.isDead = true;

    }

    // Check if the player is dead
    checkDead()
    {
        return this.isDead;
    }

}


/* 
    Pre-Load Function (Not required as default preload preloads p5.js; 
    for loading external data (i.e. Pictures)) 
*/
function preload() 
{

    console.log("Game Loading...");

    console.log("Game Loaded!");
  
}

/* SetUp Function that runs with p5.js */
function setup()
{
  
    console.log("Loading canvas and game objects...");

  //canvas setup 
  createCanvas(windowWidth - 20, windowHeight - 20)
  colorMode(RGB)

  //set no outline for shapes
  noStroke()

  //Creating objects
  player = new Player(3);
  enemiesList[0] = new Enemy(2.5); //initializing first slot of the array to 0 
                                   //(In JS, arrays are dynamic, unlike other languages)

  console.log("Game objects loaded!");

  console.log("Running Game...");
  
}

/* Loop for actual game interactivity in this function */
function draw() 
{

    //run at 60 fps
    frameRate(60);

    //Draw the background layer at bottom-most layer (stack layers)
    background(0, 0, 0)
    
    //if the player is still alive
    if (!player.isDead)
    {

        //check if we spawn in a new enemy
        if (counter > 0)
        {

            counter--;

        }
        else
        {

            enemiesList.push(new Enemy(2.5));
            counter = START_COUNTER;

        }

        //draw the player
        player.draw();
        
        //draw each enemy that is already spawned in and check if they collided with the player
        for (let i = 0; i < enemiesList.length; i++)
        {

            let currEnemy = enemiesList[i];
            currEnemy.draw();
            player.checkCollision(currEnemy);
            currEnemy.move(player.positionX, player.positionY);

        }

        //move the player's x and y coordinates but don't update yet
        player.move();
    }

    //if the player is dead
    else
    {

        displayGameOver();

        console.log("Game Terminated!");

    }
  

}

/* Controlls the player's velocity according to a key pressed */
function keyPressed()
{

    if (keyCode === UP_ARROW)
    {

        if (keyCode != LEFT_ARROW || keyCode != RIGHT_ARROW)
        {
            player.setVelocity(player.velocityX, -player.SPEED);
        }
        else
        {

            player.setVelocity(player.velocityX, -player.SPEED * 0.8);

        }

    }
    
    if (keyCode === DOWN_ARROW)
    {

        if (keyCode != LEFT_ARROW || keyCode != RIGHT_ARROW)
        {
            player.setVelocity(player.velocityX, player.SPEED);
        }
        else
        {

            player.setVelocity(player.velocityX, player.SPEED * 0.8);

        }

    }
    
    if (keyCode === LEFT_ARROW)
    {

        if (keyCode != UP_ARROW || keyCode != DOWN_ARROW)
        {
            player.setVelocity(-player.SPEED, player.velocityY);
        }
        else
        {

            player.setVelocity(-player.SPEED * 0.8, player.velocityY);

        }

    }
    
    if (keyCode === RIGHT_ARROW)
    {

        if (keyCode != UP_ARROW || keyCode != DOWN_ARROW)
        {
            player.setVelocity(player.SPEED, player.velocityY);
        }
        else
        {

            player.setVelocity(player.SPEED * 0.8, player.velocityY);

        }

    }

}

/* Sets the velocity back to 0 when the key to move is let go */
function keyReleased()
{

    if (keyCode === UP_ARROW)
    {

        player.setVelocity(player.velocityX, 0);

    }
    
    if (keyCode === DOWN_ARROW)
    {

        player.setVelocity(player.velocityX, 0);

    }
    
    if (keyCode === LEFT_ARROW)
    {

        player.setVelocity(0, player.velocityY);

    }
    
    if (keyCode === RIGHT_ARROW)
    {

        player.setVelocity(0, player.velocityY);

    }
    
}


function StopExec()
{ 
    Error.apply(this, arguments);
    this.name = "StopExec"; 
}

/* Display Game Over Function (Another way to write functions [lambda expression]) */
const displayGameOver = () =>
{

    console.log("Show game over screen");
    textSize(32);
    textFont('Georgia');
    fill(255, 0, 0);
    text("Game Over", windowWidth / 2, windowHeight / 2);

    // create new exception type
    StopExec.prototype = Object.create(Error.prototype);

    // throw error
    throw new StopExec("Game Ended!");

}