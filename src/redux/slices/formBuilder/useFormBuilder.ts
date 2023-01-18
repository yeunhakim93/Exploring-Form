import { useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../../store";
import {
  selectFormData,
  addFormElement,
  removeFormElement,
  updateFormElement,
  clearForm,
  submitForm,
} from "./formBuilder.slice";
import { FormElementType } from "./formBuilder.slice";

export const useFormBuilder = () => {
  const formData = useAppSelector(selectFormData);

  const dispatch = useAppDispatch();
  const dispatchAddFormElement = ({
    formElement,
    parentId,
  }: {
    formElement: FormElementType;
    parentId?: string;
  }) => dispatch(addFormElement({ element: formElement, parentId }));
  const dispatchRemoveFormElement = ({
    formElementId,
    parentElementId,
  }: {
    formElementId: string;
    parentElementId?: string;
  }) =>
    dispatch(
      removeFormElement({ id: formElementId, parentId: parentElementId })
    );
  const dispatchUpdateFormElement = ({
    id,
    formElement,
  }: {
    formElement: FormElementType;
    id: string;
  }) => dispatch(updateFormElement({ id, element: formElement }));

  const dispatchClearForm = () => dispatch(clearForm());
  const dispatchSubmitForm = () => dispatch(submitForm());

  return useMemo(
    () => ({
      formData,
      dispatchAddFormElement,
      dispatchRemoveFormElement,
      dispatchUpdateFormElement,
      dispatchClearForm,
      dispatchSubmitForm,
    }),
    [formData]
  );
};
