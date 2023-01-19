import React, { useState } from "react";
import { useFormBuilder } from "../../../redux/slices/formBuilder/useFormBuilder";
import { unAdjecencify } from "../../../redux/slices/formBuilder";

const ViewState: React.FC = () => {
  const { formData } = useFormBuilder();
  const [isAdjacencyList, setIsAdjacencyList] = useState(true);
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
        overflow: "hidden",
      }}
    >
      <button
        onClick={(e) => {
          setIsAdjacencyList((prev) => !prev);
        }}
      >
        Toggle Transform
      </button>
      {isAdjacencyList && (
        <pre
          style={{
            overflow: "scroll",
            height: "90%",
            width: "100%",
            margin: "15px",
          }}
        >
          {JSON.stringify(formData, null, 2)}
        </pre>
      )}
      {!isAdjacencyList && (
        <pre
          style={{
            overflow: "scroll",
            height: "90%",
            width: "100%",
            margin: "15px",
          }}
        >
          {JSON.stringify(unAdjecencify(formData), null, 2)}
        </pre>
      )}
    </div>
  );
};

export default ViewState;
