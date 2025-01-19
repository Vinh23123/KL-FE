import { NavLink, Outlet } from "react-router-dom";

import "../styles/_LogContainer.scss";

const LogContainer = () => {
  const onActive = (isActive) =>
    `log-layout__nav ${isActive ? "log-layout__nav-link-active" : ""}`;

  return (
    <main className="log-layout">
      <div className="log-layout__items">
        <Outlet />
      </div>
    </main>
  );
};

export default LogContainer;
