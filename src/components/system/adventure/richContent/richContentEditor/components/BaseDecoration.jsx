import Button from "~/components/html/button/Button";

function DecorationTag({ textareaRef, tag, children, ...buttonProps }) {
  const handleClick = () => {
    if (!textareaRef?.current) return;

    const ref = textareaRef.current;

    const cursorStart = ref.selectionStart;
    const cursorEnd = ref.selectionEnd;

    const textBefore = ref.value.substring(0, cursorStart);
    const textAfter = ref.value.substring(cursorEnd);
    const selectedText = ref.value.substring(cursorStart, cursorEnd);

    const newContent = `${textBefore}${tag}${selectedText}${tag}${textAfter}`;

    textareaRef.current.value = newContent;
    textareaRef.current.dispatchEvent(new Event("input", { bubbles: true }));
    textareaRef.current.focus();

    textareaRef.current.selectionStart =
      cursorStart + tag.length + selectedText.length;
    textareaRef.current.selectionEnd =
      cursorStart + selectedText.length + tag.length;
  };

  return (
    <Button
      variant="text"
      color="secondary"
      onClick={handleClick}
      size="small"
      {...buttonProps}
    >
      {children}
    </Button>
  );
}

export default DecorationTag;
