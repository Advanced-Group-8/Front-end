import { Outlet } from "react-router-dom";

import Navbar from "../components/navbar/Navbar.tsx";
import Footer from "../components/footer/Footer.tsx";

const Layout = () => {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
