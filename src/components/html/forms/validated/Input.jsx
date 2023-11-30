import { useFormContext, useFormState } from "react-hook-form";

import UnvalidatedInput from "~/components/html/forms/unvalidated/Input";

function Input({ name, rules = {}, ...inputProps }) {
  const { register } = useFormContext();
  const { errors } = useFormState();

  const props = {
    ...register(name, rules),
    "aria-invalid": errors[name] ? "true" : "false",
  };

  return <UnvalidatedInput {...props} {...inputProps} />;
}

export default Input;
