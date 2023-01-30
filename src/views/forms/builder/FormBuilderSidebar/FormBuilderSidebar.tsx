import React from "react";
import { FormIcon } from "../../elements/FormIcons";

const elementArr = ["checkbox", "shortAnswer", "container", "text"] as const;
const elementColor = {
  checkbox: "#f5cac3",
  shortAnswer: "#84a59d",
  container: "#f7ede2",
  text: "#eeeeee",
};

type Props = {
  isDesktop: boolean;
};
export const FormBuilderSidebar: React.FC<Props> = ({ isDesktop }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: isDesktop ? "10%" : "90%",
        minWidth: "180px",
        backgroundColor: "#e9f0ec",
        padding: "10px",
        margin: "10px",
      }}
    >
      <div>FormBuilderSidebar</div>
      {elementArr.map((type) => (
        <FormIcon key={type} type={type} color={elementColor[type]} />
      ))}
    </div>
  );
};
