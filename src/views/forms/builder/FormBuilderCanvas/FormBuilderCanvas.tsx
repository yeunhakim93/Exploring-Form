import * as React from "react";
import { useDrag } from "react-dnd";
import { FormElementType } from "../../../../redux/slices/formBuilder";
import {
  FormCheckboxElement,
  FormContainerElement,
  FormShortAnswerElement,
} from "../../elements";

import { DropArea } from "../../elements/Components/DropArea";

type Props = {
  formData: any[];
};

const mappingObj = {
  shortAnswer: <FormShortAnswerElement />,
  container: <FormContainerElement />,
  checkbox: <FormCheckboxElement />,
};

export const FormBuilderCanvas: React.FC<Props> = ({ formData }) => {
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
          padding: "10px 10px 30px 10px",
          margin: "10px",
        }}
      >
        FormBuilderCanvas
        {formData.map((formDataElement: FormElementType) => {
          return (
            <div key={formDataElement.ID}>
              {mappingObj[formDataElement.type]}
              {/* <DropArea /> */}
            </div>
          );
        })}
        <DropArea />
      </div>
    </>
  );
};
