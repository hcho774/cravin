import React from "react";
import "./navbar.scss";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import WhiteLogo from "../images/WhiteLogo.png";
import ColorLogo from "../images/ColorLogo.png";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import ForumOutlinedIcon from "@mui/icons-material/ForumOutlined";

const NavBar = ({
  user,
  showModal,
  setShowLogin,
  setShowModal,
  minimal,
  showChat,
}) => {
  //handle click to setShowlogin to false and show modal to true
  function handleClick() {
    setShowLogin(false);
    setShowModal(true);
  }

  return (
    <nav>
      <div className="logo_container">
        <Link to="/" style={{ textDecoration: "none" }}>
          <img
            className="logo"
            src={minimal ? ColorLogo : WhiteLogo}
            alt="logo"
          />
        </Link>
      </div>

      {!user && !minimal ? (
        <button onClick={handleClick} className="nav_btn" disabled={showModal}>
          Login
        </button>
      ) : (
        <div className="items">
          {showChat ? (
            <div className="item">
              <Link to="/chat" style={{ textDecoration: "none" }}>
                <QuestionAnswerIcon
                  style={{ color: "black" }}
                  fontSize="large"
                  id="chat_icon"
                />
              </Link>
            </div>
          ) : (
            <div className="item">
              <Link to="/chat" style={{ textDecoration: "none" }}>
                <QuestionAnswerIcon
                  style={{ color: "white" }}
                  fontSize="large"
                  id="chat_icon"
                />
              </Link>
            </div>
          )}

          <div className="item">
            <Link to="/profile" style={{ textDecoration: "none" }}>
              <img
                src={
                  user.img === null
                    ? "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
                    : user.img
                }
                alt=""
                className="avatar"
              />
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
