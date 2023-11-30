import BaseTag from "./BaseTag";

function SimpleQuote({ textareaRef }) {
  return (
    <BaseTag textareaRef={textareaRef} tag=">" title="Citation sans source">
      <i className="fa-solid fa-quotes" />
    </BaseTag>
  );
}

export default SimpleQuote;
