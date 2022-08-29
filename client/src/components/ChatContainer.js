import React, { useState, useEffect } from "react";
import ChatHeader from "./ChatHeader";
import ChatDisplay from "./ChatDisplay";
import MatchesDisplay from "./MatchesDisplay";
import "./chatcontainer.scss";

const ChatContainer = ({ user, setUser, navigate, cable }) => {
  //create useState for clicked user in chat container with intial value of null
  const [clickedUser, setClickedUser] = useState(null);
  //create useState for matchedprofile with initial value of null
  const [matchedProfiles, setMatchedProfiles] = useState(null);
  //create useState for requestWatingMgs with initial value of ""
  const [requestWatingMsg, setRequestWatingMsg] = useState("");
  //create useState for errors with initial value of ""
  const [errors, setErrors] = useState("");

  // getMatches function to get matched user profile
  const getMatches = () => {
    fetch(`/matcheduser/${user.matches}`).then((r) => {
      if (r.ok) {
        // if request went through successfully then set mathcedProfile to userprofile that we receive from backend
        r.json().then((user) => {
          setMatchedProfiles(user);
          setClickedUser(user);
        });
      } else {
        r.json().then((err) => {
          //if not successful then set error message
          setErrors(err.error);
        });
      }
    });
  };
  //use effect to get matchedprofile wheneven current user's matches get updated
  useEffect(() => {
    //check if current user has matches
    if (user.matches !== 0) {
      //then get matched profile
      getMatches();
    } else {
      // if current user does not have matches then
      //console.log "No matches found"
      console.log("No matches found");
      //navigate to chat page
      // navigate("/chat");
    }
  }, []);

  // if (matchedProfiles?.matches !== 0 || null) {
  //   setClickedUser(matchedProfiles);
  // } else {
  //   setRequestWatingMsg(
  //     "Wating for Anonymous user to respond to user chat request.."
  //   );
  // }

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
          matchedProfiles={matchedProfiles}
          setRequestWatingMsg={setRequestWatingMsg}
          requestWatingMsg={requestWatingMsg}
          setClickedUser={setClickedUser}
        />
      )}
      {clickedUser && (
        <ChatDisplay
          cable={cable}
          user={user}
          clickedUser={clickedUser}
          navigate={navigate}
        />
      )}
    </div>
  );
};

export default ChatContainer;
