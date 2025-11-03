import { Outlet } from "react-router-dom";

import Footer from "../components/footer/Footer.tsx";
import Header from "../components/header/Header.tsx";

const Layout = () => {
  return (
    <>
      <Header />
      <main className="">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
