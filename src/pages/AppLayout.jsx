import { Outlet } from "react-router-dom";

import NavBar from "../layouts/NavBar";
import Footer from "../layouts/Footer";

const AppLayout = () => {
  return (
    <div>
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default AppLayout;
