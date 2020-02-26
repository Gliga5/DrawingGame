var socket;
var newPlayer = true;

function setup() {
  createCanvas(500,500);
  frameRate(144);
  background(51);

  socket = io.connect('http://localhost:3000');
  socket.on("mouse", newDrawing);
  socket.on("sync", syncDrawing);
}

function syncDrawing(datas){
  if (newPlayer === true) {
    for (broj in datas) {
      stroke(255);
      strokeWeight(20)
      line(datas[broj].x, datas[broj].y, datas[broj].px, datas[broj].py);
    }
    newPlayer = false;
  }
}

function newDrawing(data) {
  stroke(255);
  strokeWeight(20)
  line(data.x, data.y, data.px, data.py);
}

function draw() {
  //input
  if (mouseIsPressed) {
    stroke(255);
    strokeWeight(20)
    line(mouseX, mouseY, pmouseX, pmouseY);

    var data = {
      x: mouseX,
      y: mouseY,
      px: pmouseX,
      py: pmouseY
    }

    socket.emit("mouse",data);
  }
}

function keyPressed() {
  if(keyCode === 32){
    background(51);
  }
}