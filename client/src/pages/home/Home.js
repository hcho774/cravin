import React from "react";
import Question from "../../components/Question";
import NavBar from "../../components/NavBar";
import Card from "../../components/Card";
import "./home.scss";

const Home = () => {
  return (
    <div className="home">
      <div className="homecontainer">
        <NavBar />
        <div className="questions">
          <Question />
        </div>
        <div className="cards">
          <Card test={true} />
          {/* <Card test={false}/> */}
          <Card test={true} />
          <Card test={true} />
        </div>
      </div>
    </div>
  );
};

export default Home;
