import * as React from "react";
import { FormElementType, FormElementContainerType } from "../../../../types";
import {
  FormCheckboxElement,
  FormShortAnswerElement,
  FormContainerElement,
} from "./";

type Props = {
  elementData: {
    id: string;
    type: "container" | "shortAnswer" | "checkbox";
    body: string;
    columns?: (FormElementType | FormElementContainerType)[][];
  };
  index?: number; // only passed in if the element belongs in a container
  listId: string;
  handleElementMoved: (id: string) => void;
};
export const FormElement: React.FC<Props> = ({
  elementData,
  listId,
  handleElementMoved,
}) => {
  const { type, id, body, columns } = elementData;
  if (type === "checkbox") {
    return (
      <FormCheckboxElement
        id={id}
        body={body}
        listId={listId}
        handleElementMoved={handleElementMoved}
      />
    );
  } else if (type === "shortAnswer") {
    return (
      <FormShortAnswerElement
        id={id}
        body={body}
        listId={listId}
        handleElementMoved={handleElementMoved}
      />
    );
  } else if (type === "container") {
    return (
      <FormContainerElement
        id={id}
        body={body}
        columns={columns}
        listId={listId}
        handleElementMoved={handleElementMoved}
      />
    );
  }
  return <></>;
};
