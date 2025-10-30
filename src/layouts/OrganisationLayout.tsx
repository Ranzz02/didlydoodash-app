import { Link, Outlet, useParams } from "react-router-dom";
import "@/styles/layouts/organisation.css";

export default function OrganisationLayout() {
  const { organizationID } = useParams();

  return (
    <div className="organisation_layout">
      <header className="organisation_header">
        <Link to="/organisations" className="org_back">
          ← Organisations
        </Link>
        <h1 className="org_title">{organizationID}</h1>
        <nav className="org_nav">
          <Link to=".">Overview</Link>
          <Link to="members">Members</Link>
          <Link to="chats">Chats</Link>
          <Link to="settings">Settings</Link>
        </nav>
      </header>

      <section id="organisation" className="organisation_content">
        <Outlet />
      </section>
    </div>
  );
}
