import React, { useState, useEffect } from "react";
import NavBar from "../../components/NavBar";
import TinderCard from "react-tinder-card";
import ChatContainer from "../../components/ChatContainer";
import "./dashboard.scss";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const Dashboard = ({ user, setUser, navigate, q }) => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [room, setRoom] = useState([]);
  const [messages, setMessages] = useState([]);
  const [search, setSearch] = useState("");
  const [errors, setErrors] = useState("");
  const [isRequest, setIsRequest] = useState(false);
  const [requestingUser, setRequestingUser] = useState([]);

  const [lastDirection, setLastDirection] = useState();
  const [genderedUsers, setGenderedUsers] = useState(null);

  const requestAccept = {
    user_id: user.id,
    recipient_id: requestingUser[0]?.user_id,
  };

  function clickedNo() {
    console.log("clicked");
    fetch(`/rooms/${requestingUser[0]?.user_id}`, { method: "DELETE" }).then(
      (r) => {
        if (r.ok) {
          getUser();
          navigate("/chat");
        }
      }
    );
    fetch(`/matches/${requestingUser[0]?.user_id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ matches: 0 }),
    }).then((r) => {
      if (r.ok) {
        r.json().then((user) => {
          setIsRequest(false);
          getUser();
        });
      } else {
        r.json().then((err) => {
          setErrors(err.errors);
        });
      }
    });
  }

  function clickedYes() {
    fetch("/rooms", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestAccept),
    }).then((r) => {
      if (r.ok) {
        r.json().then((room) => {
          getUser();
        });
      } else {
        r.json().then((err) => {
          console.log(err);
        });
      }
    });

    fetch(`/matches/${user.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ matches: requestingUser[0]?.user_id }),
    }).then((r) => {
      if (r.ok) {
        r.json().then((user) => {
          setIsRequest(false);
          getUser();
        });
      } else {
        r.json().then((err) => {
          setErrors(err.errors);
        });
      }
    });
  }

  const getGenderedUser = () => {
    if (user?.gender_interest === "woman") {
      fetch(`/woman/`)
        .then((res) => res.json())
        .then((users) => {
          setGenderedUsers(
            users.filter((user) => {
              return user.rooms.length === 0 && user.matches == (null || 0);
            })
          );
        });
    } else {
      fetch(`/man/`)
        .then((res) => res.json())
        .then((users) => {
          setGenderedUsers(
            users.filter((user) => {
              return user.rooms.length === 0 && user.matches == (null || 0);
            })
          );
        });
    }
  };

  const checkRequest = () => {
    fetch(`/check_recipient/${user.id}`).then((r) => {
      if (r.ok) {
        r.json().then((room) => {
          setRequestingUser(room);

          if (user?.matches == room[0]?.user_id) {
            setIsRequest(false);
          } else if (room.length == 0) {
            setIsRequest(false);
          } else {
            setIsRequest(true);
          }
        });
      } else {
        r.json().then((err) => setErrors(err.errors));
      }
    });
  };

  useEffect(() => {
    checkRequest();
    getGenderedUser();
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
    if (user?.matches === null || user?.matches === 0) {
      return genderedUser;
    } else {
      return genderedUser?.id === user?.matches;
    }
  });

  function updatedMatches(matchedUserId) {
    const form = {
      user_id: user.id,
      recipient_id: matchedUserId,
    };

    if (user.rooms[0]) {
      fetch(`/rooms/${user.rooms[0].id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      }).then((r) => {
        if (r.ok) {
          r.json().then((user) => {
            getUser();
          });
        } else {
          r.json().then((err) => {
            setErrors(err.errors);
          });
        }
      });
    } else {
      fetch("/rooms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      }).then((r) => {
        if (r.ok) {
          r.json().then((room) => {
            getUser();
            getGenderedUser();
          });
        } else {
          r.json().then((err) => {
            console.log(err);
          });
        }
      });
    }

    fetch(`/matches/${user.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ matches: matchedUserId }),
    }).then((r) => {
      if (r.ok) {
        r.json().then((user) => {
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
      navigate("/chat");
    }

    setLastDirection(direction);
  };

  const outOfFrame = (name) => {
    console.log(name + " left the screen!");
  };

  const [show, setShow] = useState(true);

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
        showChat={true}
      />
      {user && (
        <div className="dashboard">
          <ChatContainer user={user} setUser={setUser} navigate={navigate} />
          <div className="swipe-container">
            {!user.answer ? <h3>{q?.questions}</h3> : <em></em>}
            {isRequest ? (
              <>
                <Button variant="white" onClick={() => setShow(true)}></Button>

                <Modal
                  show={show}
                  onHide={() => setShow(false)}
                  dialogClassName="modal-90w"
                  aria-labelledby="contained-modal-title-vcenter"
                  centered
                  // aria-labelledby="example-custom-modal-styling-title"
                >
                  <Modal.Header closeButton>
                    <Modal.Title
                      className="title"
                      id="example-custom-modal-styling-title"
                    >
                      Chat Request by Anonymous User
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <p>Are you ready to chat?</p>
                    <Button
                      id="btn"
                      variant="dark"
                      onClick={() => clickedYes()}
                    >
                      CHAT
                    </Button>

                    <Button id="btn" variant="dark" onClick={() => clickedNo()}>
                      DENY
                    </Button>
                  </Modal.Body>
                </Modal>
              </>
            ) : (
              <em></em>
            )}
            <div className="card-container">
              {filteredGenderedUsers?.map((genderedUser) => (
                <TinderCard
                  className="swipe"
                  key={genderedUser.username}
                  onSwipe={(dir) => swiped(dir, genderedUser.id)}
                  onCardLeftScreen={() => outOfFrame(genderedUser.username)}
                >
                  <div
                    // style={{ backgroundImage: "url(" + genderedUser.img + ")" }}
                    className="card"
                  >
                    <h5>Anonymous</h5>
                    <h5>For demo purpose, username: {genderedUser.username}</h5>
                    <h6>answered</h6>
                    <h5 className="title">
                      {genderedUser?.answer?.answer ? " YES " : " NO "}
                    </h5>
                    <em>
                      <h4 className="link">
                        " {genderedUser?.answer?.pitch} "
                      </h4>
                    </em>
                  </div>
                </TinderCard>
              ))}

              <em className="swipe-info">
                {lastDirection ? <p>" You swiped {lastDirection}</p> : <p />}
              </em>
              {lastDirection == "right" && user.matches ? (
                <em>
                  {lastDirection == "right" && user.matches
                    ? ` and you have requested to chat "`
                    : `guess you did not like the answer "`}
                </em>
              ) : (
                <em></em>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;
