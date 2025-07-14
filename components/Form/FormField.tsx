import clsx from "clsx";
import FormFieldMessage from "./FormFieldMessage";

interface FormFieldProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string;
  required?: boolean;
}

function FormField({
  label,
  required = false,
  children,
  className,
  ...props
}: FormFieldProps) {
  return (
    <div className={clsx("flex flex-col gap-2", className)} {...props}>
      {label && (
        <label className="text-sm font-semibold">
          {label}
          {required && <span className="text-red-500"> *</span>}
        </label>
      )}
      {children}
    </div>
  );
}

FormField.Message = FormFieldMessage;

export default FormField;
export type { FormFieldProps };
