window.onload = function() {
    document.querySelector('main').classList.remove('invisible');
}


/************
SETUP CANVAS
************/

const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d', {
  alpha: false
});

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


Shape.prototype.moveLinear = function() {
    this.center.x += this.step.x;
    this.center.y += this.step.y;
}

Circle.prototype = new Shape();
Circle.prototype.constructor = Circle;


function Circle(center, radius, color1, color2) {
    this.center = center;
    this.radius = radius;
    this.color1 = color1;
    this.color2 = color2;

    this.setCircleVelocity();
}


Circle.prototype.setCircleVelocity = function() {

     //get the distance from the circle center towards the top center(0, -h/2) of the screen
     var distanceX = this.center.x * -1;
     distanceX === 0 ? distanceX = 0.01 : false;
     var distanceY = -1 * (h / 2) - this.center.y;

     var distanceection = new Point(distanceX, distanceY);

     if(Math.abs(distanceX) > Math.abs(distanceY)) {

         //set the speed for the x axis
         var velocityX = Math.random() * 1.8 + 0.8;

         //get the speed for the y axis
         var velocityY = distanceY / (Math.abs(distanceX) / velocityX) ;

         velocityX *= Math.sign(distanceX);

     } else {

         //set the speed for the y axis
         var velocityY = Math.random() * 1.8 + 0.8;

         //get the speed for the x axis
         var velocityX = distanceX / (Math.abs(distanceY) / velocityY) ;

         velocityY *= Math.sign(distanceY);

     }

     this.step = new Point(Math.round(velocityX), Math.round(velocityY));
 }


Circle.prototype.draw = function() {


    c.beginPath();
    c.arc(this.center.x + mousePosToCenterVector.x * 10, this.center.y + mousePosToCenterVector.y * 10, this.radius, 0, 7, false);

    //c.closePath();

    c.stroke();



    // c.beginPath();
    // c.arc(this.center.x - mousePosToCenterVector.x * 10, this.center.y - mousePosToCenterVector.y * 10, this.radius, 0, 7, false);
    //
    // c.closePath();
    //
    // c.stroke();


}


Circle.prototype.handleOutOfSight = function() {
    var xpos = Math.abs(this.center.x) - this.radius;
    var ypos = Math.abs(this.center.y) - this.radius;

    if(xpos > maxDist || ypos > maxDist) {
        this.center.x = Math.round(Math.random() * w - w / 2);
        this.center.y = Math.round(Math.random() * h / 2 + this.radius);

        this.setCircleVelocity();
    }
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
    //c.strokeStyle = 'rgb(255, 255, 255)';

    c.beginPath();
    c.moveTo(this.vertexList[0].x, this.vertexList[0].y);
    for (var i = 1; i < 3; i++){
        c.lineTo(this.vertexList[i].x, this.vertexList[i].y);
    }
    c.closePath();
    //c.lineWidth = 30;
    //c.stroke();
}


function initCircle() {
    var centerX = Math.round(Math.random() * w / 2);
    var centerY = Math.round(Math.random() * h / 2 - 222);


    var circle = new Circle(
        new Point(centerX, centerY),
        circleRadius,
        color1,
        color2
    )

    return circle;
}

function drawCircle(contex, color) {
    contex.lineWidth = 33;
    contex.strokeStyle = color;

    contex.beginPath();
    contex.arc(222 + 33, 222 + 33, 222, 0, 7, false);
    contex.stroke();
}

var m_canvas = document.createElement('canvas');
m_canvas.width = 510;
m_canvas.height = 510;
var m_context = m_canvas.getContext('2d');
drawCircle(m_context, 'rgb(255, 0, 0)');

var b_canvas = document.createElement('canvas');
b_canvas.width = 510;
b_canvas.height = 510;
var b_context = b_canvas.getContext('2d');
drawCircle(b_context, 'rgb(0, 255, 255)');



/****************
CHANGE PARAMETERS
*****************/

var backgroundColor = '#1d211e';


//TRIANGLE
var triangleR = Math.max(w / 2, h / 2);
var triangleStartAngle = 90;
var triangleCenter = new Point(
    Math.cos((triangleStartAngle + 180) * pi / 180) * triangleR,
    Math.sin((triangleStartAngle + 180) * pi / 180) * triangleR
);


var triangle = new Triangle(triangleCenter, triangleR, triangleStartAngle);


//CIRCLES
var nrOfCircles = 10;
var circleRadius = Math.max(h / 4, w / 4);
var strokeW = 33;

var color1 = 'rgba(255, 0, 0, 1)';
// color1 = 'red';
// color1 = '#00c0cb';
var color2 = 'rgba(0, 255, 255, 1)';
// color2 = 'blue';
// color2 = '#ffc0cb';

var circleList = [];
for(var i = 0; i < nrOfCircles; i++) {
    circleList.push( initCircle() );
}

//helpers
var origoPoint = new Circle(origo, 10, 'rgb(255, 255, 0)');

c.lineWidth = strokeW;
clearCanvas(backgroundColor);

draw();

//c.drawImage(m_canvas, -255, -255);

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

    for(var i = 0; i < nrOfCircles; i++) {
        circleList[i].handleOutOfSight();
        circleList[i].moveLinear();
    }


    //----------------------
    //TOP CENTER
    //-----------------------

    // triangle.draw();
    //
    // c.save();
    // c.clip();
    //
    // drawAllCircles();
    //
    //
    // c.restore();


    //----------------------
    //TOP RIGHT
    //-----------------------

    c.rotate(60 * pi / 180);
    c.scale(-1, 1);

    triangle.draw();

    c.save();
    c.clip();

    drawAllCircles();

    c.restore();

    c.scale(-1, 1);
    //c.rotate(-60 * pi / 180);

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

    // drawAllCircles();

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
    // drawAllCircles();

    //
    // c.restore();
    //
    // c.scale(1, -1);

    //----------------------
    //BOTTOM RIGHT
    //-----------------------

    c.rotate(60 * pi / 180);

    triangle.draw();

    c.save();
    c.clip();

    drawAllCircles();

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
    // drawAllCircles();

    // c.restore();
    //
    //
    // c.rotate(120 * pi / 180);

 }


function drawAllCircles() {

    c.globalCompositeOperation = 'difference';

    //COLOR1
    //c.strokeStyle = this.color1;
    for(var i = 0; i < nrOfCircles; i++) {
        //circleList[i].draw();
        c.drawImage(m_canvas, circleList[i].center.x, circleList[i].center.y);
    }

    //COLOR2
    // c.strokeStyle = this.color2;
    // for(var i = 0; i < nrOfCircles; i++) {
    //     //circleList[i].draw();
    // }
    for(var i = 0; i < nrOfCircles; i++) {
        //circleList[i].draw();
        c.drawImage(b_canvas, circleList[i].center.x + 5, circleList[i].center.y + 5);
    }

    c.globalCompositeOperation = 'normal';
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
