import React from "react";
import AirCallLogo from "../../assets/Aircall.svg";
import "../../css/header.css";
import { NavLink } from "react-router-dom";

const Header = () => {
  const getActiveStyle = ({ isActive }) => ({
    textDecoration: isActive ? "underline" : "none",
    fontWeight: isActive ? "600" : "400",
  });

  return (
    <header className="header">
      <NavLink to="/">
        <img src={AirCallLogo} alt="Air call logo" width={120} />
      </NavLink>
      <ul className="nav-links">
        <li>
          <NavLink to="/" style={getActiveStyle}>
            All Calls
          </NavLink>
        </li>
        <li>
          <NavLink to="/archived" style={getActiveStyle}>
            Archived Calls
          </NavLink>
        </li>
      </ul>
    </header>
  );
};

export default Header;
