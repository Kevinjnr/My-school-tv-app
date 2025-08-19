import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import React from "react";
import { Outlet } from "react-router-dom";

function Rootlayout() {
  return (
    <React.Fragment>
      <Navbar />
      <Outlet />
      <Footer />
    </React.Fragment>
  );
}

export default Rootlayout;
