import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../src/components/MainLayout";
import Login from "../src/pages/Login";
import Landpage from "../src/pages/Landpage";
import Dasawisma from "../src/pages/Dasawisma";
import AddUser from "../src/pages/AddUser";
import Dashboard from "../src/pages/Dashboard";
import TableUser from "../src/components/TableUser";
import TableLaporan from "../src/components/TableLaporan";

const router = createBrowserRouter([
  {
    element: <MainLayout/>,
    children :[{
      path : "/",
      element : <Landpage/>
    }, {
      path : "/dasawisma",
      element : <Dasawisma/>
    },{
      path : "/addUser",
      element :<AddUser/>
    }, {
      path : "/dashboard",
      element : <Dashboard/>
    }, {
      path : "/users",
      element : <TableUser/>
    }, {
      path :"/laporan",
      element :<TableLaporan/>
    }]
  },{
    path : "/leubeut",
    element : <Login/>
  }
]);

export default router;
