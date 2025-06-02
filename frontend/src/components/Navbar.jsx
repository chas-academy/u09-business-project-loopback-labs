import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/" className="brand-link">
          Mimir
        </Link>
      </div>
      <ul className="nav-links">
        <li>
          <Link to="/items">Items</Link>
        </li>
        <li>
          <Link to="/profile">Profile</Link>
        </li>
        <li>
          <Link to="/test">Test API</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
