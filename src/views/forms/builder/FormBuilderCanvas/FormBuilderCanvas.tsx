import React, { useState } from "react";
import { useDrag } from "react-dnd";
import {
  FormElementContainerType,
  FormElementType,
} from "../../../../redux/slices/formBuilder";
import {
  FormCheckboxElement,
  FormContainerElement,
  FormShortAnswerElement,
} from "../../elements";

import { DropArea } from "../../elements/Components/DropArea";

type Props = {
  id?: string;
};

export const FormBuilderCanvas: React.FC<Props> = ({ id }) => {
  console.log("rendering canvas");
  const [formElements, setFormElements] = useState<
    (FormElementType | FormElementContainerType)[]
  >([
    { ID: "asdf", type: "checkbox", body: "<h1> temp </h1>", color: "red" },
    { ID: "sdfg", type: "shortAnswer", body: "<h1> temp </h1>", color: "red" },
  ]);

  console.log("formElements", formElements);

  const handleAddFormElement = (
    newElement: FormElementType,
    prevElementId?: string
  ) => {
    console.log("newElement added", newElement);
    console.log("prevElement", prevElementId);

    setFormElements((prevFormElements) => {
      console.log(prevFormElements);

      let prevElementIndex = prevFormElements.findIndex(
        (element) => element.ID === prevElementId
      );

      // I want this to be cleaner :(
      return [
        ...prevFormElements.slice(0, prevElementIndex + 1),
        newElement,

        ...prevFormElements.slice(prevElementIndex + 1),
      ];
    });
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "90%",
          height: "calc(100vh - 200px)",
          overflowX: "hidden",
          overflowY: "scroll",
          backgroundColor: "#f0f4f5",
          padding: "10px",
          margin: "10px",
        }}
      >
        FormBuilderCanvas
        <DropArea handleElementDropped={handleAddFormElement} />
        {formElements.map((formDataElement: FormElementType) => {
          const ID = formDataElement.ID;
          if (formDataElement.type === "checkbox") {
            return (
              <div key={formDataElement.ID}>
                <FormCheckboxElement id={ID} />
                <DropArea
                  prevId={ID}
                  handleElementDropped={handleAddFormElement}
                />
              </div>
            );
          } else if (formDataElement.type === "shortAnswer") {
            return (
              <div key={formDataElement.ID}>
                <FormShortAnswerElement />
                <DropArea
                  prevId={ID}
                  handleElementDropped={handleAddFormElement}
                />
              </div>
            );
          } else if (formDataElement.type === "container") {
            return (
              <div key={formDataElement.ID}>
                <FormContainerElement containerId={ID} />
                <DropArea
                  prevId={ID}
                  handleElementDropped={handleAddFormElement}
                />
              </div>
            );
          }
        })}
      </div>
    </>
  );
};
