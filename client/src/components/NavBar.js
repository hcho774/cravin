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
  setUser,
  navigate,
  showModal,
  setShowLogin,
  setShowModal,
  minimal,
  showChat,
}) => {
  // function handleLogout() {
  //   fetch("/logout", { method: "DELETE" }).then((r) => {
  //     if (r.ok) {
  //       setUser(null);
  //       navigate("/login");
  //     }
  //   });
  // }

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

      {/* <button onClick={handleLogout}>logout</button> */}
    </nav>
  );
};

export default NavBar;

// <div className="wrapper">
//         <Link to="/" style={{ textDecoration: "none" }}>
//           <h2 class="my-0 mr-md-auto font-weight-normal text-dark ">Cravin</h2>
//         </Link>

//         <div className="items">
//           <div className="item">
//             <p className="logo">Welcome, {user.username}</p>
//           </div>
//           <div className="item">
//             <Link to="/profile" style={{ textDecoration: "none" }}>
//               <img
//                 src="https://images.mubicdn.net/images/cast_member/2552/cache-207-1524922850/image-w856.jpg?size=800x"
//                 alt=""
//                 className="avatar"
//               />
//             </Link>
//           </div>
//           <div className="item">
//             <Link to="/chat" style={{ textDecoration: "none" }}>
//               <h5 class="my-0 mr-md-auto font-weight-normal" className="logo">
//                 Chat
//               </h5>
//             </Link>
//           </div>
//           <button onClick={handleLogout} className="nav_btn">
//             Logout
//           </button>
//         </div>
//       </div>
