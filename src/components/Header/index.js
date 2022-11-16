import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { FaShoppingBasket, FaHeart, FaSearch } from "react-icons/fa";
import "./header.style.css";
import { setLogout } from "../../redux/reducers/auth";
import { useSelector, useDispatch } from "react-redux";
import { getToken } from "../../redux/selectors/auth.selectors";
import { useNavigate, Link } from "react-router-dom";
import Search from "../Search";
import { getCart } from "../../redux/selectors/cart.selectors";
import { setCart } from "../../redux/reducers/cart";
import { getWishlist } from "../../redux/selectors/wishlist.selectors";
import { setWishlist } from "../../redux/reducers/wishlist";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector(getToken);
  const cart = useSelector(getCart);
  const wishList = useSelector(getWishlist);
  const [place, setPlace] = useState("");
  const [time, setTime] = useState("");
  const [temp, settemp] = useState("");
  const logout = () => {
    dispatch(setLogout(false));
    dispatch(setCart([]));
    dispatch(setWishlist([]));
    navigate("/login");
  };
  const clock = () => {
    axios
      .get(
        "http://api.weatherstack.com/current?access_key=4a61273807556cf152cdd7018185baed&query=Amman"
      )
      .then((response) => {
        console.log(response.data.current.temperature);
        setPlace(response.data.location.name);
        setTime(response.data.location.localtime);
        settemp(response.data.current.temperature);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    clock();
  }, []);
  const goToWishlist = () => {
    navigate("/wishlist");
  };
  const goToCart = () => {
    navigate("/cart");
  };
  const goToHome = () => {
    navigate("/");
  };
  const goToStore = () => {
    navigate("/store");
  };

  // const goToMatch = () => {
  //   navigate("/matches");
  // };
  return (
    <>
      {/* <div className="overlay">
        <div className="overlay__inner">
          <div className="overlay__content">
            <span className="spinner"></span>
          </div>
        </div>
      </div> */}

      <div className="top-header-wrapper">
        <div className="top-header-section">
          <div>Hotline : +123 456 7890</div>
          <div>|</div>
          <div>Welcome to Blue Lock</div>
          {/* <div>
            {place}
            <br></br>
            {time}
            <br></br>
            temp is:{temp}'
          </div> */}
        </div>
        <div className="top-header-section">
          {token ? (
            <div className="text-btn" onClick={logout}>
              Logout
            </div>
          ) : (
            <div className="wrapper">
              <Link className="link" to="/register">
                <div className="text-btn">Register</div>
              </Link>
              <Link className="link" to="/login">
                <div className="text-btn">Login</div>
              </Link>
            </div>
          )}
          <div onClick={goToWishlist} className="text-btn">
            <FaHeart />
            <span>Wishlist</span>
            <span>{wishList.length}</span>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="bottom-header-wrapper">
          <div>
            <img className="header-logo-img" src="./assets/images/logo.png" />
          </div>
          <div className="bottom-header-right-wrapper">
            <div className="navigation-wrapper">
              <div onClick={goToHome} className="navigation-btn">
                Home
              </div>
              <div onClick={goToStore} className="navigation-btn">
                Store
              </div>
              {/* <div className="navigation-btn" onClick={goToMatch}>
                Match
              </div> */}
            </div>
            <div className="search-wrapper">
              <div className="text-btn">
                <Search />
                <FaSearch size={18} />
              </div>
              <div className="text-btn" onClick={goToCart}>
                <span className="cart-count-indicator">{cart.length}</span>
                <FaShoppingBasket size={22} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
