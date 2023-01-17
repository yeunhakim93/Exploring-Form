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
    addFormElement(
      state,
      action: PayloadAction<{ element: FormElementType; parentId?: string }>
    ) {
      state.data.push(action.payload.element);
    },
    removeFormElement(
      state,
      action: PayloadAction<{ id: string; parentId?: string }>
    ) {
      //find the ID and remove
    },
    updateFormElement(
      state,
      action: PayloadAction<{ id: string; element: FormElementType }>
    ) {
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

const returnObject = {};
// function adjecencify({ data, parentId, idx }) {

//   /*

//     Loop of array overall
//     either columns subArrays, or
//     data overall

//   */

//   for (const item of data) {
//     returnObject[item.id] = { type: item.type }

//     if (item.columns) {
//       let finalChildren = []

//       /*

//         Loop over columns items

//       */
//       for (let i = 0; i < item.columns.length; i++) {
//         nestedColumn = item.columns[i]

//         /*

//           Traverses all children and returns
//           their ids

//         */
//         finalChildren.push(nestedColumn.map((nestedItem) => nestedItem.id))

//         /*

//           Call the function on each columns
//           sub-array

//         */

//         adjecencify({ data: nestedColumn, parentId: item.id, idx: i })
//       }

//       returnObject[item.id].children = finalChildren
//     }

//     /*

//       Associate nested item
//       with its parent, and its
//       array index on children

//     */

//     if (parentId) {
//       returnObject[item.id].parent = {
//         id: parentId,
//       }
//       if (idx !== undefined) returnObject[item.id].parent.idx = idx
//     }
//   }
// }
