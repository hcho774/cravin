import React, { useState } from "react";
import NavBar from "../../components/NavBar";
import "./profile.scss";
//create a form that has initial data to be used to reset after user input has submitted
const form = {
  username: "",
  first_name: "First Name",
  dob_day: "DD",
  dob_month: "MM",
  dob_year: "YYYY",
  show_gender: false,
  password_digest: "",
  gender_identity: "",
  gender_interest: "",
  img: "image url",
  matches: [],
};

const Profile = ({ user, setUser, navigate, getUser }) => {
  // create useState for initital formdata that contains an object to collect user information
  const [formData, setFormData] = useState({
    username: user.username,
    first_name: "",
    dob_day: "",
    dob_month: "",
    dob_year: "",
    show_gender: false,
    password_digest: "",
    gender_identity: "",
    gender_interest: "",
    img: "",
    matches: [],
  });
  //handle form submit
  function handleSubmit(e) {
    //preventing page to refresh when form gets submitted
    e.preventDefault();
    //update user profile by using PATCH method
    fetch(`/users/${user.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData), // pass formdata that we collect from users
    }).then((r) => {
      if (r.ok) {
        r.json().then((user) => {
          getUser(); // render getUser function
          setFormData(form); //resetting form inputs with empty form
          navigate("/question"); // redirect to question page
        });
      } else {
        r.json().then((err) => console.log(err));
      }
    });
  }
  // handle changes in form inputs
  function handleChange(e) {
    //store input values to value
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    //store input name to name
    const name = e.target.name;

    //set formData to inputs data that users enter
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

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
      <div className="onboarding">
        <h2 className="profile_title">
          {user.first_name !== null
            ? "Edit your profile"
            : "Create your profile"}
        </h2>

        <form onSubmit={handleSubmit}>
          <section>
            <label htmlFor="first_name">First Name</label>
            <input
              id="first_name"
              type="text"
              name="first_name"
              placeholder={form.first_name}
              required={true}
              value={formData.first_name}
              onChange={handleChange}
            />

            <label>Birthday</label>
            <div className="multiple-input-container">
              <input
                id="dob_month"
                type="number"
                name="dob_month"
                placeholder={form.dob_month}
                required={true}
                value={formData.dob_month}
                onChange={handleChange}
              />

              <input
                id="dob_day"
                type="number"
                name="dob_day"
                placeholder={form.dob_day}
                required={true}
                value={formData.dob_day}
                onChange={handleChange}
              />
              <input
                id="dob_year"
                type="number"
                name="dob_year"
                placeholder={form.dob_year}
                required={true}
                value={formData.dob_year}
                onChange={handleChange}
              />
            </div>

            <label>Gender</label>
            <div className="multiple-input-container">
              <input
                id="man-gender-identity"
                type="radio"
                name="gender_identity"
                value="man"
                onChange={handleChange}
                checked={formData.gender_identity === "man"}
              />
              <label htmlFor="man-gender-identity">Man</label>
              <input
                id="woman-gender-identity"
                type="radio"
                name="gender_identity"
                value="woman"
                onChange={handleChange}
                checked={formData.gender_identity === "woman"}
              />
              <label htmlFor="woman-gender-identity">Woman</label>
              <input
                id="more-gender-identity"
                type="radio"
                name="gender_identity"
                value="more"
                onChange={handleChange}
                checked={formData.gender_identity === "more"}
              />
              <label htmlFor="more-gender-identity">More</label>
            </div>

            <label htmlFor="show-gender">Show Gender on my Profile</label>

            <input
              id="show-gender"
              type="checkbox"
              name="show_gender"
              onChange={handleChange}
              checked={formData.show_gender}
            />

            <label>Show Me</label>

            <div className="multiple-input-container">
              <input
                id="man-gender-interest"
                type="radio"
                name="gender_interest"
                value="man"
                onChange={handleChange}
                checked={formData.gender_interest === "man"}
              />
              <label htmlFor="man-gender-interest">Man</label>
              <input
                id="woman-gender-interest"
                type="radio"
                name="gender_interest"
                value="woman"
                onChange={handleChange}
                checked={formData.gender_interest === "woman"}
              />
              <label htmlFor="woman-gender-interest">Woman</label>
              <input
                id="everyone-gender-interest"
                type="radio"
                name="gender_interest"
                value="everyone"
                onChange={handleChange}
                checked={formData.gender_interest === "everyone"}
              />
              <label htmlFor="everyone-gender-interest">Everyone</label>
            </div>

            <input type="submit" />
          </section>

          <section>
            <label htmlFor="url">Profile Photo</label>
            <input
              type="image url"
              name="img"
              id="img"
              placeholder={form.img}
              onChange={handleChange}
              required={true}
            />
            <div className="photo-container">
              {formData.img && (
                <img src={formData.img} alt="profile pic preview" />
              )}
            </div>
          </section>
        </form>
      </div>
    </>
  );
};

export default Profile;
