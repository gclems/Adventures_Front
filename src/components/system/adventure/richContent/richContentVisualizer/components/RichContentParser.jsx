import RichBlock from "./RichBlock";

function RichContentParser({ content = [] }) {
  return (
    <div className="grid gap-y-4">
      {(!content || content.length === 0) && <i>Cette fiche est vide.</i>}
      {content?.map((c, i) => (
        <div key={i}>
          <RichBlock block={c} />
        </div>
      ))}
    </div>
  );
}

export default RichContentParser;
