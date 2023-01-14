import * as React from "react";
import { ItemTypes } from "./Constants";
import { useDrag } from "react-dnd";

export default function Knight() {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.KNIGHT,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging()
    })
  }));

  return (
    <div
      ref={drag}
      style={{
        background: "blue",
        width: "100%",
        height: "100%",
        opacity: isDragging ? 0.3 : 1,
        cursor: "move"
      }}
      className="knight"
    >
      hi
    </div>
  );
}
