import { Outlet } from "react-router-dom";

import NavBar from "../layouts/NavBar";
import Footer from "../layouts/Footer";

const AppLayout = () => {
  return (
    <div>
      <NavBar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default AppLayout;
