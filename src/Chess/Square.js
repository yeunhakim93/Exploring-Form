import * as React from "react";

export default function Sqaure({ color, children }) {
  return (
    <div
      className="square"
      style={{ background: color, width: "100%", height: "100%" }}
    >
      {children}
    </div>
  );
}
