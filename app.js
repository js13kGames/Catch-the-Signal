var gameboard = document.getElementById("gameboard"),
    gameboardContext = gameboard.getContext("2d"),
    antennaCount = 0;

function playGame(level) {
    initiateAntennas(4);
    //initiatePlayer();
    //showBufferLine();
}

playGame();
