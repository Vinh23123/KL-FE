import { NavLink, useParams } from "react-router-dom";
import { Fragment } from "react";

import "../styles/_NavBar.scss";
import LinkCustom from "../components/LinkCustom";
import {
  Bed,
  ClockCounterClockwise,
  HouseLine,
  ListDashes,
} from "@phosphor-icons/react";

const NavBar = () => {
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
          <LinkCustom href="/dashboard">
            <div className=" nav__grid-item">
              <span>
                <ListDashes size={24} />
              </span>
              <p>DashBoard</p>
            </div>
          </LinkCustom>
        </ul>
      </div>
    </Fragment>
  );
};

export default NavBar;
