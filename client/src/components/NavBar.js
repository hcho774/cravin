import React from "react";
import "./navbar.scss";
import { Link } from "react-router-dom";

const NavBar = ({ user, setUser, navigate }) => {
  function handleLogout() {
    fetch("/logout", { method: "DELETE" }).then((r) => {
      if (r.ok) {
        setUser(null);
        navigate("/login");
      }
    });
  }

  console.log(user);

  return (
    <div className="navbar">
      <div className="wrapper">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">Cravin</span>
        </Link>
        <div className="items">
          <div className="item">
            <p>Welcome, {user.username}</p>
          </div>
          <div className="item">
            <Link to="/profile" style={{ textDecoration: "none" }}>
              <img
                src="https://images.mubicdn.net/images/cast_member/2552/cache-207-1524922850/image-w856.jpg?size=800x"
                alt=""
                className="avatar"
              />
            </Link>
          </div>
          <div className="item">
            <button onClick={handleLogout}>
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
