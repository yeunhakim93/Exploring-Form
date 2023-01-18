import * as React from "react";

type Props = {
  id: string;
  body: string;
};

export const FormCheckboxElement: React.FC<Props> = ({ id, body }) => {
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
      <div
        dangerouslySetInnerHTML={{
          __html: body + " <small>id:" + id + "</small>",
        }}
      ></div>
      <input type="checkbox"></input>
    </div>
  );
};
