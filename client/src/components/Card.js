import React, { useState } from "react";
import "./card.scss";
const Card = ({ answer, handleAnswerDelete, user }) => {
  const [requestMsg, setRequestMsg] = useState("");

  const { id, pitch, user_id } = answer;
  const [errors, setErrors] = useState("");
  function handleDelete(id) {
    handleAnswerDelete(id);
  }

  // const [newRoom, setNewRoom] = useState({
  //   title: `${user.username}'s room`,
  //   sender_id: user.id,
  //   recipient_id: user_id,
  // });
  const newRoom = {
    title: `${user.username}'s room`,
    sender_id: user.id,
    recipient_id: user_id,
  };

  function handlePaging(user_id) {
    fetch(`/rooms`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newRoom),
    }).then((r) => {
      if (r.ok) {
        r.json().then((room) => {
          setRequestMsg("You have paged");
          // setAnswers([...answers, answer]);
          // setSuccess(true);
        });
      } else {
        r.json().then((err) => setErrors(err.errors));
      }
    });
  }

  const isCurrentUser = user_id === user.id ? true : false;

  return (
    <div className="card">
      <div className="left">
        <span className="title">{user_id}</span>
        <span className="link">{pitch}</span>

        {isCurrentUser ? (
          <button>page</button>
        ) : (
          <button onClick={() => handlePaging(user_id)}>page</button>
        )}
        {/* <span className="link">13</span> */}
      </div>

      <div className="right">
        <div className="percentage positive">
          {/* <KeyboardArrowUpIcon />
          {diff} % */}
        </div>
        {isCurrentUser ? (
          <button onClick={() => handleDelete(id)}>x</button>
        ) : null}
      </div>
      <em>{requestMsg}</em>
    </div>
  );
};

export default Card;
