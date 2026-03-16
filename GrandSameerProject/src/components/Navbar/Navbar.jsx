

import React, { useState } from "react";
import { BsGlobe } from "react-icons/bs";
import { IoReorderThreeOutline } from "react-icons/io5";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Navbar.css"; // ← create this file

const Navbar = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) => location.pathname === path;

  let timer;
  const showDropdown = (name) => {
    clearTimeout(timer);
    setActiveDropdown(name);
  };

  const hideDropdown = () => {
    timer = setTimeout(() => setActiveDropdown(null), 300);
  };

  const scrollToSolution = (id) => {
    navigate("/solutions");
    setMobileOpen(false);

    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 450);
  };

  return (
    <header className="navbar">
      <div className="container">
        <div className="navbar-inner">

          {/* Logo */}
          <Link to="/" className="logo">
            <BsGlobe className="logo-icon" />
            <div className="logo-text">
              <span className="company-name">Grand Sameer Events</span>
              <span className="company-suffix">Pvt. Ltd.</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="desktop-nav">
            <ul className="nav-list">
              {/* Home with dropdown */}
              <li
                className="nav-item dropdown-item"
                onMouseEnter={() => showDropdown("home")}
                onMouseLeave={hideDropdown}
              >
                <Link
                  to="/"
                  className={`nav-link ${isActive("/") ? "active" : ""}`}
                >
                  Home
                </Link>

                {activeDropdown === "home" && (
                  <div className="dropdown-menu home-dropdown">
                    <div className="dropdown-content">
                      <h3 className="dropdown-title">
                        Engineering Grandeur,<br />Delivering Excellence.
                      </h3>
                      <ul className="dropdown-stats">
                        {[
                          "10+ Years of Excellence",
                          "₹50+ Crores Infrastructure",
                          "1,00,000+ sq.ft. Premium Structures",
                          "Top 3 Central India | Top 15 India",
                          "500+ Mega Events Delivered",
                        ].map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </li>

              {/* Solutions with dropdown */}
              <li
                className="nav-item dropdown-item"
                onMouseEnter={() => showDropdown("solutions")}
                onMouseLeave={hideDropdown}
              >
                <Link
                  to="/solutions"
                  className={`nav-link ${isActive("/solutions") ? "active" : ""}`}
                >
                  Solutions
                </Link>

                {activeDropdown === "solutions" && (
                  <div className="dropdown-menu solutions-dropdown">
                    <h4 className="dropdown-heading">Categories</h4>
                    <div className="solutions-grid">
                      {[
                        ["Corporate & Business Excellence", "sol-1"],
                        ["Government & Institutional Events", "sol-2"],
                        ["Mega Political Gatherings", "sol-3"],
                        ["Cultural & Religious Extravaganzas", "sol-4"],
                        ["Luxury Weddings & Private Celebrations", "sol-5"],
                        ["Sports & Entertainment Arenas", "sol-6"],
                        ["Industrial & Commercial Solutions", "sol-7"],
                      ].map(([text, id], i) => (
                        <div
                          key={i}
                          className="solution-item"
                          onClick={() => scrollToSolution(id)}
                        >
                          {text}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </li>

              {/* Other links */}
              {[
                { path: "/industries", label: "Industries We Serve" },
                { path: "/case-studies", label: "Case Studies" },
                { path: "/about", label: "About Us" },
                { path: "/gallery", label: "Gallery" },
                { path: "/contact", label: "Contact Us" },
              ].map(({ path, label }) => (
                <li key={path} className="nav-item">
                  <Link
                    to={path}
                    className={`nav-link ${isActive(path) ? "active" : ""}`}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="mobile-toggle"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <IoReorderThreeOutline className="menu-icon" />
            <span className="menu-text">Menu</span>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`mobile-overlay ${mobileOpen ? "active" : ""}`}
        onClick={() => setMobileOpen(false)}
      >
        <div
          className={`mobile-menu ${mobileOpen ? "open" : ""}`}
          onClick={(e) => e.stopPropagation()}
        >
          <button className="close-btn" onClick={() => setMobileOpen(false)}>
            ×
          </button>

          <ul className="mobile-nav-list">
            {[
              { to: "/", label: "Home" },
              { to: "/solutions", label: "Solutions" },
              { to: "/industries", label: "Industries We Serve" },
              { to: "/case-studies", label: "Case Studies" },
              { to: "/about", label: "About Us" },
              { to: "/gallery", label: "Gallery" },
              { to: "/contact", label: "Contact Us" },
            ].map(({ to, label }) => (
              <li key={to}>
                <Link
                  to={to}
                  className="mobile-nav-link"
                  onClick={() => setMobileOpen(false)}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Navbar;