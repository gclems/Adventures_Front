import { useEffect, useRef, useState } from "react";

import { useMeasure } from "@uidotdev/usehooks";
import { emitCustomEvent } from "react-custom-events";
import { useMutation } from "react-query";

import AdventureItemsApi from "~/apis/adventuresItems.api";
import Button from "~/components/html/button/Button";
import useAdventure, { ProvideAdventure } from "~/hooks/useAdventure";
import useLoader from "~/hooks/useLoader";

import AdventureCategory from "./AdventureCategory";
import AdventureItemsList from "./AdventureItemsList";
import AdventureItemVisualizer from "./AdventureItemVisualizer";
import AdventureName from "./AdventureName";
import Filter from "./Filter";

function AdventureNotebook({ adventure, config }) {
  return (
    <ProvideAdventure initialData={adventure} config={config}>
      <InnerComp />
    </ProvideAdventure>
  );
}

function InnerComp() {
  const { adventure, items, addItem, selectedItem } = useAdventure();
  const loader = useLoader();

  const [columnsContainer, { width: columnsContainerWidth }] = useMeasure();
  const [draggingIndex, setDraggingIndex] = useState(null);
  const dragStartX = useRef();
  const [columnsFlex, setColumnsFlex] = useState([]);

  const createCategoryMutation = useMutation(
    AdventureItemsApi.create(adventure.id),
  );

  const onAddCategory = () => {
    loader.show("Sauvegarde...");
    createCategoryMutation.mutate(
      {
        parentId: null,
        name: "New category",
        content: "",
      },
      {
        onError: (error) => {
          console.log("onError", error);
        },
        onSuccess: (data) => {
          addItem(data);
        },
        onSettled: () => {
          loader.hide();
        },
      },
    );
  };

  const onMouseDown = (e, index) => {
    setDraggingIndex(index);
    dragStartX.current = e.pageX;
    e.preventDefault();
  };

  const onMouseMove = (e) => {
    if (draggingIndex === null) return;

    const newFlexes = [...columnsFlex];

    const deltaX = e.pageX - dragStartX.current;
    const deltaXPercentage = (deltaX / columnsContainerWidth) * 100;

    newFlexes[draggingIndex] += deltaXPercentage;

    if (newFlexes.length >= draggingIndex + 1) {
      newFlexes[draggingIndex + 1] -= deltaXPercentage;
    }

    dragStartX.current = e.pageX;
    setColumnsFlex(newFlexes);
  };

  const onMouseUp = () => {
    setDraggingIndex(null);
    dragStartX.current = null;
  };

  useEffect(() => {
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };
  }, [draggingIndex, onMouseMove, onMouseUp]);

  useEffect(() => {
    if (items) {
      const newFlex = [];
      items.forEach(() => {
        newFlex.push(50 / items.length);
      });

      newFlex.push(50);
      setColumnsFlex(newFlex);
    }
  }, [columnsFlex.length, items]);

  return (
    <div className="flex h-screen max-h-screen min-h-screen flex-col overflow-hidden">
      <div className="flex h-10 w-full justify-between border-b-2 border-gray-800 px-4">
        <div className="flex flex-1 items-center">
          <h1 className="text-2xl">Adventures</h1>
          <div className="mx-8 h-full w-[2px] bg-zinc-700" />
          <AdventureName />
        </div>
        <div className="flex flex-none items-center">
          <i className="fa-regular fa-user" />
          &nbsp;Gclems
        </div>
      </div>
      <div className="flex w-full border-b-2 border-gray-800 px-4">
        <Filter />
      </div>

      <div className="flex h-full flex-1">
        <div className="flex flex-none flex-col items-start justify-start gap-y-2 pt-1">
          <Button
            variant="text"
            size="small"
            title="Ajouter une catégorie"
            onClick={onAddCategory}
          >
            <i className="fa-solid fa-plus" />
          </Button>
          <div className="h-[2px] w-full bg-zinc-800" />
          <Button
            variant="text"
            title="Tout étendre"
            size="small"
            onClick={() => {
              emitCustomEvent("expandAllItems");
            }}
          >
            <i className="fa-light fa-square-plus" />
          </Button>
          <Button
            variant="text"
            title="Tout fermer"
            size="small"
            onClick={() => {
              emitCustomEvent("collapsAllItems");
            }}
          >
            <i className="fa-light fa-square-minus" />
          </Button>
        </div>

        <div
          ref={columnsContainer}
          className="flex w-full border-l-[2px] border-gray-800"
        >
          {columnsContainerWidth &&
            items &&
            items.length > 0 &&
            columnsFlex.length > 0 &&
            items.map((c, index) => (
              <div
                key={c.id}
                style={{
                  flex: columnsFlex[index],
                }}
              >
                <div className="flex h-full">
                  <div className="min-w-[150px] flex-1">
                    <div>
                      <AdventureCategory categoryItem={c} />
                    </div>
                    <div className="h-full flex-1 overflow-y-auto text-ellipsis">
                      <AdventureItemsList items={c.items} />
                    </div>
                  </div>
                  <div
                    onMouseDown={(e) => onMouseDown(e, index)}
                    className="h-full w-[2px] flex-none cursor-col-resize bg-gray-800"
                  />
                </div>
              </div>
            ))}
          <div
            className="flex min-w-[800px] overflow-y-auto"
            style={{ flex: columnsFlex[items?.length ?? 0] }}
          >
            <AdventureItemVisualizer item={selectedItem} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdventureNotebook;
