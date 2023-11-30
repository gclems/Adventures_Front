import DecorationTag from "./BaseDecoration";

function Bold({ textareaRef }) {
  return (
    <DecorationTag textareaRef={textareaRef} tag="**" title="Gras">
      <i className="fa-solid fa-bold" />
    </DecorationTag>
  );
}

export default Bold;
