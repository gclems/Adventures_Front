import DecorationTag from "./BaseDecoration";

function Italic({ textareaRef }) {
  return (
    <DecorationTag textareaRef={textareaRef} tag="_" title="Italique">
      <i className="fa-solid fa-italic" />
    </DecorationTag>
  );
}

export default Italic;
