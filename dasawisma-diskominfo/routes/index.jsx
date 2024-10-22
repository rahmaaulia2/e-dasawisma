import { createBrowserRouter, redirect } from "react-router-dom";
import MainLayout from "../src/components/MainLayout";
import Login from "../src/pages/Login";
import Landpage from "../src/pages/Landpage";
import Dasawisma from "../src/pages/Dasawisma";
import AddUser from "../src/pages/AddUser";
import Dashboard from "../src/pages/Dashboard";
import TableUser from "../src/components/TableUser";
import TableLaporan from "../src/components/TableLaporan";

const loader = () => {
  if (!localStorage.access_token || localStorage.access_token === "undefined") {
    return redirect('/login')
  }
  return null
}

const router = createBrowserRouter([
  {
    element: <MainLayout/>,
    children :[{
      path : "/",
      element : <Landpage/>
    }, {
      path : "/dasawisma",
      element : <Dasawisma/>,
      loader : loader
    },{
      path : "/addUser",
      element :<AddUser/>,
      loader : loader
    }, {
      path : "/dashboard",
      element : <Dashboard/>,
      loader : loader
    }, {
      path : "/users",
      element : <TableUser/>,
      loader : loader
    }, {
      path :"/laporan",
      element :<TableLaporan/>,
      loader : loader
    }]
  },{
    path : "/login",
    element : <Login/>
  }
]);

export default router;
