import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import "./chatinput.scss";
const ChatInput = ({
  user,
  getUserMessage,
  getClickedUserMessage,
  setUpdated,
  navigate,
}) => {
  //set state for text input area for user
  const [textArea, setTextArea] = useState("");
  const userRoomId = user?.rooms[0]?.id;
  // function to add new messages to post to backend
  const addNewMessage = () => {
    const newMessage = {
      room_id: userRoomId,
      message: textArea,
    };
    //Fetching new messages to backend by using POST Method
    fetch("/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newMessage),
    }).then((r) => {
      console.log(r);
      if (r.ok) {
        r.json().then((message) => {
          navigate("/chat");
          getUserMessage();
          getClickedUserMessage();
          setTextArea("");
          setUpdated(null);
        });
      } else {
        r.json().then((err) => {
          console.log(err);
        });
      }
    });
  };
  //handling enter key down to trigger addNewMessage function when user pushes enter key
  function handleKeyDown(e) {
    if (e.key === "Enter") {
      addNewMessage();
    }
  }

  return (
    <div className="chat-input">
      <textarea
        value={textArea}
        onChange={(e) => setTextArea(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button
        className="secondary-button"
        onClick={addNewMessage}
        type="submit"
      >
        Submit
      </button>
    </div>
  );
};

export default ChatInput;
