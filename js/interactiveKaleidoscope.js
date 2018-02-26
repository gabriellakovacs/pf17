window.onload = function() {
    document.querySelector('main').classList.remove('invisible');
}

/****************
CHANGE PARAMETERS
*****************/

var backgroundColor = '#1d211e';

//CIRCLES
var nrOfCircles = 12;
var circleRadius = Math.max(window.innerHeight / 4, window.innerWidth / 4);
var strokeW = 33;
var circleHalfWidth = circleRadius + strokeW * 2;

var color1 = 'rgba(255, 0, 0, 1)';
// color1 = 'red';
// color1 = '#00c0cb';
var color2 = 'rgba(0, 255, 255, 1)';
// color2 = 'blue';
// color2 = '#ffc0cb';


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


function Shape(center, radius) {
    this.center = center;
    this.radius = radius;
    this.setVelocity();
}


Shape.prototype.moveLinear = function() {
    this.center.x += this.step.x;
    this.center.y += this.step.y;
}


Shape.prototype.setVelocity = function() {

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


Shape.prototype.handleOutOfSight = function() {
    var xpos = Math.abs(this.center.x) - circleRadius;
    var ypos = Math.abs(this.center.y) - circleRadius;

    if(xpos > maxDist || ypos > maxDist) {
        this.center.x = Math.round(Math.random() * w - w / 2);
        this.center.y = Math.round(Math.random() * h / 10 + this.radius);

        this.setVelocity();
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

    c.beginPath();
    c.moveTo(this.vertexList[0].x, this.vertexList[0].y);
    for (var i = 1; i < 3; i++){
        c.lineTo(this.vertexList[i].x, this.vertexList[i].y);
    }
    c.closePath();

}


function initShape(triangle) {
    var centerX = Math.round(Math.random() * w / 2);


    //var centerY = Math.round(Math.random() * h / 2 - circleRadius);
    if(centerX < 0) {
        var shape = new Shape(
            triangleLeftLineParallelFunction(centerX, circleRadius, triangle),
            circleRadius
        )
    } else {
        var shape = new Shape(
            triangleRightLineParallelFunction(centerX, circleRadius, triangle),
            circleRadius
        )
    }


    return shape;
}

function triangleLeftLineParallelFunction(x, radius, triangle) {
    //triangle[0] is in the origo so no need to calc that, but precizly it would be:
    //(triangle.vertexList[0].y - triangle.vertexList[1].y) / (triangle.vertexList[0].y - triangle.vertexList[1].x)
    var slope = (0 - triangle.vertexList[1].y) / (0 - triangle.vertexList[1].x);
    var y = x * slope;
    // var slopeOfPerpendicularLine = - 1 / slope;
    //
    // var x_on_the_line_moved_by_radius = -1 * Math.sqrt(Math.pow(radius, 2) / (1 + slopeOfPerpendicularLine));
    // var y_on_the_line_moved_by_radius = x_on_the_line_moved_by_radius * slopeOfPerpendicularLine;


    //return new Point(x_on_the_line_moved_by_radius, y_on_the_line_moved_by_radius);
    return new Point(x - radius, y + radius);
}

function triangleRightLineParallelFunction(x, radius, triangle) {
    //triangle[0] is in the origo so no need to calc that, but precizly it would be:
    //(triangle.vertexList[0].y - triangle.vertexList[1].y) / (triangle.vertexList[0].y - triangle.vertexList[1].x)
    var slope = (0 - triangle.vertexList[2].y) / (0 - triangle.vertexList[2].x);
    var y = x * slope;
    // var slopeOfPerpendicularLine = - 1 / slope;
    //
    // var x_on_the_line_moved_by_radius = -1 * Math.sqrt(Math.pow(radius, 2) / (1 + slopeOfPerpendicularLine));
    // var y_on_the_line_moved_by_radius = x_on_the_line_moved_by_radius * slopeOfPerpendicularLine;
    //
    //
    // return new Point(x_on_the_line_moved_by_radius, y_on_the_line_moved_by_radius);

    return new Point(x + radius, y + radius);
}

function drawCircle(contex, color) {
    contex.lineWidth = 33;
    contex.strokeStyle = color;

    contex.beginPath();
    contex.arc(222 + 33, 222 + 33, 222, 0, 7, false);
    contex.stroke();
}

var m_canvas = document.createElement('canvas');
m_canvas.width = circleHalfWidth * 2;
m_canvas.height = circleHalfWidth * 2;
var m_context = m_canvas.getContext('2d');
drawCircle(m_context, color1);

var b_canvas = document.createElement('canvas');
b_canvas.width = circleHalfWidth * 2;
b_canvas.height = circleHalfWidth * 2;
var b_context = b_canvas.getContext('2d');
drawCircle(b_context, color2);


//TRIANGLE
var triangleR = Math.max(w / 2, h / 2);
var triangleStartAngle = 90;
var triangleCenter = new Point(
    Math.cos((triangleStartAngle + 180) * pi / 180) * triangleR,
    Math.sin((triangleStartAngle + 180) * pi / 180) * triangleR
);


var triangle = new Triangle(triangleCenter, triangleR, triangleStartAngle);



var circleList = [];
for(var i = 0; i < nrOfCircles; i++) {
    circleList.push( initShape(triangle) );
}


draw();



/************
ACTION
************/

function clearCanvas(backgroundColor){
    c.globalCompositeOperation = 'normal';
    c.fillStyle = backgroundColor;
    c.fillRect(-w/2, -h/2, w, h);
}


function draw() {
    requestAnimationFrame(draw);
    // window.onclick = function functionName() {
    //     draw();
    // };
    clearCanvas(backgroundColor);

    c.globalCompositeOperation = 'difference';

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
    // //c.clip();
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


    //----------------------
    //BOTTOM LEFT
    //-----------------------

    // c.rotate(-120 * pi / 180);
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
    //
    // c.rotate(120 * pi / 180);

 }


function drawAllCircles() {
    console.log('mousePosToCenterVector');
    console.dir(mousePosToCenterVector);


    //the drawImage function takes the topleft corner - so wee need to transform the images, to their actual center
    for(var i = 0; i < nrOfCircles; i++) {
        c.drawImage(m_canvas, circleList[i].center.x - circleHalfWidth - mousePosToCenterVector.x * 10, circleList[i].center.y - circleHalfWidth - mousePosToCenterVector.y * 10);
        c.drawImage(b_canvas, circleList[i].center.x - circleHalfWidth + mousePosToCenterVector.x * 10, circleList[i].center.y - circleHalfWidth + mousePosToCenterVector.y * 10);
    }

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
     maxDist = Math.sqrt(Math.pow(w / 2, 2) + Math.pow(h / 2, 2));
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
