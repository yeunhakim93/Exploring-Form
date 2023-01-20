import React, { useState } from "react";
import { useDrag } from "react-dnd";
import { FormElementContainerType, FormElementType } from "../../../../types";
import { FormElementsList } from "../../elements";

type FormContainerElementProps = {
  id: string;
  body: string;
  columns?: any;
  listId: string;
  handleRemoveElement: (id: string) => void;
};

export const FormContainerElement: React.FC<FormContainerElementProps> = ({
  id,
  body,
  columns: propColumns,
  listId,
  handleRemoveElement,
}) => {
  // using 3 columns as default - could be changed later
  const [columnsNumber, setColumnsNumber] = useState(3);
  const [columns, setColumns] =
    useState<(FormElementType | FormElementContainerType)[][]>(propColumns);

  const onMoveElement = () => {
    handleRemoveElement(id);
  };

  const [{ isDragging }, drag] = useDrag(() => {
    return {
      type: "containerElement",
      item: { type: "container", id, body, listId, columns, onMoveElement },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    };
  });
  const opacity = isDragging ? 0.3 : 1;

  return (
    <div
      ref={drag}
      style={{
        backgroundColor: "#f7ede2",
        border: "1px grey solid",
        margin: "10px",
        padding: "10px",
        alignItems: "center",
        justifyContent: "space-between",
        borderRadius: "5px",
        boxShadow: "3px 5px 10px rgba(0, 0, 0, 0.2)",
        position: "relative",
        opacity,
      }}
    >
      <button
        style={{
          position: "absolute",
          right: "10px",
          top: "10px",
          border: "1px grey solid",
          borderRadius: "5px",
        }}
        onClick={onMoveElement}
      >
        x
      </button>
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
