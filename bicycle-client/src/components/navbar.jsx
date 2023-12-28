import "bootstrap/dist/css/bootstrap.css";
import { NavLink } from "react-router-dom";
import biLogo from "../assets/images/riding-bicycle.png"

export default function Navbar() {
  return (
    <nav className="site-nav">
      <NavLink className="site-nav__link" to="/">
        <p className="site-title">ADMIN.BIKE-BOOKING.COM</p>
      </NavLink>
      <div className="biLogo">
        <img src={biLogo} alt="riding bicycle" className="biLogoIMG"/>
      </div>
    </nav>
  );
}
