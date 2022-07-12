import React, { useEffect, useState } from "react";
import Chat from "./Chat";
import ChatInput from "./ChatInput";
import "./chatdisplay.scss";

const ChatDisplay = ({ user, clickedUser }) => {
  const userId = user?.id;
  const clickedUserId = clickedUser?.id;
  console.log(user);

  const [userMessages, setUserMessages] = useState(null);
  const [clickedUserMessage, setClickedUserMessage] = useState(null);
  const [userRoomId, setUserRoomId] = useState(null);

  const getUserMessage = () =>
    fetch(`/rooms/${userId}`).then((r) => {
      if (r.ok) {
        r.json().then((message) => {
          setUserMessages(message[0]["messages"]);
        });
      }
    });

  const getClickedUserMessage = () =>
    fetch(`/rooms/${clickedUserId}`).then((r) => {
      if (r.ok) {
        r.json().then((message) => {
          setClickedUserMessage(message[0]["messages"]);
        });
      }
    });

  const messages = [];

  userMessages?.forEach((message) => {
    const formattedMessage = {};
    formattedMessage["room_id"] = message?.room_id;
    formattedMessage["name"] = user?.first_name;
    formattedMessage["img"] = user?.img;
    formattedMessage["message"] = message.message;
    formattedMessage["timestamp"] = message.created_at;
    messages.push(formattedMessage);
  });

  clickedUserMessage?.forEach((message) => {
    const formattedMessage = {};
    formattedMessage["room_id"] = message?.room_id;
    formattedMessage["name"] = clickedUser?.first_name;
    formattedMessage["img"] = clickedUser?.img;
    formattedMessage["message"] = message.message;
    formattedMessage["timestamp"] = message.created_at;
    messages.push(formattedMessage);
  });

  const descendingOrderMessage = messages?.sort((a, b) =>
    a.timestamp.localeCompare(b.timestamp)
  );

  useEffect(() => {
    getUserMessage();
    getClickedUserMessage();
  }, []);

  // const getClickedUserMessage = () =>
  //   fetch(`/message/${matches}`).then((r) => {
  //     if (r.ok) {
  //       r.json().then((message) => console.log(message));
  //     }
  //   });

  return (
    <div>
      <Chat descendingOrderMessage={descendingOrderMessage} />
      <ChatInput
        user={user}
        clickedUser={clickedUser}
        getUserMessage={getUserMessage}
        getClickedUserMessage={getClickedUserMessage}
      />
    </div>
  );
};

export default ChatDisplay;
