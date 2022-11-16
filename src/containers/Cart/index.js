import React from "react";
import axios from "axios";
import "./cart.style.css";
import { getToken } from "../../redux/selectors/auth.selectors";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCart } from "../../redux/selectors/cart.selectors";
import { setCart } from "../../redux/reducers/cart";
import { addItemToCart } from "../../redux/reducers/cart";
import { deleteItemFromCart } from "../../redux/reducers/cart";

const Cart = () => {
  const navigate = useNavigate();
  const token = useSelector(getToken);
  const dispatch = useDispatch();
  const cart = useSelector(getCart);
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }

    if (cart.length === 0) {
      axios
        .get("http://localhost:5000/cart", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          dispatch(setCart(res.data.result));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  const grandTotal = (arr) => {
    return arr.reduce((sum, i) => {
      return sum + i.price;
    }, 0);
  };

  const deleteFromCart = (id) => {
    axios
      .delete(`http://localhost:5000/cart/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        dispatch(deleteItemFromCart(id));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const goToCheckout = () => {
    navigate("/checkout");
  };

  return (
    <>
      <div className="cart-container">
        <div className="page-title">Cart</div>
        <div className="cart-grid">
          {cart.length ? (
            <>
              <div className="cart-left-wrapper">
                {cart.map((product) => {
                  return (
                    <div className="cart-card" key={product.id}>
                      <div className="left-cart-card">
                        <img
                          className="cart-card-image"
                          src={product.img}
                          alt="game"
                        />
                        <div className="cart-card-text">
                          <div className="cart-card-title">{product.title}</div>
                          <div className="cart-card-price">{product.price}</div>
                        </div>
                      </div>

                      <div
                        className="cart-outline-btn"
                        onClick={() => {
                          deleteFromCart(product.id);
                        }}
                      >
                        Remove
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="cart-right-wrapper">
                <div className="cart-summary-title">Products Summary</div>
                <div className="cart-total-details">
                  <div>Total</div>
                  <div>${grandTotal(cart)}</div>
                </div>
                <div
                  className="cart-checkout-btn"
                  onClick={() => goToCheckout()}
                >
                  continue to checkout
                </div>
              </div>
            </>
          ) : null}
        </div>
        {!cart.length && (
          <div className="empty-list">
            <img
              className="empty-list-image"
              src="./assets/images/bankrupt.png"
              alt="empty"
            />
            <div className="empty-list-text">Your cart is empty.</div>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
