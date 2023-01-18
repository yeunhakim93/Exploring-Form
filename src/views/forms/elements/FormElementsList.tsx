import * as React from "react";
import { FormElement } from ".";

type Props = {
  id: string;
  index?: "number";
};
export const FormElementsList: React.FC<Props> = ({ id, index }) => {
  return (
    <></>
    // <div key={formDataElement.id}>
    //   <FormElement type={formDataElement.type} id={id} />
    //   <DropArea prevId={id} handleElementDropped={handleAddFormElement} />
    // </div>
  );
};
