import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

export default function MainLayout() {
  return (
    <>
      <div className="relative w-full">
        <Navbar />
        <Outlet />
      </div>
    </>
  );
}
