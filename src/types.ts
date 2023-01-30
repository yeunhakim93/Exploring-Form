export type FormElementType = {
  id: string;
  type: "shortAnswer" | "checkbox" | "container" | "text";
  body: string;
  color?: string;
  required?: boolean;
};

export type FormElementContainerType = Omit<
  FormElementType,
  "required type"
> & {
  type: "container";
  columns: Array<FormElementType | FormElementContainerType>[];
};

export type FormElementsListType = {
  id: string;
  elements: Array<FormElementType | FormElementContainerType>;
};

export type FormData = {
  brandId: string;
  kind: "contract" | "subcontract" | "proposal" | "questionnaire" | "lead";
  data: Array<FormElementsListType>;
};

export type FormAdjacencifiedData = {
  [key: string]: {
    type: "shortAnswer" | "checkbox" | "container" | "text";
    color?: string;
    body?: string;
    children?: Array<Array<string>>;
  };
};
