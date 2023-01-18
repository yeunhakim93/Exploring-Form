import React, { useState } from "react";
import { useDrag } from "react-dnd";
import { FormElementContainerType, FormElementType } from "../../../../types";
import { FormElement } from "../../elements";

import { DropArea } from "../../elements/Components/DropArea";

type Props = {
  id?: string;
};

export const FormBuilderCanvas: React.FC<Props> = ({ id }) => {
  const [formElements, setFormElements] = useState<
    (FormElementType | FormElementContainerType)[]
  >([
    { id: "asdf", type: "checkbox", body: "<h1> temp </h1>", color: "red" },
    { id: "sdfg", type: "shortAnswer", body: "<h1> temp </h1>", color: "red" },
  ]);

  const handleAddFormElement = (
    newElement: FormElementType,
    prevElementId?: string
  ) => {
    setFormElements((prevFormElements) => {
      let prevElementIndex = prevFormElements.findIndex(
        (element) => element.id === prevElementId
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
        const id = formDataElement.id;
        return (
          <div key={formDataElement.id}>
            <FormElement type={formDataElement.type} id={id} />
            <DropArea prevId={id} handleElementDropped={handleAddFormElement} />
          </div>
        );
      })}
    </div>
  );
};
