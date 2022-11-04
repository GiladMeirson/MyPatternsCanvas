//canvas prop
var myCanvas;
var ctx;
var WW;
var HH;
var XX;
var YY;

//global prop
var density;
var radius;
var angle;
var fillColor;
var lineColor;
var number = 0;
var scale = 10;
var lineW = 5;
var size;
var flagsize = false;
var flagcolor = false;
var hue=0;







function OnInit() {
    myCanvas = document.getElementById('MyCanvas');
    ctx = myCanvas.getContext('2d');
    WW = myCanvas.clientWidth
    HH = myCanvas.clientHeight
    myCanvas.width = WW;
    myCanvas.height = HH;
    XX = WW / 2;
    YY = HH / 2;

   
}

//wire to Draw Btn 
function main() {
    ClearCanvas();
    flagcolor = false;
    flagsize = false;


    number = 0;
    density = parseFloat(document.getElementById('density').value);
    lineColor = document.getElementById('LineC').value;
    fillColor = document.getElementById('FillC').value;
    lineW = document.getElementById('lineW').value;
    size = document.getElementById('radius').value;
    if (size<=0) {
        size = 1;
    }
    if (document.getElementById('destOver').checked) {
        ctx.globalCompositeOperation = "destination-over";

    }
    else {
        ctx.globalCompositeOperation = "source-over";

    }
    if (document.getElementById('Sizable').checked) {
        size++;
        flagsize = true;

    }
    if (document.getElementById('Colrful').checked) {
        flagcolor = true;

    }
  
   
    animate();
    
}

//the "interval"
function Draw() {
    angle = number * density //--> the var effect the shape;
    radius = scale * Math.sqrt(number);
    XX = radius * Math.sin(angle) + WW / 2;
    YY = radius * Math.cos(angle) + HH / 2;
    if (flagcolor==false) {
        ctx.strokeStyle = lineColor;
        ctx.fillStyle = fillColor;
    }
    else {
        ctx.fillStyle = `hsl(${hue},100%,50%)`;
        ctx.strokeStyle = `black`;
    }
    
    ctx.lineWidth = lineW;
    ctx.beginPath();
    ctx.arc(XX, YY, size, 0, Math.PI * 2);
    ctx.closePath();
    ctx.stroke();
    ctx.fill();
    
    number++;
    hue++;
    if (flagsize) {
        size++;

    }


}

//animate function 
function animate() {
    Draw();
    if (size>650) {
        return;
    }
    requestAnimationFrame(animate);
}

//modal show and hide (jquery)
function ShowInfoModal() {
    $('#InfoModal').fadeIn(1750);
}
function CloseInfoModal() {
    $('#InfoModal').fadeOut(1750);
}

//clear the canvas;
function ClearCanvas() {
    ctx.clearRect(0, 0, WW, HH);
}