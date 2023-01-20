import React, { useState } from "react";
import { FormElement } from ".";
import { useFormBuilder } from "../../../redux/slices/formBuilder/useFormBuilder";
import { FormElementType, FormElementContainerType } from "../../../types";
import { DropArea } from "./Components/DropArea";

type Props = {
  id: string;
  rows: (FormElementType | FormElementContainerType)[];
  parentId: string | undefined; // List belongs to the parent, but doesn't belong in overall data structure
  containerIndex?: number; // this is only used if the FormElementsList belongs in a container
};
export const FormElementsList: React.FC<Props> = ({
  id,
  containerIndex,
  rows,
  parentId,
}) => {
  const { dispatchRemoveFormElement } = useFormBuilder();
  const [elementList, setElementList] =
    useState<(FormElementType | FormElementContainerType)[]>(rows);

  const handleAddElement = ({
    newElement,
    prevId,
    parent,
  }: {
    newElement: FormElementType;
    prevId?: string; // this is the id of element that's directly above the drop zone. if the drop zone is the top drop zone, this is null
    parent?: string;
  }) => {
    if (!prevId) {
      // the drop zone is the top drop zone
      setElementList((prevElementList) => [newElement, ...prevElementList]);
    } else {
      setElementList((prevElementList) => {
        let prevElementIndex = prevElementList.findIndex(
          (element) => element.id === prevId
        );
        return [
          ...prevElementList.slice(0, prevElementIndex + 1),
          newElement,
          ...prevElementList.slice(prevElementIndex + 1),
        ];
      });
    }
  };

  // This function removes an element from a list if the element is "moved" to another list or container.
  const handleElementMoved = (elementIdToRemove: string) => {
    /*

      IF THERE IS AN ID, THIS IS A DELETION

    */
    dispatchRemoveFormElement({ formElementId: elementIdToRemove });
    setElementList((prevElementList) =>
      prevElementList.filter((element) => element.id !== elementIdToRemove)
    );
  };

  const handleMoveElement = (
    elementIdToMove: string,
    prevId: string | undefined
  ) => {
    if (elementIdToMove === prevId) return;

    setElementList((prevElementList) => {
      const from = prevElementList.findIndex(
        (element) => element.id === elementIdToMove
      );
      const to =
        prevId === undefined
          ? 0
          : prevElementList.findIndex((element) => element.id === prevId) + 1;
      if (from === to) return prevElementList;
      if (!prevId) {
        return [
          prevElementList[from],
          ...prevElementList.slice(0, from),
          ...prevElementList.slice(from + 1),
        ];
      } else if (to < from) {
        //going up
        return [
          ...prevElementList.slice(0, to),
          prevElementList[from],
          ...prevElementList.slice(to, from),
          ...prevElementList.slice(from + 1),
        ];
      } else {
        //going down
        return [
          ...prevElementList.slice(0, from),
          ...prevElementList.slice(from + 1, to),
          prevElementList[from],
          ...prevElementList.slice(to),
        ];
      }
    });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <DropArea
        index={containerIndex}
        parent={parentId}
        listId={id}
        handleAddElement={handleAddElement}
        handleMoveElement={handleMoveElement}
      />
      {elementList.length ? (
        elementList.map((elementData, i) => {
          let elementId = elementData.id || Date.now().toString();
          return (
            <div key={elementId}>
              <FormElement
                elementData={{ ...elementData, id: elementId }}
                listId={id}
                handleRemoveElement={handleRemoveElement}
              />
              <DropArea
                prevId={elementId}
                index={containerIndex}
                parent={parentId}
                listId={id}
                handleAddElement={handleAddElement}
                handleMoveElement={handleMoveElement}
              />
            </div>
          );
        })
      ) : (
        <div
          style={{
            backgroundColor: "#f7ede2",
            border: "1px white solid",
            margin: "10px",
            padding: "10px",
            alignItems: "center",
            justifyContent: "space-between",
            borderRadius: "5px",
            textAlign: "center",
          }}
        >
          Add your element here
          <DropArea
            handleAddElement={handleAddElement}
            handleMoveElement={handleMoveElement}
            index={containerIndex}
            parent={parentId}
            listId={id}
          />
        </div>
      )}
    </div>
  );
};
