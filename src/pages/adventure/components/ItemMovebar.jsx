import clsx from "clsx";
import { useMutation } from "react-query";

import AdventureItemsApi from "~/apis/adventuresItems.api";
import Button from "~/components/html/button/Button";
import useAdventure from "~/hooks/useAdventure";
import useLoader from "~/hooks/useLoader";
import useToggle from "~/hooks/useToggle";

function ItemMovebar({
  className,
  item,
  vertical = false,
  horizontal = false,
}) {
  const [anchored, toggleAnchored] = useToggle(false);
  const { adventure, updateAdventureItem } = useAdventure();

  const loader = useLoader();

  const updateNameMutation = useMutation(
    AdventureItemsApi.update(adventure.id, item.id),
  );

  const changeOrder = (newOrder) => {
    loader.show("Sauvegarde...");
    updateNameMutation.mutate(
      { order: newOrder },
      {
        onError: (error) => {
          console.log("onError", error);
        },
        onSuccess: () => {
          updateAdventureItem(item, { order: newOrder });
        },
        onSettled: () => {
          loader.hide();
        },
      },
    );
  };

  const moveUp = () => {
    changeOrder(Math.max(1, item.order - 1));
  };
  const moveDown = () => {
    changeOrder(item.order + 1);
  };

  return (
    <div
      className={clsx(
        "group absolute right-4 flex flex-none items-center border bg-zinc-600 text-xs",
        className,
        {
          "border-zinc-400 ": anchored,
          "border-zinc-600 hover:border-zinc-500": !anchored,
        },
      )}
    >
      <div
        className={clsx({
          "hidden group-hover:flex flex-none": !anchored,
          "flex flex-none": anchored,
        })}
      >
        {horizontal && (
          <>
            <Button
              variant="text"
              size="small"
              title=""
              onClick={() => {
                moveUp();
              }}
            >
              <i className="fa-solid fa-arrow-left" />
            </Button>
            <Button
              variant="text"
              size="small"
              title=""
              onClick={() => {
                moveDown();
              }}
            >
              <i className="fa-solid fa-arrow-right" />
            </Button>
          </>
        )}
        {vertical && (
          <>
            <Button
              variant="text"
              size="small"
              title=""
              onClick={() => {
                moveUp();
              }}
            >
              <i className="fa-solid fa-arrow-up" />
            </Button>
            <Button
              variant="text"
              size="small"
              title=""
              onClick={() => {
                moveDown();
              }}
            >
              <i className="fa-solid fa-arrow-down" />
            </Button>
          </>
        )}
      </div>
      <Button variant="ghost" size="fit" onClick={toggleAnchored}>
        <div
          className={clsx("transition-all duration-500", {
            "group-hover:rotate-45 group-hover:opacity-100 opacity-50":
              !anchored,
            "rotate-45 opacity-100": anchored,
          })}
        >
          <i className="fa-solid fa-up-down-left-right opacity-50" />
        </div>
      </Button>
    </div>
  );
}

export default ItemMovebar;
