import React from "react";
import "./navbar.scss";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div className="navbar">
      <div className="wrapper">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">Cravin</span>
        </Link>
        <div className="items">
          <div className="item">
            <p>username</p>
            <img
              src="https://images.mubicdn.net/images/cast_member/2552/cache-207-1524922850/image-w856.jpg?size=800x"
              alt=""
              className="avatar"
            />
          </div>
          {/* <div className="item">
        <LoginIcon className="icon" />
        Login
      </div> */}
          <div className="item">
            <button>
              {/* <LogoutIcon className="icon" /> */}
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
