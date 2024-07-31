import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./assets/Header";
import Footer from "./assets/Footer";

const Layout = () => {
  return (
    <div>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
