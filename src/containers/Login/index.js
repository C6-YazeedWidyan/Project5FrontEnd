import "./login.style.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLogin, setUserId, setUserType } from "../../redux/reducers/auth";
import { getIsLoggedIn } from "../../redux/selectors/auth.selectors";
import { GoogleLogin } from "react-google-login";
import { gapi } from "gapi-script";
import { setCart } from "../../redux/reducers/cart";
import { setWishlist } from "../../redux/reducers/wishlist";
const Login = () => {
  const clientId =
    "646674207004-f5s33oa3mbvsq5rnhthd67bnmjj439pg.apps.googleusercontent.com";

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: clientId,
        scope: "email",
      });
    }
    gapi.load("client:auth2", start);
  }, []);

  const onSuccess = (response) => {
    axios
      .post("http://localhost:5000/user/google", {
        firstName: response.wt.rV,
        lastName: response.wt.uT,
        email: response.wt.cu,
      })
      .then((result) => {
      
        dispatch(setLogin(result.data.token));
        dispatch(setUserId(result.data.userId));
        dispatch(setUserType(1));

        axios
          .get("http://localhost:5000/cart", {
            headers: {
              Authorization: `Bearer ${result.data.token}`,
            },
          })
          .then((res) => {
           
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
      })
      .catch((err) => {
        console.log(err.message);
      });

    navigate("/");
  };
  const onFailure = (response) => {
    console.log("FAILED", response);
  };
  const state = useSelector(getIsLoggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setmessage] = useState("");
  const login = () => {
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
      <div className="login-container">
        <p>Login</p>
        <input
          className="auth-input"
          type="email"
          placeholder="EMAIL"
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <input
          className="auth-input"
          type="password"
          placeholder="PASSWORD"
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button
          className="login-btn"
          onClick={() => {
            login();
          }}
        >
          Login
        </button>

        <div>
          <GoogleLogin
            clientId={clientId}
            onSuccess={onSuccess}
            onFailure={onFailure}
          />
        </div>
        <p className="error-msg ">{message}</p>
      </div>
    </>
  );
};

export default Login;
