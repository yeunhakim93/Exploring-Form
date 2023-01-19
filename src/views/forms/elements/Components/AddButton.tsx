import * as React from "react";

type Props = {
  type: "container" | "checkbox" | "shortAnswer";
};

export const AddButton: React.FC<Props> = ({ type }) => {
  const handleAddClicked = () => {
    // dispatch
  };

  return (
    <div
      style={{
        color: "grey",
        borderRadius: "50%",
        backgroundColor: "white",
        width: "20px",
        height: "20px",
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
