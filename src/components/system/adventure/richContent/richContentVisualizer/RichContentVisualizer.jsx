import { useEffect, useState } from "react";

import { useMutation } from "react-query";

import AdventureItemsApi from "~/apis/adventuresItems.api";
import Radiobutton from "~/components/html/radiobutton/Radiobutton";
import useAdventure from "~/hooks/useAdventure";
import useLoader from "~/hooks/useLoader";
import AdventureItemTypeIcon from "~/pages/adventure/components/AdventureItemTypeIcon";

import RichContentParser from "./components/RichContentParser";

function RichContentVisualizer({ item, readonly = false, actions = null }) {
  const { adventure, config, updateAdventureItem } = useAdventure();
  const [type, setType] = useState();
  const [typeGroup, setTypeGroup] = useState();
  const loader = useLoader();

  const changeStatusMutation = useMutation(
    AdventureItemsApi.update(adventure.id, item.id),
  );

  useEffect(() => {
    if (item.typeId) {
      const type = config.itemTypes.filter((t) => t.id === item.typeId)[0];
      setType(type);

      if (type) {
        setTypeGroup(config.itemGroups.filter((g) => g.id === type.groupId)[0]);
      }
    } else {
      setType(null);
      setTypeGroup(null);
    }
  }, [item]);

  const onStatusClick = (statusCode) => {
    loader.show("Sauvegarde...");
    changeStatusMutation.mutate(
      {
        currentStatus: statusCode,
      },
      {
        onError: (error) => {
          console.log("onError", error);
        },
        onSuccess: () => {
          updateAdventureItem(item, { currentStatus: statusCode });
        },
        onSettled: () => {
          loader.hide();
        },
      },
    );
  };

  return (
    <div className="h-full flex-1 border-4 border-ocre-500 bg-gradient-to-br from-paper-500 via-paper-400 to-paper-500 p-4 text-gray-800">
      <div className="flex items-center">
        <div className="flex flex-1 items-center gap-x-2 text-2xl text-ocre-500">
          <AdventureItemTypeIcon item={item} />
          {item.name}
        </div>
        {actions && <div className="flex flex-none">{actions}</div>}
      </div>
      {(type || typeGroup) && (
        <>
          <div className="my-2 h-px w-full bg-ocre-500" />
          <div className="flex items-center gap-x-4">
            <div className="flex-none">{type?.name}</div>
            {!readonly && (
              <div className="flex flex-1 items-center">
                <Radiobutton
                  options={typeGroup?.statuses.map((s, i) => ({
                    value: s.code,
                    label: s.label,
                  }))}
                  selectedValue={item.currentStatus}
                  onChange={onStatusClick}
                />
              </div>
            )}
          </div>
        </>
      )}
      <div className="my-2 h-1 w-full bg-ocre-500" />
      <RichContentParser content={item?.content} />
    </div>
  );
}

export default RichContentVisualizer;
