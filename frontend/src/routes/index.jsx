import { createBrowserRouter } from "react-router-dom";
import { adminRoutes } from "./admin-route";
import { rootRoutes } from "./root-route";

export default createBrowserRouter([...rootRoutes, adminRoutes]);
