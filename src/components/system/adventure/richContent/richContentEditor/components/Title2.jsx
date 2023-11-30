import BaseTag from "./BaseTag";

function Title2({ textareaRef }) {
  return (
    <BaseTag textareaRef={textareaRef} tag="##" title="Titre niveau 2">
      H2
    </BaseTag>
  );
}

export default Title2;
