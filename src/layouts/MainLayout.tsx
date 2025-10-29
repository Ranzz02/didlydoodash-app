import { Outlet } from "react-router-dom";
import SideBar from "@/components/ui/nav/side/SideBar";
import NavBar from "@/components/ui/nav/main/NavBar";

export default function MainLayout() {
  return (
    <>
      <NavBar />
      <main className="main-container">
        <SideBar />
        <div className="page-container">
          <Outlet />
        </div>
      </main>
    </>
  );
}
