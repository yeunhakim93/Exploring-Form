import * as React from "react";
import { useDrop } from "react-dnd";
import { moveKnight, canMoveKnight } from "./Game";
import Square from "./Square";
import { ItemTypes } from "./Constants";

export default function BoardSqaure({ x, y, children }) {
  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: ItemTypes.KNIGHT,
      drop: () => moveKnight(x, y),
      collect: (monitor) => ({
        isOver: !!monitor.isOver()
      })
    }),
    [x, y]
  );
  return (
    <div
      ref={drop}
      style={{
        position: "relative",
        width: "100%",
        height: "100%"
      }}
    >
      <Square color={(x + y) % 2 === 1 ? "#73C6B6" : "#EAFAF1"}>
        {children}
      </Square>
      {isOver && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            height: "100%",
            width: "100%",
            zIndex: 1,
            opacity: 0.5,
            backgroundColor: "yellow"
          }}
        />
      )}
    </div>
  );
}
