import { useState } from "react";

import Button from "~/components/html/button/Button";
import Form from "~/components/html/forms/validated/Form";
import Input from "~/components/html/forms/validated/Input";
import useAdventure from "~/hooks/useAdventure";

function Filter() {
  const [active, setActive] = useState();
  const { setSearchFilter } = useAdventure();

  return (
    <Form>
      {({ reset }) => (
        <div className="flex h-10 items-center">
          <Button
            variant="text"
            onClick={() => {
              setActive(!active);
              setSearchFilter("");
              reset();
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
                    reset();
                  }}
                >
                  <i className="fa-solid fa-x" />
                </Button>
              }
            />
          )}
        </div>
      )}
    </Form>
  );
}

export default Filter;
