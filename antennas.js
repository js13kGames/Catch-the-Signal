var initiateAntennas = (function () {
    "use strict";
    var antennaCount = 4,
        antennaSize = 65,
        allAntennas = [];
    
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
    }
    
    Antenna.prototype.setAntennaPositions = function () {
        if (!this.x) {
            this.x = Math.random() * window.innerWidth;
        }
        if (!this.y) {
            this.y = Math.random() * window.innerHeight;
        }
    };
    
    Antenna.prototype.moveAntennas = function () {
        //
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
            allAntennas.push(antenna);
            document.body.appendChild(antenna.antennaElement);
        }
    };
    
    function moveAntennas() {
        var i = 0;
        for(i = 0; i < allAntennas.length; i++) {
            var antenna = allAntennas[i];
            var newTopPosition = parseFloat(antenna.antennaElement.style.top) - 20;
            if(newTopPosition < antennaSize*-1) {
                antenna.antennaElement.style.top = window.innerHeight + newTopPosition + "px";
            } else {
                antenna.antennaElement.style.top = newTopPosition + "px";
            }            
        }
    }
    
    return function () {
        drawAntennas();
        setInterval(moveAntennas, 100);
    };
}());