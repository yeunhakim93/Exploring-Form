import * as React from "react";
import ViewState from "../../state/ViewState";

import { FormBuilderCanvas } from "../FormBuilderCanvas";
import { FormBuilderSidebar } from "../FormBuilderSidebar";

export const FormBuilderPage = () => {
  const [isViewingState, setIsViewingState] = React.useState(false);

  function handleToggleStateView(e: any) {
    e.preventDefault();
    setIsViewingState((prev) => !prev);
  }
  return (
    <>
      {isViewingState && <ViewState />}
      <div style={{ display: "flex" }}>
        <FormBuilderSidebar />
        <FormBuilderCanvas />
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
        onClick={handleToggleStateView}
      >
        View State
      </button>
    </>
  );
};
