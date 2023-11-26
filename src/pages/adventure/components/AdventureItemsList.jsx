import AdventureItem from "./AdventureItem";

function AdventureItemsList({ items }) {
  return (
    <ul className="flex-1">
      {items.map((i) => (
        <AdventureItem key={i.id} item={i} />
      ))}
    </ul>
  );
}

export default AdventureItemsList;
