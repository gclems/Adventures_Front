import JSONPretty from "react-json-pretty";

import MarkdownBlock from "./MarkdownBlock";
import StatsBlock from "./StatsBlock";

function RichBlock({ block }) {
  switch (block.type) {
    case "markdown":
      return <MarkdownBlock content={block.content} />;
    case "stats":
      return <StatsBlock content={block.content} />;
    default:
      return <JSONPretty data={block} />;
  }
}

export default RichBlock;
