import { Outlet } from "react-router-dom";
import NavBar from "../layouts/NavBar";

const AppLayout = () => {
  return (
    <div>
      <NavBar />
      <Outlet />
    </div>
  );
};

export default AppLayout;
