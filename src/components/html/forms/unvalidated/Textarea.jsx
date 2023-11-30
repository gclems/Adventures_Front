import { forwardRef } from "react";

import clsx from "clsx";

const Textarea = forwardRef(({ className, ...inputProps }, ref) => {
  return (
    <div className={clsx("relative flex", className)}>
      <textarea
        ref={ref}
        {...inputProps}
        className="peer z-10 min-h-[100px] w-full resize-none appearance-none bg-transparent px-4 py-1 text-gray-800 outline-none ring-0 active:outline-none active:ring-0 "
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
  );
});

Textarea.displayName = "Textarea";
export default Textarea;
