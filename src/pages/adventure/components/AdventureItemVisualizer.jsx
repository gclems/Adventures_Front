import { useEffect, useState } from "react";

import clsx from "clsx";

import Button from "~/components/html/button/Button";
import RichContentEditor from "~/components/system/adventure/richContent/richContentEditor/RichContentEditor";
import RichContentVisualizer from "~/components/system/adventure/richContent/richContentVisualizer/RichContentVisualizer";
import StringHelper from "~/helpers/StringHelper";
import useToggle from "~/hooks/useToggle";

function AdventureItemVisualizer({ item, readonly = false }) {
  const [fullscreen, toggleFullscreen] = useToggle();
  const [editedItem, setEditedItem] = useState(null);

  useEffect(() => {
    setEditedItem(null);
  }, [item]);

  if (!item) {
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
      setEditedItem({ ...item });
    }
  };

  return (
    <div
      className={clsx({
        "fixed inset-0": fullscreen,
        "w-full h-full": !fullscreen,
        "grid grid-cols-2": !!editedItem,
      })}
    >
      {editedItem && (
        <div className="h-full overflow-y-auto">
          <div className="block h-full bg-zinc-500">
            <RichContentEditor
              item={editedItem}
              onChange={setEditedItem}
              onCancel={() => {
                setEditedItem(null);
              }}
            />
          </div>
        </div>
      )}
      <div className="relative h-full w-full">
        <div className="absolute inset-0 overflow-y-auto">
          <RichContentVisualizer
            item={editedItem ?? item}
            readonly={readonly}
            actions={
              readonly ? null : (
                <>
                  <Button
                    variant="ghost"
                    color="secondary"
                    onClick={toggleEdition}
                    title="Modifier"
                  >
                    <i
                      className={clsx({
                        "fa-solid fa-ban":
                          !StringHelper.isNullOrEmpty(editedItem),
                        "fa-solid fa-pencil":
                          StringHelper.isNullOrEmpty(editedItem),
                      })}
                    />
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
              )
            }
          />
        </div>
      </div>
    </div>
  );
}

export default AdventureItemVisualizer;
