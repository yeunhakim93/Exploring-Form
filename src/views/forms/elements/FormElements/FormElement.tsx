import * as React from "react";
import {
  FormCheckboxElement,
  FormShortAnswerElement,
  FormContainerElement,
} from "./";

type Props = {
  type: "container" | "shortAnswer" | "checkbox";
  body?: "string";
  id: string;
  index?: "number";
};
export const FormElement: React.FC<Props> = ({ type, id, body }) => {
  if (type === "checkbox") {
    return (
      <div key={id}>
        <FormCheckboxElement id={id}>{body}</FormCheckboxElement>
      </div>
    );
  } else if (type === "shortAnswer") {
    return (
      <div key={id}>
        <FormShortAnswerElement id={id}>{body}</FormShortAnswerElement>
      </div>
    );
  } else if (type === "container") {
    return (
      <div key={id}>
        <FormContainerElement id={id}>{body}</FormContainerElement>
      </div>
    );
  }
  return <></>;
};
