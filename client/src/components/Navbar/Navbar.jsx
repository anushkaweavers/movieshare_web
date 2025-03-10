import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faComments, faCog, faPlus, faBars, faTimes, faUsers, faFilm } from "@fortawesome/free-solid-svg-icons";
import SearchIcon from "@mui/icons-material/Search";
import { userLogout } from "../../redux/Auth/user.slice";
import axiosCustom from "../../Services/AxiosConfig/axiosCustom";
import Cookies from "universal-cookie";
import "./Navbar.css";

const cookies = new Cookies();

const Navbar = () => {
  const defaultAvatar = "/images/default-avatar.png";
  const [profileImage, setProfileImage] = useState(defaultAvatar);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const menuRef = useRef(null);

  useEffect(() => {
    const storedProfileImage = localStorage.getItem("profileImage");
    if (storedProfileImage) {
      setProfileImage(storedProfileImage);
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    let refreshToken = cookies.get("refresh_token") || localStorage.getItem("refresh_token");

    if (!refreshToken) {
      console.warn("No refresh token found. Logging out locally.");
      dispatch(userLogout());
      cleanupTokens();
      navigate("/login");
      return;
    }

    console.log("Attempting server logout with refresh token:", refreshToken);

    try {
      await axiosCustom.post("auth/logout", { refreshToken });
      console.log("Logout successful. Clearing local storage.");
      dispatch(userLogout());
    } catch (error) {
      console.error("Logout API call failed:", error.response?.data || error.message);
    } finally {
      cleanupTokens();
      navigate("/login");
    }
  };

  const cleanupTokens = () => {
    cookies.remove("refresh_token", { path: "/" });
    cookies.remove("access_token", { path: "/" });
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("access_token");
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <span className="logo-icon">🎥</span>
        <span className="brand">
          Movie<span className="highlight">Share</span>
        </span>
      </div>

      {/* Hamburger button for smaller screens */}
      <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        <FontAwesomeIcon icon={menuOpen ? faTimes : faBars} />
      </button>

      {/* Sidebar menu (visible on mobile when hamburger is clicked) */}
      <div className={`sidebar-menu ${menuOpen ? "open" : ""}`} ref={menuRef}>
        <Link to="/community" onClick={() => setMenuOpen(false)}>
          <FontAwesomeIcon icon={faUsers} /> Community
        </Link>
        <Link to="/list" onClick={() => setMenuOpen(false)}>
          <FontAwesomeIcon icon={faFilm} /> Movies
        </Link>
        <button className="create-btn" onClick={() => setMenuOpen(false)}>
          <FontAwesomeIcon icon={faPlus} /> Create
        </button>
      </div>

      <div className="nav-center">
        <div className="nav-links">
          <Link to="/community">
            <FontAwesomeIcon icon={faUsers} /> Community
          </Link>
          <Link to="/list">
            <FontAwesomeIcon icon={faFilm} /> Movies
          </Link>
        </div>
        <div className="search-container">
          <input type="text" placeholder="Search..." className="search-input" />
          <SearchIcon className="search-icon" />
        </div>
      </div>

      <div className="nav-icons">
        <button className="create-btn">
          <FontAwesomeIcon icon={faPlus} /> Create
        </button>
        <FontAwesomeIcon icon={faComments} className="icon" />
        <FontAwesomeIcon icon={faBell} className="icon" />
        <FontAwesomeIcon icon={faCog} className="icon" />
        <div className="profile-dropdown" ref={dropdownRef}>
          <img
            src={profileImage}
            alt="Profile"
            className="profile-img"
            onClick={() => setDropdownOpen(!dropdownOpen)}
            onError={(e) => (e.target.src = defaultAvatar)}
          />
          {dropdownOpen && (
            <div className="dropdown-menu">
              <button onClick={() => navigate("/edit-profile")}>Edit Profile</button>
              <button onClick={handleLogout}>Log Out</button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;