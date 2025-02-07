import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faComments, faCog, faPlus } from "@fortawesome/free-solid-svg-icons";
import SearchIcon from "@mui/icons-material/Search";
import "./Navbar.css";

const Navbar = () => {
  const defaultAvatar = "/images/default-avatar.png";
  const [profileImage, setProfileImage] = useState(defaultAvatar);

  useEffect(() => {
    const storedProfileImage = localStorage.getItem("profileImage");
    if (storedProfileImage) {
      setProfileImage(storedProfileImage);
    }
  }, []);

  return (
    <nav className="navbar">
      {/* Left Logo */}
      <div className="logo">
        <span className="logo-icon">🎥</span>
        <span className="brand">
          Movie<span className="highlight">Share</span>
        </span>
      </div>

      {/* Middle Navigation Links */}
      <div className="nav-links">
        <Link to="/community">Community</Link>
        <Link to="/movies">Movies</Link>
      </div>

      {/* Search Bar */}
      <div className="search-container">
        <SearchIcon className="search-icon" />
        <input type="text" placeholder="Search..." className="search-input" />
      </div>

      {/* Right Side Icons */}
      <div className="nav-icons">
        <button className="create-btn">
          <FontAwesomeIcon icon={faPlus} /> Create
        </button>
        <FontAwesomeIcon icon={faComments} className="icon" />
        <FontAwesomeIcon icon={faBell} className="icon" />
        <FontAwesomeIcon icon={faCog} className="icon" />
        <img
          src={profileImage}
          alt="Profile"
          className="profile-img"
          onError={(e) => (e.target.src = defaultAvatar)}
        />
      </div>
    </nav>
  );
};

export default Navbar;
