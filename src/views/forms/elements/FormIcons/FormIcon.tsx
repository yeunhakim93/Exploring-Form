import * as React from "react";
import { useDrag } from "react-dnd";
import { AddButton } from "../Components/AddButton";
type Props = {
  type: "container" | "shortAnswer" | "checkbox";
  color?: string;
};
export const FormIcon: React.FC<Props> = ({ type, color }) => {
  const [, drag] = useDrag(() => ({
    type: type + "Icon",
    item: { type },
  }));
  return (
    <div
      ref={drag}
      style={{
        margin: "10px",
        border: "1px grey solid",
        borderRadius: "5px",
        boxShadow: "3px 5px 10px rgba(0, 0, 0, 0.2)",
        padding: "10px",
        textAlign: "center",
        justifyContent: "space-between",
        backgroundColor: color,
        transform: "translate(0, 0)",
      }}
    >
      {type}
      {/* <AddButton type={type} /> */}
    </div>
  );
};
