import React, { useState } from "react";
import { useDrag } from "react-dnd";
import { FormElementContainerType, FormElementType } from "../../../../types";
import { FormElementsList } from "../../elements";
import { EditIcon, TrashIcon } from "../../../../tiptap/Buttons";

type FormContainerElementProps = {
  id: string;
  body: string;
  columns?: any;
  listId: string;
  isTiptapActive: boolean;
  handleRemoveElement: (id: string) => void;
};

export const FormContainerElement: React.FC<FormContainerElementProps> = ({
  id,
  body,
  columns: propColumns,
  listId,
  isTiptapActive,
  handleRemoveElement,
}) => {
  // using 3 columns as default - could be changed later
  const [columnsNumber, setColumnsNumber] = useState(3);
  const [columns, setColumns] = useState<
    (FormElementType | FormElementContainerType)[][]
  >(propColumns || [[], [], []]);

  const onRemoveElement = () => {
    handleRemoveElement(id);
  };

  const [{ isDragging }, drag] = useDrag(() => {
    return {
      type: "containerElement",
      item: { type: "container", id, body, listId, columns, onRemoveElement },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    };
  });
  const opacity = isDragging ? 0.3 : 1;

  return (
    <div
      id={id}
      ref={drag}
      style={{
        backgroundColor: "#f7ede2",
        border: "1px grey solid",
        padding: "10px",
        alignItems: "center",
        justifyContent: "space-between",
        borderRadius: "5px",
        boxShadow: "3px 5px 10px rgba(0, 0, 0, 0.2)",
        position: "relative",
        display: "inlineBlock",
        transform: "translate(0, 0)",
        opacity,
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
          gap: "10px",
        }}
      >
        {columns.map((columnElement, i) => {
          return (
            <FormElementsList
              key={i}
              id={id + i}
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
