import React, { useState, useEffect } from "react";
import NavBar from "../../components/NavBar";
import Header from "../../components/Header";
import Search from "../../components/Search";
import MessageList from "../../components/MessageList";
import NewMessage from "../../components/NewMessage";
import TinderCard from "react-tinder-card";
import ChatContainer from "../../components/ChatContainer";
import "./dashboard.scss";

const Dashboard = ({ user, setUser, navigate }) => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [room, setRoom] = useState([]);
  const [messages, setMessages] = useState([]);
  const [search, setSearch] = useState("");
  const [errors, setErrors] = useState("");

  // const characters = db;
  const [lastDirection, setLastDirection] = useState();
  const [genderedUsers, setGenderedUsers] = useState(null);
  // const [filteredGenderedUsers, setFilteredGenderedUsers] = useState(null);

  useEffect(() => {
    if (user?.gender_interest === "woman") {
      fetch(`/woman/`)
        .then((res) => res.json())
        .then((users) => setGenderedUsers(users));
    } else {
      fetch(`/man/`)
        .then((res) => res.json())
        .then((users) => setGenderedUsers(users));
    }
  }, [user]);

  const getUser = () =>
    fetch("/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }
    });

  useEffect(() => {
    getUser();
  }, []);

  const filteredGenderedUsers = genderedUsers?.filter((genderedUser) => {
    return genderedUser.id !== user?.matches;
  });

  function updatedMatches(matchedUserId) {
    console.log(matchedUserId);
    fetch(`/matches/${user.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ matches: matchedUserId }),
    }).then((r) => {
      if (r.ok) {
        r.json().then((user) => {
          console.log(user);
          getUser();
        });
      } else {
        r.json().then((err) => {
          setErrors(err.errors);
        });
      }
    });
  }

  const swiped = (direction, swipedUserId) => {
    if (direction === "right") {
      updatedMatches(swipedUserId);
    }
    // console.log("removing: " + nameToDelete);
    setLastDirection(direction);
  };

  const outOfFrame = (name) => {
    console.log(name + " left the screen!");
  };

  return (
    <>
      <NavBar
        user={user}
        setUser={setUser}
        minimal={true}
        navigate={navigate}
        showModal={false}
        setShowLogin={false}
        setShowModal={() => {}}
      />
      {user && (
        <div className="dashboard">
          <ChatContainer user={user} />
          <div className="swipe-container">
            <div className="card-container">
              {filteredGenderedUsers?.map((genderedUser) => (
                <TinderCard
                  className="swipe"
                  key={genderedUser.username}
                  onSwipe={(dir) => swiped(dir, genderedUser.id)}
                  onCardLeftScreen={() => outOfFrame(genderedUser.username)}
                >
                  <div
                    style={{ backgroundImage: "url(" + genderedUser.img + ")" }}
                    className="card"
                  >
                    <h3>{genderedUser.first_name}</h3>
                  </div>
                </TinderCard>
              ))}

              <div className="swipe-info">
                {lastDirection ? <p>You swiped {lastDirection}</p> : <p />}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;

// import React, { useState, useEffect } from "react";
// import NavBar from "../../components/NavBar";
// import Header from "../../components/Header";
// import Search from "../../components/Search";
// import MessageList from "../../components/MessageList";
// import NewMessage from "../../components/NewMessage";

// const Chat = ({ user, setUser, navigate }) => {
//   const [isDarkMode, setIsDarkMode] = useState(true);
//   const [room, setRoom] = useState([]);
//   const [messages, setMessages] = useState([]);
//   const [search, setSearch] = useState("");

//   console.log(user.id);
//   console.log(room);

//   useEffect(() => {
//     fetch("/messages")
//       .then((r) => r.json())
//       .then((messages) => setMessages(messages));
//   }, []);

//   function handleAddMessage(newMessage) {
//     setMessages([...messages, newMessage]);
//   }

//   function handleDeleteMessage(id) {
//     const updatedMessages = messages.filter((message) => message.id !== id);
//     setMessages(updatedMessages);
//   }

//   function handleUpdateMessage(updatedMessageObj) {
//     const updatedMessages = messages.map((message) => {
//       if (message.id === updatedMessageObj.id) {
//         return updatedMessageObj;
//       } else {
//         return message;
//       }
//     });
//     setMessages(updatedMessages);
//   }

//   const displayedMessages = messages.filter((message) =>
//     message.body.toLowerCase().includes(search.toLowerCase())
//   );

//   useEffect(() => {
//     fetch("/rooms/")
//       .then((r) => r.json())
//       .then((room) => setRoom(room));
//   }, []);

//   if (!room)
//     return <NavBar user={user} setUser={setUser} navigate={navigate} />;

//   return (
//     <div>
//       <NavBar user={user} setUser={setUser} navigate={navigate} />
//       <main className={isDarkMode ? "dark-mode" : ""}>
//         <Header
//           user={user}
//           isDarkMode={isDarkMode}
//           onToggleDarkMode={setIsDarkMode}
//         />
//         <Search search={search} onSearchChange={setSearch} />
//         <MessageList
//           messages={displayedMessages}
//           currentUser={user}
//           onMessageDelete={handleDeleteMessage}
//           onUpdateMessage={handleUpdateMessage}
//         />
//         <NewMessage currentUser={user} onAddMessage={handleAddMessage} />
//       </main>
//     </div>
//   );
// };

// export default Chat;

{
  /* <NavBar user={user} setUser={setUser} navigate={navigate} />
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
      </main> */
}
