import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faComments, faCog, faPlus } from "@fortawesome/free-solid-svg-icons";
import SearchIcon from "@mui/icons-material/Search";
import { userLogout } from "../../redux/Auth/user.slice";
import axiosCustom from "../../Services/AxiosConfig/axiosCustom";
import "./Navbar.css";
import Cookies from "universal-cookie";

const Navbar = () => {
  const defaultAvatar = "/images/default-avatar.png";
  const [profileImage, setProfileImage] = useState(defaultAvatar);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const dropdownRef = useRef(null); // Reference to check onclick inside or outside the dropdown

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
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    const cookies = new Cookies();
    const refreshToken = cookies.get("refresh_token");

    console.log("Refresh Token before logout:", refreshToken);

    if (!refreshToken) {
      console.error("No refresh token found! Logout request cannot be sent.");
      return;
    }

    try {
      await axiosCustom.post("auth/logout", { refreshToken });

      dispatch(userLogout());
      cookies.remove("refresh_token", { path: "/" });

      navigate("/login");
    } catch (error) {
      console.error("Logout failed", error.response?.data || error.message);
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
      <div className="nav-links">
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
