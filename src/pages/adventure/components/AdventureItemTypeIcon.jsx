import { useEffect, useState } from "react";

import RPGIcon from "~/components/html/rpgIcon/RPGIcon";
import useAdventure from "~/hooks/useAdventure";

function AdventureItemTypeIcon({ item }) {
  const [iconName, setIconName] = useState();

  const { config } = useAdventure();

  useEffect(() => {
    let iconName = null;
    if (item.iconOverride) {
      iconName = item.iconOverride;
    } else if (item.typeId) {
      const type = config?.itemTypes?.filter((t) => t.id === item.typeId);
      if (type) {
        iconName = type[0].icon;
      }
    }

    setIconName(iconName);
  }, [config.itemTypes, item]);

  return iconName && <RPGIcon name={iconName} />;
}

export default AdventureItemTypeIcon;
