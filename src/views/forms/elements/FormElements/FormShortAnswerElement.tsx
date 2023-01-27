import * as React from "react";
import { useDrag } from "react-dnd";
import { Tiptap } from "../Components/Tiptap";
import { EditIcon, TrashIcon } from "../Components/Buttons";

type Props = {
  id: string;
  body: string;
  listId: string;
  isTiptapActive: boolean;
  handleTiptapDeactivate: (e: React.FocusEvent<HTMLDivElement>) => void;
  handleRemoveElement: (id: string) => void;
};

export const FormShortAnswerElement: React.FC<Props> = ({
  id,
  body,
  listId,
  isTiptapActive,
  handleTiptapDeactivate,
  handleRemoveElement,
}) => {
  const onRemoveElement = () => {
    handleRemoveElement(id);
  };
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "shortAnswerElement",
    item: { type: "shortAnswer", id, body, listId, onRemoveElement },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));
  const opacity = isDragging ? 0.3 : 1;
  return (
    <div
      id={"element" + id}
      ref={drag}
      style={{
        backgroundColor: "#84a59d",
        border: "1px grey solid",
        padding: "10px",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        borderRadius: "5px",
        boxShadow: "3px 5px 10px rgba(0, 0, 0, 0.2)",
        position: "relative",
        transform: "translate(0, 0)",
        opacity,
      }}
    >
      <div
        dangerouslySetInnerHTML={{
          __html: body + " <small>id:" + id + "</small>",
        }}
      ></div>
      <input
        name={id}
        id={id}
        style={{
          height: "25px",
          borderRadius: "5px",
          border: "1px solid grey",
        }}
      ></input>
    </div>
  );
};
