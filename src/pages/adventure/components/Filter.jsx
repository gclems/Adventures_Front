import { useState } from "react";

import Button from "~/components/html/button/Button";
import Input from "~/components/html/input/Input";
import useAdventure from "~/hooks/useAdventure";

function Filter() {
  const [active, setActive] = useState();
  const { searchFilter, setSearchFilter } = useAdventure();

  return (
    <div className="flex h-10 items-center">
      <Button
        variant="text"
        onClick={() => {
          setActive(!active);
          setSearchFilter("");
        }}
        size="small"
        title="Filtrer"
      >
        <i className="fa-solid fa-filter" />
      </Button>
      {active && (
        <Input
          noForm
          id="search"
          name="search"
          value={searchFilter}
          onInput={(e) => {
            setSearchFilter(e.target.value);
          }}
          endContent={
            <Button
              variant="ghost"
              color="secondary"
              size="small"
              onClick={() => {
                setSearchFilter("");
                setActive(false);
              }}
            >
              <i className="fa-solid fa-x" />
            </Button>
          }
        />
      )}
    </div>
  );
}

export default Filter;
