import {
  useContext,
  createContext,
  useState,
  useCallback,
  useEffect,
} from "react";

import _ from "lodash";
import { emitCustomEvent } from "react-custom-events";

const adventureContext = createContext();

export function ProvideAdventure({ initialData, config, children }) {
  const data = useProvideAdventure(initialData, config);

  return (
    <adventureContext.Provider value={data}>
      {children}
    </adventureContext.Provider>
  );
}

const useAdventure = () => {
  return useContext(adventureContext);
};

export default useAdventure;

function useProvideAdventure(initialData, config) {
  const [adventure, setAdventure] = useState(initialData);
  const [structuredItems, setStructuredItems] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchFilter, setSearchFilter] = useState(null);

  useEffect(() => {
    const items = [];

    if (adventure?.items) {
      const itemsById = {};
      const itemsWithParent = [];

      _.orderBy(adventure.items, "order").forEach((i) => {
        i.items = [];
        itemsById[i.id] = i;

        if (i.parentId) {
          itemsWithParent.push(i);
        } else {
          items.push(i);
        }
      });

      itemsWithParent.forEach((i) => {
        const parent = itemsById[i.parentId];

        if (parent) {
          parent.items.push(i);
        }
      });
    }

    setStructuredItems(items);
  }, [adventure?.item]);

  const updateAdventureName = useCallback((newName) => {
    setAdventure({
      ...adventure,
      name: newName,
    });
  }, []);

  const updateAdventureItem = useCallback(
    (item, newValues) => {
      let changed = false;

      let allItems = [...structuredItems];

      if (
        Object.prototype.hasOwnProperty.call(newValues, "name") &&
        item.name !== newValues.name
      ) {
        item.name = newValues.name;
        changed = true;
      }

      if (
        Object.prototype.hasOwnProperty.call(newValues, "currentStatus") &&
        item.currentStatus !== newValues.currentStatus
      ) {
        item.currentStatus = newValues.currentStatus;
        changed = true;
      }

      if (
        Object.prototype.hasOwnProperty.call(newValues, "parentId") &&
        item.parentId !== newValues.parentId
      ) {
        // TO DO
      } else if (
        Object.prototype.hasOwnProperty.call(newValues, "order") &&
        item.order !== newValues.order
      ) {
        const parent = item.parentId
          ? findItemById(allItems, item.parentId)
          : null;
        const siblings = parent?.items ?? allItems;

        // remove item
        siblings.splice(siblings.indexOf(item), 1);

        // place it at its new position
        siblings.splice(newValues.order - 1, 0, item);

        // update orders
        siblings.forEach((item, index) => {
          item.order = index + 1;
        });

        // replace parent items
        if (parent) {
          parent.items = siblings;
        } else {
          allItems = siblings;
        }

        changed = true;
      }

      if (changed) {
        setStructuredItems(allItems);
      }
    },
    [structuredItems],
  );

  const addItem = useCallback(
    (item) => {
      if (!item.items) {
        item.items = [];
        item.created = true;
      }

      const allItems = [...structuredItems];
      let parent = null;
      if (item.parentId) {
        parent = findItemById(allItems, item.parentId);
      }

      if (parent) {
        item.order = parent.items.length + 1;
        parent.items.push(item);
      } else {
        item.order = allItems.length + 1;
        allItems.push(item);
      }

      setStructuredItems(allItems);

      if (item.parentId) {
        setSelectedItem(item);
      }

      emitCustomEvent("itemAdded", { item });
    },
    [structuredItems],
  );

  const removeItem = useCallback(
    (item) => {
      const allItems = [...structuredItems];
      const itemToRemove = findItemById(allItems, item.id);

      if (!itemToRemove.parentId) {
        allItems.splice(allItems.indexOf(itemToRemove), 1);
      } else {
        const parent = findItemById(allItems, itemToRemove.parentId);
        parent?.items.splice(parent?.items.indexOf(itemToRemove), 1);
      }

      setStructuredItems(allItems);
      setSelectedItem(null);
    },
    [structuredItems],
  );

  const findItemById = useCallback((items, id) => {
    let item = null;
    let i = 0;
    while (i < items.length && !item) {
      if (items[i].id === id) {
        item = items[i];
      } else if (items[i].items?.length > 0) {
        item = findItemById(items[i].items, id);
      }

      i++;
    }

    return item;
  }, []);

  // Return the user object and adventure methods
  return {
    adventure,
    config,
    items: structuredItems,
    selectedItem,
    searchFilter,
    setSelectedItem,
    setSearchFilter,
    updateAdventureName,
    updateAdventureItem,
    addItem,
    removeItem,
    findItemById,
  };
}
