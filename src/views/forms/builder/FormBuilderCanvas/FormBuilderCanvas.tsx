import React, { useState, useEffect } from "react";
import { useDrag } from "react-dnd";
import { FormElementContainerType, FormElementType } from "../../../../types";
import { FormElement, FormElementsList } from "../../elements";
import { DropArea } from "../../elements/Components/DropArea";

const data = require("../../../../InitialData.json");

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

  const handleAddFormElement = ({
    newElement,
    prevId,
  }: {
    newElement: FormElementType;
    prevId?: string;
  }) => {
    setFormElements((prevFormElements) => {
      let prevElementIndex = prevFormElements.findIndex(
        (element) => element.id === prevId
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
      <FormElementsList id={Date.now().toString()} rows={formElements} />
    </div>
  );
};
