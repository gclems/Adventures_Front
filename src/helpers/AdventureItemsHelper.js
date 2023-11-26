import StringHelper from "./StringHelper";

export default class AdventureItemsHelper {
  static isAllowedByFilter = (item, searchFilter, selectedItem) => {
    if (StringHelper.isNullOrEmpty(searchFilter)) {
      return true;
    }

    if (selectedItem === item) {
      return true;
    }

    if (item.name.toLowerCase().includes(searchFilter.toLowerCase())) {
      return true;
    }

    return false;
  };

  static isSubItemAllowedByFilter = (item, searchFilter, selectedItem) => {
    if (StringHelper.isNullOrEmpty(searchFilter)) {
      return true;
    }

    if (item.items) {
      let found = false;
      item.items.forEach((si) => {
        if (
          AdventureItemsHelper.isAllowedByFilter(
            si,
            searchFilter,
            selectedItem,
          ) ||
          AdventureItemsHelper.isSubItemAllowedByFilter(
            si,
            searchFilter,
            selectedItem,
          )
        ) {
          found = true;
        }
      });

      if (found) {
        return found;
      }
    }

    return false;
  };

  static isSubItemSelected = (subItems, selectedItem) => {
    if (subItems) {
      let found = false;
      subItems.forEach((si) => {
        if (
          si === selectedItem ||
          AdventureItemsHelper.isSubItemSelected(si.items, selectedItem)
        ) {
          found = true;
        }
      });

      return found;
    }

    return false;
  };
}
