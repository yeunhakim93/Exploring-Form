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
    } else if (index !== undefined) {
      // FormElementsList belongs in a container
      setElementList((elementList) => [
        ...elementList.slice(0, index + 1),
        newElement,
        ...elementList.slice(index + 1),
      ]);
    } else {
      // FormElementsList does not belong in a container
      let prevElementIndex = elementList.findIndex(
        (element) => element.id === prevId
      );
      setElementList((prevElementList) => [
        ...prevElementList.slice(0, prevElementIndex + 1),
        newElement,
        ...prevElementList.slice(prevElementIndex + 1),
      ]);
    }
  };

  // This function removes an element from a list if the element is "moved" to another list or container.
  const handleElementMoved = (elementIdToRemove: string) => {
    setElementList((prevElementList) =>
      prevElementList.filter((element) => element.id !== elementIdToRemove)
    );
  };

  return (
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
  );
};
