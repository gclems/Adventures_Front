import React, { forwardRef, useImperativeHandle, useState } from "react";

import { Dialog, Transition } from "@headlessui/react";
import clsx from "clsx";

import Button from "../button/Button";

const Modal = forwardRef(
  (
    {
      title = "",
      titleIcon = null,
      size = "medium",
      onOpened,
      onClosed,
      openedByDefault = false,
      children,
    },
    ref,
  ) => {
    const [opened, setOpened] = useState(openedByDefault);

    useImperativeHandle(ref, () => ({
      open: () => {
        setOpened(true);
      },
      close: () => {
        setOpened(false);
      },
    }));

    return (
      <Transition
        appear
        show={opened}
        as={React.Fragment}
        afterEnter={onOpened}
        afterLeave={onClosed}
      >
        <Dialog
          as="div"
          className="relative z-50"
          onClose={() => {
            setOpened(false);
          }}
        >
          <Transition.Child
            as="div"
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-[40%]"
            leave="ease-in duration-200"
            leaveFrom="opacity-[40%]"
            leaveTo="opacity-0"
            className="fixed inset-0 bg-black bg-blend-multiply"
          ></Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={React.Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel
                  className={clsx(
                    "relative flex w-full shrink-0 flex-col gap-y-6 overflow-hidden rounded-2xl border-2 border-zinc-400 bg-gradient-to-br from-zinc-500 to-zinc-600 p-6 text-left align-middle shadow-xl transition-all",
                    {
                      "max-w-md": size === "medium",
                      "max-w-xl": size === "large",
                      "max-w-4xl": size === "huge",
                    },
                  )}
                >
                  <Dialog.Title as="h3" className="flex flex-row items-center">
                    {(title || titleIcon) && (
                      <>
                        {titleIcon && (
                          <div className="mr-2 text-3xl">{titleIcon}</div>
                        )}
                        <div className="flex flex-1 text-xl">{title}</div>
                      </>
                    )}
                    <Button
                      tabIndex="-1"
                      onClick={() => {
                        setOpened(false);
                      }}
                      variant="ghost"
                      size="small"
                      className="group"
                    >
                      <i className="fa-solid fa-x opacity-50 group-hover:opacity-100" />
                    </Button>
                  </Dialog.Title>

                  <div className="w-full">{children}</div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    );
  },
);

Modal.displayName = "Modal";
export default Modal;
