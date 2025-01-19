import { Outlet } from "react-router-dom";
import "../../styles/_Dashboard.scss";
import Header from "../../components/Header";
import SideBar from "../../components/SideBar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchHotel } from "../../redux/slice/hotelSlice";
import Modal from "../../components/Modal";

const Dashboard = () => {
  const {
    data: hotel,
    isLoading,
    isError,
    hasHotel,
  } = useSelector((state) => state.hotel);
  const [isOpenModalAddHotel, setIsOpenModalAddHotel] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch(fetchHotel());
    if (!hasHotel) {
      dispatch(fetchHotel());
    }
  }, [dispatch, hasHotel]);
  return (
    <>
      {/* {isOpenModalAddHotel ? <Modal>check</Modal> : <></>} */}
      <div className="dashboard">
        <SideBar />
        <Header />
        <main className="dashboard__main">
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default Dashboard;
