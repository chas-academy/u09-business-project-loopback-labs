import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

function Navbar() {
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/" className="brand-link">
          Mimir App
        </Link>
      </div>
      <div className="nav-container">
        <div className="nav-links-container">
          <div className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
            <div className="nav-links-inner">
              {isLoggedIn ? (
                <>
                  <Link to="/profile" className="nav-link" onClick={toggleMenu}>
                    Profile
                  </Link>
                  <Link to="/recipes" className="nav-link" onClick={toggleMenu}>
                    Recipes
                  </Link>
                  <button onClick={handleLogout} className="logout-btn">
                    Logout
                  </button>
                </>
              ) : (
                <Link to="/login" className="nav-link" onClick={toggleMenu}>
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
        <button
          className="hamburger-menu"
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
        >
          <span className="hamburger-bar"></span>
          <span className="hamburger-bar"></span>
          <span className="hamburger-bar"></span>
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
