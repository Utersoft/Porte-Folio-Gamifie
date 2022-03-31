var gameScreen;
var screenContext;
var screenRect = {
    x: 0,
    y: 0,
    w: window.innerWidth,
    h: window.innerHeight
};

var player;
var gameLoop;
var borders = [];
var lostImage = [];
var lostImageUrl = ["../Images/Mastermind.png", "../Images/Mastermind2.png", "../Images/Mastermind3.png"];

var rightKey;
var leftKey;
var spaceKey;

var backgroundImage = [];

window.onload = function() {
    gameScreen = document.getElementById("gameScreen");
    screenContext = gameScreen.getContext("2d");
    //console.log(lostImageUrl[0]);
    //updateScreen();
    
    backgroundImage = new Image();
    backgroundImage.src = "../Images/grey_font.jpg";
    
    lostImage.push(new Images(lostImageUrl[0], 300, 400, 100, 50));
    lostImage.push(new Images(lostImageUrl[1], 300, 400, 40, 40));
    lostImage.push(new Images(lostImageUrl[2], 300, 400, 40, 40));
    
    
    player = new Player(200, screenRect.h - 300);
    
    
    createBorder(0, screenRect.h - 40, 900, 1, 1);
    createBorder(900, screenRect.h - 90, 1, 50, 2);
    createBorder(900, screenRect.h - 90, 900, 1, 1);
    createBorder(-1, 0, 1, screenRect.h, 2);
    createBorder(600, 600, 200, 1, 1);
    createBorder(300, 500, 200, 1, 1);
    
    //createBorder(100, 600, 200, 40, 2);
    
    //console.log(lostImage);
    
    
    
    gameLoop = setInterval(step, 1000 / 30);
    
};

function drawScreen(ctx, color, rect) {
    ctx.fillStyle = color;
    ctx.fillRect(rect.x, rect.y, rect.w, rect.h);
}

function draw(){
    updateScreen();
    
    drawScreen(screenContext, "black", screenRect);
    
    screenContext.drawImage(backgroundImage, 0, 0, screenRect.w, screenRect.h);
    
    for(let n_i = 0; n_i < borders.length; n_i++){
        borders[n_i].draw();
    }
    
    lostImage[0].draw();
    
    
    player.draw();
}

function updateScreen(){
    /*if (borders[1].x < 700){
        backgroundImage.src = "../Images/black_hole.jpg";
    }*/
    screenContext.clearRect(screenRect.x, screenRect.y, screenRect.w, screenRect.h);
    screenRect.w = window.innerWidth;
    screenRect.h = window.innerHeight;
    gameScreen.width = screenRect.w;
    gameScreen.height = screenRect.h;
    setupInputs();
    setupKeyUp();
}

function step() {
    player.step();
    
    
    //lostImage[0].draw();
    
    draw();
}


function setupInputs() {
    document.addEventListener("keydown", function(event) {
        if (event.key === "d" || event.key === "ArrowRight"){
            rightKey = true;
        }else if (event.key === "q" || event.key === "ArrowLeft"){
            leftKey = true;
        }else if(event.key === " ") {
            spaceKey = true;
        }
    });
}

function setupKeyUp() {
    document.addEventListener("keyup", function(event) {
        if (event.key === "d" || event.key === "ArrowRight") {
            rightKey = false;
        }else if (event.key === "q" || event.key === "ArrowLeft") {
            leftKey = false;
        }else if (event.key === " ") {
            spaceKey = false;
        }
    });
}

function checkIntersection(r1, r2) {
    /*if (r1.x >= r2.x + r2.width) {
        return false;
    }else if (r1.x + r1.width <= r2.x) {
        return false;
    }else if (r1.y >= r2.y + r2.height) {
        return false;
    }else if (r1.y + r1.height <= r2.y) {
        return false;
    }else {
        return true;
    }*/
    
    return (r1.x < r2.x + r2.width && r1.x + r1.width > r2.x && r1.y < r2.y + r2.height && r1.y + r1.height > r2.y);
    
    
}

function createBorder(x, y, w, h, type) {
    borders.push(new Border(x, y, w, h, type));
}

