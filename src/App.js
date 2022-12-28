import React, { useEffect, useState, useRef } from "react";

/* Snake Game instructions*/

const CANVAS_SIZE = [800, 800];
const SNAKE_START = [
  [8, 7],
  [8, 8],
];
const APPLE_START = [8, 3];
const SCALE = 40;
const SPEED = 500;
const DIRECTIONS = {
  38: [0, -1], // up
  40: [0, 1], // down
  37: [-1, 0], // left
  39: [1, 0], // right
};

function App() {
  const [score, setScore] = useState(0);
  const [speed, setspeed] = useState(null);
  const canvasRef = useRef(null);

  return (
    <div className="root">
      <header>snake game</header>
      <div className="game-window">
        <canvas
          ref={canvasRef}
          width={`${CANVAS_SIZE[0]}`}
          height={`${CANVAS_SIZE[1]}`}
        />
      </div>
      <div>
        <div>Controls:</div> <div>Score: {score}</div>
      </div>
    </div>
  );
}

export default App;
