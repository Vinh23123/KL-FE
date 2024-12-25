import { Outlet } from "react-router-dom";
import "../../styles/_Dashboard.scss";
import Header from "../../components/Header";
import SideBar from "../../components/SideBar";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchHotel } from "../../redux/slice/hotelSlice";

const Dashboard = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchHotel());
  }, [dispatch]);
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
