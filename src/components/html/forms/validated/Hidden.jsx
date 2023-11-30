import { useFormContext, useFormState } from "react-hook-form";

function Hidden({ id, name, rules = {}, noForm = false, ...inputProps }) {
  const { register } = useFormContext();
  const { errors } = useFormState();

  const props = {
    ...register(name, rules),
    "aria-invalid": errors[name] ? "true" : "false",
  };

  return <input type="hidden" {...props} {...inputProps} />;
}

export default Hidden;
