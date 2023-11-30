import Quote from "./Quote";

function BlockQuote({ children, ...props }) {
  return <Quote {...props}>{children}</Quote>;
}

export default BlockQuote;
