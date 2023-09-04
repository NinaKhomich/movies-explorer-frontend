import { NavLink, useLocation } from "react-router-dom";
import logo from "../../images/logo.png";
import "./Header.css";
import Navigation from "../Navigation/Navigation";

const Header = ({ isLoggedIn }) => {
  const location = useLocation();

  return (
    <header
      className={`header ${location.pathname !== "/" ? "" : "header_main"}`}
    >
      <NavLink to="/" className="header__logo-link">
        <img className="header__logo" src={logo} alt="Логотип" />
      </NavLink>
      <Navigation isLoggedIn={isLoggedIn} />
    </header>
  );
};

export default Header;
