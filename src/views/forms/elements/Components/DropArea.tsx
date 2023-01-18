import * as React from "react";
import { useDrop } from "react-dnd";
import { DroppableItemTypesArr } from "../ItemTypes";
import { useFormBuilder } from "../../../../redux/slices/formBuilder";
import { FormElementType } from "../../../../types";

type itemType = {
  id: string;
  type: "container" | "checkbox" | "shortAnswer";
  body: string;
};

type DropAreaProps = {
  parent?: string;
  prevId?: string; // this is the id of an element that contains the drop area
  index?: number;
  handleElementDropped: ({
    newElement,
    prevId,
    index,
    parent,
  }: {
    newElement: FormElementType;
    prevId?: string;
    index?: number;
    parent?: string;
  }) => void;
};

export const DropArea: React.FC<DropAreaProps> = ({
  handleElementDropped,
  prevId,
  index,
  parent,
}) => {
  const { dispatchAddFormElement } = useFormBuilder();

  const [{ canDrop, isOver }, drop] = useDrop(
    () => ({
      accept: DroppableItemTypesArr,
      canDrop: () => {
        return true;
      },
      drop: (item: itemType, monitor) => {
        const temp = {
          id: Date.now().toString(),
          type: item.type,
          body: "<h1>Place holder</h1>",
          ...(item.type === "container" && { columns: [[], [], []] }), // TODO: handle this better for containers
        };
        handleElementDropped &&
          handleElementDropped({ newElement: temp, prevId, index, parent });
        /*

          prevId: Id of the element directly above 
          the element being inserted. 

          index: location within the array

        */
        // dispatch
        dispatchAddFormElement({
          formElement: temp,
          parentId: parent,
          index,
          prevId,
        });
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
