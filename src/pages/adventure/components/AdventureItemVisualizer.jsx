import { useEffect, useState } from "react";

import clsx from "clsx";

import Button from "~/components/html/button/Button";
import RichContentEditor from "~/components/system/adventure/richContent/richContentEditor/RichContentEditor";
import RichContentVisualizer from "~/components/system/adventure/richContent/richContentVisualizer/RichContentVisualizer";
import useAdventure from "~/hooks/useAdventure";
import useToggle from "~/hooks/useToggle";

function AdventureItemVisualizer() {
  const { selectedItem } = useAdventure();
  const [fullscreen, toggleFullscreen] = useToggle();
  const [editedItem, setEditedItem] = useState(null);

  useEffect(() => {
    setEditedItem(null);
  }, [selectedItem]);

  if (!selectedItem) {
    return (
      <div className="m-8 flex items-start">
        <i className="flex items-center gap-x-4 opacity-50">
          <i className="fa-solid fa-arrow-left" />
          Sélectionnez une fiche à afficher
        </i>
      </div>
    );
  }

  const toggleEdition = () => {
    if (editedItem) {
      setEditedItem(null);
    } else {
      setEditedItem({ ...selectedItem });
    }
  };

  const onEditedItemChange = (newItem) => {
    setEditedItem(newItem);
  };

  console.log("editedItem", editedItem?.content);

  return (
    <div
      className={clsx("grid", {
        "absolute inset-0": fullscreen,
        " w-full": !fullscreen,
        "grid-cols-2": !!editedItem,
      })}
    >
      {editedItem && (
        <div className="block  bg-zinc-500">
          <RichContentEditor item={editedItem} onChange={onEditedItemChange} />
        </div>
      )}
      <div className="block h-full flex-1">
        <RichContentVisualizer
          item={editedItem ?? selectedItem}
          actions={
            <>
              <Button
                variant="ghost"
                color="secondary"
                onClick={toggleEdition}
                title="Modifier"
              >
                {editedItem ? (
                  <i className="fa-solid fa-ban" />
                ) : (
                  <i className="fa-solid fa-pencil" />
                )}
              </Button>
              <Button
                variant="ghost"
                color="secondary"
                onClick={() => toggleFullscreen()}
                title={fullscreen ? "Réduire" : "Passer en plein écran"}
              >
                <i
                  className={clsx("fa-solid", {
                    "fa-maximize": !fullscreen,
                    "fa-minimize": fullscreen,
                  })}
                />
              </Button>
            </>
          }
        />
      </div>
    </div>
  );
}

export default AdventureItemVisualizer;
