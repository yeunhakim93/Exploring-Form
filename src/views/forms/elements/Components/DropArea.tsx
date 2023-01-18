import * as React from "react";
import { useDrop } from "react-dnd";
import { DroppableItemTypesArr } from "../ItemTypes";
import { useFormBuilder } from "../../../../redux/slices/formBuilder";
import { FormElementType } from "../../../../redux/slices/formBuilder";

type itemType = {
  ID: string;
  type: "container" | "checkbox" | "shortAnswer";
  body: string;
};

type DropAreaProps = {
  prevId?: string; // this is the id of an element that contains the drop area
  index?: number;
  handleElementDropped?: (
    newElement: FormElementType,
    prevId?: string,
    index?: number
  ) => void;
};

export const DropArea: React.FC<DropAreaProps> = ({
  handleElementDropped,
  prevId,
  index,
}) => {
  const { formData, dispatchAddFormElement } = useFormBuilder();

  const [{ canDrop, isOver }, drop] = useDrop(
    () => ({
      accept: DroppableItemTypesArr,
      canDrop: () => {
        return true;
      },
      drop: (item: itemType, monitor) => {
        console.log("dropping");
        const temp = {
          ID: Date.now().toString(),
          type: item.type,
          body: "<h1>Place holder</h1>",
        };
        handleElementDropped && handleElementDropped(temp, prevId, index);
        // dispatchAddFormElement({
        //   ID: Date.now().toString(),
        //   type: item.type,
        //   body: "<h1>Place holder</h1>",
        // });
      },
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
      }),
    }),
    []
  );

  const isActive = canDrop && isOver;

  return (
    <div
      ref={drop}
      style={{
        backgroundColor: isActive ? "#56d18b" : "",
        width: "100%",
        height: isActive ? "20px" : "5px",
      }}
    ></div>
  );
};
