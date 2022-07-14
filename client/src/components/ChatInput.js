import React, { useState } from "react";
import "./chatinput.scss";
const ChatInput = ({
  user,
  clickedUser,
  getUserMessage,
  getClickedUserMessage,
}) => {
  const [textArea, setTextArea] = useState("");
  const userId = user?.id;
  const clickedUserId = clickedUser?.id;
  const userRoomId = user?.rooms[0]?.id;

  console.log(userRoomId);
  const addNewMessage = () => {
    const newMessage = {
      room_id: userRoomId,
      message: textArea,
    };

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
          getUserMessage();
          getClickedUserMessage();
          setTextArea("");
        });
      } else {
        r.json().then((err) => {
          console.log(err);
          // setErrors(err.errors);
        });
      }
    });
  };

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
