import * as React from "react";
import ReactDOM from "react-dom";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import "./index.css";

import { FormBuilderPage } from "./views/forms/builder/FormBuilderPage";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <DndProvider backend={HTML5Backend}>
        <FormBuilderPage />
      </DndProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
