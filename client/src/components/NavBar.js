import React from "react";
import "./navbar.scss";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";

const NavBar = ({ user, setUser, navigate }) => {
  function handleLogout() {
    fetch("/logout", { method: "DELETE" }).then((r) => {
      if (r.ok) {
        setUser(null);
        navigate("/login");
      }
    });
  }

  return (
    <div className="navbar">
      <div className="wrapper">
        <Link to="/" style={{ textDecoration: "none" }}>
          <h2 class="my-0 mr-md-auto font-weight-normal text-dark ">Cravin</h2>
        </Link>

        <div className="items">
          <div className="item">
            <p className="logo">Welcome, {user.username}</p>
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
            <Link to="/chat" style={{ textDecoration: "none" }}>
              <h5 class="my-0 mr-md-auto font-weight-normal" className="logo">
                Chat
              </h5>
            </Link>
          </div>

          <a class="btn btn-outline-dark" onClick={handleLogout}>
            Logout
          </a>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
