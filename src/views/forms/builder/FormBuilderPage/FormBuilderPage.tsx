import React, { useState, useEffect } from "react";
import ViewState from "../../state/ViewState";

import { FormBuilderCanvas } from "../FormBuilderCanvas";
import { FormBuilderSidebar } from "../FormBuilderSidebar";

export const FormBuilderPage = () => {
  const [isViewingState, setIsViewingState] = React.useState(false);
  const [isDesktop, setIsDesktop] = useState(
    window.matchMedia("(min-width: 768px)").matches
  );

  useEffect(() => {
    window
      .matchMedia("(min-width: 768px)")
      .addEventListener("change", (e) => setIsDesktop(e.matches));
  }, []);

  function handleToggleStateView(e: any) {
    e.preventDefault();
    setIsViewingState((prev) => !prev);
  }

  return (
    <>
      {isViewingState && <ViewState />}
      <div
        style={{
          display: isDesktop ? "flex" : "inline",
          height: "calc(100vh - 80px)",
        }}
      >
        <FormBuilderSidebar isDesktop={isDesktop} />
        <FormBuilderCanvas />
      </div>

      <button
        style={{
          margin: "10px",
          border: "none",
          padding: "10px",
          float: "right",
          borderRadius: "10px",
          fontSize: isDesktop ? "15px" : "12px",
          zIndex: "1000",
        }}
        onClick={handleToggleStateView}
      >
        View State
      </button>
    </>
  );
};
