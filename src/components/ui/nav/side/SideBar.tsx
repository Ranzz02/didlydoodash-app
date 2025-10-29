import { useState } from "react";
import { Organisation } from "@/utils/types";
import { useQuery } from "react-query";
import clsx from "clsx";
import styles from "./sidebar.module.css";

import { FaLongArrowAltLeft } from "react-icons/fa";
import { FaLongArrowAltRight } from "react-icons/fa";
import { IoHome, IoChatbox } from "react-icons/io5";
import { MdAddBox, MdSpaceDashboard } from "react-icons/md";

import { API } from "@/services/api";
import { toast } from "react-toastify";
import { useOrgStore } from "@/stores/organisation";
import { useNotification } from "@/context/NotificationContext";
import { NavItem } from "./NavItem";
import Tooltip from "../../Tooltip";
import Select from "../../Select";
import Badge from "../../Badge";

const NAV_ICON_SIZE = 25;

export default function SideBar() {
  const { isLoading, error } = useQuery<Organisation[], Error>(
    "organisations",
    organisationLoader,
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
        <Tooltip
          enabled={open}
          title={
            organisation
              ? `Organisation: ${organisation.name}`
              : "Choose organisation"
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
      )}

      {/* Create org link */}
      <NavItem
        to="/organisations/create"
        text="Create"
        icon={<MdAddBox size={NAV_ICON_SIZE} />}
        tooltip="New organisation"
        open={open}
      />
      {organisation && organisations && organisations.length > 0 && (
        <>
          <NavItem
            to={"/organisations"}
            text="Dashboard"
            icon={<MdSpaceDashboard size={NAV_ICON_SIZE} />}
            tooltip="Dashboard for organisation"
            open={open}
          />
          <NavItem
            to={"/organisations/chats"}
            text="Chats"
            icon={
              <Badge
                content={Array.from(badges.values()).reduce(
                  (sum, value) => sum + value,
                  0
                )}
                variant="contrast"
              >
                <IoChatbox size={NAV_ICON_SIZE} />
              </Badge>
            }
            tooltip="Organisation chats"
            open={open}
          />
        </>
      )}
    </div>
  );
}

// Loader
const organisationLoader = async () => {
  try {
    const result = await API.get("/organisations");
    return result.data.organisations;
  } catch (error: any) {
    toast.error(
      `Failed to get organisations error message: ${error?.message}`,
      {
        position: "top-left",
      }
    );
  }
};
