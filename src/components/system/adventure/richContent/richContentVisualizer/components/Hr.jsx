function Hr({ children }) {
  let heightClass = "h-px";

  if (!!children && typeof children === "string") {
    switch (children) {
      case "2":
        heightClass = "h-[2px]";
        break;
      case "3":
        heightClass = "h-[3px]";
        break;
      case "4":
        heightClass = "h-1";
        break;
      default:
        break;
    }
  }

  return <div className={`${heightClass} w-full bg-ocre-500`} />;
}

export default Hr;
