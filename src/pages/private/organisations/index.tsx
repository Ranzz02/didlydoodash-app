import OrganisationItem from "@/components/organisation/Item";
import { loadOrganisations } from "@/services/organisations";
import { useQuery } from "react-query";
import "@/styles/pages/organisations/index.css";

export default function OrganisationsIndex() {
  const { data: organisations, isLoading } = useQuery({
    queryKey: ["organisations"],
    queryFn: loadOrganisations,
  });

  return (
    <div className="organisations_container">
      <h1 className="title">Organisations</h1>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="orgList">
          {organisations?.map((org) => (
            <OrganisationItem key={org.id} organisation={org} />
          ))}
        </div>
      )}
    </div>
  );
}
