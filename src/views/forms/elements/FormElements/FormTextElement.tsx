import React, { useState } from "react";
import { useDrag } from "react-dnd";
import { Tiptap } from "../../../../tiptap/Tiptap";

type Props = {
  id: string;
  body: string;
  listId: string;
  isTiptapActive: boolean;
  handleTiptapDeactivate: (e: React.FocusEvent<HTMLDivElement>) => void;
  handleRemoveElement: (id: string) => void;
};

export const FormTextElement: React.FC<Props> = ({
  id,
  body,
  listId,
  isTiptapActive,
  handleTiptapDeactivate,
  handleRemoveElement,
}) => {
  const [elementBody, setElementBody] = useState(body);

  const handleSetElementBody = (newBody: string) => {
    setElementBody(newBody);
  };
  const onRemoveElement = () => {
    handleRemoveElement(id);
  };
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: "textElement",
      item: { type: "text", id, body: elementBody, listId, onRemoveElement },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [elementBody]
  );
  const opacity = isDragging ? 0.3 : 1;
  return (
    <div
      id={"element" + id}
      ref={drag}
      style={{
        backgroundColor: "#ffffff",
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
      <Tiptap
        content={elementBody}
        id={id}
        isActive={isTiptapActive}
        handleSetElementBody={handleSetElementBody}
        handleTiptapDeactivate={handleTiptapDeactivate}
      />
    </div>
  );
};
