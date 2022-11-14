import axios from "axios";
import React from "react";
import { useEffect } from "react";
import "./checkout.style.css";
import { getCart } from "../../redux/selectors/cart.selectors";
import { useSelector } from "react-redux";

//this function to send a body cart and open payment session
const Checkout = () => {
  const cart = useSelector(getCart);

  const handleCheckout = () => {
    axios
      .post(
        "https://bluelockgeeks.onrender.com/payment/create-checkout-session",
        cart
      )
      .then((res) => {
        if (res.data.url) {
          window.location.href = res.data.url;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    handleCheckout();
  }, []);

  return (
    <>
      <div></div>;
    </>
  );
};

export default Checkout;
