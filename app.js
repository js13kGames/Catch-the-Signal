var gamebordDim = {
        width: 600,
        height: 600
    },
    playerDim = {
        height: 50,
        width: 50
    },
    antennaDim = {
        width: 12,
        height: 48
    },
    ymotion = gamebordDim.height - playerDim.height,
    x = 0,
    motionCenter = {
        y: gamebordDim.height,
        x: gamebordDim.width
    },
    radius = motionCenter.x - x,
    noOfAntennas = 3,
    characterSize = 100,
    characterObject,
    currentCharacterPosition = {},
    characterSwingLimit = 15,
    characterDirection = 1;

function initializeSizes() {
    var gameboard = document.getElementById("gameboard");
    gameboard.style.width = gamebordDim.width + "px";
    gameboard.style.height = gamebordDim.height + "px";
    gameboard.style.margin = "auto";
    
    var player = document.getElementById("player");
    player.style.width = playerDim.width + "px";
    player.style.height = playerDim.height + "px";
    characterObject = createCharacter();
    player.appendChild(characterObject);
    function keepCharacterInMotion() {
        var currentShift = currentCharacterPosition.y - parseFloat(characterObject.style.top);
        if(Math.abs(currentShift) > characterSwingLimit) {
            characterDirection *= -1;
        }
        characterObject.style.top = parseFloat(characterObject.style.top) - characterDirection + "px";
    }
    setInterval(keepCharacterInMotion, 20);
}

function shiftPlayer(x, y) {
    var player = document.getElementById("player");
    player.style.left = x + "px";
    player.style.top = y + "px";
    /*var traces = document.createElement("div");
    traces.style.border = "2px solid darkgrey";
    traces.style.position = "absolute";
    traces.style.top = y + "px";
    traces.style.left = x + "px";
    var gameboard = document.getElementById("gameboard");
    gameboard.appendChild(traces);*/
}

function getRandomPosition(range) {
    return Math.random()*range;
}

function getCircularMotion(x) {
    var graphX = gamebordDim.width - x;
    return gamebordDim.height - Math.sqrt(radius * radius - graphX * graphX);
}

function movePlayer() {
    var player = document.getElementById("player");
    if(x < 5 || gamebordDim.width - x > radius) {
        x = gamebordDim.width - playerDim.width;
    }
    x = (x - 5) % gamebordDim.width;
    shiftPlayer(x, getCircularMotion(x));
}

initializeSizes();
initializeBackground(noOfAntennas, gamebordDim.width, gamebordDim.height, antennaDim);

function grabSignal(ev) {
    var relativePosition = ev.x - gameboard.getClientRects()[0].left;
    x = relativePosition;
    movePlayer();
}
