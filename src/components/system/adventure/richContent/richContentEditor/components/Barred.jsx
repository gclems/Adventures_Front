import DecorationTag from "./BaseDecoration";

function Barred({ textareaRef }) {
  return (
    <DecorationTag textareaRef={textareaRef} tag="~~" title="Barré">
      <i className="fa-solid fa-text-slash" />
    </DecorationTag>
  );
}

export default Barred;
