import * as React from "react";
import { useFormBuilder } from "../../../../redux/slices/formBuilder";

type Props = {
  type: "container" | "checkbox" | "shortAnswer";
};

export const AddButton: React.FC<Props> = ({ type }) => {
  const { dispatchAddFormElement } = useFormBuilder();

  const handleAddClicked = () => {
    dispatchAddFormElement({
      id: Date.now().toString(),
      type,
      body: "<h1>Place holder</h1>",
    });
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
