import { useAuth } from "@/context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import "./navBar.css";
import Avatar from "@/components/ui/Avatar";
import ThemeToggle from "@/components/ui/ThemeToggle";

export default function NavBar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="header">
      <Link to={"/"}>
        <h1 className="header-title">DidlydooDash</h1>
      </Link>
      <ThemeToggle />
      {user && (
        <div className="header-profile">
          <div id="basic-button">
            <Avatar />
          </div>
        </div>
      )}
    </header>
  );
}
