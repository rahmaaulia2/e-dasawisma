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
  console.log(localStorage.access_token, localStorage.role);
  if (!localStorage.access_token || localStorage.access_token === "undefined") {
    return redirect('/login')
  }
  return null
}
const loaderAdmin = () => {
  if (localStorage.role !== "admin") {
    Swal.fire({
      // title: "Good job!",
      text: `you're not authorized to access this page`,
      icon: "info",
    });
    return redirect('/')
  }
  return null
}
const loaderUserAdmin = () => {
  if (localStorage.role !== "user" || localStorage.role !== "admin") {
    Swal.fire({
      title: "Not Authorized",
      text: `you're not authorized to access this page`,
      icon: "info",
    });
    return redirect('/')
  }
  return null
}
const loaderSuperUser = () => {
  if (localStorage.role !== "RT" && localStorage.role !== "RW" && localStorage.role !== "Kecamatan" && localStorage.role !== "Kelurahan" && localStorage.role !== "admin") {
    Swal.fire({
      title: "Not Authorized",
      text: `you're not authorized to access this page`,
      icon: "info",
    });
    return redirect('/')
  }
  return null
}
const combinedLoaderAdmin = async () => {
  const accessCheck = loader()
  if(accessCheck) return accessCheck
  const adminCheck = loaderAdmin()
  if(adminCheck) return adminCheck
  return null
}
const combinedLoaderUserAdmin = async () => {
  const accessCheck = loader()
  if(accessCheck) return accessCheck
  const userAdminCheck = loaderUserAdmin()
  if(userAdminCheck) return userAdminCheck
  return null
}
const combinedLoaderSuperUser = ()=>{
  const accessCheck = loader()
  if(accessCheck) return accessCheck
  const superUserCheck = loaderSuperUser()
  if(superUserCheck) return superUserCheck
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
      // loader : combinedLoaderUserAdmin
    },{
      path : "/addUser",
      element :<AddUser/>,
      loader : combinedLoaderAdmin
    }, {
      path : "/dashboard",
      element : <Dashboard/>,
      loader : combinedLoaderSuperUser
    }, {
      path : "/users",
      element : <TableUser/>,
      loader : combinedLoaderAdmin
    }, {
      path :"/laporan",
      element :<TableLaporan/>,
      loader : combinedLoaderSuperUser
    }]
  },{
    path : "/login",
    element : <Login/>
  }
]);

export default router;
