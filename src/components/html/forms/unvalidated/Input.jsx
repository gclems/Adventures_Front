import { forwardRef } from "react";

import clsx from "clsx";

import InputContentSeparator from "~/components/html/forms/InputContentSeparator";

const Input = forwardRef(
  (
    { className, startContent = null, endContent = null, ...inputProps },
    ref,
  ) => {
    return (
      <>
        <div className={clsx("relative flex px-4 py-1", className)}>
          {startContent && (
            <div className="z-10 flex flex-none pt-1">
              <>
                {startContent}
                <InputContentSeparator />
              </>
            </div>
          )}
          <input
            ref={ref}
            {...inputProps}
            className="peer z-10 flex-1 appearance-none bg-transparent text-gray-800 outline-none ring-0 active:outline-none active:ring-0"
          />
          {endContent && (
            <div className="z-10 flex flex-none pt-1">
              <>
                <InputContentSeparator />
                {endContent}
              </>
            </div>
          )}
          <div
            className={clsx(
              "absolute inset-0 z-0",
              "w-full items-center justify-stretch",
              "border-b-2 border-b-white/20 peer-focus:border-b-teal-500",
              " bg-zinc-300",
            )}
          />
        </div>
      </>
    );
  },
);

Input.displayName = "Input";
export default Input;
