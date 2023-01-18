import React, { useState } from "react";
import { useDrop } from "react-dnd";
import { DropArea } from "../Components/DropArea";
import { DroppableItemTypesArr } from "../ItemTypes";
import { FormElementContainerType, FormElementType } from "../../../../types";
import { FormElement } from "../../elements";

type FormContainerElementProps = {
  id: string;
  children?: any;
};

export const FormContainerElement: React.FC<FormContainerElementProps> = ({
  id,
  children,
}) => {
  const [columnNumber, setColumnNumber] = useState(3); // using 3 columns as default
  const [column, setColumn] = useState<
    (FormElementType | FormElementContainerType | null)[]
  >(new Array(columnNumber).fill(null));

  const handleElementDropped = ({
    newElement,
    prevId,
    index,
    parent,
  }: {
    newElement: FormElementType;
    prevId?: string;
    index?: number;
    parent?: string;
  }) => {
    if (index !== undefined)
      setColumn((column) => [
        ...column.slice(0, index),
        newElement,
        ...column.slice(index + 1),
      ]);
  };

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
      {column.map((columnElement, i) => {
        if (!columnElement) {
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
              Add your element here
              <DropArea
                handleElementDropped={handleElementDropped}
                index={i}
                parent={id}
              />
            </div>
          );
        } else {
          return (
            <div key={columnElement.id}>
              <FormElement type={columnElement.type} id={id} />
            </div>
          );
        }
      })}
    </div>
  );
};
