import * as React from "react";
import { useDrag } from "react-dnd";

type Props = {
  id: string;
  body: string;
  listId: string;
  handleElementMoved: (id: string) => void;
  handleElementReordered: (id: string, prevId: string) => void;
};

export const FormCheckboxElement: React.FC<Props> = ({
  id,
  body,
  listId,
  handleElementMoved,
  handleElementReordered,
}) => {
  const onMoveElement = () => {
    handleElementMoved(id);
  };
  const onReorderElement = (prevId: string) => {
    handleElementReordered(id, prevId);
  };
  const [, drag] = useDrag(() => ({
    type: "checkboxElement",
    item: {
      type: "checkbox",
      id,
      body,
      listId,
      onMoveElement,
      onReorderElement,
    },
  }));
  return (
    <div
      ref={drag}
      style={{
        margin: "10px",
        backgroundColor: "#f5cac3",
        border: "1px grey solid",
        padding: "10px",
        display: "flex",
        alignItems: "center",
        gap: "10px",
        borderRadius: "5px",
        boxShadow: "3px 5px 10px rgba(0, 0, 0, 0.2)",
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
