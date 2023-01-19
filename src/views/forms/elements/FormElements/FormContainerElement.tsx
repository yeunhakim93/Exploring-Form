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
  listId: string;
  handleElementMoved: (id: string) => void;
  handleElementReordered: (id: string, prevId: string) => void;
};

export const FormContainerElement: React.FC<FormContainerElementProps> = ({
  id,
  body,
  listId,
  columns: propColumns,
  handleElementMoved,
  handleElementReordered,
}) => {
  // using 3 columns as default - could be changed later
  const [columnsNumber, setColumnsNumber] = useState(3);
  const [columns, setColumns] =
    useState<(FormElementType | FormElementContainerType)[][]>(propColumns);

  return (
    <div
      style={{
        backgroundColor: "#f7ede2",
        border: "1px grey solid",
        margin: "10px",
        padding: "10px",
        alignItems: "center",
        justifyContent: "space-between",
        borderRadius: "5px",
        boxShadow: "3px 5px 10px rgba(0, 0, 0, 0.2)",
      }}
    >
      <div
        dangerouslySetInnerHTML={{
          __html: body + " <small>id:" + id + "</small>",
        }}
      ></div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {columns.map((columnElement, i) => {
          return (
            <FormElementsList
              key={i}
              id={Date.now().toString()}
              rows={columnElement}
              parentId={id}
              containerIndex={i}
            />
          );
        })}
      </div>
    </div>
  );
};
