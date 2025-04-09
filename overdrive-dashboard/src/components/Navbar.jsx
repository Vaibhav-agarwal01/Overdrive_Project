import { Link } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">over<span>DRIVE</span></div>
      <div className="nav-links">
        <Link to="/github">GitHub</Link>
        <Link to="/codeforces">Codeforces</Link>
      </div>
    </nav>
  );
}
