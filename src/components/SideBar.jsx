import { NavLink } from "react-router-dom";
import "../styles/_SideBar.scss";
import { Gear, HouseLine, PlusSquare, User } from "@phosphor-icons/react";
import { useSelector } from "react-redux";
const SideBar = () => {
  const {
    data: hotel,
    isLoading,
    isError,
    hasHotel,
  } = useSelector((state) => state.hotel);
  const onActive = (isActive) =>
    `side-bar__nav ${isActive ? "side-bar-active" : ""}`;

  const navItems = [
    {
      to: "/dashboard/rooms",
      icon: <HouseLine size={32} />,
      label: "Rooms",
    },
    {
      to: "/dashboard/createRoom",
      icon: <PlusSquare size={32} />,
      label: "Create Room",
    },
    {
      to: "/dashboard/setting",
      icon: <Gear size={32} />,
      label: "Setting",
    },
  ];

  return (
    <div className="side-bar">
      <ul className="side-bar__container">
        <li>
          <NavLink className="side-bar__logo-container" to="/dashboard/rooms">
            <img src="/src/assets/room_image/travel-logo2.png" alt="travel" />
          </NavLink>
        </li>
        {!hasHotel && (
          <li>
            <NavLink
              className={({ isActive }) => onActive(isActive)}
              to="/dashboard/createHotel"
            >
              <div className="side-bar__nav-left-item">
                <HouseLine size={32} />
              </div>
              <div className="side-bar__nav-right-item">
                <p>Create Hotel</p>
              </div>
            </NavLink>
          </li>
        )}

        {/* Render other features if the user has a hotel */}
        {hasHotel &&
          navItems.map((item, index) => (
            <li key={index}>
              <NavLink
                className={({ isActive }) => onActive(isActive)}
                to={item.to}
              >
                <div className="side-bar__nav-left-item">{item.icon}</div>
                <div className="side-bar__nav-right-item">
                  <p>{item.label}</p>
                </div>
              </NavLink>
            </li>
          ))}

        {/* update user  */}
        <li>
          <NavLink
            className={({ isActive }) => onActive(isActive)}
            to="/dashboard/user"
          >
            <div className="side-bar__nav-left-item">
              <User size={32} />
            </div>
            <div className="side-bar__nav-right-item">
              <p>Update User</p>
            </div>
          </NavLink>
        </li>

        <li>
          <NavLink className={({ isActive }) => onActive(isActive)} to="/home">
            <div>Back To Home</div>
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default SideBar;
