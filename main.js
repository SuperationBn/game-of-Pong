// llamamps a nuestros elementos (MOSTRAT SCORE Y BTN RESET DEL DOM);
const showResultScore = document.getElementById('showResult');
const resetBtn = document.getElementById('reset');
// -----------------------------------------------------------
// -----------------------------------------------------------
// llamamos a nuetro elemento (CANVAS DEL DOM);
const canvas = document.getElementById('canvasBox');
// transformamos el canvas a 2d;
const ctx = canvas.getContext('2d');
// obtenemos el ancho y alalto de nuestro elemento canvas;
const gameWidth = canvas.width;
const gameHeight = canvas.height;
// -----------------------------------------------------------
// -----------------------------------------------------------
// creamos constantes de estilos;
const boardBackground = '#d4e0ebda';
const paddleUnoColor = '#98e94bda';
const paddleDosColor = '#e94b4bda';
const paddleBorder = '#171515';
const ballBorderColor = '#171515';
const ballColor = '#fbd557da';
// propiedades de la bola;
const ballRadius = 12.5;
const paddleSpeed = 50;
// -----------------------------------------------------------
// -----------------------------------------------------------
// variables de acciones;
let intervalId;
let ballSpeed = 0;
let ballX = gameWidth / 2;
let ballY = gameHeight / 2;
let ballXDirection = 0;
let ballYDirection = 0;
let playerUnoScore = 0;
let playerDosScore = 0;
// -----------------------------------------------------------
// -----------------------------------------------------------
// objetos que contienen las dimenciones de "STYLE" de cada personaje (PADDLE);
let paddle1 = { width: 20, height: 100, x: 0, y: 0 };
let paddle2 = { width: 20, height: 100, x: (gameWidth - 20), y: (gameHeight - 100) };
// -----------------------------------------------------------
// -----------------------------------------------------------
// functiones que contienen la ejecucion y accion del juego;

// (( 2° paso ))
function gameStart() {
  createBall();
  nextTick();
};
gameStart();
// -----------------------------------------------------------
// -----------------------------------------------------------
// (( 3° paso ))
function nextTick() {
  intervalId = setTimeout(() => {
    clearBoard();
    drawPaddle();
    moveBall();
    drawBall(ballX, ballY);
    checkCollition();
    nextTick();
  }, 75);

  return intervalId;
};
// -----------------------------------------------------------
// -----------------------------------------------------------
// (( 4° paso ))
function clearBoard() {
  ctx.fillStyle = boardBackground;
  ctx.fillRect(0, 0, gameWidth, gameHeight)
};
// -----------------------------------------------------------
// -----------------------------------------------------------
// (( 1° paso ))
function drawPaddle() {
  // asignamos el mismo color del borde para ambos (PADDLE);
  ctx.strokeStyle = paddleBorder;
  // creando jugador uno;
  ctx.fillStyle = paddleUnoColor;
  ctx.fillRect(paddle1.x, paddle1.y, paddle1.width, paddle1.height);
  ctx.strokeRect(paddle1.x, paddle1.y, paddle1.width, paddle1.height);
  // creando jugador dos;
  ctx.fillStyle = paddleDosColor;
  ctx.fillRect(paddle2.x, paddle2.y, paddle2.width, paddle2.height);
  ctx.strokeRect(paddle2.x, paddle2.y, paddle2.width, paddle2.height);
};
// -----------------------------------------------------------
// -----------------------------------------------------------
// (( 7° paso ))
function createBall() {
  ballSpeed = 1;

  if (Math.round(Math.random()) === 1) {
    ballXDirection = 1;

  } else {
    ballXDirection = -1;
  }
  if (Math.round(Math.random()) === 1) {
    ballYDirection = 1;

  } else {
    ballYDirection = -1;
  }

  ballX = gameWidth / 2;
  ballY = gameHeight / 2;

  return drawBall(ballX, ballX)
};
// -----------------------------------------------------------
// -----------------------------------------------------------
// (( 8° paso ))
function moveBall() {
  ballX += (ballSpeed * ballXDirection * 5);
  ballY += (ballSpeed * ballYDirection * 5);
};
// -----------------------------------------------------------
// -----------------------------------------------------------
// (( 6° paso ))
function drawBall(x, y) {
  ctx.fillStyle = ballColor;
  ctx.strokeStyle = ballBorderColor;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, 2 * Math.PI);
  ctx.fill();
  ctx.stroke();
};
// -----------------------------------------------------------
// -----------------------------------------------------------
// (( 9° paso ))
function checkCollition() {
  if (ballY <= 0 + ballRadius) {
    ballYDirection *= -1;

  }
  if (ballY >= gameHeight - ballRadius) {
    ballYDirection *= -1;
  }
  if (ballX <= 0) {
    playerDosScore += 1;
    updateScore();
    createBall();
    return;
  }
  if (ballX >= gameWidth) {
    playerUnoScore += 1;
    updateScore();
    createBall();
    return;
  }

  if (ballX <= (paddle1.x + paddle1.width + ballRadius)) {
    if (ballY > paddle1.y && ballY < paddle1.y + paddle1.height) {
      ballX = (paddle1.x + paddle1.width) + ballRadius;
      ballXDirection *= -1;
      ballSpeed += 1;
    }
  }

  if (ballX >= (paddle2.x - ballRadius)) {
    if (ballY > paddle2.y && ballY < paddle2.y + paddle2.height) {
      ballX = (paddle2.x - ballRadius);
      ballXDirection *= -1;
      ballSpeed += 1;
    }
  }
};
// -----------------------------------------------------------
// -----------------------------------------------------------
// (( 5° paso ))
function checkDirection(event) {
  const keyPreseed = event.keyCode;

  const paddle1Up = 87;
  const paddle1Down = 83;
  const paddle2Up = 38;
  const paddle2Down = 40;

  switch (keyPreseed) {
    case (paddle1Up):
      if (paddle1.y > 0) {
        paddle1.y -= paddleSpeed;
      }
      break;
    case (paddle1Down):
      if (paddle1.y < gameHeight - paddle1.height) {
        paddle1.y += paddleSpeed;
      }
      break;
    case (paddle2Up):
      if (paddle2.y > 0) {
        paddle2.y -= paddleSpeed;
      }
      break;
    case (paddle2Down):
      if (paddle2.y < gameHeight - paddle2.height) {
        paddle2.y += paddleSpeed;
      }
      break;
  }
};
// -----------------------------------------------------------
// -----------------------------------------------------------
// (( 10° paso ))
function updateScore() {
  return showResultScore.innerHTML = `${playerUnoScore}  :  ${playerDosScore}`;
};
// -----------------------------------------------------------
// -----------------------------------------------------------
// (( 11° paso ))
function resetGame() {
  playerUnoScore = 0;
  playerDosScore = 0;
  paddle1 = { width: 25, height: 100, x: 0, y: 0 };
  paddle2 = { width: 25, height: 100, x: (gameWidth - 25), y: (gameHeight - 100) };
  ballSpeed = 1;
  ballX = 0;
  ballY = 0;
  ballXDirection = 0;
  ballYDirection = 0;
  updateScore();
  clearTimeout(intervalId);
  gameStart();
};
// -----------------------------------------------------------
// -----------------------------------------------------------

window.addEventListener('keydown', checkDirection);
resetBtn.addEventListener('click', resetGame);