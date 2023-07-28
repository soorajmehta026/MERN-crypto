import React, { useState } from "react";
import { CryptoState } from "../CryptoContext";
import { useNavigate } from "react-router-dom";
import "./Userlogged.css";

const Userlogged = () => {
  const navigate = useNavigate();
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const { username, setusername,setuseremail ,logged, setlogged } = CryptoState();

  const handleLogout = () => {
    setlogged(false);
    
    setusername("");
    setuseremail("");
    setDropdownVisible(false);
    localStorage.setItem("loggedIn", "false");
    localStorage.setItem("userFirstName", "");
    localStorage.setItem("email", "");
    navigate('/crypto-hunter')
    
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  return (
    <div className="user-logged-dropdown">
      {logged ? (
        <div className="dropdown">
          <button className="button1" onClick={toggleDropdown}>
          
            {username}
          </button>
          {dropdownVisible && (
            <div className="dropdown-content">
              <button onClick={() => { setDropdownVisible(!dropdownVisible)
                navigate("/watchlist")}}>Watchlist</button>
              <button onClick={handleLogout}>Logout</button>
            </div>
          )}
        </div>
      ) : (
        <button className="button1" onClick={() => navigate("/login")}>
          Login
        </button>
      )}
    </div>
  );
};

export default Userlogged;
