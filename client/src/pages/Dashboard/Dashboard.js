import React, { useState, useEffect } from "react";
import NavBar from "../../components/NavBar";
import TinderCard from "react-tinder-card";
import ChatContainer from "../../components/ChatContainer";
import "./dashboard.scss";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const Dashboard = ({ user, setUser, navigate, q }) => {
  const [errors, setErrors] = useState("");
  //set useState for Chat Request with initial value of false
  const [isRequest, setIsRequest] = useState(false);
  //set useState for Requesting User infomration for chat
  const [requestingUser, setRequestingUser] = useState([]);
  //set useState for lastDirection for CardSwipe that has user answers
  const [lastDirection, setLastDirection] = useState();
  //set useState for Users by gender with initial state of null
  const [genderedUsers, setGenderedUsers] = useState(null);

  //Create an Object that has Chat requestingUser and recipient user id
  const requestAccept = {
    user_id: user.id,
    recipient_id: requestingUser[0]?.user_id,
  };

  //handle chat request from other user with NO response denying to chat with the requesting user
  function clickedNo() {
    //delete Room data that Chat requesting user created by using Fetch DELETE Method
    fetch(`/rooms/${requestingUser[0]?.user_id}`, { method: "DELETE" }).then(
      (r) => {
        if (r.ok) {
          //invoke getUser function to get user information
          getUser();
          //navigate to chat page
          navigate("/chat");
        }
      }
    );
    //reset matches to 0 that requesting user created
    fetch(`/matches/${requestingUser[0]?.user_id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ matches: 0 }),
    }).then((r) => {
      if (r.ok) {
        r.json().then((user) => {
          //set useState request to false
          setIsRequest(false);
          //invoke getUser function to get user information
          getUser();
        });
      } else {
        r.json().then((err) => {
          //set error message if request is not successful
          setErrors(err.errors);
        });
      }
    });
  }

  //handle chat request from other user with Yes response accepting to chat with the requesting user
  function clickedYes() {
    //create a chat Room that has accepting user as user_id and the requesting user as recipient by using Fetch POST Method
    fetch("/rooms", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestAccept),
    }).then((r) => {
      if (r.ok) {
        r.json().then((room) => {
          //if request is successful, invoke get user function to get user information
          getUser();
          navigate("/chat");
        });
      } else {
        r.json().then((err) => {
          console.log(err); //console.log(error message)
        });
      }
    });
    //update current user's matches with the requesting user'id by using Fetch PATCH method
    fetch(`/matches/${user.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ matches: requestingUser[0]?.user_id }),
    }).then((r) => {
      if (r.ok) {
        r.json().then((user) => {
          //set useState request to false
          setIsRequest(false);
          //invoke getUser function to get user information
          getUser();
        });
      } else {
        r.json().then((err) => {
          //set errors message
          setErrors(err.errors);
        });
      }
    });
  }

  // function that gets other User information by gender
  const getGenderedUser = () => {
    //if current user's gender interest is woman, then GET all women
    if (user?.gender_interest === "woman") {
      fetch(`/woman/`)
        .then((res) => res.json())
        .then((users) => {
          // and update state genderedUsers with women users that has no chat room and no matches with other users
          setGenderedUsers(
            users.filter((user) => {
              return user.rooms.length === 0 && user.matches == (null || 0);
            })
          );
        });
    } else {
      //if current user's gender interest is man, then GET all men
      fetch(`/man/`)
        .then((res) => res.json())
        .then((users) => {
          // and update state genderedUsers with men users that has no chat room and no matches with other users
          setGenderedUsers(
            users.filter((user) => {
              return user.rooms.length === 0 && user.matches == (null || 0);
            })
          );
        });
    }
  };

  //function that checks if current user has chat room request from other users
  const checkRequest = () => {
    // any other users has requested to chat current user as a recipient
    fetch(`/check_recipient/${user.id}`).then((r) => {
      if (r.ok) {
        r.json().then((room) => {
          //then set requesting user with chat room infomration that the requesting user has
          setRequestingUser(room);
          //check if current user's matches equals to requeting user's id
          if (user?.matches == room[0]?.user_id) {
            //then set useState request to false
            setIsRequest(false);
          } else if (room.length == 0) {
            // if room does not exist then setIsRequest(false);
            setIsRequest(false);
          } else {
            //otherwise setIsRequest to true
            setIsRequest(true);
          }
        });
      } else {
        r.json().then((err) => setErrors(err.errors));
      }
    });
  };

  //useEffect to invoke checkrequest and getGenderedUser functions to run first and whenever user changes
  useEffect(() => {
    checkRequest();
    getGenderedUser();
  }, [user]);
  //getUser function to get current logged in user
  const getUser = () =>
    fetch("/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }
    });

  //useEffect to invoke getUser function to get current logged in user
  useEffect(() => {
    getUser();
  }, []);
  //filter gendered users
  const filteredGenderedUsers = genderedUsers?.filter((genderedUser) => {
    //if current user's matches is not null or 0 then return genderedUser
    if (user?.matches === null || user?.matches === 0) {
      return genderedUser;
    } else {
      //else return only genderedUser with id which equals current user's matches
      return genderedUser?.id === user?.matches;
    }
  });

  //updating matches for current user
  function updatedMatches(matchedUserId) {
    //inital form data to be used to create room that has current user and matchedUserId as recipient
    const form = {
      user_id: user.id,
      recipient_id: matchedUserId,
    };
    //check if current user has room created or not
    if (user.rooms[0]) {
      //if current user has room created then update current user's rooms with matcheduserId using Fetch PATCH method
      fetch(`/rooms/${user.rooms[0].id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      }).then((r) => {
        if (r.ok) {
          r.json().then((user) => {
            //if request is ok then invoke getUser function to get user information
            getUser();
          });
        } else {
          r.json().then((err) => {
            //set errors message
            setErrors(err.errors);
          });
        }
      });
    } else {
      //if current user does not have room created then Create new room using Fetch POST method
      fetch("/rooms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      }).then((r) => {
        if (r.ok) {
          r.json().then((room) => {
            //invoke getUser function to get user information and getGenderedUser function to get gendered user information
            getUser();
            getGenderedUser();
          });
        } else {
          r.json().then((err) => {
            //set errors message
            setErrors(err.errors);
          });
        }
      });
    }
    // updating current user's matches with matchedUserId
    fetch(`/matches/${user.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ matches: matchedUserId }),
    }).then((r) => {
      if (r.ok) {
        r.json().then((user) => {
          //if request is ok, invoke getUser function to get user information
          getUser();
        });
      } else {
        r.json().then((err) => {
          //set errors message
          setErrors(err.errors);
        });
      }
    });
  }

  // swiped function that handles swiped cards to update matches and create room with associated users
  const swiped = (direction, swipedUserId) => {
    //if current user swipe card to right
    if (direction === "right") {
      //then invoke updateMatches function with swipedUserId
      updatedMatches(swipedUserId);
      //nevigate to chat page
      navigate("/chat");
    }
    //set last direction to user's last direction
    setLastDirection(direction);
  };
  //

  //to show chat request modal
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
                >
                  <div className="card">
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
