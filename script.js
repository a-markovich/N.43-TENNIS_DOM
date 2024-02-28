"use strict"

let field = {
    width : 500,
    height : 300,
}

let leftRacquet = {
    posY : 105,
    speedY : 0,
    width : 10,
    height: 90,
    update : function() {
        leftRacquetElem.style.top=`${this.posY}px`;
    }
}

let rightRacquet = {
    posY : 105,
    speedY : 0,
    width : 10,
    height: 90,
    update : function() {
        rightRacquetElem.style.top=`${this.posY}px`;
    }
}

let ball={
    posX : 235,
    posY : 135,
    speedX : 0,
    speedY : 0,
    width : 30,
    height: 30,
    update : function() {
        ballElem.style.left=`${this.posX}px`;
        ballElem.style.top=`${this.posY}px`;
    }
}

//построение кнопки
let btnElem = document.createElement("button");
document.body.appendChild(btnElem);
let nameBtn = document.createTextNode("Старт!");
btnElem.appendChild(nameBtn);

//построение счета
let leftScore = 0;
let rightScore = 0;
let scoreElem = document.createElement("span");
document.body.appendChild(scoreElem);
scoreElem.style.font="30px sans-serif";
let textScoreElem = document.createTextNode(`${leftScore}:${rightScore}`);
scoreElem.style.padding="170px";
scoreElem.appendChild(textScoreElem);

let brElem = document.createElement("br");
document.body.appendChild(brElem);
brElem = document.createElement("br");
document.body.appendChild(brElem);

//построение поля
let fieldElem = document.createElement("div");
document.body.appendChild(fieldElem);
fieldElem.style.border="solid 1px";
fieldElem.style.width=`${field.width}px`;
fieldElem.style.height=`${field.height}px`;
fieldElem.style.backgroundColor="#F0EE7E";
fieldElem.style.position="relative";

//построение левой ракетки 
let leftRacquetElem = document.createElement("div");
fieldElem.appendChild(leftRacquetElem);
leftRacquetElem.style.width=`${leftRacquet.width}px`;
leftRacquetElem.style.height=`${leftRacquet.height}px`;
leftRacquetElem.style.top=`${leftRacquet.posY}px`;
leftRacquetElem.style.backgroundColor="#09AA57";
leftRacquetElem.style.position="absolute";

//построение правой ракетки 
let rightRacquetElem = document.createElement("div");
fieldElem.appendChild(rightRacquetElem);
rightRacquetElem.style.width=`${rightRacquet.width}px`;
rightRacquetElem.style.height=`${rightRacquet.height}px`;
rightRacquetElem.style.top=`${rightRacquet.posY}px`;
rightRacquetElem.style.backgroundColor="#191497";
rightRacquetElem.style.position="absolute";
rightRacquetElem.style.right="0";

//построение мяча
let ballElem = document.createElement("div");
fieldElem.appendChild(ballElem);
ballElem.style.width=`${ball.width}px`;
ballElem.style.height=`${ball.height}px`;
ballElem.style.borderRadius="50%";
ballElem.style.backgroundColor="#F02137";
ballElem.style.position="absolute";
ballElem.style.top=`${ball.posY}px`;
ballElem.style.left=`${ball.posX}px`;

function tennis() {
    leftRacquet.posY+=leftRacquet.speedY;
    rightRacquet.posY+=rightRacquet.speedY;
    ball.posX+=ball.speedX;
    ball.posY+=ball.speedY;

    if ( leftRacquet.posY+leftRacquet.height > field.height ) {
        leftRacquet.posY = field.height - leftRacquet.height;
        leftRacquet.speedY = 0;
    } else if ( leftRacquet.posY < 0 ) {
        leftRacquet.posY = 0;
        leftRacquet.speedY = 0;
    } else if ( rightRacquet.posY+rightRacquet.height > field.height ) {
        rightRacquet.posY = field.height - rightRacquet.height;
        rightRacquet.speedY = 0;
    } else if ( rightRacquet.posY < 0 ) {
        rightRacquet.posY = 0;
        rightRacquet.speedY = 0;
    }

    if ( ball.posX+ball.width > field.width-10 && 
         ( (ball.posY+ball.height/2) > rightRacquet.posY &&
           (ball.posY+ball.height/2) < (rightRacquet.posY+rightRacquet.height) ) 
        ) {
            ball.speedX=-ball.speedX;
            ball.posX=field.width-10-ball.width;
    } else if ( ball.posX<10 && 
         ( (ball.posY+ball.height/2) > leftRacquet.posY && 
           (ball.posY+ball.height/2) < (leftRacquet.posY+leftRacquet.height) ) 
        ) {
            ball.speedX=-ball.speedX;
            ball.posX=10;
    } else if ( ball.posX+ball.width > field.width ) {
            ball.posX=field.width-ball.width;
            ball.speedX = 0;
            ball.speedY = 0;
            leftRacquet.speedY = 0; 
            rightRacquet.speedY = 0;
            leftScore++;
            scoreElem.innerHTML=`${leftScore}:${rightScore}`;
            window.removeEventListener("keydown", keydownFunc);
            window.removeEventListener("keyup", keyupFunc);
            btnElem.addEventListener("click", start);
    } else if ( ball.posX<0 ) {
            ball.posX = 0;
            ball.speedX = 0;
            ball.speedY = 0; 
            leftRacquet.speedY = 0; 
            rightRacquet.speedY = 0;
            rightScore++;
            scoreElem.innerHTML=`${leftScore}:${rightScore}`;
            window.removeEventListener("keydown", keydownFunc);
            window.removeEventListener("keyup", keyupFunc);
            btnElem.addEventListener("click", start);
    } else if ( ball.posY+ball.height > field.height ) {
        ball.speedY=-ball.speedY;
        ball.posY=field.height-ball.height;
    } else if ( ball.posY<0 ) {
        ball.speedY=-ball.speedY;
        ball.posY=0;
    }

    leftRacquet.update();
    rightRacquet.update();
    ball.update();
}

function keydownFunc(eo) {
    if (eo.key === "Shift") {
        leftRacquet.speedY = -1;
    } else if (eo.key === "Control") {
        leftRacquet.speedY = 1;
    } else if (eo.key === "ArrowUp") {
        rightRacquet.speedY = -1;
    } else if (eo.key === "ArrowDown") {
        rightRacquet.speedY = 1;
    } 
}

function keyupFunc(eo) {
    if (eo.key === "Shift") {
        leftRacquet.speedY = 0;
    } else if (eo.key === "Control") {
        leftRacquet.speedY = 0;
    } else if (eo.key === "ArrowUp") {
        rightRacquet.speedY = 0;
    } else if (eo.key === "ArrowDown") {
        rightRacquet.speedY = 0;
    }
}

function start() {
    btnElem.removeEventListener("click", start);
    ball.posX = 235;
    ball.posY = 138;

    do {
        ball.speedX = Math.floor((Math.random() - 0.5) * 10);
    } while ( ball.speedX === 0 );
    do {
        ball.speedY = Math.floor((Math.random() - 0.5) * 10);
    } while ( ball.speedY === 0 );

    window.addEventListener("keydown", keydownFunc);
    window.addEventListener("keyup", keyupFunc);
}

btnElem.addEventListener("click", start);

setInterval(tennis,40);


    