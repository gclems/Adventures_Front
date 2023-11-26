import { useContext, createContext, useState } from "react";

const itemsContext = createContext();

export function ProvideItems({ items, children }) {
  const data = useProvideItems(items);

  return <itemsContext.Provider value={data}>{children}</itemsContext.Provider>;
}

const useItemsTree = () => {
  return useContext(itemsContext);
};

export default useItemsTree;

function useProvideItems() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchFilter, setSearchFilter] = useState(null);

  return {
    selectedItem,
    searchFilter,
    setSelectedItem,
    setSearchFilter,
  };
}
