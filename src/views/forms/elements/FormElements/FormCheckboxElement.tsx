import * as React from "react";

type Props = {
  id?: string;
};

export const FormCheckboxElement: React.FC<Props> = () => {
  return (
    <div
      style={{
        margin: "10px",
        backgroundColor: "#f5cac3",
        border: "1px grey solid",
        padding: "10px",
        display: "flex",
        alignItems: "center",
        gap: "10px",
      }}
    >
      checkbox
      <input type="checkbox"></input>
    </div>
  );
};
