import React, { useEffect } from "react";
import "./checkoutsuccess.style.css";
import { useNavigate } from "react-router-dom";
import { setCart } from "../../redux/reducers/cart";
import { useDispatch } from "react-redux";
import axios from "axios";
import { getToken } from "../../redux/selectors/auth.selectors";
import { useSelector } from "react-redux";

const CheckoutSuccess = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector(getToken);

  useEffect(() => {
    axios
      .delete(`http://localhost:5000/cart/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        dispatch(setCart([]));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="success-checkout-container">
      <div className="success-checkout-wrapper">
        <img
          className="success-checkout-image"
          src="./assets/images/check.png"
          alt="checkout success"
        />
        <h1>THANK YOU FOR YOUR PURCHASE</h1>
        <div onClick={() => navigate("/")} className="success-checkout-btn">
          Continue Shopping
        </div>
      </div>
    </div>
  );
};

export default CheckoutSuccess;
