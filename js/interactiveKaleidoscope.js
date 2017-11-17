window.onload = function() {
    document.querySelector('main').classList.remove('invisible');
}


/************
SETUP CANVAS
************/

const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

let w;
let h;
const pi = Math.PI;
const origo = new Point(0, 0);

var mousePos;
var mousePosToCenterVector;
var maxDist;


setupCanvas();


/************
GEOMETRY
************/
function Point (x, y){
    this.x = x;
    this.y = y;
}


function Shape() {}


Shape.prototype.moveLinear = function(direction, velocity) {
    this.center.x += direction.x * velocity;
    this.center.y += direction.y * velocity;
}


Shape.prototype.moveCircular = function(movementAngle, pathRadius, pathCenter, pathStartAngle) {
    // this.movementAngle = movementAngle;
    // this.pathRadius = pathRadius;
    // this.pathCenter = pathCenter;
    // this.pathStartAngle = pathStartAngle;

    this.center.x = Math.cos(movementAngle * pathStartAngle) * pathRadius + pathCenter.x;
    this.center.y = Math.sin(movementAngle * pathStartAngle) * pathRadius + pathCenter.y;

    pathStartAngle++;
    if(pathStartAngle * movementAngle > 360) {
        pathStartAngle -= 360;
    }
}


Circle.prototype = new Shape();
Circle.prototype.constructor = Circle;


function Circle(center, radius, color1, color2, lineWidth, isFill) {
    this.center = center;
    this.radius = radius;
    this.color1 = color1;
    this.color2 = color2;
    this.lineWidth = lineWidth;
    this.isFill = isFill;
}


Circle.prototype.draw = function() {
    // c.globalCompositeOperation = 'color-dodge';
    // c.globalCompositeOperation = 'luminosity';
    c.globalCompositeOperation = 'difference';
    c.lineWidth = this.lineWidth;


    //COLOR1
    c.strokeStyle = this.color1;
    c.fillStyle = this.color1;
    c.beginPath();
    c.arc(this.center.x + mousePosToCenterVector.x * 10, this.center.y + mousePosToCenterVector.y * 10, this.radius, 0, 7, false);

    if(this.isFill) { c.fill(); }
    else { c.stroke(); }

    c.closePath();


    //COLOR2
    c.strokeStyle = this.color2;
    c.fillStyle = this.color2;
    c.beginPath();
    c.arc(this.center.x - mousePosToCenterVector.x * 10, this.center.y - mousePosToCenterVector.y * 10, this.radius, 0, 7, false);

    if(this.isFill) { c.fill(); }
    else { c.stroke(); }

    c.closePath();

    c.globalCompositeOperation = 'none';
}


Circle.prototype.handleOutOfSight = function() {
    var xpos = Math.abs(this.center.x) - this.radius;
    var ypos = Math.abs(this.center.y) - this.radius;

    if(xpos > maxDist || ypos > maxDist) {
        this.center.x = Math.random() * w - w /2;
        this.center.y = Math.random() * h / 2 + this.radius;
    }
}

function drawInsideShape () {
    var argLength = arguments.length;
    c.save();
    c.clip();

    for(var i = 0; i < argLength; i += 2) {
        arguments[i](arguments[i+1]);
    }

    //this.draw();
    c.restore();
}


/*
Triangle - defines equal side triangles,
firstVertexPositionOnCircle - an angle in degrees
this is where the first vertex will be positioned  on the circle
*/
function Triangle (center, radius, firstVertexPositionOnCircle) {
    this.center = center;
    this.radius = radius;
    this.firstVertexPositionOnCircle = firstVertexPositionOnCircle / 180 * pi;

    this.vertexList = [];

    for (var i = 0; i <3; i++){
        this.vertexList[i] = new Point(
            Math.cos((i * 2 / 3 * pi) + this.firstVertexPositionOnCircle) * this.radius + this.center.x,
            Math.sin((i * 2 / 3 * pi) + this.firstVertexPositionOnCircle) * this.radius + this.center.y
        );
    }


}


Triangle.prototype.draw = function(){
    c.strokeStyle = 'rgb(255, 255, 255)';
    //c.fillStyle = 'rgb(255, 255, 255)';
    c.beginPath();
    c.moveTo(this.vertexList[0].x, this.vertexList[0].y);
    for (var i = 1; i < 3; i++){
        c.lineTo(this.vertexList[i].x, this.vertexList[i].y);
    }
    c.closePath();
    //c.lineWidth = 30;
    // c.stroke();
    //c.fill();
    //c.lineWidth = 2;
}


/****************
CHANGE PARAMETERS
*****************/

var backgroundColor = '#1d211e';


var triangleR = Math.max(w / 2, h / 2);
var triangleStartAngle = 90;
var triangleCenter = new Point(
    Math.cos((triangleStartAngle + 180) * pi / 180) * triangleR,
    Math.sin((triangleStartAngle + 180) * pi / 180) * triangleR
);


var triangle = new Triangle(triangleCenter, triangleR, triangleStartAngle);

color1 = 'rgba(255, 0, 0, 1)';
// color1 = 'red';
// color1 = '#00c0cb';


//COLOR2
color2 = 'rgba(0, 255, 255, 1)';
// color2 = 'blue';
// color2 = '#ffc0cb';

var circleList = [];
for(var i = 0; i < 16; i++) {
    circleList.push(
        new Circle(
            new Point(Math.random() * 100 - 50, Math.random() * h / 2),
            222,
            color1,
            color2,
            33,//lineWidth,
            false
        )
    );
}

var circleV = [];
for(var i = 0; i < 16; i++) {
    circleV.push(Math.random() * 5);
}

var circleY = [];
for(var i = 0; i < 16; i++) {
    circleY.push(Math.random() * 2);
}


//helpers
var origoPoint = new Circle(origo, 10, 'rgb(255, 255, 0)');


clearCanvas(backgroundColor);

draw();

/************
ACTION
************/

function clearCanvas(backgroundColor){
    c.fillStyle = backgroundColor;
    c.fillRect(-w/2, -h/2, w, h);
}



function draw() {
    requestAnimationFrame(draw);
    clearCanvas(backgroundColor);

    mousePosToCenterVector = getMousePosToCenterVector(mousePos);

    //origoPoint.draw();

    for(var i = 0; i < 16; i++) {
        circleList[i].handleOutOfSight();
        circleList[i].moveLinear(new Point(circleY[i], -1), circleV[i]);
    }


    //----------------------
    //TOP CENTER
    //-----------------------

    triangle.draw();

    c.save();
    c.clip();



    for(var i = 0; i < 16; i++) {
        circleList[i].draw();
    }


    c.restore();


    //----------------------
    //TOP RIGHT
    //-----------------------

    c.rotate(60 * pi / 180);
    c.scale(-1, 1);

    triangle.draw();

    c.save();
    c.clip();



    for(var i = 0; i < 16; i++) {
        circleList[i].draw();
    }

    c.restore();

    c.scale(-1, 1);
    c.rotate(-60 * pi / 180);

    //----------------------
    //TOP LEFT
    //-----------------------
    //
    // c.rotate(-60 * pi / 180);
    // c.scale(-1, 1);
    //
    // triangle.draw();
    //
    // c.save();
    // c.clip();
    //
    //
    //
    //
    // for(var i = 0; i < 16; i++) {
    //     circleList[i].draw();
    // }
    //
    //
    // c.restore();
    //
    // c.scale(-1, 1);
    // c.rotate(60 * pi / 180);

    //----------------------
    //BOTTOM CENTER
    //-----------------------
    // c.scale(1, -1);
    //
    //
    // triangle.draw();
    //
    // c.save();
    // c.clip();
    //
    //
    //
    // for(var i = 0; i < 16; i++) {
    //     circleList[i].draw();
    // }
    //
    // c.restore();
    //
    // c.scale(1, -1);

    //----------------------
    //BOTTOM RIGHT
    //-----------------------

    c.rotate(120 * pi / 180);

    triangle.draw();

    c.save();
    c.clip();



    for(var i = 0; i < 16; i++) {
        circleList[i].draw();
    }

    c.restore();


    c.rotate(-120 * pi / 180);



    // //----------------------
    // //BOTTOM LEFT
    // //-----------------------
    // c.rotate(-120 * pi / 180);
    //
    // triangle.draw();
    //
    // c.save();
    // c.clip();
    //
    //
    //
    // for(var i = 0; i < 16; i++) {
    //     circleList[i].draw();
    // }
    //
    // c.restore();
    //
    //
    // c.rotate(120 * pi / 180);

 }


function getMousePosToCenterVector(mousePos) {
    var vector = new Point(mousePos.x / (w / 2), mousePos.y / (h / 2));

    return vector;
};


function getMousePos(canvas, evt) {
     let rect = canvas.getBoundingClientRect();

     return new Point(evt.clientX, evt.clientY);
 };


function setupCanvas() {
     w = window.innerWidth;
     h = window.innerHeight;

     canvas.width = w;
     canvas.height = h;

     //set Point(0, 0) to be at the middle of the canvas
     c.translate(canvas.width / 2, canvas.height / 2);

     mousePos = new Point(w / 2, h / 2);
     maxDist = Math.sqrt(Math.pow(w / 2, 2) + Math.pow(w / 2, 2));
 }


 document.addEventListener('mousemove', function(evt) {

  mousePos = getMousePos(canvas, evt);

  mousePos.x -= w/2;
  mousePos.y -= h/2;
}, false);


window.onresize = function() {
    setupCanvas()
}


function motion(event){
    var container = document.querySelector('.accelerometer');
    mousePos = new Point(event.accelerationIncludingGravity.x / 5 * w / 2, event.accelerationIncludingGravity.x / 5 * w / 2);
}


if(window.DeviceMotionEvent){
  window.addEventListener("devicemotion", motion, false);
}
