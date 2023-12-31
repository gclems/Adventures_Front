import clsx from "clsx";
import PropTypes from "prop-types";

function Radiobutton({ options, selectedValue, onChange }) {
  const handleClick = (value) => {
    onChange?.(value);
  };

  return (
    <div className="flex flex-1 cursor-pointer items-center justify-evenly overflow-hidden rounded-md bg-ocre-400/20">
      {options.map(({ value, label }) => (
        <button
          key={value}
          className={clsx("flex-1 appearance-none text-center", {
            "bg-transparent opacity-80 hover:bg-white/25 text-xs":
              selectedValue !== value,
            "bg-ocre-500 text-white text-sm": selectedValue === value,
          })}
          onClick={() => handleClick(value)}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

Radiobutton.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    }),
  ).isRequired,
  selectedValue: PropTypes.string,
  onChange: PropTypes.func,
};

export default Radiobutton;
