import * as React from "react";
import { useDrag } from "react-dnd";
import { AddButton } from "../shared-components/AddButton";
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
        padding: "10px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: color,
      }}
    >
      {type}
      <AddButton type={type} />
    </div>
  );
};
