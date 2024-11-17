import { Outlet } from "react-router-dom";
import "../../styles/_Dashboard.scss";
import Header from "../../components/Header";
import SideBar from "../../components/SideBar";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <SideBar />
      <Header />
      <main className="dashboard__main">
        <Outlet />
      </main>
    </div>
  );
};

export default Dashboard;
