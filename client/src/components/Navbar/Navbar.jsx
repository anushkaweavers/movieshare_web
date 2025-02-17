import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faComments, faCog, faPlus } from "@fortawesome/free-solid-svg-icons";
import SearchIcon from "@mui/icons-material/Search";
import { userLogout } from "../../redux/Auth/user.slice";
import axiosCustom from "../../Services/AxiosConfig/axiosCustom";
import Cookies from "universal-cookie";
import "./Navbar.css";

// Create a single Cookies instance to be used across the component
const cookies = new Cookies();

const Navbar = () => {
  const defaultAvatar = "/images/default-avatar.png";
  const [profileImage, setProfileImage] = useState(defaultAvatar);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  // Load the stored profile image (if available)
  useEffect(() => {
    const storedProfileImage = localStorage.getItem("profileImage");
    if (storedProfileImage) {
      setProfileImage(storedProfileImage);
    }
  }, []);

  // Close dropdown if user clicks outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    // Try to get the refresh token from cookies; if not found, fallback to localStorage
    let refreshToken = cookies.get("refresh_token") || localStorage.getItem("refresh_token");
    console.log("Refresh Token before logout:", refreshToken);

    if (!refreshToken) {
      console.error("No refresh token found! Proceeding with logout locally.");
      // Clear any remaining authentication state
      dispatch(userLogout());
      navigate("/login");
      return;
    }

    try {
      // Attempt to log out from the server
      await axiosCustom.post("auth/logout", { refreshToken });

      // Clear user state and tokens from cookies and localStorage
      dispatch(userLogout());
      cookies.remove("refresh_token", { path: "/" });
      cookies.remove("access_token", { path: "/" });
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("access_token");

      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error.response?.data || error.message);
    }
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <span className="logo-icon">🎥</span>
        <span className="brand">
          Movie<span className="highlight">Share</span>
        </span>
      </div>

      <div className="nav-center">
        <div className="nav-links">
          <Link to="/community">Community</Link>
          <Link to="/list">Movies</Link>
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
            onClick={() => setDropdownOpen((prev) => !prev)}
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
