import { useState } from "react";
import { Organisation } from "@/utils/types";
import { useQuery } from "react-query";
import clsx from "clsx";
import styles from "./sidebar.module.css";

import { FaLongArrowAltLeft } from "react-icons/fa";
import { FaLongArrowAltRight } from "react-icons/fa";
import { IoHome } from "react-icons/io5";
import { MdAddBox, MdSpaceDashboard } from "react-icons/md";
import { GoOrganization } from "react-icons/go";

import { useOrgStore } from "@/stores/organisation";
import { useNotification } from "@/context/NotificationContext";
import { NavItem } from "./NavItem";
import Tooltip from "../../Tooltip";
import Select from "../../Select";
import Badge from "../../Badge";
import { loadOrganisations } from "@/services/organisations";

const NAV_ICON_SIZE = 25;

export default function SideBar() {
  const { isLoading, error } = useQuery<Organisation[], Error>(
    "organisations",
    loadOrganisations,
    {
      onSuccess: (data) => setOrganisations(data),
    }
  );

  const [open, setOpen] = useState(true);
  const { badges } = useNotification();
  const { organisation, setOrganisation, organisations, setOrganisations } =
    useOrgStore();

  const toggleOpen = () => setOpen((prev) => !prev);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className={clsx(styles.sidenav, { [styles.closed]: !open })}>
      <Tooltip
        enabled
        title={open ? "Close side bar" : "Open side bar"}
        placement="right"
      >
        <button onClick={toggleOpen} className={styles.toggle}>
          {open ? (
            <FaLongArrowAltLeft size={25} />
          ) : (
            <FaLongArrowAltRight size={25} />
          )}
        </button>
      </Tooltip>

      {/* Home link */}
      <NavItem
        to="/"
        text="Home"
        icon={<IoHome size={NAV_ICON_SIZE} />}
        open={open}
      />

      {/* Organisation selector */}
      {organisations && organisations.length > 0 && (
        <>
          <Tooltip
            enabled={open}
            title={
              organisation
                ? `Organisation: ${organisation.name}`
                : "Select an organisation"
            }
            placement="right"
            data-disabled={open}
          >
            <Select
              label="Organisations"
              className={styles.itemSelect}
              value={organisation?.id || ""}
              onChange={(e) => {
                const selected = organisations.find(
                  (org) => org.id === e.target.value
                );
                if (selected) setOrganisation(selected);
              }}
              options={organisations.map((org) => ({
                value: org.id,
                label: org.name,
              }))}
            />
          </Tooltip>
          <NavItem
            open={open}
            to="/organisations"
            tooltip="Organisations"
            text="Organisations"
            icon={<GoOrganization size={NAV_ICON_SIZE} />}
          />
        </>
      )}
      {/* Org selected links */}
      {organisation && organisations && organisations.length > 0 && (
        <>
          <NavItem
            to={`/organisations/view/${organisation.id}`}
            text="Dashboard"
            icon={<MdSpaceDashboard size={NAV_ICON_SIZE} />}
            tooltip="Dashboard for organisation"
            open={open}
          />
        </>
      )}

      {/* Create org link */}
      <NavItem
        to="/organisations/create"
        text="Create"
        icon={<MdAddBox size={NAV_ICON_SIZE} />}
        tooltip="New organisation"
        open={open}
      />
    </div>
  );
}
