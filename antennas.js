var initiateAntennas = (function () {
    "use strict";
    var antennaCount = 0,
        antennaSize = 35,
        allAntennas = [],
        boardWidth = 500,
        boardHeight = 300,
        antennaInterval = 200,
        antennaMovement,
        gameboard,
        signalFactor = 1,
        maxSignalFactor = 4,
        antennaShift = 25;
    
    window.levelUp = function(changeInSpeed) {
        //change in antenna speed
        clearInterval(antennaMovement);
        antennaInterval -= changeInSpeed;
        antennaSize--;
        setInterval(moveAntennas, antennaInterval);
        
        //remove an antenna
        if(allAntennas.length > 2) {
            gameboard.removeChild(allAntennas[allAntennas.length-1].antennaElement);
            gameboard.removeChild(allAntennas[allAntennas.length-1].rangeElem);
            allAntennas.pop();
        }
    }
    
    function Antenna() {
        this.antennaElement = document.createElement("canvas");
        var antennaContext = this.antennaElement.getContext("2d");
        this.antennaElement.setAttribute("id", "antenna-" + antennaCount);

        antennaContext.width = antennaSize;
        antennaContext.height = antennaSize;

        antennaContext.moveTo(0, antennaSize);
        antennaContext.lineTo(antennaSize/2, 0);
        antennaContext.lineTo(antennaSize, antennaSize);
        antennaContext.lineTo(antennaSize/4, antennaSize/2);
        antennaContext.lineTo(antennaSize*3/4, antennaSize/2);
        antennaContext.lineTo(0, antennaSize);
        antennaContext.lineTo(antennaSize, antennaSize);
        antennaContext.stroke();
        antennaContext.closePath();
        
        this.rangeElem = document.createElement("div");
        this.range = {
            x1: 0,
            y1: 0,
            x2: antennaSize,
            y2: antennaSize
        };
    }
    
    Antenna.prototype.setAntennaPositions = function () {
        if (!this.x) {
            this.x = Math.random() * (boardWidth - antennaSize - 20);
            this.range.x1 = this.x - antennaSize/2;
            this.range.x2 = this.x + 3*antennaSize/2;
        }
        if (!this.y) {
            this.y = Math.random() * (boardHeight - antennaSize);
            this.range.y1 = this.y - antennaSize/2;
            this.range.y2 = this.y + 3*antennaSize/2;
        }
    };
        
    function drawAntennas () {
        var i = 0,
            antenna;
        for (i = 0; i < antennaCount; i++) {
            antenna = new Antenna();
            antenna.setAntennaPositions();
            antenna.antennaElement.style.position = "absolute";
            antenna.antennaElement.style.left = antenna.x + "px";
            antenna.antennaElement.style.top = antenna.y + "px";
            antenna.antennaElement.style.marginLeft = "25%";
            allAntennas.push(antenna);
            gameboard.appendChild(antenna.antennaElement);
        }
    }
    
    function drawRangeCircles(antenna) {
        if(antenna.prevRangeElem) {
            gameboard.removeChild(antenna.prevRangeElem);
        }
        antenna.prevRangeElem = antenna.rangeElem;
        antenna.prevRangeElem.style.borderLeft = "1px dotted red";
        antenna.prevRangeElem.style.borderRight = "1px dotted red";
        antenna.prevRangeElem.style.top = parseFloat(antenna.prevRangeElem.style.top) - antennaShift + "px";
        antenna.rangeElem = antenna.rangeElem.cloneNode(true);
        antenna.rangeElem.style.position = "absolute";
        antenna.rangeElem.style.width = (antenna.range.x2 - antenna.range.x1)*(maxSignalFactor-signalFactor+1)/maxSignalFactor;
        antenna.rangeElem.style.height = (antenna.range.y2 - antenna.range.y1)*(maxSignalFactor-signalFactor+1)/maxSignalFactor;
        antenna.rangeElem.style.top = antenna.range.y1 + (signalFactor-1)*parseFloat(antenna.rangeElem.style.height)/(2*(maxSignalFactor-signalFactor+1)) + "px";
        antenna.rangeElem.style.left = antenna.range.x1 + (signalFactor-1)*parseFloat(antenna.rangeElem.style.width)/(2*(maxSignalFactor-signalFactor+1)) + "px";
        console.log("w: " + antenna.rangeElem.style.width + "top: " + antenna.rangeElem.style.top + "left: " + antenna.rangeElem.style.left);
        antenna.rangeElem.style.borderLeft = "2px dotted red";
        antenna.rangeElem.style.borderRight = "2px dotted red";
        antenna.rangeElem.style.marginLeft = "25%";
        antenna.rangeElem.style.borderRadius = "50%";
        gameboard.appendChild(antenna.rangeElem);
        gameboard.appendChild(antenna.prevRangeElem);
    }
    
    function moveAntennas() {
        var i = 0;
        
        for(i = 0; i < allAntennas.length; i++) {
            var antenna = allAntennas[i];
            var newTopPosition = parseFloat(antenna.antennaElement.style.top) - antennaShift;
            if (newTopPosition < 0) {
                antenna.y = boardHeight - antennaSize;
                antenna.x = Math.random() * (boardWidth - antennaSize - 20);
                antenna.antennaElement.style.top = antenna.y + "px";
                antenna.antennaElement.style.left = antenna.x + "px";
                antenna.range.x1 = antenna.x - antennaSize/2;
                antenna.range.x2 = antenna.x + 3*antennaSize/2;
            } else {
                antenna.y = newTopPosition;
                antenna.antennaElement.style.top = antenna.y + "px";
            }
            antenna.range.y1 = antenna.y - antennaSize/2;
            antenna.range.y2 = antenna.y + 3*antennaSize/2;
            drawRangeCircles(antenna);
            signalFactor = (signalFactor%maxSignalFactor) + 1;
        }
    }
    
    //reduce antennas method
    //speed up antennas motion method
    //rando x position of antennas method
    //show range of antennas method
    //show cloudy background method
    //show trees method
    
    return function (initialNoOfAntennas, width, height, baseElement, antennaSize) {
        antennaCount = initialNoOfAntennas;
        boardWidth = width;
        boardHeight = height;
        antennaSize = antennaSize;
        gameboard = baseElement;
        drawAntennas();
        //moveAntennas();
        antennaMovement = setInterval(moveAntennas, antennaInterval);
        return allAntennas;
    };
}());