import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  FormData,
  FormElementType,
  FormAdjacencifiedData,
} from "../../../types";
import type { RootState } from "../../store";

const initialFormData: any = {
  brandId: "asdf123",
  kind: "contract",
  data: [
    { id: "asdf", type: "checkbox", body: "<h1> temp </h1>", color: "red" },
    {
      id: "sdfg",
      type: "shortAnswer",
      body: "<h1> temp </h1>",
      color: "red",
    },
  ],
};

const initialState = {
  brandId: "formteam",
  kind: "questionnaire",
  data: adjacencify(initialFormData.data),
};

export const formBuilderSlice = createSlice({
  name: "formBuilder",
  initialState,
  reducers: {
    addFormElement(
      state,
      action: PayloadAction<{
        element: FormElementType;
        parentId?: string;
        index?: number;
        prevId?: string;
      }>
    ) {
      /*
    
        Element: the actual element to add
        ParentId: the div that the element belongs to
        Index: The subArray within children to add the element to
        PrevId: The id on the element directly above the new element
    
      */
      const { element, parentId, index, prevId } = action.payload;
      console.log(
        "element: ",
        element,
        "\nparentId: ",
        parentId,
        "\nindex: ",
        index,
        "\nprevId: ",
        prevId
      );
      if (parentId && state.data.parentId) {
        if (state.data[parentId].children) {
          if (index) {
            if (prevId) {
              let currentIndex = (
                state.data[parentId].children as Array<Array<string>>
              )[index].indexOf(prevId);
            }
          }
        }
      }
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

function adjacencify(
  inputDataFromDb: Array<FormElementType>
): FormAdjacencifiedData {
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
            nestedColumn.map((nestedItem: { id: string }) => nestedItem.id)
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
        returnObject[item.id].parent = {
          id: parentId,
        };
        if (idx !== undefined) returnObject[item.id].parent.idx = idx;
      }
    }
  };

  iterate({ data: inputDataFromDb });
  return returnObject;
}

export function unAdjacencify(data: FormAdjacencifiedData) {
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

  return parse(data.children).flat();
}
