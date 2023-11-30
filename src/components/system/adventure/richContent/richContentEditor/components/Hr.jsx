import BaseTag from "./BaseTag";

function Hr({ textareaRef }) {
  return (
    <BaseTag
      textareaRef={textareaRef}
      tag="::hr[1]"
      title="Séparateur horizontal"
    >
      <i className="fa-duotone fa-bars" />
    </BaseTag>
  );
}

export default Hr;
