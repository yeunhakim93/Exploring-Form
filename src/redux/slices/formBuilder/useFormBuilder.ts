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
  const dispatchAddFormElement = (formElement: FormElementType) =>
    dispatch(addFormElement(formElement));
  const dispatchRemoveFormElement = (formElementId: string) =>
    dispatch(removeFormElement(formElementId));
  const dispatchUpdateFormElement = (formElement: FormElementType) =>
    dispatch(updateFormElement(formElement));

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
