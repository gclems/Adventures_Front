import clsx from "clsx";
import { useFormState } from "react-hook-form";

import Button from "../button/Button";

function Submit({
  form,
  disabled,
  variant = null,
  color = null,
  size = null,
  children = "Valider",
}) {
  const { isLoading, isSubmitting, isValid, isValidating } = useFormState();

  return (
    <Button
      type="submit"
      form={form}
      variant={variant}
      color={color}
      size={size}
      disabled={
        disabled || isLoading || isSubmitting || !isValid || isValidating
      }
    >
      <div className="relative flex items-center justify-center">
        <div
          className={clsx("w-full flex-1", {
            visible: !isSubmitting,
            invisible: isSubmitting,
          })}
        >
          {children}
        </div>

        {isSubmitting && (
          <div className="absolute text-white">
            <i className="fa-solid fa-spinner fa-xl fa-spin" />
          </div>
        )}
      </div>
    </Button>
  );
}

export default Submit;
