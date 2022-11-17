import "./register.style.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector , useDispatch} from "react-redux";
import { setLogin, setUserId, setUserType } from "../../redux/reducers/auth";
import { getIsLoggedIn } from "../../redux/selectors/auth.selectors";
import React, { useState } from "react";
import { setCart } from "../../redux/reducers/cart";
import { setWishlist } from "../../redux/reducers/wishlist";
const Register = () => {
  const navigate=useNavigate()
   const dispatch = useDispatch();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState(0);
  const [country, setCountry] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repass, setrepass] = useState("");
  const role_id = 1;
  const [message, setmessage] = useState("");
  const state = useSelector(getIsLoggedIn);
  const [pass, setPass] = useState(false)
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
        console.log(result.data);
        getToken()
        setmessage(result.data.massage);
      })
      .catch((err) => {
        console.log(err.message);
        setmessage(err.message);
      });
  };
  ////////////////////////////////////
const getToken=()=>{
  axios
      .post("http://localhost:5000/login", {
        email,
        password,
      })
      .then((result) => {
        dispatch(setLogin(result.data.token));
        dispatch(setUserId(result.data.userId));
        dispatch(setUserType(result.data.role));

        axios
          .get("http://localhost:5000/cart", {
            headers: {
              Authorization: `Bearer ${result.data.token}`,
            },
          })
          .then((res) => {
            console.log("ssss");
            dispatch(setCart(res.data.result));
          })
          .catch((err) => {
            console.log(err);
          });

        axios
          .get("http://localhost:5000/wishlist", {
            headers: {
              Authorization: `Bearer ${result.data.token}`,
            },
          })
          .then((res) => {
            dispatch(setWishlist(res.data.result));
          })
          .catch((err) => {
            console.log(err);
          });

        if (result.data.role == 1) {
          navigate("/");
        } else if (result.data.role == 2) {
          navigate("/admin/dashboard");
        }
      })
      .catch((err) => {
        console.log(err.response.data.message);
        setmessage(err.response.data.message);
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
              placeholder="FIRST NAME"
            />
            <input
              className="auth-input"
              onChange={(e) => {
                setLastName(e.target.value);
              }}
              type="text"
              placeholder="LAST NAME"
            />
            <input
              className="auth-input"
              onChange={(e) => {
                setAge(e.target.value);
              }}
              type="number"
              placeholder="AGE"
            />
            <input
              className="auth-input"
              onChange={(e) => {
                setCountry(e.target.value);
              }}
              type="text"
              placeholder="COUNTRY"
            />
            <input
              className="auth-input"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              type="email"
              placeholder="EMAIL"
            />
            <input
              className="auth-input"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              type="password"
              placeholder="PASSWORD"
            />
            <input
              className="auth-input"
              type="password"
              placeholder="CONFIRM-PASSWORD"
              onChange={(e) => {
                setrepass(e.target.value);
               
            
          
              }}
            />
            {!pass&&password == "" && repass == "" ? (
              <p></p>
            ) : (pass&&
              <div>
                {password == repass ? (
                  <p className="succes-msg">PASSWORD MATCHED</p>
                ) : (
                  <p className="error-msg">WRONG PASSWORD</p>
                )}
              </div>
            )}

            <button
              className="register-btn"
              onClick={() => {
                addNewUser();
                setPass(true)
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
