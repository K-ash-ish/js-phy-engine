const canvas = <HTMLCanvasElement>document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let x: number = 50,
  y: number = 50;

let LEFT: boolean, RIGHT: boolean, UP: boolean, DOWN: boolean;
const BALLS: Ball[] = [];

if (!ctx) {
  console.log("Canvas not available");
}

class Ball {
  x: number;
  y: number;
  r: number;
  player: boolean;
  constructor(x: number, y: number, r: number) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.player = false;
    BALLS.push(this);
  }
  drawBall() {
    if (!ctx) {
      return;
    }
    ctx?.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.stroke();
    ctx.strokeStyle = "black";
  }
}
function moveBall(ball: Ball) {
  canvas.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") {
      LEFT = true;
    }
    if (e.key === "ArrowRight") {
      RIGHT = true;
    }
    if (e.key === "ArrowUp") {
      UP = true;
    }
    if (e.key === "ArrowDown") {
      DOWN = true;
    }
  });
  canvas.addEventListener("keyup", function (e) {
    if (e.key === "ArrowLeft") {
      LEFT = false;
    }
    if (e.key === "ArrowRight") {
      RIGHT = false;
    }
    if (e.key === "ArrowUp") {
      UP = false;
    }
    if (e.key === "ArrowDown") {
      DOWN = false;
    }
  });
  if (LEFT) {
    ball.x--;
  }
  if (RIGHT) {
    ball.x++;
  }
  if (UP) {
    ball.y--;
  }
  if (DOWN) {
    ball.y++;
  }
}

const Ball1 = new Ball(200, 200, 30);
const Ball2 = new Ball(100, 100, 30);
Ball1.player = true;
Ball2.player = true;

function mainLoop() {
  ctx?.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
  BALLS.forEach((ball) => {
    ball.drawBall();
    if (ball.player) {
      moveBall(ball);
    }
  });
  requestAnimationFrame(mainLoop);
}

requestAnimationFrame(mainLoop);
