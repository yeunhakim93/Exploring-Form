import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store";

export type FormElementType = {
  id: string;
  type: "shortAnswer" | "checkbox" | "container";
  body: string;
  color?: string;
  required?: boolean;
};

export type FormElementContainerType = Omit<
  FormElementType,
  "required type"
> & {
  type: "container";
  columns: Array<FormElementType | FormElementContainerType>;
};

export type FormData = {
  brandId: string;
  kind: "contract" | "subcontract" | "proposal" | "questionnaire" | "lead";
  data: Array<FormElementType>;
  // data: Array<FormElementType | FormElementContainerType>;
};

const initialState: FormData = {
  brandId: "formteam",
  kind: "questionnaire",
  data: [],
};

export const formBuilderSlice = createSlice({
  name: "formBuilder",
  initialState,
  reducers: {
    addFormElement(state, action: PayloadAction<FormElementType>) {
      state.data.push(action.payload);
    },
    removeFormElement(state, action: PayloadAction<string>) {
      //find the id and remove
    },
    updateFormElement(state, action: PayloadAction<FormElementType>) {
      //find the id and update
      //needs to accept id & form element
    },
    clearForm(state) {
      return initialState;
    },
    submitForm(state) {
      return initialState;
    },
  },
});

export const selectFormData = (state: RootState) => state.formBuilder.data;

export const {
  addFormElement,
  removeFormElement,
  updateFormElement,
  clearForm,
  submitForm,
} = formBuilderSlice.actions;
