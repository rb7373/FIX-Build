angular.module('app').directive("canvasAnimationBallsDirective", function($swipe) {
  return {
    restrict: 'EA',
    transclude: true,
    scope: {
      color: '='
    },
    templateUrl: "/partials/partials/canvasAnimationPartial",
    link: {
      post: function(scope, element, attrs) {

        var canvas = element.find('canvas')[0];
        var context = canvas.getContext('2d');

        var gravity = 4;
        var forceFactor = 0.3;
        var mouseDown = false;
        var balls = new Array();
        var mousePos = new Array();

        $swipe.bind(element, {
          'start': function(coords, event) {
            startX = coords.x;
            pointX = coords.y;
            console.log('start');
            console.log(coords.x, coords.y);
            printPos(event);
            scope.onMouseDown(event);
          },
          'move': function(coords, event) {
            console.log('move');
            console.log(coords.x, coords.y);
            printPos(event);
            scope.onMouseMove(event);
          },
          'end': function(coords, event) {
            console.log('end');
            console.log(coords.x, coords.y);
            printPos(event);
            scope.onMouseUp(event);
          },
          'cancel': function(coords, event) {
            console.log('cancel');
            //console.log(coords.x, coords.y);
            mousedown = false;
            //printPos(event);
            //scope.onMouseUp(event);
          }
        });

        function updatePosDown(event) {
          if (event.offsetX !== undefined) {
            mousePos['downX'] = event.offsetX;
            mousePos['downY'] = event.offsetY;
          } else {
            mousePos['downX'] = event.layerX - event.currentTarget.offsetLeft;
            mousePos['downY'] = event.layerY - event.currentTarget.offsetTop;
          }
        }

        function printPos(event) {
          if (event.offsetX !== undefined) {
            posX = event.offsetX;
            posY = event.offsetY;
          } else {
            posX = event.layerX - event.currentTarget.offsetLeft;
            posY = event.layerY - event.currentTarget.offsetTop;
          }
          console.log("pos event");
          console.log(posX, posY);
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
          console.log("--onMouseMove--");
          mouseDown = true;
          updatePosDown(event);
        }

        scope.onMouseUp = function(event) {
          console.log("--onMouseUp--");
          mouseDown = false;
          if (event.offsetX !== undefined) {
            currentX = event.offsetX;
            currentY = event.offsetY;
          } else {
            currentX = event.layerX - event.currentTarget.offsetLeft;
            currentY = event.layerY - event.currentTarget.offsetTop;
          }
          balls.push(new ball(mousePos['downX'], mousePos["downY"], (currentX - mousePos["downX"]) * forceFactor, (currentY - mousePos["downY"]) * forceFactor, 5 + (Math.random() * 10), 0.9, random_color()));
        }

        scope.onMouseMove = function(event) {
          console.log("--onMouseMove--");
          updateCurrentPosUp(event);
        }

        function arrow(fromx, fromy, tox, toy, c) {

          console.log(fromx, fromy, tox, toy, c);
          context.beginPath();
          var headlen = 10;
          var angle = Math.atan2(toy - fromy, tox - fromx);
          context.moveTo(fromx, fromy);
          context.lineTo(tox, toy);
          context.lineTo(tox - headlen * Math.cos(angle - Math.PI / 6), toy - headlen * Math.sin(angle - Math.PI / 6));
          context.moveTo(tox, toy);
          context.lineTo(tox - headlen * Math.cos(angle + Math.PI / 6), toy - headlen * Math.sin(angle + Math.PI / 6));

          //style
          context.lineWith = 4;
          context.strokeStyle = c;
          context.lineCap = "butt";
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
          //stroke
          context.lineWidth = r * 0.1;
          context.strokeStyle = "#000000";
          context.stroke();
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

        function random_color() {
          var letter = "0123456789ABCDEF".split("");
          var color = "#";
          for (var i = 0; i < 6; i++) {
            color += letter[Math.round(Math.random() * 15)];
          }
          return color;
        }

        function game_loop() {
          context.clearRect(0, 0, canvas.width, canvas.height);

          if (mouseDown == true) {
            console.log("dibujar flecha");
            arrow(mousePos['downX'], mousePos['downY'], mousePos['currentX'], mousePos['currentY'], "red");
          }
          for (var i = 0; i < balls.length; i++) {
            balls[i].draw();
          }

          context.fillStyle = "#000000";
          context.font = "15px Arial";
          context.fillText("Balls: " + balls.length, 10, canvas.height - 10);
        }

        function init() {
          canvas.height = 400;
          canvas.width = 400;
          return setInterval(game_loop, 10);
        }

        init();

      }
    }
  };
});


/*element.bind('mousedown', function(event) {
  mouseDown = true;
  if (event.offsetX !== undefined) {
    mousePos['downX'] = event.offsetX;
    mousePos['downY'] = event.offsetY;
  } else {
    mousePos['downX'] = event.layerX - event.currentTarget.offsetLeft;
    mousePos['downY'] = event.layerY - event.currentTarget.offsetTop;
  }

  console.log('---');
  console.log(mousePos['downX']);
  console.log(mousePos['downY']);

});

element.bind('mouseup', function(event) {
  mouseDown = false;
  if(event.offsetX!==undefined){
    currentX = event.offsetX;
    currentY = event.offsetY;
  } else {
    currentX = event.layerX - event.currentTarget.offsetLeft;
    currentY = event.layerY - event.currentTarget.offsetTop;
  }
  balls.push(new ball(mousePos['downX'], mousePos["downY"], (currentX - mousePos["downX"]) * forceFactor, (currentY - mousePos["downY"]) * forceFactor, 5 + (Math.random() * 10), 0.9, random_color()));
});

element.bind('mouseup', function(event) {
  mouseDown = false;
  if(event.offsetX!==undefined){
    currentX = event.offsetX;
    currentY = event.offsetY;
  } else {
    currentX = event.layerX - event.currentTarget.offsetLeft;
    currentY = event.layerY - event.currentTarget.offsetTop;
  }
  balls.push(new ball(mousePos['downX'], mousePos["downY"], (currentX - mousePos["downX"]) * forceFactor, (currentY - mousePos["downY"]) * forceFactor, 5 + (Math.random() * 10), 0.9, random_color()));
});*/