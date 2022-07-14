import React, { useEffect, useRef } from "react";
import "./chat.scss";
import moment from "moment";
const Chat = ({ descendingOrderMessage }) => {
  return (
    <div className="chat-display">
      {descendingOrderMessage.map((message, _index) => (
        <div key={_index}>
          <div className="">
            <div className="img-container">
              <img src={message.img} alt={message.name + " profile"} />
              <p>{message.name}</p>
              <em>
                {moment(message.timestamp).format("MMMM Do YYYY, h:mm a")}
              </em>
            </div>
          </div>
          <div className="speech_bubble">
            <p>{message.message}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Chat;
