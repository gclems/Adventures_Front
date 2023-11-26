import ItemMovebar from "./ItemMovebar";
import ItemToolbar from "./ItemToolbar";

function AdventureCategory({ categoryItem }) {
  return (
    <>
      <div className="relative flex flex-none items-center gap-x-2 border-b-2 border-gray-800 px-2 py-1">
        {
          <>
            <div className="flex-1 flex-nowrap truncate">
              {categoryItem.name}
            </div>
            <ItemMovebar item={categoryItem} horizontal />
            <ItemToolbar item={categoryItem} />
          </>
        }
      </div>
    </>
  );
}

export default AdventureCategory;
