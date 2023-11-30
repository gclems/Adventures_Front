import { useFormContext, useFormState } from "react-hook-form";

import UnvalidatedTextarea from "~/components/html/forms/unvalidated/Textarea";

function Textarea({ name, rules = {}, ...inputProps }) {
  const { register } = useFormContext();
  const { errors } = useFormState();

  const props = {
    ...register(name, rules),
    "aria-invalid": errors[name] ? "true" : "false",
  };

  return <UnvalidatedTextarea {...props} {...inputProps} />;
}

export default Textarea;
