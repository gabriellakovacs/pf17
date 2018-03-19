var TWEEN=TWEEN||function(){var n=[];return{getAll:function(){return n},removeAll:function(){n=[]},add:function(t){n.push(t)},remove:function(t){var r=n.indexOf(t);-1!==r&&n.splice(r,1)},update:function(t,r){if(0===n.length)return!1;var i=0;for(t=void 0!==t?t:TWEEN.now();i<n.length;)n[i].update(t)||r?i++:n.splice(i,1);return!0}}}();!function(){void 0===this.window&&void 0!==this.process?TWEEN.now=function(){var n=process.hrtime();return 1e3*n[0]+n[1]/1e3}:void 0!==this.window&&void 0!==window.performance&&void 0!==window.performance.now?TWEEN.now=window.performance.now.bind(window.performance):void 0!==Date.now?TWEEN.now=Date.now:TWEEN.now=function(){return(new Date).getTime()}}(),TWEEN.Tween=function(n){var t=n,r={},i={},o={},u=1e3,e=0,a=!1,f=!1,c=!1,s=0,h=null,l=TWEEN.Easing.Linear.None,E=TWEEN.Interpolation.Linear,p=[],d=null,v=!1,w=null,I=null,M=null;for(var T in n)r[T]=parseFloat(n[T],10);this.to=function(n,t){return void 0!==t&&(u=t),i=n,this},this.start=function(n){TWEEN.add(this),f=!0,v=!1,h=void 0!==n?n:TWEEN.now(),h+=s;for(var u in i){if(i[u]instanceof Array){if(0===i[u].length)continue;i[u]=[t[u]].concat(i[u])}void 0!==r[u]&&(r[u]=t[u],r[u]instanceof Array==!1&&(r[u]*=1),o[u]=r[u]||0)}return this},this.stop=function(){return f?(TWEEN.remove(this),f=!1,null!==M&&M.call(t),this.stopChainedTweens(),this):this},this.stopChainedTweens=function(){for(var n=0,t=p.length;t>n;n++)p[n].stop()},this.delay=function(n){return s=n,this},this.repeat=function(n){return e=n,this},this.yoyo=function(n){return a=n,this},this.easing=function(n){return l=n,this},this.interpolation=function(n){return E=n,this},this.chain=function(){return p=arguments,this},this.onStart=function(n){return d=n,this},this.onUpdate=function(n){return w=n,this},this.onComplete=function(n){return I=n,this},this.onStop=function(n){return M=n,this},this.update=function(n){var f,M,T;if(h>n)return!0;v===!1&&(null!==d&&d.call(t),v=!0),M=(n-h)/u,M=M>1?1:M,T=l(M);for(f in i)if(void 0!==r[f]){var N=r[f]||0,W=i[f];W instanceof Array?t[f]=E(W,T):("string"==typeof W&&(W="+"===W.charAt(0)||"-"===W.charAt(0)?N+parseFloat(W,10):parseFloat(W,10)),"number"==typeof W&&(t[f]=N+(W-N)*T))}if(null!==w&&w.call(t,T),1===M){if(e>0){isFinite(e)&&e--;for(f in o){if("string"==typeof i[f]&&(o[f]=o[f]+parseFloat(i[f],10)),a){var O=o[f];o[f]=i[f],i[f]=O}r[f]=o[f]}return a&&(c=!c),h=n+s,!0}null!==I&&I.call(t);for(var m=0,g=p.length;g>m;m++)p[m].start(h+u);return!1}return!0}},TWEEN.Easing={Linear:{None:function(n){return n}},Quadratic:{In:function(n){return n*n},Out:function(n){return n*(2-n)},InOut:function(n){return(n*=2)<1?.5*n*n:-.5*(--n*(n-2)-1)}},Cubic:{In:function(n){return n*n*n},Out:function(n){return--n*n*n+1},InOut:function(n){return(n*=2)<1?.5*n*n*n:.5*((n-=2)*n*n+2)}},Quartic:{In:function(n){return n*n*n*n},Out:function(n){return 1- --n*n*n*n},InOut:function(n){return(n*=2)<1?.5*n*n*n*n:-.5*((n-=2)*n*n*n-2)}},Quintic:{In:function(n){return n*n*n*n*n},Out:function(n){return--n*n*n*n*n+1},InOut:function(n){return(n*=2)<1?.5*n*n*n*n*n:.5*((n-=2)*n*n*n*n+2)}},Sinusoidal:{In:function(n){return 1-Math.cos(n*Math.PI/2)},Out:function(n){return Math.sin(n*Math.PI/2)},InOut:function(n){return.5*(1-Math.cos(Math.PI*n))}},Exponential:{In:function(n){return 0===n?0:Math.pow(1024,n-1)},Out:function(n){return 1===n?1:1-Math.pow(2,-10*n)},InOut:function(n){return 0===n?0:1===n?1:(n*=2)<1?.5*Math.pow(1024,n-1):.5*(-Math.pow(2,-10*(n-1))+2)}},Circular:{In:function(n){return 1-Math.sqrt(1-n*n)},Out:function(n){return Math.sqrt(1- --n*n)},InOut:function(n){return(n*=2)<1?-.5*(Math.sqrt(1-n*n)-1):.5*(Math.sqrt(1-(n-=2)*n)+1)}},Elastic:{In:function(n){return 0===n?0:1===n?1:-Math.pow(2,10*(n-1))*Math.sin(5*(n-1.1)*Math.PI)},Out:function(n){return 0===n?0:1===n?1:Math.pow(2,-10*n)*Math.sin(5*(n-.1)*Math.PI)+1},InOut:function(n){return 0===n?0:1===n?1:(n*=2,1>n?-.5*Math.pow(2,10*(n-1))*Math.sin(5*(n-1.1)*Math.PI):.5*Math.pow(2,-10*(n-1))*Math.sin(5*(n-1.1)*Math.PI)+1)}},Back:{In:function(n){var t=1.70158;return n*n*((t+1)*n-t)},Out:function(n){var t=1.70158;return--n*n*((t+1)*n+t)+1},InOut:function(n){var t=2.5949095;return(n*=2)<1?.5*(n*n*((t+1)*n-t)):.5*((n-=2)*n*((t+1)*n+t)+2)}},Bounce:{In:function(n){return 1-TWEEN.Easing.Bounce.Out(1-n)},Out:function(n){return 1/2.75>n?7.5625*n*n:2/2.75>n?7.5625*(n-=1.5/2.75)*n+.75:2.5/2.75>n?7.5625*(n-=2.25/2.75)*n+.9375:7.5625*(n-=2.625/2.75)*n+.984375},InOut:function(n){return.5>n?.5*TWEEN.Easing.Bounce.In(2*n):.5*TWEEN.Easing.Bounce.Out(2*n-1)+.5}}},TWEEN.Interpolation={Linear:function(n,t){var r=n.length-1,i=r*t,o=Math.floor(i),u=TWEEN.Interpolation.Utils.Linear;return 0>t?u(n[0],n[1],i):t>1?u(n[r],n[r-1],r-i):u(n[o],n[o+1>r?r:o+1],i-o)},Bezier:function(n,t){for(var r=0,i=n.length-1,o=Math.pow,u=TWEEN.Interpolation.Utils.Bernstein,e=0;i>=e;e++)r+=o(1-t,i-e)*o(t,e)*n[e]*u(i,e);return r},CatmullRom:function(n,t){var r=n.length-1,i=r*t,o=Math.floor(i),u=TWEEN.Interpolation.Utils.CatmullRom;return n[0]===n[r]?(0>t&&(o=Math.floor(i=r*(1+t))),u(n[(o-1+r)%r],n[o],n[(o+1)%r],n[(o+2)%r],i-o)):0>t?n[0]-(u(n[0],n[0],n[1],n[1],-i)-n[0]):t>1?n[r]-(u(n[r],n[r],n[r-1],n[r-1],i-r)-n[r]):u(n[o?o-1:0],n[o],n[o+1>r?r:o+1],n[o+2>r?r:o+2],i-o)},Utils:{Linear:function(n,t,r){return(t-n)*r+n},Bernstein:function(n,t){var r=TWEEN.Interpolation.Utils.Factorial;return r(n)/r(t)/r(n-t)},Factorial:function(){var n=[1];return function(t){var r=1;if(n[t])return n[t];for(var i=t;i>1;i--)r*=i;return n[t]=r,r}}(),CatmullRom:function(n,t,r,i,o){var u=.5*(r-n),e=.5*(i-t),a=o*o,f=o*a;return(2*t-2*r+u+e)*f+(-3*t+3*r-2*u-e)*a+u*o+t}}},function(n){"function"==typeof define&&define.amd?define([],function(){return TWEEN}):"undefined"!=typeof module&&"object"==typeof exports?module.exports=TWEEN:void 0!==n&&(n.TWEEN=TWEEN)}(this);
//# sourceMappingURL=Tween.min.js.map

/****************
PARAMETERS
*****************/

var backgroundColor = '#000022';

var nrOfShapes = 15;
var circleRadius = Math.max(window.innerHeight / 5, window.innerWidth / 5);
var strokeW = 30;
var circleHalfWidth = circleRadius + strokeW * 2;

var color1 = 'rgba(255, 0, 0, 1)';
var color2 = 'rgba(0, 255, 255, 1)';

/************
SCENE
************/
function Scene(nrOfShapes, canvasList) {
    this.canvas = document.querySelector('canvas');
    this.ctx = this.canvas.getContext('2d', {
      alpha: false
    });
    this.w = window.innerWidth;
    this.h = window.innerHeight;
    this.mousePos = new Point(-this.w/2, -this.h/2);
    this.step = 0;
    this.mousePosToCenterVector;
    this.maxDist = Math.sqrt(Math.pow(this.w / 2, 2) + Math.pow(this.h / 2, 2));
    this.shapeList = [];
    this.shapeListLength = nrOfShapes;
    this.canvasList = canvasList;
    this.backgroundColor = backgroundColor;
    this.clipShapeVertexList = [
        { x: this.w / 2, y: 0 },
        { x: this.w / 2, y: 0 },
        { x: -this.w / 2, y: 0 }
    ];
    this.tweenOpening_1 = new TWEEN.Tween(this.clipShapeVertexList[1])
            .to({ x: this.w / 2, y: -this.h / 2 }, 800 )
            .easing(TWEEN.Easing.Sinusoidal .InOut)
            .start();

    this.tweenOpening_2 = new TWEEN.Tween(this.clipShapeVertexList[2])
            .to({ x: 0, y: 0 }, 800   )
            .easing(TWEEN.Easing.Sinusoidal .InOut)
            .start();
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

Scene.prototype.draw = function(time) {

    var self = this;

    requestAnimationFrame(function() {
        self.draw();
    });

    this.ctx.globalCompositeOperation = 'normal';
    this.ctx.beginPath();
    this.ctx.fillStyle = this.backgroundColor;
    this.ctx.rect(-this.w/2, -this.h/2, this.w, this.h);
    this.ctx.fill();

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

    TWEEN.update(time);

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
          var first = true;
          window.addEventListener("devicemotion", function(event) {
              if(!first){
                  self.mousePos = new Point(event.accelerationIncludingGravity.x / 7 * self.w, event.accelerationIncludingGravity.x / 7 * self.w);
              } else{
                  first = false;
              }


          }, false);
    }
}

Scene.prototype.updateMousePos = function() {
    var self = this;
    var prevMousePos = new Point(0,0);

    document.addEventListener('mousemove', function(e) {

        self.mousePos = new Point(e.clientX - self.w / 2, e.clientY - self.h / 2);

   }, false);
}

Scene.prototype.drawClipshape = function() {

    this.ctx.beginPath();
    this.ctx.moveTo(this.clipShapeVertexList[0].x, this.clipShapeVertexList[0].y);
    for (var i = 1; i < 3; i++){
        this.ctx.lineTo(this.clipShapeVertexList[i].x, this.clipShapeVertexList[i].y);
    }
    this.ctx.closePath();

}

/************
CANVAS
************/
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
    this.setInitialPosition();
    this.setVelocity();
}


Shape.prototype.setInitialPosition = function() {
    this.center = new Point(Math.random() * this.w - this.w / 2, Math.random() * this.h - this.h / 2 );
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
scene.draw();


window.setTimeout(function() {
    document.querySelector('main').classList.remove('invisible');
    scene.updateMousePos();
    scene.updateMotion();
}, 600);
