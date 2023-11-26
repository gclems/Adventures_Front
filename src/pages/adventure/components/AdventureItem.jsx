import { useEffect, useState } from "react";

import clsx from "clsx";
import { useCustomEventListener } from "react-custom-events";

import AdventureItemsHelper from "~/helpers/AdventureItemsHelper";
import useAdventure from "~/hooks/useAdventure";
import useToggle from "~/hooks/useToggle";

import AdventureItemsList from "./AdventureItemsList";
import AdventureItemTypeIcon from "./AdventureItemTypeIcon";
import ItemMovebar from "./ItemMovebar";
import ItemToolbar from "./ItemToolbar";

function AdventureItem({ item }) {
  const [opened, toggle, setOpened] = useToggle(false);

  const [allowedByFilter, setAllowedByFilter] = useState(true);
  const [subItemAllowedByFilter, setSubItemAllowedByFilter] = useState(true);

  const { selectedItem, setSelectedItem, searchFilter } = useAdventure();

  useCustomEventListener("expandAllItems", () => {
    setOpened(true);
  });

  useCustomEventListener("collapsAllItems", () => {
    setOpened(false);
  });

  useCustomEventListener("itemAdded", ({ item: addedItem }) => {
    if (addedItem.parentId === item.id) {
      setOpened(true);
    }
  });

  useEffect(() => {
    setAllowedByFilter(
      AdventureItemsHelper.isAllowedByFilter(item, searchFilter, selectedItem),
    );

    setSubItemAllowedByFilter(
      AdventureItemsHelper.isSubItemAllowedByFilter(
        item,
        searchFilter,
        selectedItem,
      ),
    );
  }, [item, searchFilter, selectedItem]);

  return (
    <li
      className={clsx({
        hidden: !allowedByFilter && !subItemAllowedByFilter,
      })}
    >
      <div
        className={clsx("relative flex items-start", {
          "bg-white/10": selectedItem === item,
          "opacity-50": !allowedByFilter && subItemAllowedByFilter,
        })}
      >
        <div
          className={clsx("mt-3 h-px self-start bg-zinc-950", {
            "w-1": item.items?.length > 0,
            "w-4 mr-2": !(item.items?.length > 0),
          })}
        />
        {item.items?.length > 0 && (
          <div className=" flex items-center">
            <button className="appearance-none" onClick={toggle}>
              <i
                className={clsx("fa-regular fa-fw", {
                  "fa-minus-square": opened,
                  "fa-plus-square": !opened,
                })}
              />
            </button>
          </div>
        )}

        <button
          className="flex flex-1 appearance-none items-center justify-start gap-x-1 text-left text-sm"
          onClick={() => setSelectedItem(item)}
        >
          <div className="flex flex-1 items-center whitespace-nowrap">
            <AdventureItemTypeIcon item={item} />
            {item.name}
          </div>
        </button>

        <ItemMovebar item={item} vertical />
        <ItemToolbar item={item} />
      </div>
      {item.items?.length > 0 && (
        <div
          className={clsx("ml-4 border-l border-gray-800", {
            hidden: !opened,
          })}
        >
          <AdventureItemsList items={item.items} />
        </div>
      )}
    </li>
  );
}

export default AdventureItem;
