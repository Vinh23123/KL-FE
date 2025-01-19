import { NavLink, replace, useNavigate, useParams } from "react-router-dom";
import { Fragment, useEffect, useState } from "react";
import { resetHotelState } from "../redux/slice/hotelSlice";
import "../styles/_NavBar.scss";
import LinkCustom from "../components/LinkCustom";
import {
  Bed,
  ClockCounterClockwise,
  DoorOpen,
  HouseLine,
  ListDashes,
} from "@phosphor-icons/react";
import { useDispatch, useSelector } from "react-redux";
import { userLogout } from "../redux/slice/userSlice";
import { use } from "react";

const NavBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data: user } = useSelector((state) => state.user);
  const isAdmin = user.roles.includes("ROLE_ADMIN");

  const handleSignOut = async () => {
    try {
      // Clear the user from the Redux store
      dispatch(userLogout());
      // Clear the access token from local storage
      dispatch(resetHotelState());

      navigate("/booking-app/login", { replace: true });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Fragment>
      <div className="nav">
        <ul className="nav__grid-container">
          <LinkCustom href="/home">
            <div className=" nav__grid-item">
              <span>
                <HouseLine size={24} />
              </span>
              <p>Home</p>
            </div>
          </LinkCustom>
          <LinkCustom href="/rooms">
            <div className=" nav__grid-item">
              <span>
                <Bed size={24} />
              </span>
              <p>Rooms</p>
            </div>
          </LinkCustom>
          <LinkCustom href="/booking-history">
            <div className=" nav__grid-item">
              <span>
                <ClockCounterClockwise size={24} />
              </span>
              <p>Booking History</p>
            </div>
          </LinkCustom>
          {isAdmin ? (
            <LinkCustom href="/dashboard">
              <div className=" nav__grid-item">
                <span>
                  <ListDashes size={24} />
                </span>
                <p>DashBoard</p>
              </div>
            </LinkCustom>
          ) : (
            <></>
          )}
          <button className="nav__btn-logout" onClick={handleSignOut}>
            <DoorOpen size={24} />
          </button>
        </ul>
      </div>
    </Fragment>
  );
};

export default NavBar;
