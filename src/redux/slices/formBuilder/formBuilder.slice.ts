import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store";

export type FormElementType = {
  id: string;
  type: "shortAnswer" | "checkbox" | "container";
  body: string;
  color?: string;
  required?: boolean;
};

export interface FormAdjacencyList {
  [key: string]: {
    children?: Array<Array<string>>;
    id: string;
    type: string;
  };
}

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

function adjecencify(inputDataFromDb: Array<FormElementType>) {
  const returnObject: { [key: string]: any } = {};
  returnObject.children = inputDataFromDb.map((item) => item.id);

  const iterate = ({
    data,
    parentId,
    idx,
  }: {
    data: any;
    parentId?: number;
    idx?: number;
  }) => {
    /*
  
      Loop of array overall
      either columns subArrays, or
      data overall
  
    */

    for (const item of data) {
      returnObject[item.id] = { type: item.type };

      if (item.columns) {
        let finalChildren = [];

        /*
  
          Loop over columns items
  
        */
        for (let i = 0; i < item.columns.length; i++) {
          let nestedColumn = item.columns[i];

          /*
  
            Traverses all children and returns
            their ids
  
          */
          finalChildren.push(
            nestedColumn.map((nestedItem: { ID: string }) => nestedItem.ID)
          );

          /*
  
            Call the function on each columns
            sub-array
  
          */

          iterate({ data: nestedColumn, parentId: item.id, idx: i });
        }

        returnObject[item.id].children = finalChildren;
      }

      /*
  
        Associate nested item
        with its parent, and its
        array index on children
  
      */

      if (parentId) {
        returnObject[item.ID].parent = {
          id: parentId,
        };
        if (idx !== undefined) returnObject[item.id].parent.idx = idx;
      }
    }
  };

  iterate({ data: inputDataFromDb });
  return returnObject;
}

function unAdjecencify(data: FormAdjacencyList) {
  const parse = (children: any) => {
    const currArray = [];

    for (const childId of children) {
      const currNode = { type: data[childId].type, id: childId };
      if (data[childId]?.children) {
        (currNode as any).columns = (data[childId] as any).children.map(
          (item: any) => parse(item)
        );
      }
      currArray.push(currNode);
    }
    return currArray;
  };

  return (data.children as any).map((item: string) => parse(item)).flat();
}
