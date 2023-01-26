import React, { useState } from "react";
import { FormElementType, FormElementContainerType } from "../../../../types";
import {
  FormCheckboxElement,
  FormShortAnswerElement,
  FormContainerElement,
  FormTextElement,
} from "./";
import { EditIcon, TrashIcon } from "../Components/Buttons";

type Props = {
  elementData: {
    id: string;
    type: "container" | "shortAnswer" | "checkbox" | "text";
    body: string;
    columns?: (FormElementType | FormElementContainerType)[][];
  };
  index?: number; // only passed in if the element belongs in a container
  listId: string;
  handleRemoveElement: (id: string) => void;
};

export const FormElement: React.FC<Props> = ({
  elementData,
  listId,
  handleRemoveElement,
}) => {
  const { type, id, body, columns } = elementData;

  const [isMouseOver, setIsMouseOver] = useState(false);
  const [isTiptapActive, setIsTiptapActive] = useState(false);

  const handleTiptapDeactivate = (event: React.FocusEvent<HTMLDivElement>) => {
    if (!event?.currentTarget.contains(event.relatedTarget) && isTiptapActive) {
      setIsTiptapActive(false);
      // deselect selected text in tiptap
      document?.getSelection()?.removeAllRanges();
    }
    setIsTiptapActive(false);
  };

  let element;
  if (type === "checkbox") {
    element = (
      <FormCheckboxElement
        id={id}
        body={body}
        listId={listId}
        isTiptapActive={isTiptapActive}
        handleTiptapDeactivate={handleTiptapDeactivate}
        handleRemoveElement={handleRemoveElement}
      />
    );
  } else if (type === "shortAnswer") {
    element = (
      <FormShortAnswerElement
        id={id}
        body={body}
        listId={listId}
        isTiptapActive={isTiptapActive}
        handleTiptapDeactivate={handleTiptapDeactivate}
        handleRemoveElement={handleRemoveElement}
      />
    );
  } else if (type === "text") {
    element = (
      <FormTextElement
        id={id}
        body={body}
        listId={listId}
        isTiptapActive={isTiptapActive}
        handleTiptapDeactivate={handleTiptapDeactivate}
        handleRemoveElement={handleRemoveElement}
      />
    );
  } else if (type === "container") {
    return (
      <div
        className="container-element-hover-container"
        onMouseEnter={() => {
          if (!isMouseOver) setIsMouseOver(true);
        }}
        onMouseLeave={() => {
          if (isMouseOver) setIsMouseOver(false);
        }}
      >
        {isMouseOver && <p style={{ margin: "0 5px 5px" }}>Container</p>}
        {isMouseOver && (
          <TrashIcon
            onRemoveElement={() => handleRemoveElement(id)}
            isContainer={true}
          />
        )}
        {isMouseOver && (
          <EditIcon
            activateTiptap={() => setIsTiptapActive(true)}
            isContainer={true}
          />
        )}
        <FormContainerElement
          id={id}
          body={body}
          columns={columns}
          listId={listId}
          isTiptapActive={isTiptapActive}
          handleRemoveElement={handleRemoveElement}
        />
      </div>
    );
  }
  return (
    <div
      className="element-hover-container"
      onMouseEnter={() => {
        if (!isMouseOver) setIsMouseOver(true);
      }}
      onMouseLeave={() => {
        if (isMouseOver) setIsMouseOver(false);
      }}
    >
      {isMouseOver && (
        <TrashIcon
          onRemoveElement={() => handleRemoveElement(id)}
          isContainer={false}
        />
      )}
      {isMouseOver && (
        <EditIcon
          activateTiptap={() => setIsTiptapActive(true)}
          isContainer={false}
        />
      )}
      {element}
    </div>
  );
};
