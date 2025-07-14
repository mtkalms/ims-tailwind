import clsx from "clsx";
import FormField from "./FormField";

interface FormProps extends React.HTMLAttributes<HTMLFormElement> {}

function Form({ children, className, ...props }: FormProps) {
  return (
    <form className={clsx("flex flex-col gap-4", className)} {...props}>
      {children}
    </form>
  );
}

Form.Field = FormField;

export default Form;
export type { FormProps };
