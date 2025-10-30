import { Outlet } from "react-router-dom";
import SideBar from "@/components/ui/nav/side/SideBar";
import NavBar from "@/components/ui/nav/main/NavBar";

export default function MainLayout() {
  return (
    <>
      <NavBar />
      <main className="container_main">
        <SideBar />
        <div className="container_page">
          <Outlet />
        </div>
      </main>
    </>
  );
}
