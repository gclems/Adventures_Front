import { useEffect, useState } from "react";

import Markdown from "react-markdown";
import { useMutation } from "react-query";
import remarkDirective from "remark-directive";
import remarkDirectiveRehype from "remark-directive-rehype";
import remarkGfm from "remark-gfm";
import remarkImages from "remark-images";

import AdventureItemsApi from "~/apis/adventuresItems.api";
import Radiobutton from "~/components/html/radiobutton/Radiobutton";
import useAdventure from "~/hooks/useAdventure";
import useLoader from "~/hooks/useLoader";
import AdventureItemTypeIcon from "~/pages/adventure/components/AdventureItemTypeIcon";

import A from "./components/A";
import BlockQuote from "./components/BlockQuote";
import Dialog from "./components/Dialog";
import H1 from "./components/H1";
import H2 from "./components/H2";
import H3 from "./components/H3";
import H4 from "./components/H4";
import H5 from "./components/H5";
import H6 from "./components/H6";
import Hr from "./components/Hr";
import Img from "./components/Img";
import Item from "./components/Item";
import Li from "./components/Li";
import Quote from "./components/Quote";
import Stats from "./components/Stats";
import Ul from "./components/Ul";
import Vitals from "./components/Vitals";

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
    <div className="relative min-h-full border-4 border-ocre-500 bg-parchemin bg-repeat p-4 text-gray-800">
      <div className="flex items-center">
        <div className="flex flex-1 items-center gap-x-2 text-2xl text-ocre-500">
          <AdventureItemTypeIcon item={item} />
          {item.name}
        </div>
        {actions && <div className="flex flex-none">{actions}</div>}
      </div>
      {(type || typeGroup) && (
        <>
          <div className="my-2 h-[2px] w-full bg-ocre-500" />
          <div className="flex items-center gap-x-4">
            <div className="flex-none">{type?.name}</div>
            {!readonly && (
              <div className="flex flex-1 items-center">
                <Radiobutton
                  options={typeGroup?.statuses.map((s) => ({
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
      <Markdown
        className="space-y-4"
        remarkPlugins={[
          remarkGfm,
          remarkImages,
          remarkDirective,
          remarkDirectiveRehype,
        ]}
        components={{
          h1: H1,
          h2: H2,
          h3: H3,
          h4: H4,
          h5: H5,
          h6: H6,
          hr: Hr,
          a: A,
          img: Img,
          dialog: Dialog,
          blockquote: BlockQuote,
          quote: Quote,
          stats: Stats,
          vitals: Vitals,
          item: Item,
          ul: Ul,
          li: Li,
        }}
      >
        {item.content}
      </Markdown>
    </div>
  );
}

export default RichContentVisualizer;
