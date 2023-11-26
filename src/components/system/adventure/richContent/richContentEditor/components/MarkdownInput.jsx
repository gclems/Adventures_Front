import Hidden from "~/components/html/hidden/Hidden";
import Textarea from "~/components/html/textarea/Textarea";

function MarkdownInput({ name, onChange }) {
  return (
    <div>
      <div className="text-sm">
        <i>Texte</i>
      </div>
      <Hidden name={`${name}.type`} value="markdown" />
      <Textarea
        id={`${name}.content`}
        name={`${name}.content`}
        type="text"
        onChange={onChange}
      />
    </div>
  );
}

export default MarkdownInput;
