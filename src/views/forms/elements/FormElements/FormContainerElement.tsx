import * as React from "react";
import { DropArea } from "../Components/DropArea";
type FormContainerElementDroppableZoneProps = {};

// needs better... and shorter... name...
export const FormContainerElementDroppableZone: React.FC<
  FormContainerElementDroppableZoneProps
> = () => {
  return (
    <div
      style={{
        backgroundColor: "#f7ede2",
        border: "1px grey solid",
        margin: "10px",
        padding: "10px",
        alignItems: "center",
        justifyContent: "space-between",
        width: "30%",
      }}
    >
      Add a component to me!
      <DropArea />
    </div>
  );
};

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
      {children}
      <FormContainerElementDroppableZone />
      <FormContainerElementDroppableZone />
      <FormContainerElementDroppableZone />
    </div>
  );
};
