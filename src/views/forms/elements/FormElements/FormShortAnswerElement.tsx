import * as React from "react";
import { useDrag } from "react-dnd";

type Props = {
  id: string;
  body: string;
  listId: string;
  handleElementMoved: (id: string) => void;
};

export const FormShortAnswerElement: React.FC<Props> = ({
  id,
  body,
  listId,
  handleElementMoved,
}) => {
  const onMoveElement = () => {
    handleElementMoved(id);
  };
  const [, drag] = useDrag(() => ({
    type: "shortAnswerElement",
    item: { type: "shortAnswer", id, body, listId, onMoveElement },
  }));
  return (
    <div
      ref={drag}
      style={{
        backgroundColor: "#84a59d",
        border: "1px grey solid",
        margin: "10px",
        padding: "10px",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        borderRadius: "5px",
        boxShadow: "3px 5px 10px rgba(0, 0, 0, 0.2)",
        position: "relative",
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
      <input name={id} id={id}></input>
    </div>
  );
};
