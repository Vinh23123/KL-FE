import { NavLink, useParams } from "react-router-dom";
import { Fragment } from "react";

import Button from "../components/Button";
import "../styles/NavBar.scss";

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

const ticket = (
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
      d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 0 1 0 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 0 1 0-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375Z"
    />
  </svg>
);

const messages = (
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
      d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 0 1 1.037-.443 48.282 48.282 0 0 0 5.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
    />
  </svg>
);

const cake = (
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
      d="M12 8.25v-1.5m0 1.5c-1.355 0-2.697.056-4.024.166C6.845 8.51 6 9.473 6 10.608v2.513m6-4.871c1.355 0 2.697.056 4.024.166C17.155 8.51 18 9.473 18 10.608v2.513M15 8.25v-1.5m-6 1.5v-1.5m12 9.75-1.5.75a3.354 3.354 0 0 1-3 0 3.354 3.354 0 0 0-3 0 3.354 3.354 0 0 1-3 0 3.354 3.354 0 0 0-3 0 3.354 3.354 0 0 1-3 0L3 16.5m15-3.379a48.474 48.474 0 0 0-6-.371c-2.032 0-4.034.126-6 .371m12 0c.39.049.777.102 1.163.16 1.07.16 1.837 1.094 1.837 2.175v5.169c0 .621-.504 1.125-1.125 1.125H4.125A1.125 1.125 0 0 1 3 20.625v-5.17c0-1.08.768-2.014 1.837-2.174A47.78 47.78 0 0 1 6 13.12M12.265 3.11a.375.375 0 1 1-.53 0L12 2.845l.265.265Zm-3 0a.375.375 0 1 1-.53 0L9 2.845l.265.265Zm6 0a.375.375 0 1 1-.53 0L15 2.845l.265.265Z"
    />
  </svg>
);

const NavBar = () => {
  const { roomID } = useParams();
  return (
    <Fragment>
      {/* <div className="nav-container">
        <div className="nav-item">
          <div className="grid-item">
            <div className="flex-container">
              <span> {home}</span>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
                to="/home"
              >
                Home
              </NavLink>
            </div>
          </div>
        </div>
      </div>
      <hr /> */}
      <div className="nav">
        <div className="nav__grid-container">
          <div className="nav__item">
            <div className="nav__flex-container">
              <span> {home}</span>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "nav__nav-link active" : "nav-link"
                }
                to="/home"
              >
                Home
              </NavLink>
            </div>
          </div>
          {/* <div className="grid-item">
            <div className="flex-container">
              <span> {home}</span>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
                to="/rooms"
              >
                Rooms
              </NavLink>
            </div>
          </div>
          <div className="grid-item">
            <div className="flex-container">
              <span> {ticket}</span>
              <NavLink className="nav-link" to={`/rooms/${roomID}`}>
                Bookings
              </NavLink>
            </div>
          </div>
          <div className="grid-item">
            <div className="flex-container">
              <span> {cake}</span>
              <NavLink className="nav-link" to="/home">
                Breakfast
              </NavLink>
            </div>
          </div>
          <div className="grid-item">
            <div className="flex-container">
              <span> {home}</span>
              <NavLink className="nav-link" to="/home">
                Desgin
              </NavLink>
            </div>
          </div>
          <div className="grid-item">
            <div className="flex-container">
              <span> {messages}</span>
              <NavLink className="nav-link" to="/home">
                Messages
              </NavLink>
            </div>
          </div>{" "} */}
        </div>
        <div className="nav__content">
          <div className="nav__flex-content">
            <div className="nav__content-item">
              <p className="nav__content-item--size">
                Your Next Stay, Just a Click Away!
              </p>
            </div>
            <div>
              <Button>Booking, Now!</Button>
            </div>
          </div>
        </div>
      </div>
      <div></div>
    </Fragment>
  );
};

export default NavBar;
