import * as React from "react";
type FormContainerElementProps = {
  children?: React.ReactNode[];
};
export const FormContainerElement = ({
  children,
}: FormContainerElementProps) => {
  return (
    <div
      style={{
        backgroundColor: "#f7ede2",
        border: "1px grey solid",
        margin: "10px",
        padding: "10px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      container{children}
    </div>
  );
};
