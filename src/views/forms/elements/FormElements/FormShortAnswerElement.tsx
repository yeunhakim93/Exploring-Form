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
      <div
        dangerouslySetInnerHTML={{
          __html: body + " <small>id:" + id + "</small>",
        }}
      ></div>
      <input name={id} id={id}></input>
    </div>
  );
};
