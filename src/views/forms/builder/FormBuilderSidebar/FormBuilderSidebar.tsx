import { FormIcon } from "../../elements/FormIcons";

const elementArr = ["checkbox", "shortAnswer", "container"] as const;
const elementColor = {
  checkbox: "#f5cac3",
  shortAnswer: "#84a59d",
  container: "#f7ede2",
};

export const FormBuilderSidebar = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "10%",
        minWidth: "180px",
        height: "calc(100vh - 200px)",
        backgroundColor: "#e9f0ec",
        padding: "10px",
        margin: "10px",
      }}
    >
      <div>FormBuilderSidebar</div>
      {elementArr.map((type) => (
        <FormIcon key={type} type={type} color={elementColor[type]} />
      ))}
    </div>
  );
};
