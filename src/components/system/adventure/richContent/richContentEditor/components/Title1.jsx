import BaseTag from "./BaseTag";

function Title1({ textareaRef }) {
  return (
    <BaseTag textareaRef={textareaRef} tag="#" title="Titre niveau 1">
      H1
    </BaseTag>
  );
}

export default Title1;
