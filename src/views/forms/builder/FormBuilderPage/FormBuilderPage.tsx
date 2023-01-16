import * as React from "react";
import { useFormBuilder } from "../../../../redux/slices/formBuilder";

import { FormBuilderCanvas } from "../FormBuilderCanvas";
import { FormBuilderSidebar } from "../FormBuilderSidebar";

export const FormBuilderPage = () => {
  const { dispatchClearForm, formData } = useFormBuilder();
  return (
    <>
      <div style={{ display: "flex" }}>
        <FormBuilderSidebar />
        <FormBuilderCanvas formData={formData} />
      </div>

      <button
        style={{
          margin: "10px",
          border: "none",
          padding: "10px",
          float: "right",
          borderRadius: "10px",
          fontSize: "15px",
        }}
        onClick={dispatchClearForm}
      >
        clear
      </button>
    </>
  );
};
