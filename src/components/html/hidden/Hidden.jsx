import { useFormContext, useFormState } from "react-hook-form";

export function InputContentSeparator() {
  return <div className="mx-2 h-full w-px bg-zinc-400" />;
}

function Hidden({ id, name, rules = {}, noForm = false, ...inputProps }) {
  let props = {};
  if (!noForm) {
    const { register } = useFormContext();
    const { errors } = useFormState();

    props = {
      ...register(name, rules),
      "aria-invalid": errors[name] ? "true" : "false",
    };
  }

  return (
    <>
      <input type="hidden" {...props} {...inputProps} />
    </>
  );
}

export default Hidden;
