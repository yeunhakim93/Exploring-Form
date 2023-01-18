import React, { useState } from "react";
import { useDrop } from "react-dnd";
import { DropArea } from "../Components/DropArea";
import { DroppableItemTypesArr } from "../ItemTypes";
import { FormElementContainerType, FormElementType } from "../../../../types";
import { FormElement, FormElementsList } from "../../elements";

type FormContainerElementProps = {
  id: string;
  body: string;
  columns?: any;
};

export const FormContainerElement: React.FC<FormContainerElementProps> = ({
  id,
  columns: propColumns,
}) => {
  // using 3 columns as default - could be changed later
  const [columnsNumber, setColumnsNumber] = useState(3);
  const [columns, setColumns] =
    useState<(FormElementType | FormElementContainerType)[][]>(propColumns);

  const handleElementDropped = (
    newElement: FormElementType,
    prevId?: string,
    index?: number
  ) => {
    if (index !== undefined)
      // TODO: will.. format this better
      // this is "replacing"
      setColumns((columns) => [
        ...columns.slice(0, index),
        [newElement],
        ...columns.slice(index + 1),
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
      {columns.map((columnElement, i) => {
        if (!columnElement.length) {
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
              <DropArea handleElementDropped={handleElementDropped} index={i} />
            </div>
          );
        } else {
          return (
            <FormElementsList id={Date.now().toString()} rows={columnElement} />
          );
        }
      })}
    </div>
  );
};
