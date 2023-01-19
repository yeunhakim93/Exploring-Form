import React, { useState } from "react";
import { FormElement } from ".";
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
  const [elementList, setElementList] =
    useState<(FormElementType | FormElementContainerType)[]>(rows);

  // This function is used to handle element being dropped (added) to the dropzone in the list.
  // This will NOT handle the elements being moved around within the list.
  const handleElementDropped = ({
    newElement,
    prevId,
    index,
    parent,
  }: {
    newElement: FormElementType;
    prevId?: string; // this is the id of element that's directly above the drop zone. if the drop zone is the top drop zone, this is null
    index?: number; // this is only used if the FormElementsList belongs in a container
    parent?: string;
  }) => {
    if (!prevId) {
      // the drop zone is the top drop zone
      setElementList((elementList) => [newElement, ...elementList]);
    } else {
      let indexToInsert =
        elementList.findIndex((element) => element.id === prevId) + 1;
      setElementList((elementList) => [
        ...elementList.slice(0, indexToInsert),
        newElement,
        ...elementList.slice(indexToInsert),
      ]);
    }
  };

  // This function removes an element from a list if the element is "moved" to another list.
  const handleElementMoved = (elementIdToRemove: string) => {
    setElementList((prevElementList) =>
      prevElementList.filter((element) => element.id !== elementIdToRemove)
    );
  };
  console.log("CONTAINER INDEX: ", containerIndex);
  // This function handles the element being moved within the list
  const handleElementReorder = (elementIdToRemove: string) => {
    setElementList((prevElementList) =>
      prevElementList.filter((element) => element.id !== elementIdToRemove)
    );
  };

  return elementList.length > 0 ? (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <DropArea
        handleElementDropped={handleElementDropped}
        index={containerIndex}
        parent={parentId}
      />
      {elementList.map((elementData, i) => {
        let id = elementData.id || Date.now().toString();
        return (
          <div key={id}>
            <FormElement
              elementData={{ ...elementData, id }}
              handleElementMoved={handleElementMoved}
            />
            <DropArea
              prevId={id}
              handleElementDropped={handleElementDropped}
              index={containerIndex}
              parent={parentId}
            />
          </div>
        );
      })}
    </div>
  ) : (
    <div
      style={{
        backgroundColor: "#f7ede2",
        border: "1px white solid",
        margin: "10px",
        padding: "10px",
        alignItems: "center",
        justifyContent: "space-between",
        width: "30%",
        borderRadius: "5px",
        textAlign: "center",
      }}
    >
      Add your element here
      <DropArea
        handleElementDropped={handleElementDropped}
        index={containerIndex}
        parent={id}
      />
    </div>
  );
};
