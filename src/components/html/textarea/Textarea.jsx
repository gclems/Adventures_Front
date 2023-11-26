import clsx from "clsx";
import { useFormContext, useFormState } from "react-hook-form";

function Textarea({
  id,
  name,
  rules = {},
  className,
  noForm = false,
  ...inputProps
}) {
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
      <div className={clsx("relative flex", className)}>
        <textarea
          {...props}
          {...inputProps}
          className="peer z-10 min-h-[100px] w-full appearance-none bg-transparent px-4 py-1 text-gray-800 outline-none ring-0 active:outline-none active:ring-0 "
        />

        <div
          className={clsx(
            "absolute inset-0 z-0",
            "w-full",
            "border-b-2 border-b-white/20 peer-focus:border-b-teal-500",
            " bg-zinc-300",
          )}
        />
      </div>
    </>
  );
}

export default Textarea;
