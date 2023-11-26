import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

function MarkdownBlock({ content }) {
  return <Markdown remarkPlugins={[remarkGfm]}>{content}</Markdown>;
}

export default MarkdownBlock;
