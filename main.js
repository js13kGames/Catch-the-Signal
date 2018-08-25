var gameboard = document.getElementById("gameboard"),
    antennaCount = 0,
    allAntennas,
    initialNoOfAntennas = 9,
    gameBoardWidth = 700,
    gameBoardHeight = 500,
    antennaSize = 35;

function initiateGameBoard() {
    document.getElementById("gameboard").style.width = gameBoardWidth + "px";
    document.getElementById("playboard").style.height = gameBoardHeight + "px";
}

function playGame(level) {
    initiateGameBoard();
    //update score
    //update load line
    //speed up as per the level
    allAntennas = initiateAntennas(initialNoOfAntennas, gameBoardWidth, gameBoardHeight, document.getElementById("playboard"), antennaSize);
    initiatePlayer(allAntennas, document.getElementById("playboard"));
    //showBufferLine();
}

playGame();
