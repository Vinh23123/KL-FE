import { NavLink } from "react-router-dom";
import "../styles/_SideBar.scss";
import { Gear, HouseLine, PlusSquare } from "@phosphor-icons/react";
const SideBar = () => {
  const onActive = (isActive) =>
    `side-bar__nav ${isActive ? "side-bar-active" : ""}`;

  return (
    <div className="side-bar">
      <ul className="side-bar__container">
        <li>
          <NavLink className="side-bar__logo-container" to="/dashboard/rooms">
            <img src="/src/assets/room_image/travel-logo2.png" alt="travel" />
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) => onActive(isActive)}
            to="/dashboard/rooms"
          >
            <div className="side-bar__nav-left-item">
              <HouseLine clas size={32} />
            </div>
            <div className="side-bar__nav-right-item">
              <p>Rooms</p>
            </div>
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) => onActive(isActive)}
            to="/dashboard/createRoom"
          >
            <div className="side-bar__nav-left-item">
              <PlusSquare size={32} />
            </div>
            <div className="side-bar__nav-right-item">
              <p>Create Room</p>
            </div>
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) => onActive(isActive)}
            to="/dashboard/setting"
          >
            <div className="side-bar__nav-left-item">
              <Gear className="side-bar__icon" size={32} />
            </div>
            <div className="side-bar__nav-right-item">
              <p>Setting</p>
            </div>
          </NavLink>
        </li>

        <li>
          <NavLink className={({ isActive }) => onActive(isActive)} to="/home">
            Back To Home
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default SideBar;
