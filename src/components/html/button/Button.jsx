import clsx from "clsx";
import { Link } from "react-router-dom";

import StringHelper from "~/helpers/StringHelper";

const colorClasses = {
  filled: {
    primary: clsx(
      "border-teal-700 bg-teal-700 text-zinc-300",
      "hover:border-teal-600 hover:bg-teal-600",
      "active:border-teal-800 active:bg-teal-800",
      "disabled:border-neutral-400 disabled:bg-neutral-400 disabled:text-neutral-500",
    ),
  },

  outline: {
    primary: clsx(
      "border-zinc-300 text-zinc-300",
      "hover:bg-teal-600",
      "active:border-transparent active:bg-teal-700",
      "disabled:border-neutral-400 disabled:bg-neutral-400 disabled:text-neutral-500",
    ),
  },

  text: {
    primary: clsx(
      "border-transparent text-zinc-300",
      "hover:bg-teal-600 hover:text-zinc-200",
      "active:bg-teal-700 active:text-zinc-400",
      "disabled:opacity-20",
    ),
    primaryDark: clsx(
      "border-transparent text-gray-800",
      "hover:bg-teal-600 hover:text-zinc-200",
      "active:bg-teal-700 active:text-zinc-400",
      "disabled:opacity-20",
    ),
    secondary: clsx(
      "border-transparent text-zinc-300",
      "hover:bg-zinc-500 hover:text-zinc-200",
      "active:bg-zinc-600 active:text-zinc-400",
      "disabled:opacity-20",
    ),
    secondaryDark: clsx(
      "border-transparent text-gray-800",
      "hover:bg-zinc-500 hover:text-zinc-200",
      "active:bg-zinc-600 active:text-zinc-400",
      "disabled:opacity-20",
    ),
    warning: clsx(
      "border-transparent text-zinc-300",
      "hover:bg-amber-400 hover:text-zinc-800",
      "active:bg-amber-500 active:text-zinc-900",
      "disabled:opacity-20",
    ),
    warningDark: clsx(
      "border-transparent text-zinc-800",
      "hover:bg-amber-400 hover:text-zinc-800",
      "active:bg-amber-500 active:text-zinc-900",
      "disabled:opacity-20",
    ),
    danger: clsx(
      "border-transparent text-zinc-300",
      "hover:bg-red-800 hover:text-zinc-300",
      "active:bg-red-500 active:text-zinc-300",
      "disabled:opacity-20",
    ),
  },
  ghost: {
    primary: clsx("border-transparent text-zinc-300 disabled:opacity-20"),
    secondary: clsx("border-transparent text-gray-800 disabled:opacity-20"),
  },
};

const sizesClasses = {
  fit: "rounded-sm",
  small: "px-1 py-0 rounded-sm",
  default: "px-4 py-1 rounded-full",
};

function Button({
  variant = "filled",
  color = "primary",
  size = "default",
  onClick,
  href,
  to,
  children,
  type = "button",
  form,
  disabled,
  title = "",
  className = "",
}) {
  let Component = null;
  let props = null;

  if (!StringHelper.isNullOrEmpty(href)) {
    Component = "a";
    props = { href, disabled };
  } else if (!StringHelper.isNullOrEmpty(to)) {
    Component = Link;
    props = { to };
  } else {
    Component = "button";
    props = { onClick, type, form, disabled };
  }

  const colorClassName =
    colorClasses[variant ?? "filled"]?.[color ?? "primary"] ??
    colorClasses.filled.primary;

  const sizeClassName = sizesClasses[size ?? "default"] ?? sizesClasses.default;
  return (
    <Component
      {...props}
      title={title}
      className={clsx(
        "w-fit cursor-pointer border-2",
        colorClassName,
        sizeClassName,
        className,
      )}
    >
      {children}
    </Component>
  );
}

export default Button;
