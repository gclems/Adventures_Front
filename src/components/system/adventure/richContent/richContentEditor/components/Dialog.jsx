import Button from "~/components/html/button/Button";

function Dialog({ textareaRef }) {
  const handleClick = () => {
    if (!textareaRef?.current) return;

    const ref = textareaRef.current;

    const cursorStart = ref.selectionStart;
    const cursorEnd = ref.selectionEnd;

    const textBefore = ref.value.substring(0, cursorStart);
    const textAfter = ref.value.substring(cursorEnd);

    const text = `\n:::dialog\nWrite here\n:::\n`;

    const newContent = `${textBefore}${text}${textAfter}`;

    textareaRef.current.value = newContent;
    textareaRef.current.dispatchEvent(new Event("input", { bubbles: true }));
    textareaRef.current.focus();

    textareaRef.current.selectionStart = cursorStart + 11;
    textareaRef.current.selectionEnd = cursorStart + 21;
  };

  return (
    <Button
      variant="text"
      color="secondary"
      onClick={handleClick}
      size="small"
      title="Dialogue"
    >
      <i className="fa-solid fa-comments" />
    </Button>
  );
}

export default Dialog;
