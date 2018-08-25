var gameboard = document.getElementById("gameboard"),
    antennaCount = 0,
    allAntennas,
    initialNoOfAntennas = 2,
    gameBoardWidth = 900,
    gameBoardHeight = 500;

function initiateGameBoard() {
    document.getElementById("gameboard").style.width = gameBoardWidth + "px";
    document.getElementById("playboard").style.height = gameBoardHeight + "px";
}

function playGame(level) {
    initiateGameBoard();
    //get all antennas object
    //get player object
    //determine collision
    //update score
    //update load line
    //speed up as per the level
    allAntennas = initiateAntennas(initialNoOfAntennas, gameBoardWidth, gameBoardHeight, document.getElementById("playboard"));
    initiatePlayer(allAntennas, document.getElementById("playboard"));
    //showBufferLine();
}

playGame();
