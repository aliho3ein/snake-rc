const game = document.getElementById("gameCanvas");
let score = document.querySelector(".score");

const ctx = game.getContext("2d");

game.addEventListener("click", start);

function start() {
  score.textContent = "00";
  let wid = game.width;
  let hei = game.height;
  let sideX = 10,
    sideY = 0;

  /*------------------------ First Snake ------------------------*/
  let snake = [
    { x: wid / 2 + 10, y: hei / 2 },
    { x: wid / 2, y: hei / 2 },
    { x: wid / 2 - 10, y: hei / 2 },
    { x: wid / 2 - 20, y: hei / 2 },
    { x: wid / 2 - 30, y: hei / 2 },
    { x: wid / 2 - 40, y: hei / 2 },
  ];

  /*------------------------ Control Key ------------------------*/
  window.addEventListener("keydown", (key) => {
    switch (key.keyCode) {
      case 40:
        if (sideY != -10) {
          sideX = 0;
          sideY = 10;
        } else sideY = -10;
        break;

      case 37:
        if (sideX != 10) {
          sideX = -10;
          sideY = 0;
        } else sideX = 10;
        break;

      case 39:
        if (sideX != -10) {
          sideX = 10;
          sideY = 0;
        } else sideX = -10;
        break;

      case 38:
        if (sideY != 10) {
          sideX = 0;
          sideY = -10;
        } else sideY = 10;
        break;
    }
  });

  /*------------------------ Base Place  ------------------------*/
  let ClearCanvas = () => {
    ctx.fillStyle = "#dff9fb";
    ctx.fillRect(0, 0, wid, hei);
  };

  /*------------------------    Food     ------------------------*/
  let foodX, foodY;

  /*Get Random Number*/
  function getRandom(min, max) {
    return Math.trunc((Math.random() * (max - min) + min) / 10) * 10;
  }

  CreateFood = () => {
    foodX = getRandom(0, wid - 10);
    foodY = getRandom(0, hei - 10);
    snake.forEach((element) => {
      if (foodX == element.x && foodY == element.y) CreateFood();
    });
  };

  let drawFood = () => {
    ctx.fillStyle = "#c0392b";
    ctx.strokeStyle = "#ff7979";
    ctx.fillRect(foodX, foodY, 10, 10);
    ctx.strokeRect(foodX, foodY, 10, 10);
  };

  /*----------------------- Movement Part ----------------------*/
  function main() {
    //GameOver
    if (GameOver())
      setTimeout(() => {
        ClearCanvas();
        drawFood();
        advanceSnake();
        drawSnake();
        main();
      }, 100);
    else {
      score.textContent = "Game Over";
      console.warn("GameOver");
      return;
    }
  }

  /* Snake's Head */
  let head;
  let advanceSnake = () => {
    head = { x: snake[0].x + sideX, y: snake[0].y + sideY };
    snake.unshift(head);
    if (head.x == foodX && head.y == foodY) {
      CreateFood();
      score.textContent = parseInt(score.textContent) + 10;
    } else snake.pop();
  };

  let drawSnake = () =>
    snake.forEach((e) => {
      ctx.fillStyle = "#6ab04c";
      ctx.strokeStyle = "#badc58";
      ctx.fillRect(e.x, e.y, 10, 10);
      ctx.strokeRect(e.x, e.y, 10, 10);
    });

  /*------------------------  GameOver  ------------------------*/
  function GameOver() {
    if (
      snake[0].x >= wid ||
      snake[0].x < 0 ||
      snake[0].y < 0 ||
      snake[0].y >= hei
    ) {
      return false;
    } else {
      for (let i = 1; i < snake.length; i++) {
        if (snake[i].x == snake[0].x && snake[i].y == snake[0].y) return false;
      }
      return true;
    }
  }

  CreateFood();
  main();
}
