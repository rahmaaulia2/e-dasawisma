import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import NavbarBaru from "./NavbarBaru";

export default function MainLayout() {
  return (
    <>
      <div className="relative w-full">
        <Navbar />
        {/* <NavbarBaru/> */}
        <Outlet />
      </div>
    </>
  );
}
