import React from "react";
import "./chatheader.scss";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import IconButton from "@mui/material/IconButton";
const ChatHeader = ({ user, setUser, navigate }) => {
  //handles logout for current user
  function handleLogout() {
    // fetch request to clear current user session
    fetch("/logout", { method: "DELETE" }).then((r) => {
      if (r.ok) {
        //set current user to null
        setUser(null);
        //navigate to home page which has login and signup modal
        navigate("/");
      }
    });
  }
  return (
    <div className="chat-container-header">
      <div className="profile">
        <div className="img-container">
          <img src={user.img} alt={"photo of " + user.first_name} />
        </div>
        <h3>{user.first_name}</h3>
      </div>

      <IconButton onClick={() => handleLogout()}>
        <ExitToAppIcon />
      </IconButton>
    </div>
  );
};

export default ChatHeader;
