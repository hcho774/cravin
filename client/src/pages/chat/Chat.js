import React, { useState, useEffect } from "react";
import NavBar from "../../components/NavBar";
import Header from "../../components/Header";
import Search from "../../components/Search";
import MessageList from "../../components/MessageList";
import NewMessage from "../../components/NewMessage";

const Chat = ({ user, setUser, navigate }) => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [room, setRoom] = useState([]);
  const [messages, setMessages] = useState([]);
  const [search, setSearch] = useState("");

  console.log(user.id);
  console.log(room);

  useEffect(() => {
    fetch("/messages")
      .then((r) => r.json())
      .then((messages) => setMessages(messages));
  }, []);

  function handleAddMessage(newMessage) {
    setMessages([...messages, newMessage]);
  }

  function handleDeleteMessage(id) {
    const updatedMessages = messages.filter((message) => message.id !== id);
    setMessages(updatedMessages);
  }

  function handleUpdateMessage(updatedMessageObj) {
    const updatedMessages = messages.map((message) => {
      if (message.id === updatedMessageObj.id) {
        return updatedMessageObj;
      } else {
        return message;
      }
    });
    setMessages(updatedMessages);
  }

  const displayedMessages = messages.filter((message) =>
    message.body.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    fetch("/rooms/")
      .then((r) => r.json())
      .then((room) => setRoom(room));
  }, []);

  if (!room)
    return <NavBar user={user} setUser={setUser} navigate={navigate} />;

  return (
    <div>
      <NavBar user={user} setUser={setUser} navigate={navigate} />
      <main className={isDarkMode ? "dark-mode" : ""}>
        <Header
          user={user}
          isDarkMode={isDarkMode}
          onToggleDarkMode={setIsDarkMode}
        />
        <Search search={search} onSearchChange={setSearch} />
        <MessageList
          messages={displayedMessages}
          currentUser={user}
          onMessageDelete={handleDeleteMessage}
          onUpdateMessage={handleUpdateMessage}
        />
        <NewMessage currentUser={user} onAddMessage={handleAddMessage} />
      </main>
    </div>
  );
};

export default Chat;
