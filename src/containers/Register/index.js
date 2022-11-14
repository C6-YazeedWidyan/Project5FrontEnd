import "./register.style.css";
import axios from "axios";
import { useSelector } from "react-redux";
import { getIsLoggedIn } from "../../redux/selectors/auth.selectors";
import React, { useState } from "react";
const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState(0);
  const [country, setCountry] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repass, setrepass] = useState('')
  const role_id = 1;
  const [message, setmessage] = useState('')
  const state = useSelector(getIsLoggedIn);
  const addNewUser = () => {
    axios
      .post("http://localhost:5000/user", {
        firstName,
        lastName,
        age,
        country,
        email,
        password,
        role_id,
      })
      .then((result) => {
        console.log(result.data.massage);
        setmessage(result.data.massage)
      })
      .catch((err) => {
        console.log(err.message);
        setmessage(err.message)
      });
  };

  return (
    <>
      <div className="register-container">
        {!state.getIsLoggedIn ? (
          <>
            <p>Register</p>
            <input
              className="auth-input"
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
              type="text"
              placeholder="firstName"
            />
            <input
              className="auth-input"
              onChange={(e) => {
                setLastName(e.target.value);
              }}
              type="text"
              placeholder="lastName"
            />
            <input
              className="auth-input"
              onChange={(e) => {
                setAge(e.target.value);
              }}
              type="number"
              placeholder="age"
            />
            <input
              className="auth-input"
              onChange={(e) => {
                setCountry(e.target.value);
              }}
              type="text"
              placeholder="country"
            />
            <input
              className="auth-input"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              type="email"
              placeholder="email"
            />
            <input
              className="auth-input"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              type="password"
              placeholder="password"
            />
            <input
              className="auth-input"
              type="password"
              placeholder="Re-password"
              onChange={(e)=>{
                setrepass(e.target.value)
              }}
            />{password==""&&repass==""?<p></p>:<div> {password==repass?<p className="succes-msg">password matched</p>:<p className="error-msg">wrong password</p>}</div>}
           
            <button
              className="register-btn"
              onClick={() => {
                addNewUser();
              }}
            >
              Register
            </button>
            <p>{message}</p>
          </>
        ) : (
          <>
            <p>Logout First</p>
          </>
        )}
      </div>
    </>
  );
};

export default Register;
