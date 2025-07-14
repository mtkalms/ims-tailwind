import clsx from "clsx";
import FormField from "./FormField";
import React from "react";

interface FormProps extends React.HTMLAttributes<HTMLFormElement> {
  error?: boolean;
}

interface FormContextProps {
  error?: boolean;
}
const FormContext = React.createContext<FormContextProps>({ error: false });

function Form({ children, error, className, ...props }: FormProps) {
  return (
    <form className={clsx("flex flex-col gap-4", className)} {...props}>
      <FormContext.Provider value={{ error }}>{children}</FormContext.Provider>
    </form>
  );
}

Form.Field = FormField;

export default Form;
export type { FormProps };
