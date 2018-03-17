window.onload = function() {
    document.querySelector('main').classList.remove('invisible');
}

/****************
PARAMETERS
*****************/

var backgroundColor = '#1d211e';

//CIRCLES
var nrOfShapes = 15;
var circleRadius = Math.max(window.innerHeight / 5, window.innerWidth / 5);
 // var circleRadius = 100;
var strokeW = 30;
// var strokeW = 10;
var circleHalfWidth = circleRadius + strokeW * 2;

var color1 = 'rgba(255, 0, 0, 1)';
var color2 = 'rgba(0, 255, 255, 1)';



function Scene(nrOfShapes, canvasList) {
    this.canvas = document.querySelector('canvas');
    this.ctx = this.canvas.getContext('2d', {
      alpha: false
    });
    this.w = window.innerWidth;
    this.h = window.innerHeight;
    this.origo = new Point(0, 0);
    this.pi = Math.PI;
    this.mousePos = new Point(this.w / 2, this.h / 2);
    this.mousePosToCenterVector;
    this.maxDist = Math.sqrt(Math.pow(this.w / 2, 2) + Math.pow(this.h / 2, 2));
    this.shapeList = [];
    this.shapeListLength = nrOfShapes;
    this.canvasList = canvasList;
    this.backgroundColor = backgroundColor;
    this.clipShapeVertexList = [
        new Point(this.w / 2, 0),
        new Point(this.w / 2, -this.h / 2),
        new Point(-this.w / 10, 0)
    ];
}

Scene.prototype.init = function() {

    this.canvas.width = this.w;
    this.canvas.height = this.h;

    //set Point(0, 0) to be at the middle of the canvas
    this.ctx.translate(this.canvas.width / 2, this.canvas.height / 2);

    for(var i = 0; i < this.shapeListLength; i++) {
        var shape = new Shape();
        this.shapeList.push(shape);
    }

}

Scene.prototype.updateOnResize = function() {

    var self = this;

    window.addEventListener('resize', function() {

        self.w = window.innerWidth;
        self.h = window.innerHeight;

        self.canvas.width = self.w;
        self.canvas.height = self.h;

        self.ctx.translate(self.canvas.width / 2, self.canvas.height / 2);


        for(var i = 0; i < self.shapeListLength; i++) {
            self.shapeList[i].w = self.w;
            self.shapeList[i].h = self.h;
        }

        self.clipShapeVertexList = [
            new Point(self.w / 2, 0),
            new Point(self.w / 2, -self.h / 2),
            new Point(-self.w / 10, 0)
        ];
    })
}

Scene.prototype.draw = function() {

    var self = this;

    requestAnimationFrame(function() {
        self.draw();
    });

    this.ctx.globalCompositeOperation = 'normal';
    this.ctx.beginPath();
    this.ctx.fillStyle = this.backgroundColor;
    this.ctx.rect(-this.w/2, -this.h/2, this.w, this.h);
    this.ctx.fill();

    //this.ctx.globalCompositeOperation = 'normal';
    // this.ctx.fillStyle = 'backgroundColor';
    // this.ctx.fillRect(-this.w/2, -this.h/2, this.w, this.h);


    this.getMousePosToCenterVector();

    for(var i = 0; i < this.shapeListLength; i++) {
        this.shapeList[i].handleOutOfSight();
        this.shapeList[i].moveLinear();
    }

    //TOP
    this.drawClipshape();

    this.ctx.save();
    this.ctx.clip();

    this.drawAllCircles();


    this.ctx.restore();


    //BOTTOM

    this.ctx.scale(1, -1);

    this.drawClipshape();
    this.ctx.save();
    this.ctx.clip();

    this.drawAllCircles();

    this.ctx.restore();

    this.ctx.scale(1, -1);


}

Scene.prototype.drawAllCircles = function() {
    this.ctx.globalCompositeOperation = 'difference';

    //the drawImage function takes the topleft corner - so wee need to transform the images, to their actual center
    for(var i = 0; i < this.shapeListLength; i++) {
        this.ctx.drawImage(this.canvasList[0], this.shapeList[i].center.x - this.canvasList[0].width / 2, this.shapeList[i].center.y - this.canvasList[0].height / 2);
        this.ctx.drawImage(this.canvasList[1], this.shapeList[i].center.x - this.canvasList[1].width / 2 + this.mousePosToCenterVector.x * 20, this.shapeList[i].center.y - this.canvasList[1].height / 2 + this.mousePosToCenterVector.y * 20);
    }

}

Scene.prototype.getMousePosToCenterVector = function() {
    this.mousePosToCenterVector = new Point(this.mousePos.x / (this.w / 2), this.mousePos.y / (this.h / 2));
};

Scene.prototype.updateMotion = function(){

    if(window.DeviceMotionEvent){
        var self = this;
      window.addEventListener("devicemotion", function(event) {
          self.mousePos = new Point(event.accelerationIncludingGravity.x / 7 * self.w, event.accelerationIncludingGravity.x / 7 * self.w);
      }, false);
    }
}

Scene.prototype.updateMousePos = function() {
    var self = this;

    document.addEventListener('mousemove', function(e) {

        self.mousePos = new Point(e.clientX - self.w / 2, e.clientY - self.h / 2);

        self.clipShapeVertexList = [
            new Point(self.w / 2, 0),
            new Point(self.w / 2, -self.h / 2),
            new Point(-self.w / 10 - self.mousePos.x, 0)
        ];

   }, false);
}

Scene.prototype.drawClipshape = function() {

    this.ctx.beginPath();
    this.ctx.moveTo(this.clipShapeVertexList[0].x, this.clipShapeVertexList[0].y);
    for (var i = 1; i < 3; i++){
        this.ctx.lineTo(this.clipShapeVertexList[i].x, this.clipShapeVertexList[i].y);
    }
    this.ctx.closePath();

    // this.ctx.strokeStyle = 'rgb(255, 255, 255)';
    // this.ctx.stroke();

}


function Canvas(w, h, color) {
    this.canvas = document.createElement('canvas');
    this.ctx =  this.canvas.getContext('2d');
    this.canvas.width = w;
    this.canvas.height = h;
    this.ctx.strokeStyle = color;
    this.ctx.translate(this.canvas.width / 2, this.canvas.height / 2);
}

Canvas.prototype.drawCircle = function() {
    this.ctx.lineWidth = strokeW;
    this.ctx.beginPath();
    this.ctx.arc(0, 0, circleRadius, 0, 7, false);
    this.ctx.stroke();
}

Canvas.prototype.drawSquare = function() {
    this.ctx.lineWidth = strokeW;
    this.ctx.beginPath();
    this.ctx.rect(0, 0, circleRadius, circleRadius);
    this.ctx.stroke();
}

/************
GEOMETRY
************/
function Point (x, y){
    this.x = x;
    this.y = y;
}

function Shape() {
    this.w = window.innerWidth;
    this.h = window.innerHeight;
    this.radius = circleHalfWidth;
    this.setPosition();
    this.setVelocity();
}

Shape.prototype.setPosition = function() {
    this.center = new Point(Math.random() * this.w - this.w / 2.2, this.radius );
}

Shape.prototype.moveLinear = function() {
    this.center.x += this.step.x;
    this.center.y += this.step.y;
}

Shape.prototype.setVelocity = function() {
     this.step = new Point((-Math.random() - 0.2)*3, Math.random() * 3 - 1.5);
     this.step = new Point((Math.random() + 0.2) * 3, -Math.random() * 3);
 }

Shape.prototype.handleOutOfSight = function() {
    var xpos = Math.abs(this.center.x) - this.radius;
    var ypos = Math.abs(this.center.y) - this.radius;

    if(xpos > this.w/ 2 || ypos > this.h / 2) {
        this.setPosition();
        this.setVelocity();
    }
}





var canvas_circle_red = new Canvas(circleHalfWidth * 2, circleHalfWidth * 2, 'rgb(255, 0, 0)');
canvas_circle_red.drawCircle();

var canvas_circle_cyan = new Canvas(circleHalfWidth * 2, circleHalfWidth * 2, 'rgb(0, 255, 255)');
canvas_circle_cyan.drawCircle();


var scene = new Scene(nrOfShapes, [canvas_circle_red.canvas, canvas_circle_cyan.canvas]);

scene.init();
scene.updateOnResize();
scene.updateMousePos();
scene.updateMotion();
scene.draw();
