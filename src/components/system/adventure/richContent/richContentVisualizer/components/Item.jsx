import { useEffect, useState } from "react";

import StringHelper from "~/helpers/StringHelper";
import useAdventure from "~/hooks/useAdventure";

function Item({ children }) {
  const { items, findItemById, setSelectedItem } = useAdventure();

  const [item, setItem] = useState(null);

  useEffect(() => {
    if (children && !StringHelper.isNullOrEmpty(children)) {
      setItem(findItemById(items, +children));
    } else {
      setItem(null);
    }
  }, [findItemById, children, items]);

  return (
    <>
      <button
        type="button"
        className="appearance-none text-ocre-500 underline"
        title={`Voir ${item?.name}`}
        onClick={
          item
            ? () => {
                setSelectedItem(item);
              }
            : null
        }
      >
        <i>{item?.name}</i>
      </button>
    </>
  );
}

export default Item;
