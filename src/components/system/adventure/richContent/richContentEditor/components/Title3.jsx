import BaseTag from "./BaseTag";

function Title3({ textareaRef }) {
  return (
    <BaseTag textareaRef={textareaRef} tag="###" title="Titre niveau 3">
      H3
    </BaseTag>
  );
}

export default Title3;
