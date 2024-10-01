import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../src/components/MainLayout";
import Login from "../src/pages/Login";
import Landpage from "../src/pages/Landpage";
import Dasawisma from "../src/pages/Dasawisma";

const router = createBrowserRouter([
  {
    element: <MainLayout/>,
    children :[{
      path : "/",
      element : <Landpage/>
    }, {
      path : "/dasawisma",
      element : <Dasawisma/>
    }]
  },{
    path : "/login",
    element : <Login/>
  }
]);

export default router;
