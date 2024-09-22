import { Outlet } from "react-router-dom";
import NavBar from "../layouts/NavBar";

const AppLayout = () => {
  return (
    <dir>
      <NavBar />
      <Outlet />
    </dir>
  );
};

export default AppLayout;
