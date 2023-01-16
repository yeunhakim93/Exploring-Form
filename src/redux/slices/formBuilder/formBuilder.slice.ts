import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store";

export type FormElementType = {
  ID: string;
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
  brandID: string;
  kind: "contract" | "subcontract" | "proposal" | "questionnaire" | "lead";
  data: Array<FormElementType>;
  // data: Array<FormElementType | FormElementContainerType>;
};

const initialState: FormData = {
  brandID: "formteam",
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
      //find the ID and remove
    },
    updateFormElement(state, action: PayloadAction<FormElementType>) {
      //find the ID and update
      //needs to accept ID & form element
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

// {
//   a123: {
//     prev: 'null'
//     next: 'd456'
//     children: [b234,c345],
//     formElementData: {
//       type: 'container',
//       body: '',
//       required: true
//     }
//   },
//  b234: {
//     formElementData: {
//       type: 'checkbox',
//       body: '',
//       required: true
//     }
//  }
// ...
// }

// type FormElementDataType = {
//   ID: string;
//   type: "container" | "shortAnswer" | "checkbox";
//   body: string;
//   required?: boolean;
//   parentID?: string;
// };

// type FormElementAdjacencyListType = {
//   [ID: string]: {
//     formElementData: FormElementDataType;
//     children?: string[];
//     unicorn?: string;
//   };
// };
// const initialState: FormElementAdjacencyListType = {};

// type FormData = {
//   brandID: string;
//   kind: "contract" | "subcontract" | "proposal" | "questionnaire" | "lead";
//   data: Omit<FormElementDataType, "parentID">[];
// };
