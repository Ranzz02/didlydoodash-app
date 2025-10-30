import { NavLink, Outlet } from "react-router-dom";
import "@/styles/layouts/organisation.css";

import { FaBackspace } from "react-icons/fa";

export default function OrganisationLayout() {
  return (
    <div className="organisation_layout">
      <header className="organisation_header">
        <NavLink to="/organisations" className="org_back">
          <FaBackspace size={25} />
          Close
        </NavLink>
        <nav className="org_nav">
          <NavLink
            className={({ isActive }) => `${isActive && "active"}`}
            to="."
            end
          >
            Overview
          </NavLink>
          <NavLink
            className={({ isActive }) => `${isActive && "active"}`}
            to="projects"
          >
            Projects
          </NavLink>
          <NavLink
            className={({ isActive }) => `${isActive && "active"}`}
            to="chats"
          >
            Chats
          </NavLink>
          <NavLink
            className={({ isActive }) => `${isActive && "active"}`}
            to="settings"
          >
            Settings
          </NavLink>
        </nav>
      </header>

      <section id="organisation" className="organisation_content">
        <Outlet />
      </section>
    </div>
  );
}
