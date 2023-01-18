import * as React from "react";
type Props = {
  id: string;
  body: string;
};
export const FormShortAnswerElement: React.FC<Props> = ({ id, body }) => {
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
      <label htmlFor={id}>Is this a short answer element? id:{id}</label>
      <input name={id} id={id}></input>
    </div>
  );
};
