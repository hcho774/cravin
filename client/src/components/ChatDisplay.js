import React, { useEffect, useState } from "react";
import Chat from "./Chat";
import ChatInput from "./ChatInput";
import "./chatdisplay.scss";

const ChatDisplay = ({ user, clickedUser, navigate }) => {
  const userId = user?.id;
  const clickedUserId = clickedUser?.id;

  const [userMessages, setUserMessages] = useState(null);
  const [clickedUserMessage, setClickedUserMessage] = useState(null);
  const [updated, setUpdated] = useState(null);

  const getUserMessage = () =>
    fetch(`/rooms/${userId}`).then((r) => {
      if (r.ok) {
        r.json().then((message) => {
          setUserMessages(message[0]?.messages);

          console.log(message);
        });
      }
    });

  const getClickedUserMessage = () =>
    fetch(`/rooms/${clickedUserId}`).then((r) => {
      if (r.ok) {
        r.json().then((message) => {
          if (!message.length) {
            console.log("message does not exist");
          } else {
            setClickedUserMessage(message[0]?.messages);

            console.log(message);
          }
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
    // getClickedUserMessage();

    // const interval = setInterval(() => {
    //   getUserMessage();
    //   getClickedUserMessage();
    // }, 2000);

    // return () => clearInterval(interval);
  }, [clickedUserMessage]);

  useEffect(() => {
    getClickedUserMessage();

    // const interval = setInterval(() => {
    //   getUserMessage();
    //   getClickedUserMessage();
    // }, 2000);

    // return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <Chat descendingOrderMessage={descendingOrderMessage} />
      <ChatInput
        user={user}
        clickedUser={clickedUser}
        getUserMessage={getUserMessage}
        getClickedUserMessage={getClickedUserMessage}
        setUpdated={setUpdated}
        navigate={navigate}
      />
    </div>
  );
};

export default ChatDisplay;
