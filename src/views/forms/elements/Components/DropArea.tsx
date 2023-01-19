import * as React from "react";
import { useDrop } from "react-dnd";
import { DroppableItemTypesArr } from "../ItemTypes";
import { useFormBuilder } from "../../../../redux/slices/formBuilder";
import { FormElementType } from "../../../../types";

type itemType = {
  id: string;
  type: "container" | "checkbox" | "shortAnswer";
  body: string;
  listId: string;
  onMoveElement: () => void;
  onReorderElement: (prevId: string | undefined) => void;
};

type DropAreaProps = {
  parent?: string;
  prevId?: string; // this is the id of an element that contains the drop area
  index?: number;
  listId: string;
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
  parent,
  prevId,
  index,
  listId,
  handleElementDropped,
}) => {
  const { dispatchAddFormElement } = useFormBuilder();

  const [{ canDrop, isOver }, drop] = useDrop(
    () => ({
      accept: DroppableItemTypesArr,
      canDrop: () => {
        return true;
      },
      drop: (item: itemType, monitor) => {
        const newElement = {
          id: item.id ? item.id : Date.now().toString(),
          type: item.type,
          body: item.body ? item.body : "<div>New element!</div>",
          ...(item.type === "container" && { columns: [[], [], []] }), // TODO: handle this better for containers
        };

        //item.listId is the listId of the list that item belongs to,
        //listId is the listId of the list that the droparea belongs to
        if (item.listId === listId) {
          // element being moved within a list (i.e., parent is the same)
          // TODO: determine if we want to create new element
          item.onReorderElement(prevId);
        } else {
          // element being moved to another list (i.e., parent is not the same)
          item.onMoveElement && item.onMoveElement();
          handleElementDropped &&
            handleElementDropped({ newElement, prevId, index, parent });
        }

        /*

          prevId: Id of the element directly above 
          the element being inserted. 

          index: location within the array

        */
        // dispatch
        dispatchAddFormElement({
          formElement: newElement,
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
    >
      {listId}
    </div>
  );
};
