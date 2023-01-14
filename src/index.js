import * as React from "react";
import { createRoot } from "react-dom/client";
import Board from "./Chess/Board";
import { observe } from "./Chess/Game";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

observe((knightPosition) =>
  root.render(<Board knightPosition={knightPosition} />)
);
