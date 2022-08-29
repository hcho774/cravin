import React, { useEffect, useState } from "react";
import Chat from "./Chat";
import ChatInput from "./ChatInput";
import "./chatdisplay.scss";

const ChatDisplay = ({ user, clickedUser, navigate, cable }) => {
  //create variables to store user and corresponding user id
  const userId = user?.id;
  const clickedUserId = clickedUser?.id;
  // initialize usestate for UserMessages and corresponding user message
  const [userMessages, setUserMessages] = useState(null);
  const [clickedUserMessage, setClickedUserMessage] = useState(null);
  const [updated, setUpdated] = useState(null);
  // function to fetch user's messages
  const getUserMessage = () =>
    fetch(`/rooms/${userId}`).then((r) => {
      if (r.ok) {
        r.json().then((message) => {
          setUserMessages(message[0]?.messages);
        });
      }
    });
  // function to fetch corresponding user's messages
  const getClickedUserMessage = () =>
    fetch(`/rooms/${clickedUserId}`).then((r) => {
      if (r.ok) {
        r.json().then((message) => {
          if (!message.length) {
            console.log("message does not exist");
          } else {
            setClickedUserMessage(message[0]?.messages);
          }
        });
      }
    });
  //create empty array to store user's messages
  const messages = [];
  //loop through user's messages and format retrieved user's messages into formattedMessage and push it to the empty array which we created called messages
  userMessages?.forEach((message) => {
    const formattedMessage = {};
    formattedMessage["room_id"] = message?.room_id;
    formattedMessage["name"] = user?.first_name;
    formattedMessage["img"] = user?.img;
    formattedMessage["message"] = message.message;
    formattedMessage["timestamp"] = message.created_at;
    messages.push(formattedMessage);
  });
  //loop through corresponding user's messages and format retrieved corresponding user's messages into formattedMessage and push it to the empty array which we created called messages
  clickedUserMessage?.forEach((message) => {
    const formattedMessage = {};
    formattedMessage["room_id"] = message?.room_id;
    formattedMessage["name"] = clickedUser?.first_name;
    formattedMessage["img"] = clickedUser?.img;
    formattedMessage["message"] = message.message;
    formattedMessage["timestamp"] = message.created_at;
    messages.push(formattedMessage);
  });
  //ordering messages in descendingOrder by time
  const descendingOrderMessage = messages?.sort((a, b) =>
    a.timestamp.localeCompare(b.timestamp)
  );
  // useEffect to fire getUserMessage
  useEffect(() => {
    getUserMessage();
    //************ tried to make this chat real time using setInterval to fetch data every 2 seconds which is a bad approach if this application scale up but wanted to see how it would look.
    // getClickedUserMessage();

    // const interval = setInterval(() => {
    //   getUserMessage();
    //   getClickedUserMessage();
    // }, 2000);

    // return () => clearInterval(interval);
    //************
  }, [clickedUserMessage]);

  // useEffect to fire getClikedUserMessage
  useEffect(() => {
    getClickedUserMessage();
    //************ tried to make this chat real time using setInterval to fetch data every 2 seconds which is a bad approach if this application scale up but wanted to see how it would look.
    // const interval = setInterval(() => {
    //   getUserMessage();
    //   getClickedUserMessage();
    // }, 2000);

    // return () => clearInterval(interval);
    //************
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
