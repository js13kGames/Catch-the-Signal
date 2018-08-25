var initiateAntennas = (function () {
    "use strict";
    var antennaCount = 0,
        antennaSize = 35,
        allAntennas = [],
        boardWidth = 500,
        boardHeight = 300;
    
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
            this.x = Math.random() * (boardWidth - antennaSize);
            this.range.x1 = this.x - antennaSize/2;
            this.range.x2 = this.x + 3*antennaSize/2;
        }
        if (!this.y) {
            this.y = Math.random() * (boardHeight - antennaSize);
            this.range.y1 = this.y - antennaSize/2;
            this.range.y2 = this.y + 3*antennaSize/2;
        }
    };
        
    function drawAntennas (baseElement) {
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
            baseElement.appendChild(antenna.antennaElement);
        }
    }
    
    function drawRangeCircles(antenna) {
        antenna.rangeElem.style.position = "absolute";
        antenna.rangeElem.style.top = antenna.range.y1;
        antenna.rangeElem.style.left = antenna.range.x1;
        antenna.rangeElem.style.width = antenna.range.x2 - antenna.range.x1;
        antenna.rangeElem.style.height = antenna.range.y2 - antenna.range.y1;
        antenna.rangeElem.style.border = "2px solid red";
        antenna.rangeElem.style.marginLeft = "25%";
        antenna.rangeElem.style.borderRadius = "50%";
        gameboard.appendChild(antenna.rangeElem);
    }
    
    function moveAntennas() {
        var i = 0;
        for(i = 0; i < allAntennas.length; i++) {
            var antenna = allAntennas[i];
            var newTopPosition = parseFloat(antenna.antennaElement.style.top) - 25;
            if (newTopPosition < 0) {
                antenna.y = boardHeight - antennaSize;
                antenna.x = Math.random() * (boardWidth - antennaSize);
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
        }
    }
    
    //reduce antennas method
    //speed up antennas motion method
    //rando x position of antennas method
    //show range of antennas method
    //show cloudy background method
    //show trees method
    
    return function (initialNoOfAntennas, width, height, baseElement) {
        antennaCount = initialNoOfAntennas;
        boardWidth = width;
        boardHeight = height;
        drawAntennas(baseElement);
        //moveAntennas();
        setInterval(moveAntennas, 100);
        return allAntennas;
    };
}());