import Button from "~/components/html/button/Button";

function Vitals({ textareaRef }) {
  const handleClick = () => {
    if (!textareaRef?.current) return;

    const ref = textareaRef.current;

    const cursorStart = ref.selectionStart;
    const cursorEnd = ref.selectionEnd;

    const textBefore = ref.value.substring(0, cursorStart);
    const textAfter = ref.value.substring(cursorEnd);

    const text = `\n:::vitals{values=0,0,0}\n:::\n`;

    const newContent = `${textBefore}${text}${textAfter}`;

    textareaRef.current.value = newContent;
    textareaRef.current.dispatchEvent(new Event("input", { bubbles: true }));
    textareaRef.current.focus();

    textareaRef.current.selectionStart = cursorStart + 18;
    textareaRef.current.selectionEnd = cursorStart + 23;
  };

  return (
    <Button
      variant="text"
      color="secondary"
      onClick={handleClick}
      size="small"
      title={`Classe d'armure\nPoints de vie\nVitesse`}
    >
      <i className="fa-solid fa-heart-pulse" />
    </Button>
  );
}

export default Vitals;
