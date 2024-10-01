import { Outlet } from "react-router-dom";
import Navbar2 from "./Navbar2";

export default function MainLayout() {
  return (
    <>
      <div className="relative w-full">
        <Navbar2 />
        <Outlet />
      </div>
    </>
  );
}
