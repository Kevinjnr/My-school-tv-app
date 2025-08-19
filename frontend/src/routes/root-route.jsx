import Home from "../pages/Home";
import Login from "../pages/Login";
import Registration from "../pages/Registration";
import Student from "../pages/Student";
import Rootlayout from "../pages/_layout";
import Contact from "../pages/Contact";
import About from "../pages/About"
import Service from '../pages/Service'

export const rootRoutes = [
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <Rootlayout />,
    children: [
      {
        path: "",
        index: true,
        element: <Home />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "about",
        element: <About/>,
      },
      {
        path: "service",
        element: <Service/>,
      }
    ],
  },
  {
    path: "/register",
    element: <Registration />,
  },
  {
    path: "/student",
    element: <Student />,
  },
];
