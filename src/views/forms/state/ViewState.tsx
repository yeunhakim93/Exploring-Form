import React, { useState } from "react";
import { useFormBuilder } from "../../../redux/slices/formBuilder/useFormBuilder";
import { unAdjacencify } from "../../../redux/slices/formBuilder";

const ViewState: React.FC = () => {
  const { formData } = useFormBuilder();
  const [isAdjacencyList, setIsAdjacencyList] = useState(true);
  return (
    <div
      style={{
        position: "absolute",
        width: "100vw",
        height: "90vh",
        left: "0px",
        top: "0px",
        background: "black",
        color: "white",
        overflow: "hidden",
        zIndex: "100",
      }}
    >
      <button
        onClick={(e) => {
          setIsAdjacencyList((prev) => !prev);
        }}
        style={{
          margin: "10px",
          border: "none",
          padding: "10px",
          borderRadius: "10px",
          zIndex: "10000",
          backgroundColor: "#676767",
          cursor: "pointer",
        }}
      >
        Toggle Transform
      </button>
      {isAdjacencyList && (
        <pre
          style={{
            overflow: "auto",
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
            overflow: "auto",
            width: "100%",
            margin: "15px",
          }}
        >
          {JSON.stringify(unAdjacencify(formData), null, 2)}
        </pre>
      )}
    </div>
  );
};

export default ViewState;
