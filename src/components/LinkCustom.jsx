import { NavLink } from "react-router-dom";
import "../styles/_Link.scss";

const LinkCustom = ({ href, children }) => {
  return (
    <li className="nav-link-custom__item">
      <NavLink
        className={({ isActive }) =>
          isActive
            ? "nav-link-custom__nav-link active"
            : "nav-link-custom__nav-link"
        }
        to={href}
      >
        {children}
      </NavLink>
    </li>
  );
};

export default LinkCustom;
