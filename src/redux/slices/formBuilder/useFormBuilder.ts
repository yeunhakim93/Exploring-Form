import { useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../../store";
import {
  selectFormData,
  addOrUpdateElement,
  removeFormElement,
  clearForm,
  submitForm,
  updateFormElementBody,
} from "./formBuilder.slice";
import { FormElementType } from "../../../types";

export const useFormBuilder = () => {
  const formData = useAppSelector(selectFormData);

  const dispatch = useAppDispatch();

  /*

      Two types of updates:
        Moving:
          If the element exists:
            1. Find it parent, remove its reference from children
            2. Find the new parent, add the reference to new parent
        Updating Content:
          If the element exists:
            1. Update the element

      This also determines if this is an 
      add operation or an update operation

  */

  const dispatchUpdateOrAddElement = ({
    formElement,
    parentId,
    index,
    prevId,
  }: {
    formElement: FormElementType;
    parentId?: string;
    index?: number;
    prevId?: string;
  }) => {
    dispatch(
      addOrUpdateElement({ element: formElement, parentId, index, prevId })
    );
  };
  /*

    Remove a current element:
      Also parse parents children

  */

  const dispatchRemoveFormElement = ({
    formElementId,
  }: {
    formElementId: string;
  }) => dispatch(removeFormElement({ id: formElementId }));

  // for modifying body
  const dispatchUpdateFormElementBody = ({
    formElementId,
    body,
  }: {
    formElementId: string;
    body: string;
  }) => dispatch(updateFormElementBody({ id: formElementId, body }));

  const dispatchClearForm = () => dispatch(clearForm());
  const dispatchSubmitForm = () => dispatch(submitForm());

  return useMemo(
    () => ({
      formData,
      dispatchUpdateOrAddElement,
      dispatchRemoveFormElement,
      dispatchClearForm,
      dispatchSubmitForm,
      dispatchUpdateFormElementBody,
    }),
    [formData]
  );
};
