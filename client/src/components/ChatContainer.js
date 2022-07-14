import React, { useState } from "react";
import ChatHeader from "./ChatHeader";
// import MatchesDisplay from "./MatchesDisplay";
import ChatDisplay from "./ChatDisplay";
import MatchesDisplay from "./MatchesDisplay";
import "./chatcontainer.scss";

const ChatContainer = ({ user, setUser, navigate }) => {
  const [clickedUser, setClickedUser] = useState(null);

  return (
    <div className="chat-container">
      <ChatHeader user={user} setUser={setUser} navigate={navigate} />

      <div>
        <button className="option" onClick={() => setClickedUser(null)}>
          Blinded
        </button>
        <button className="option" disabled={!clickedUser}>
          Chat
        </button>
      </div>

      {!clickedUser && (
        <MatchesDisplay
          matches={user.matches}
          setClickedUser={setClickedUser}
        />
      )}

      {clickedUser && <ChatDisplay user={user} clickedUser={clickedUser} />}
    </div>
  );
};

export default ChatContainer;
