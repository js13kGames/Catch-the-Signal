var initializeBackground = (function () {
    "use strict";
    
    var antennaCount,
        boardWidth,
        boardHeight,
        antennaSizes,
        gameboard,
        antennaMovement,
        allAntennas = [],
        antennaInterval = 100,
        antennaShift = 4,
        antennaMotionCenter = {
            x: 0,
            y: boardHeight
        },
        maxSignalFactor = 3,//should be a number lesser than noOfAntennas
        signalFactor = 1;
        
    function Antenna() {
        this.antennaWrapper = document.createElement("div");
        var antennaWdStep = antennaSizes.width,
            antennaHtStep = antennaSizes.height,
            pt1 = [0, antennaHtStep * 3],
            pt2 = [antennaWdStep * 3, 0],
            pt3 = [antennaWdStep * 6, antennaHtStep * 3],
            pt4 = [antennaWdStep, antennaHtStep * 2],
            pt5 = [antennaWdStep * 5, antennaHtStep * 2],
            pt6 = [antennaWdStep * 2, antennaHtStep],
            pt7 = [antennaWdStep * 4, antennaHtStep];
        this.rangeCenter = pt2;
        
        this.antennaElement = document.createElement("canvas");
        this.antennaElement.style.width = antennaWdStep * 6 + "px";
        this.antennaElement.style.height = antennaHtStep * 3 + "px";
        
        var antennaContext = this.antennaElement.getContext("2d");
        antennaContext.lineWidth = "5px";
        this.antennaElement.setAttribute("id", "antenna-" + antennaCount);

        this.antennaElement.width = antennaWdStep * 6;
        this.antennaElement.height = antennaHtStep * 3;
        
        antennaContext.moveTo(pt1[0], pt1[1]);
        antennaContext.lineTo(pt2[0], pt2[1]);
        antennaContext.lineTo(pt3[0], pt3[1]);
        antennaContext.lineTo(pt4[0], pt4[1]);
        antennaContext.lineTo(pt5[0], pt5[1]);
        antennaContext.lineTo(pt6[0], pt6[1]);
        antennaContext.lineTo(pt7[0], pt7[1]);
        antennaContext.lineTo(pt4[0], pt4[1]);
        antennaContext.lineTo(pt5[0], pt5[1]);
        antennaContext.lineTo(pt1[0], pt1[1]);
        antennaContext.lineTo(pt3[0], pt3[1]);
        antennaContext.stroke();
        antennaContext.closePath();
        
        this.antennaWrapper.appendChild(this.antennaElement);
                
        this.rangeElem = document.createElement("div");
        this.maxRangeRadius = antennaSizes.width * 15;
        this.rangeRadius = this.maxRangeRadius;
    }
            
    function drawAntennas () {
        var i = 0,
            antenna;
        for (i = 0; i < antennaCount; i++) {
            antenna = new Antenna();
            antenna.x = Math.random() * boardWidth;
            antenna.y = Math.random() * (boardHeight - antennaSizes.height);
            antenna.antennaWrapper.style.position = "absolute";
            antenna.antennaWrapper.style.left = antenna.x + "px";
            antenna.antennaWrapper.style.top = antenna.y + "px";
            allAntennas.push(antenna);
            gameboard.appendChild(antenna.antennaWrapper);
            drawRangeCircles(antenna);
        }
    }
    
    var step = 1;
    
    function drawRangeCircles(antenna) {
        antenna.rangeRadius = antenna.maxRangeRadius/step;
        var rangeRadius = antenna.rangeRadius;
        antenna.rangeElem.style.width = rangeRadius + "px";
        antenna.rangeElem.style.height = rangeRadius + "px";
        antenna.rangeElem.style.position = "absolute";
        antenna.rangeElem.style.borderWidth = "0px 4px";
        antenna.rangeElem.style.borderColor = "red";
        antenna.rangeElem.style.borderStyle = "solid";
        antenna.rangeElem.style.borderRadius = "50%";
        antenna.rangeElem.style.left = antenna.rangeCenter[0] - rangeRadius/2 + "px";
        antenna.rangeElem.style.top = antenna.rangeCenter[1] - rangeRadius/2 + "px";
        antenna.antennaWrapper.append(antenna.rangeElem);
    }
    
    function getCircularMotion(antenna) {
        var graphX = antenna.x;
        return gamebordDim.height - Math.sqrt(antenna.radius * antenna.radius - graphX * graphX);
    }
    
    function moveAntennas() {
        var i = 0;
        for(i = 0; i < allAntennas.length; i++) {
            var antenna = allAntennas[i];
            var newLeftPosition = parseFloat(antenna.antennaWrapper.style.left) - antennaShift;
            if (newLeftPosition < antennaSizes.width) {
                antenna.y = boardHeight - antennaSizes.height - 10;
                antenna.x = Math.random() * (boardWidth - antennaSizes.width - 20);
                antenna.radius = antenna.x;
                antenna.pathRadius = Math.abs(antennaMotionCenter.x - antenna.x);
                antenna.antennaWrapper.style.top = antenna.y + "px";
                antenna.antennaWrapper.style.left = antenna.x + "px";
            } else {
                antenna.x = newLeftPosition;
                antenna.antennaWrapper.style.left = antenna.x + "px";
                antenna.y = getCircularMotion(antenna);
                antenna.antennaWrapper.style.top = antenna.y + "px";
            }
            //change radius of range circles
            step = step % 7 + 1;
            antenna.rangeRadius = antenna.maxRangeRadius/step;
            var rangeRadius = antenna.rangeRadius;
            antenna.rangeElem.style.width = rangeRadius + "px";
            antenna.rangeElem.style.height = rangeRadius + "px";
            antenna.rangeElem.style.left = antenna.rangeCenter[0] - rangeRadius/2 + "px";
            antenna.rangeElem.style.top = antenna.rangeCenter[1] - rangeRadius/2 + "px";
            signalFactor = (signalFactor%maxSignalFactor) + 1;
        }
    }
    
    return function (initialNoOfAntennas, width, height, antennaDim) {
        antennaCount = initialNoOfAntennas || 5;
        boardWidth = width;
        boardHeight = height;
        antennaSizes = antennaDim;
        gameboard = document.getElementById("gameboard");
        drawAntennas();
        antennaMovement = setInterval(moveAntennas, antennaInterval);
        return allAntennas;
    };
}());