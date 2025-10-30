import OrganisationItem from "@/components/organisation/Item";
import { loadOrganisations } from "@/services/organisations";
import { useQuery } from "react-query";
import "@/styles/pages/home.css";

export default function HomePage() {
  const {
    data: organisations,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["organisations"],
    queryFn: loadOrganisations,
  });

  return (
    <div className="homeContainer">
      <h1 className="title">Welcome to Didlydoodash</h1>
      <p>Your one-stop dashboard for effortless organisation management.</p>
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
