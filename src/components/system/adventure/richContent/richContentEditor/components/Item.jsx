import Button from "~/components/html/button/Button";

function Item({ textareaRef }) {
  // const handleClick = () => {
  //   if (!textareaRef?.current) return;

  //   const ref = textareaRef.current;

  //   const cursorStart = ref.selectionStart;
  //   const cursorEnd = ref.selectionEnd;

  //   const textBefore = ref.value.substring(0, cursorStart);
  //   const textAfter = ref.value.substring(cursorEnd);
  //   const selectedText = ref.value.substring(cursorStart, cursorEnd);

  //   const newContent = `${textBefore}\n${tag} ${selectedText}\n${textAfter}`;

  //   textareaRef.current.value = newContent;
  //   textareaRef.current.dispatchEvent(new Event("input", { bubbles: true }));
  //   textareaRef.current.focus();

  //   textareaRef.current.selectionStart = cursorStart + tag.length + 2;
  //   textareaRef.current.selectionEnd =
  //     cursorStart + selectedText.length + tag.length + 2;
  // };

  const onClick = () => {
    console.log("click click");
  };

  return (
    <Button
      variant="text"
      color="secondary"
      onClick={onClick}
      size="small"
      title="Lier une autre fiche"
    >
      <i className="fa-solid fa-paperclip" />
    </Button>
  );
}

export default Item;
