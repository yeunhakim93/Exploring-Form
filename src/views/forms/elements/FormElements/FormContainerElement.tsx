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
  handleElementMoved: (id: string) => void;
};

export const FormContainerElement: React.FC<FormContainerElementProps> = ({
  id,
  body,
  columns: propColumns,
  handleElementMoved,
}) => {
  // using 3 columns as default - could be changed later
  const [columnsNumber, setColumnsNumber] = useState(3);
  const [columns, setColumns] =
    useState<(FormElementType | FormElementContainerType)[][]>(propColumns);

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
      // TODO: will.. format this better
      // this is "replacing"
      setColumns((columns) => [
        ...columns.slice(0, index),
        [newElement],
        ...columns.slice(index + 1),
      ]);
  };
  const handleContainerElementMoved = (id: string) => {
    // My brain is fried this is for tomorrow
  };
  const onMoveElement = () => {
    handleElementMoved(id);
    handleContainerElementMoved(id);
  };

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
          if (!columnElement.length) {
            return (
              <div
                key={i}
                style={{
                  backgroundColor: "#f7ede2",
                  border: "1px white solid",
                  margin: "10px",
                  padding: "10px",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "30%",
                  borderRadius: "5px",
                  textAlign: "center",
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
              <FormElementsList
                key={i}
                id={Date.now().toString()}
                rows={columnElement}
                parentId={id}
                containerIndex={i}
              />
            );
          }
        })}
      </div>
    </div>
  );
};
