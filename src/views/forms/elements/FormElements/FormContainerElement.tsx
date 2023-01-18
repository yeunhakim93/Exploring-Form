import React, { useState } from "react";
import { useDrop } from "react-dnd";
import { DropArea } from "../Components/DropArea";
import { DroppableItemTypesArr } from "../ItemTypes";
import {
  FormElementContainerType,
  FormElementType,
} from "../../../../redux/slices/formBuilder";
import { FormCheckboxElement, FormShortAnswerElement } from "../../elements";

// needs better... and shorter... name...
export const FormContainerElementPlaceHolder: React.FC = () => {
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
      Add a component here!
    </div>
  );
};

type FormContainerElementProps = {
  containerId: string;
};

export const FormContainerElement = ({
  containerId,
}: FormContainerElementProps) => {
  const [columnNumber, setColumnNumber] = useState(3); // using 3 columns as default
  const [column, setColumn] = useState<
    (FormElementType | FormElementContainerType | null)[]
  >(new Array(columnNumber).fill(null));

  const handleElementDropped = (
    newElement: FormElementType,
    prevId?: string,
    index?: number
  ) => {
    console.log("hey something is droppped here", index);
    console.log("newElement", newElement);

    setColumn((column) => [
      ...column.slice(0, index),
      newElement,
      ...column.slice(index),
    ]);
  };

  const columns: React.ReactNode[] = [];
  for (let i = 0; i < columnNumber; i++) {
    if (column[i]) {
      let columnElement;
      const ID = Date.now().toString();
      if (column[i]?.type === "checkbox") {
        columnElement = (
          <div key={column[i]?.ID}>
            <FormCheckboxElement id={ID} />
            {/* <DropArea prevId={ID} handleElementDropped={handleAddFormElement} /> */}
          </div>
        );
      } else if (column[i]?.type === "shortAnswer") {
        columnElement = (
          <div key={column[i]?.ID}>
            <FormShortAnswerElement />
            {/* <DropArea prevId={ID} handleElementDropped={handleAddFormElement} /> */}
          </div>
        );
      } else if (column[i]?.type === "container") {
        columnElement = (
          <div key={column[i]?.ID}>
            <FormContainerElement containerId={ID} />
            {/* <DropArea prevId={ID} handleElementDropped={handleAddFormElement} /> */}
          </div>
        );
      }
      columns.push(columnElement);
    } else
      columns.push(
        <div
          key={i}
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
          Drop it like it's hot
          <DropArea handleElementDropped={handleElementDropped} index={i} />
        </div>
      );
  }

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
      {columns}
    </div>
  );
};
