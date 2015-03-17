angular.module('app').directive("canvasAnimationBallsDirective", function($swipe, $log) {
  return {
    restrict: 'EA',
    transclude: true,
    scope: {
      color: '='
    },
    templateUrl: "/partials/partials/canvasAnimationPartial",
    link: {
      post: function(scope, element, attrs) {

        Array.prototype.randomElement = function () {
          return this[Math.floor(Math.random() * this.length)]
        }

        var touchPosX, touchPosY = 0;

        var canvas = element.find('canvas')[0];
        var context = canvas.getContext('2d');

        var gravity = 4;
        var forceFactor = 0.3;
        var mouseDown = false;
        var balls = new Array();
        var mousePos = new Array();

        var blue = '#3A5BCD';
        var red = '#EF2B36';
        var yellow = '#FFC636';
        var green = '#02A817';

        var colors = [blue, red, yellow, green];

        var colorArrow = green;
        var maxRadius = 15;

        canvas.addEventListener("touchstart", touchDown, true);
        canvas.addEventListener("touchmove", touchXY, true);
        canvas.addEventListener("touchend", touchUp, true);

        window.addEventListener('resize', resizeCanvas, false);
        window.addEventListener('orientationchange', resizeCanvas, false);

        function resizeCanvas() {
          canvas.width = window.innerWidth - window.innerWidth*0.2;
          //canvas.height = window.innerHeight - window.innerWidth*0.4;
          console.log(canvas.width, canvas.height);
        }

        function touchDown(e) {
          mouseDown = true;

          if (!e)
            var e = event;
          e.preventDefault();
          touchPosX = e.targetTouches[0].pageX - canvas.offsetLeft;
          touchPosY = e.targetTouches[0].pageY - canvas.offsetTop;

          mousePos['downX'] = touchPosX;
          mousePos['downY'] = touchPosY;
        }

        function touchUp(event) {
          mouseDown = false;
          balls.push(new ball(mousePos['downX'], mousePos["downY"], (mousePos['currentX'] - mousePos["downX"]) * forceFactor, (mousePos['currentY'] - mousePos["downY"]) * forceFactor, 5 + (Math.random() * maxRadius), 0.9, colors.randomElement()));
        }

        function touchXY(e) {
          if (!e)
            var e = event;
          e.preventDefault();
          touchPosX = e.targetTouches[0].pageX - canvas.offsetLeft;
          touchPosY = e.targetTouches[0].pageY - canvas.offsetTop;

          mousePos['currentX'] = touchPosX;
          mousePos['currentY'] = touchPosY;
        }

        function updatePosDown(event) {
          if (event.offsetX !== undefined) {
            mousePos['downX'] = event.offsetX;
            mousePos['downY'] = event.offsetY;
          } else {
            mousePos['downX'] = event.layerX - event.currentTarget.offsetLeft;
            mousePos['downY'] = event.layerY - event.currentTarget.offsetTop;
          }
        }

        function updateCurrentPosUp(event) {
          if (event.offsetX !== undefined) {
            mousePos['currentX'] = event.offsetX;
            mousePos['currentY'] = event.offsetY;
          } else {
            mousePos['currentX'] = event.layerX - event.currentTarget.offsetLeft;
            mousePos['currentY'] = event.layerY - event.currentTarget.offsetTop;
          }
        }

        scope.onMouseDown = function(event) {
          mouseDown = true;
          updatePosDown(event);
        }

        scope.onMouseUp = function(event) {
          mouseDown = false;
          if (event.offsetX !== undefined) {
            currentX = event.offsetX;
            currentY = event.offsetY;
          } else {
            currentX = event.layerX - event.currentTarget.offsetLeft;
            currentY = event.layerY - event.currentTarget.offsetTop;
          }
          balls.push(new ball(mousePos['downX'], mousePos["downY"], (currentX - mousePos["downX"]) * forceFactor, (currentY - mousePos["downY"]) * forceFactor, 5 + (Math.random() * 10), 0.9, colors.randomElement()));
        }

        scope.onMouseMove = function(event) {
          updateCurrentPosUp(event);
        }

        function arrow(fromx, fromy, tox, toy, c) {
          context.beginPath();
          var headlen = 10;
          var angle = Math.atan2(toy - fromy, tox - fromx);
          context.moveTo(fromx, fromy);
          context.lineTo(tox, toy);
          context.lineTo(tox - headlen * Math.cos(angle - Math.PI / 6), toy - headlen * Math.sin(angle - Math.PI / 6));
          context.moveTo(tox, toy);
          context.lineTo(tox - headlen * Math.cos(angle + Math.PI / 6), toy - headlen * Math.sin(angle + Math.PI / 6));

          //style
          context.lineWidth=4; 
          context.lineCap='butt'; 
          context.strokeStyle = c;
          context.stroke();

        }

        function circle(x, y, r, c) {
          //draw a circle
          context.beginPath();
          context.arc(x, y, r, 0, Math.PI * 2, true);
          context.closePath();
          //fill
          context.fillStyle = c;
          context.fill();

        }

        function draw_ball() {
          this.vy += gravity * 0.1; // v = a * t
          this.x += this.vx * 0.1; // s = v * t
          this.y += this.vy * 0.1;

          if (this.x + this.r > canvas.width) {
            this.x = canvas.width - this.r;
            this.vx *= -1 * this.b;
          }
          if (this.x - this.r < 0) {
            this.x = this.r;
            this.vx *= -1 * this.b;
          }
          if (this.y + this.r > canvas.height) {
            this.y = canvas.height - this.r;
            this.vy *= -1 * this.b;
          }
          if (this.y - this.r < 0) {
            this.y = this.r;
            this.vy *= -1 * this.b;
          }

          circle(this.x, this.y, this.r, this.c);
        }

        function ball(positionX, positionY, velosityX, velosityY, radius, bounciness, color) {
          this.x = positionX;
          this.y = positionY;
          this.vx = velosityX;
          this.vy = velosityY;
          this.r = radius;
          this.b = bounciness;
          this.c = color;
          this.draw = draw_ball;
        }

        function game_loop() {
          context.clearRect(0, 0, canvas.width, canvas.height);

          if (mouseDown == true) {
            arrow(mousePos['downX'], mousePos['downY'], mousePos['currentX'], mousePos['currentY'], colorArrow);
          }
          for (var i = 0; i < balls.length; i++) {
            balls[i].draw();
          }

          context.fillStyle = "#000000";
          context.font = "15px Arial";
          context.fillText("Da click y arrastra", 10, canvas.height - 30);
          context.fillText("Balls: " + balls.length, 10, canvas.height - 10);
        }

        function init() {
          resizeCanvas();
          return setInterval(game_loop, 10);
        }

        init();

      }
    }
  };
});