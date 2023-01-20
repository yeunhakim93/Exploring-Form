import * as React from "react";

type Props = {
  type: "container" | "checkbox" | "shortAnswer";
};

export const EditFormElement: React.FC<Props> = ({ type }) => {
  const handleAddClicked = () => {};

  return (
    <div
      style={{
        position: "absolute",
        bottom: "0",
        height: "10vh",
        fontSize: "20px",
        fontWeight: "bold",
        textAlign: "center",
        lineHeight: "20px",
        cursor: "pointer",
      }}
      onClick={handleAddClicked}
    >
      +
    </div>
  );
};
