import React, { useState } from "react";
import { FormElementContainerType, FormElementType } from "../../../../types";
import { FormElementsList } from "../../elements";

const data = require("../../../../InitialData.json");

type Props = {
  id?: string;
};

export const FormBuilderCanvas: React.FC<Props> = ({ id }) => {
  const [formElements, setFormElements] =
    useState<(FormElementType | FormElementContainerType)[]>(data);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "90%",
        height: "calc(100vh - 200px)",
        overflow: "auto",
        backgroundColor: "#f0f4f5",
        padding: "10px",
        margin: "10px",
      }}
    >
      FormBuilderCanvas
      <FormElementsList
        id={Date.now().toString()}
        rows={formElements}
        parentId={id}
      />
    </div>
  );
};
