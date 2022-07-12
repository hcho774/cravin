import React from "react";
import "./chatheader.scss";
const ChatHeader = ({ user }) => {
  return (
    <div className="chat-container-header">
      <div className="profile">
        <div className="img-container">
          <img src={user.img} alt={"photo of " + user.first_name} />
        </div>
        <h3>{user.first_name}</h3>
      </div>
      <i className="log-out-icon">⇦</i>
    </div>
  );
};

export default ChatHeader;
