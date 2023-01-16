import * as React from "react";
import { useDrop } from "react-dnd";
import { DroppableItemTypesArr } from "../ItemTypes";
import { useFormBuilder } from "../../../../redux/slices/formBuilder";

type itemType = {
  ID: string;
  type: "container" | "checkbox" | "shortAnswer";
  body: string;
};

export const DropArea = () => {
  const { formData, dispatchAddFormElement } = useFormBuilder();

  const [{ canDrop, isOver }, drop] = useDrop(
    () => ({
      accept: DroppableItemTypesArr,
      canDrop: () => {
        return true;
      },
      drop: (item: itemType, monitor) => {
        dispatchAddFormElement({
          ID: Date.now().toString(),
          type: item.type,
          body: "<h1>Place holder</h1>",
        });
      },
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
      }),
    }),
    [formData]
  );

  // const isActive = canDrop && isOver;

  return (
    <div
      ref={drop}
      style={{
        backgroundColor: "#56d18b",
        width: "100%",
        height: canDrop ? "20px" : "",
      }}
    ></div>
  );
};
