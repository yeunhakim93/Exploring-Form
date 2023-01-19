import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  FormData,
  FormElementType,
  FormAdjacencifiedData,
} from "../../../types";
import type { RootState } from "../../store";
const initialFormData = require("../../../InitialData.json");

const initialState = {
  brandId: "formteam",
  kind: "questionnaire",
  data: adjecencify(initialFormData),
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
      /*

        Nested updates

      */
      if (parentId) {
        let currentList: Array<string> = [];
        if (state.data[parentId].children) {
          if (index !== undefined) {
            currentList = [
              ...(state.data[parentId].children as Array<Array<string>>)[index],
            ];
          }
        }
        if (index !== undefined) {
          if (prevId) {
            const currentIndex = currentList.indexOf(prevId);

            /*
                
              If the element is the decendednt of the last child,
              append the element to the end of the child list

            */
            if (currentIndex === currentList.length) {
              (state.data[parentId].children as Array<Array<string>>)[
                index
              ].push(element.id);
            } else {
              /*
    
                If the element is in the middle of the array
                Add the element directly behind where its
                previous ancestor lies

              */

              let prefix = currentList.splice(0, currentIndex);
              prefix.push(element.id);
              currentList = [...prefix, ...currentList];
            }
          } else {
            /*
    
                  If there is no prevId, append item to the front of the list
    
                */

            currentList.unshift(element.id);
          }

          /*
    
            Update the parent state array to contain the correct references

          */

          if (state.data[parentId].children as Array<Array<string>>) {
            (state.data[parentId].children as Array<Array<string>>)[index] =
              currentList;
          } else {
            let newChildMatrix = new Array(3).fill([]);

            newChildMatrix[index] = [element.id];
            (state.data[parentId].children as Array<Array<string> | null>) =
              newChildMatrix;
          }
        }
      } else {
        state.data[element.id] = {
          ...element,
        };
        if (state.data.children) {
          (state.data as any).children = [
            ...(state.data as any).children,
            element.id,
          ];
        }
      }
      state.data[element.id] = { type: element.type, body: element.body };
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

function adjecencify(
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
      returnObject[item.id] = { type: item.type, body: item.body };

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

export function unAdjecencify(data: FormAdjacencifiedData) {
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
