import clsx from "clsx";
import _ from "lodash";

import StringHelper from "~/helpers/StringHelper";
import useAdventure from "~/hooks/useAdventure";
import useItemsTree, { ProvideItems } from "~/hooks/useItemsTree";
import useToggle from "~/hooks/useToggle";

function ItemsList({ items }) {
  return (
    <ul>
      {_.orderBy(items, "order").map((i) => (
        <Item key={i.id} item={i} />
      ))}
    </ul>
  );
}

function Item({ item }) {
  const [opened, toggle] = useToggle(false);
  const { selectedItem, setSelectedItem, searchFilter } = useItemsTree();

  // hide if not in search filter & not selected
  if (selectedItem !== item && !StringHelper.isNullOrEmpty(searchFilter)) {
    const filter = searchFilter.toLowerCase();
    if (!item.name.toLowerCase().includes(filter)) {
      let subItemVisible = false;

      if (item.items?.length > 0) {
        item.items.forEach((i) => {
          if (i.name.toLowerCase().includes(filter) || selectedItem === i) {
            subItemVisible = true;
          }
        });
      }

      if (!subItemVisible) {
        return null;
      }
    }
  }

  return (
    <li className="pl-1 py-1 border-l border-gray-500">
      <div
        className={clsx("flex items-center", {
          "bg-pink-200": selectedItem === item,
        })}
      >
        <div className="w-4 flex items-center">
          {item.items?.length > 0 && (
            <button className="appearance-none" onClick={toggle}>
              <i
                className={clsx("fa-regular", {
                  "fa-minus-square": opened,
                  "fa-plus-square": !opened,
                })}
              />
            </button>
          )}
        </div>
        <button
          className="appearance-none flex-1 text-left items-start justify-start"
          onClick={() => setSelectedItem(item)}
        >
          {item.name}
        </button>
      </div>
      {opened && item.items?.length > 0 && (
        <div className="ml-4">
          <ItemsList items={item.items} />
        </div>
      )}
    </li>
  );
}

function SearchFilter() {
  const { searchFilter, setSearchFilter } = useItemsTree();

  return (
    <input
      type="text"
      placeholder="Filtrer..."
      onInput={(e) => setSearchFilter(e.target.value)}
      value={searchFilter ?? ""}
    />
  );
}

function AdventureItemsTree({ onSelect }) {
  const { items } = useAdventure();

  return (
    <ProvideItems>
      <>
        <SearchFilter />
        <ItemsList items={items} />
      </>
    </ProvideItems>
  );
}

export default AdventureItemsTree;
