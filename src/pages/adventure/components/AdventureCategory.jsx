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
            <div className="absolute right-5 top-1 flex items-center">
              <ItemMovebar item={categoryItem} horizontal />
            </div>
            <div className="absolute right-px top-1 flex items-center">
              <ItemToolbar item={categoryItem} />
            </div>
          </>
        }
      </div>
    </>
  );
}

export default AdventureCategory;
