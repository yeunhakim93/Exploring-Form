import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FormElementType, FormAdjacencifiedData } from "../../../types";
import type { RootState } from "../../store";
const initialFormData = require("../../../InitialData.json");

const initialState = {
  brandId: "formteam",
  kind: "questionnaire",
  data: adjacencify(initialFormData),
};

export const formBuilderSlice = createSlice({
  name: "formBuilder",
  initialState,
  reducers: {
    addOrUpdateElement(
      state,
      action: PayloadAction<{
        element: FormElementType;
        parentId?: string;
        index?: number;
        prevId?: string;
      }>
    ) {
      if (state.data[action.payload.element.id]) {
        updateElement(state, action);
      } else {
        addElement(state, action);
      }
    },
    removeFormElement(state, action: PayloadAction<{ id: string }>) {
      handleDelete(state, action);
    },
    clearForm(state) {
      return initialState;
    },
    submitForm(state) {
      return initialState;
    },
    updateFormElementBody(
      state,
      action: PayloadAction<{ id: string; body: string }>
    ) {
      handleElementUpdate(state, action);
    },
  },
});

export const selectFormData = (state: RootState) => state.formBuilder.data;

export const {
  removeFormElement,
  clearForm,
  submitForm,
  addOrUpdateElement,
  updateFormElementBody,
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
        if (idx !== undefined) returnObject[item.id].parent.index = idx;
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
      if (data[childId].body) (currNode as any).body = data[childId].body;
      if (data[childId].color) (currNode as any).color = data[childId].color;
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

function addElement(
  state: any,
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
                  
          If the element is the descendent of the last child,
          append the element to the end of the child list

        */
        if (currentIndex === currentList.length) {
          (state.data[parentId].children as Array<Array<string>>)[index].push(
            element.id
          );
        } else {
          /*
      
            If the element is in the middle of the array
            Add the element directly behind where its
            previous ancestor lies

          */

          currentList.splice(currentIndex + 1, 0, element.id);
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
    /*
  
      If there is no parent, then this is a top
      level addition, no 'children' matrices 
      need to be updated. Just the top level
        
    */

    if (state.data.children) {
      if (prevId) {
        let oldList = [...(state.data.children as any)];
        oldList.splice(oldList.indexOf(prevId) + 1, 0, element.id);
        (state.data.children as any) = oldList;
      } else {
        /*
  
          This is at most copying one array of string.
          This is not a deep copy, and is functional

        */

        (state.data as any).children = [
          element.id,
          ...(state.data as any).children,
        ];
      }
    } else {
      (state.data as any).children = [element.id];
    }
  }

  let elementToAdd: any = { type: element.type, body: element.body };

  /*

    Add mapping to parent from child

  */

  if (parentId) {
    elementToAdd.parent = {
      id: parentId,
    };
  }

  if (index !== undefined) {
    elementToAdd.parent.index = index;
  }
  state.data[element.id] = elementToAdd;
}

function updateElement(
  state: any,
  action: PayloadAction<{
    element: FormElementType;
    parentId?: string;
    index?: number;
    prevId?: string;
  }>
) {
  const currentElement = state.data[action.payload.element.id];
  let partiallyDeconstructed = {
    ...state.data[action.payload.element.id],
  };
  if (partiallyDeconstructed.parent) {
    partiallyDeconstructed.parent = { ...partiallyDeconstructed.parent };
  }

  /*

    Handle updating the parent's children matrix

  */

  if (currentElement.parent) {
    /*

      Find the parent that owns this child

    */
    const theTargetedParentArray =
      state.data[state.data[action.payload.element.id].parent.id].children[
        currentElement.parent.index
      ];

    /*

      Update the parent to no longer include the child id

    */

    state.data[state.data[action.payload.element.id].parent.id].children[
      currentElement.parent.index
    ] = theTargetedParentArray.filter(
      (id: string): boolean => id !== action.payload.element.id
    );
  } else {
    const currentTopLevelChildren = [...state.data.children];
    const newTopLevelChildren = currentTopLevelChildren.filter(
      (id: string): boolean => id !== action.payload.element.id
    );
    state.data.children = newTopLevelChildren;
  }

  /*

    Add the id to the new parent's children matrix

  */
  addElement(state, action);
}

function handleDelete(state: any, action: PayloadAction<{ id: string }>) {
  if (state.data[action.payload.id]) {
    let child = {
      ...state.data[action.payload.id],
    };

    if ((child as any).parent) {
      (child as any).parent = {
        ...(state.data[action.payload.id] as any).parent,
      };
    }

    if ((state.data[action.payload.id] as any).parent) {
      const { id: parent, index } = (state.data[action.payload.id] as any)
        .parent;

      const parentsChildArray = [
        ...(state.data[parent].children as any)[index],
      ];

      const updatedArray = parentsChildArray.filter(
        (elementId) => elementId !== action.payload.id
      );
      (state.data[parent].children as any)[index] = updatedArray;
    } else {
      // this is in the overall data structures children
      const overAllChildren = [...(state.data.children as any)];
      const updatedArray = overAllChildren.filter(
        (elementId) => elementId !== action.payload.id
      );
      (state.data.children as any) = updatedArray;
    }

    /*

      This is a 'cascading delete', so all children
      and their associated nodes have to be deleted

    */

    if (state.data[action.payload.id].children) {
      for (const list of state.data[action.payload.id].children) {
        for (const childId of list) {
          handleDelete(state, { payload: { id: childId } } as any);
        }
      }
    }

    delete state.data[action.payload.id];
  }
}

function handleElementUpdate(
  state: any,
  action: PayloadAction<{
    id: string;
    body: string;
  }>
) {
  const { id, body } = action.payload;
  state.data[id].body = body;
}
