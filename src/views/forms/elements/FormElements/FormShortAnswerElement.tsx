import * as React from "react";
export const FormShortAnswerElement = () => {
  return (
    <div
      style={{
        backgroundColor: "#84a59d",
        border: "1px grey solid",
        margin: "10px",
        padding: "10px",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
      }}
    >
      <label htmlFor="a123">Is this a short answer element?</label>
      <input name="a123" id="a123"></input>
    </div>
  );
};
