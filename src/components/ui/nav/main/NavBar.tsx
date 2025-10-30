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
    <header className="nav_container">
      <Link className="nav_title" to={"/"}>
        DidlydooDash
      </Link>
      <div className="nav_nav">
        <ThemeToggle />
        {user && (
          <div className="nav_profile">
            <Avatar />
          </div>
        )}
      </div>
    </header>
  );
}
