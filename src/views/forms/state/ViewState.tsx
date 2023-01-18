import React, { useState } from "react";
import { useFormBuilder } from "../../../redux/slices/formBuilder/useFormBuilder";
import { unAdjecencify } from "../../../redux/slices/formBuilder";

const ViewState: React.FC = () => {
  const { formData } = useFormBuilder();
  const [isAdjacencyList, setIsAdjacencyList] = useState(true);
  console.log("FORM DATA: ", formData);
  return (
    <div
      style={{
        position: "absolute",
        width: "100vw",
        height: "80vh",
        left: "0px",
        top: "0px",
        background: "black",
        color: "white",
        overflow: "scroll",
      }}
    >
      {isAdjacencyList && <pre>{JSON.stringify(formData, null, 2)}</pre>}
      {!isAdjacencyList && (
        <pre>{JSON.stringify(unAdjecencify(formData), null, 2)}</pre>
      )}
      <button
        onClick={(e) => {
          setIsAdjacencyList((prev) => !prev);
        }}
      >
        Toggle Transform
      </button>
    </div>
  );
};

export default ViewState;
