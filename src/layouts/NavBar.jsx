import { NavLink, useParams } from "react-router-dom";
import { Fragment } from "react";

import "../styles/_NavBar.scss";
import LinkCustom from "../components/LinkCustom";

const home = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="size-6"
    width="24"
    height="24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205 3 1m1.5.5-1.5-.5M6.75 7.364V3h-3v18m3-13.636 10.5-3.819"
    />
  </svg>
);

const NavBar = () => {
  return (
    <Fragment>
      <div className="nav">
        <ul className="nav__grid-container">
          <LinkCustom href="/home">
            <span> {home}</span>
            <p>Rooms</p>
          </LinkCustom>
          <LinkCustom href="/rooms">
            <span> {home}</span>
            <p>Rooms</p>
          </LinkCustom>
          <LinkCustom href="/booking-history">
            <span> {home}</span>
            <p>Booking History</p>
          </LinkCustom>
          <LinkCustom href="/dashboard">
            <span> {home}</span>
            <p>Booking History</p>
          </LinkCustom>
        </ul>
      </div>
    </Fragment>
  );
};

export default NavBar;
