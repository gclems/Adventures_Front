import { useRef } from "react";

import { useQuery } from "react-query";

import AdventuresApi from "~/apis/adventures.api";
import Button from "~/components/html/button/Button";
import DataLoader from "~/components/html/dataLoader/DataLoader";

import CreateModal from "./component/CreateModal";

function AdventuresListPage() {
  const adventuresQuery = useQuery(AdventuresApi.list());
  const createModal = useRef();

  return (
    <DataLoader queries={adventuresQuery}>
      {() => (
        <>
          <div className="">
            <Button
              onClick={() => {
                createModal?.current?.open();
              }}
            >
              <div className="flex items-center">
                <i className="fa-solid fa-plus" />
                &nbsp;Créer une aventure
              </div>
            </Button>
            {adventuresQuery.data.length === 0 && <div>Aucune aventure</div>}
            {adventuresQuery.data.length > 0 && (
              <ul>
                {adventuresQuery.data.map((a) => (
                  <li key={a.id}>
                    <Button to={`adventures/${a.id}`} variant="text">
                      {a.name}
                    </Button>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <CreateModal ref={createModal} />
        </>
      )}
    </DataLoader>
  );
}

export default AdventuresListPage;
