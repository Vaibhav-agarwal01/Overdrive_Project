import { Link } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/github">GitHub</Link>
      <Link to="/codeforces">Codeforces</Link>
    </nav>
  );
}
