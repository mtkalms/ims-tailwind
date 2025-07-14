import {
  IconAlertTriangleFilled,
  IconCircleCheckFilled,
} from "@tabler/icons-react";
import clsx from "clsx";

interface FormFieldMessageProps extends React.HTMLAttributes<HTMLSpanElement> {
  message?: string;
  type?: "error" | "success" | "info";
}

function FormFieldMessage({
  message,
  type = "info",
  className,
  children,
  ...props
}: FormFieldMessageProps) {
  const typeClasses = {
    error: "text-red-500",
    success: "text-green-500",
    info: "text-blue-500",
  }[type];

  return (
    <span
      className={clsx(
        "flex items-center gap-2 px-2 text-xs font-bold",
        typeClasses,
        className,
      )}
      {...props}
    >
      {type === "error" && <IconAlertTriangleFilled className="w-3.5" />}
      {type === "success" && <IconCircleCheckFilled className="w-3.5" />}
      <span>{children || message}</span>
    </span>
  );
}

export default FormFieldMessage;
export type { FormFieldMessageProps };
