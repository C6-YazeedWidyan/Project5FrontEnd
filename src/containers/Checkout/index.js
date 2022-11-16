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
      .post("http://localhost:5000/payment/create-checkout-session", cart)
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

  console.log("yaz");
  return (
    <>
      <div className="checkout"></div>;
    </>
  );
};

export default Checkout;
