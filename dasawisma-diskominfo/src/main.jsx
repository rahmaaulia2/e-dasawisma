import * as ReactDOM from "react-dom/client";
import './index.css'
import { RouterProvider } from 'react-router-dom';
import router from '../routes/index.jsx';
import $ from "jquery";
window.$ = $;


ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
    <RouterProvider router={router} />
  // </React.StrictMode>
);
