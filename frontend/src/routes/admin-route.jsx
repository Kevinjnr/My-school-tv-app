import _layout from "../pages/admin/_layout";
import Dashboard from "../pages/admin/Dashboard";
import Payments from "../pages/admin/Payments";
import Users from "../pages/admin/Users";
import Protected from "../services/Protected";
export const adminRoutes = {
  path: "/admin",
  element: (
    <Protected>
      <_layout />
    </Protected>
  ),
  children: [
    {
      path: "dashboard",
      element: <Dashboard />,
      index: true,
    },
    {
      path: "users",
      element: <Users />,
    },
    {
      path: "payments",
      element: <Payments />,
    },
  ],
};
