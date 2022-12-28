import React, { useEffect, useState, useRef } from "react";
import { useInterval } from "./useInterval";

/* Snake Game instructions*/

const CANVAS_SIZE = [500, 500];
const SNAKE_START = [
  [8, 7],
  [8, 8],
];
const FOOD_START = [8, 3];
const SCALE = 20;
let SPEED = 200;
const DIRECTIONS = {
  38: [0, -1], // up
  40: [0, 1], // down
  37: [-1, 0], // left
  39: [1, 0], // right
};

function App() {
  const canvasRef = useRef(null);
  const [snake, setSnake] = useState(SNAKE_START);
  const [food, setFood] = useState(FOOD_START);
  const [dir, setDir] = useState([0, -1]);
  const [speed, setSpeed] = useState(null);
  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(0);

  useInterval(() => gameLoop(), speed);

  const endGame = () => {
    setSpeed(null);
    setIsGameOver(true);
  };

  const moveSnake = ({ keyCode }) => {
    console.log("key", keyCode);
    if (keyCode === 80) {
      /* pause the game */
      setSpeed(null);
    } else if (keyCode === 82) {
      /* resume the game */
      setSpeed(SPEED);
    } else if (keyCode === 187) {
      /* resume the game */
      setSpeed(speed - 40);
    } else if (keyCode === 189) {
      /* resume the game */
      setSpeed(speed + 40);
    } else {
      setDir(DIRECTIONS[keyCode]);
    }
  };

  const createFood = () => {
    return food.map((_a, i) =>
      Math.floor(Math.random() * (CANVAS_SIZE[i] / SCALE))
    );
  };

  const detectCollision = (piece, snk = snake) => {
    if (
      piece[0] * SCALE >= CANVAS_SIZE[0] ||
      piece[0] < 0 ||
      piece[1] * SCALE >= CANVAS_SIZE[1] ||
      piece[1] < 0
    )
      return true;

    for (const segment of snk) {
      if (piece[0] === segment[0] && piece[1] === segment[1]) return true;
    }
    return false;
  };

  const detectFoodCollision = (newSnake) => {
    if (newSnake[0][0] === food[0] && newSnake[0][1] === food[1]) {
      let newFood = createFood();
      while (detectCollision(newFood, newSnake)) {
        newFood = createFood();
      }
      setFood(newFood);
      setScore(score + 1);
      return true;
    }
    return false;
  };

  const gameLoop = () => {
    const snakeCopy = JSON.parse(JSON.stringify(snake));
    const newSnakeHead = [snakeCopy[0][0] + dir[0], snakeCopy[0][1] + dir[1]];
    snakeCopy.unshift(newSnakeHead);
    if (detectCollision(newSnakeHead)) endGame();
    if (!detectFoodCollision(snakeCopy)) snakeCopy.pop();
    setSnake(snakeCopy);
  };

  const startGame = () => {
    setScore(0);
    setSnake(SNAKE_START);
    setFood(FOOD_START);
    setDir([0, -1]);
    setSpeed(SPEED);
    setIsGameOver(false);
  };

  useEffect(() => {
    const context = canvasRef.current.getContext("2d");
    context.setTransform(SCALE, 0, 0, SCALE, 0, 0);
    context.clearRect(0, 0, window.innerWidth, window.innerHeight);
    context.fillStyle = "lightblue";
    snake.forEach(([x, y]) => context.fillRect(x, y, 1, 1));
    context.fillStyle = "red";
    context.fillRect(food[0], food[1], 1, 1);
  }, [snake, food, isGameOver]);

  console.log('speed', speed)
  return (
    <>
      <div
        /* className="game-window" */
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
        role="button"
        tabIndex="0"
        onKeyDown={(e) => moveSnake(e)}
      >
        <div>
          <button onClick={startGame}>Click to Start Game</button>
        </div>
        <canvas
          ref={canvasRef}
          width={`${CANVAS_SIZE[0]}`}
          height={`${CANVAS_SIZE[1]}`}
        />
      </div>
      <div>
        <div>Score: {score}</div>
        {isGameOver && <div>GAME OVER!</div>}
        <div> Press P to pause and R to resume</div>
      </div>
    </>
  );
}

export default App;
