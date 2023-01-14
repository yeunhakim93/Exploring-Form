import * as React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import Knight from "./Knight";
import BoardSquare from "./BoardSquare";
import { moveKnight, canMoveKnight } from "./Game";

function renderSquare(i, j, [knightX, knightY]) {
  return (
    <div
      key={"" + i + j}
      style={{ width: "12.5%", height: "12.5%" }}
      onClick={() => handleSquareClick(i, j)}
    >
      <BoardSquare x={i} y={j}>
        {knightX === i && knightY === j && <Knight />}
      </BoardSquare>
    </div>
  );
}

function handleSquareClick(toX, toY) {
  if (canMoveKnight(toX, toY)) moveKnight(toX, toY);
}

export default function Board({ knightPosition }) {
  const squares = [];
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      squares.push(renderSquare(i, j, knightPosition));
    }
  }
  return (
    <DndProvider backend={HTML5Backend}>
      <div
        style={{
          width: "500px",
          height: "500px",
          display: "flex",
          flexWrap: "wrap"
        }}
      >
        {squares}
      </div>
    </DndProvider>
  );
}
