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
    // setFirstName(response.wt.rV)
    // setLastName(response.wt.uT)
    // setEmailgoogle(response.wt.cu)
    // console.log(response.tokenId);

    axios
      .post("https://bluelockgeeks.onrender.com/user/google", {
        firstName: response.wt.rV,
        lastName: response.wt.uT,
        email: response.wt.cu,
      })
      .then((result) => {
        console.log(result);
        dispatch(setLogin(result.data.token));
        dispatch(setUserId(result.data.userId));
        dispatch(setUserType(1));

        axios
          .get("https://bluelockgeeks.onrender.com/cart", {
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
          .get("https://bluelockgeeks.onrender.com/wishlist", {
            headers: {
              Authorization: `Bearer ${result.data.token}`,
            },
          })
          .then((res) => {
            console.log("mmmmmmmmm");
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
  const onLogoutSuccess = () => {
    console.log("SUCESS LOG OUT");
  };

  const state = useSelector(getIsLoggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setmessage] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailgoogle, setEmailgoogle] = useState("");
  const addNewUserByGoogle = () => {
    console.log("test");
    axios
      .post("https://bluelockgeeks.onrender.com/user/google", {
        firstName,
        lastName,
        email: emailgoogle,
      })
      .then((result) => {
        console.log(result.data.massage);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  const login = () => {
    axios
      .post("https://bluelockgeeks.onrender.com/login", {
        email,
        password,
      })
      .then((result) => {
        dispatch(setLogin(result.data.token));
        dispatch(setUserId(result.data.userId));
        dispatch(setUserType(result.data.role));

        axios
          .get("https://bluelockgeeks.onrender.com/cart", {
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
          .get("https://bluelockgeeks.onrender.com/wishlist", {
            headers: {
              Authorization: `Bearer ${result.data.token}`,
            },
          })
          .then((res) => {
            console.log("mmmmmmmmm");
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
  const googlelogin = () => {
    axios
      .post("https://bluelockgeeks.onrender.com/login/google", {
        email: emailgoogle,
        password: 123,
      })
      .then((result) => {
        dispatch(setLogin(result.data.token));
        dispatch(setUserId(result.data.userId));
        dispatch(setUserType(result.data.role));
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
        <p>login</p>
        <input
          className="auth-input"
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <input
          className="auth-input"
          type="password"
          placeholder="Password"
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
