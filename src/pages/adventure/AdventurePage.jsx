import { useQuery } from "react-query";
import { useParams } from "react-router-dom";

import AdventuresApi from "~/apis/adventures.api";
import DataLoader from "~/components/html/dataLoader/DataLoader";

import AdventureNotebook from "./components/AdventureNotebook";

function AdventurePage() {
  const { id } = useParams();

  const adventureQuery = useQuery(AdventuresApi.get(id, ["items"]));
  const configQuery = useQuery(AdventuresApi.getConfig());

  return (
    <DataLoader queries={[adventureQuery, configQuery]}>
      {() => (
        <AdventureNotebook
          adventure={adventureQuery.data}
          config={configQuery.data}
        />
      )}
    </DataLoader>
  );
}

export default AdventurePage;
