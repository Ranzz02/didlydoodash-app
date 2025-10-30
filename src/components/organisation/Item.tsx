import { Organisation } from "@/utils/types";
import styles from "./item.module.css";
import { useOrgStore } from "@/stores/organisation";
import { useNavigate } from "react-router-dom";

export interface ItemProps {
  organisation: Organisation;
}

function OrganisationItem({ organisation }: ItemProps) {
  const { setOrganisation } = useOrgStore();
  const navigate = useNavigate();

  const handleSelect = () => {
    setOrganisation(organisation);
    navigate(`/organisations/view/${organisation.slug}`);
  };

  return (
    <div className={styles.orgItem} onClick={handleSelect}>
      <h1 className={styles.orgTitle}>{organisation.name}</h1>
      {organisation.description && (
        <p className={styles.orgDescription}>{organisation.description}</p>
      )}
      <div>
        {organisation.timezone && (
          <p className={styles.orgTimezone}>{organisation.timezone}</p>
        )}
      </div>
    </div>
  );
}

export default OrganisationItem;
