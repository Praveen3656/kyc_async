import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import { NavLink } from "react-router-dom";
import "./Navbar.scss";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  let navigate = useNavigate();

  const navItems = [
    {
      itemName: "Dashboard",
      path: "dashboard",
    },
  ];

  const logout = () => {
    localStorage.clear();
    window.location = "/";
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <div className="logo-ctn">KYC Verification</div>
          <div className="actions-list">
            {navItems.map((items, i) => (
              <NavLink
          
                className={`nav-link `}
              >
                {items.itemName}
              </NavLink>
            ))}
          </div>
          <div className="logout" onClick={logout}>
            Logout
            {/* <img className='logo1' src={logo1} alt=""></img> */}
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
