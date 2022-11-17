import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  addToWishlist,
  deleteFromWishlist,
} from "../../redux/reducers/wishlist";
import { addItemToCart } from "../../redux/reducers/cart";
import { deleteItemFromCart } from "../../redux/reducers/cart";
import { FaShoppingCart, FaHeart, FaRegHeart } from "react-icons/fa";
import "./productDetails.style.css";
import { getToken, getUserId } from "../../redux/selectors/auth.selectors";
import { useSelector, useDispatch } from "react-redux";
import { getWishlist } from "../../redux/selectors/wishlist.selectors";
import { getCart } from "../../redux/selectors/cart.selectors";
import axios from "axios";

const ProductDetails = () => {
  const [quantity, setQuantity] = useState(1);
  const loading = false;
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [product, setProduct] = useState({});
  const [inStock, setInStock] = useState(0);
  const [inWishlist, setInWishlist] = useState(false);
  const [inCart, setInCart] = useState(false);
  const token = useSelector(getToken);

  // const userId = useSelector(getUserId);
  const wishlist = useSelector(getWishlist);
  const cart = useSelector(getCart);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/product/${location.state}`)
      .then((res) => {
        setProduct(res.data.product.rows[0]);
        setInStock(res.data.product.rows[0].in_stock);
      })
      .catch((err) => {
        console.log(err);
      });

    const foundInWish = wishlist.find((item) => {
      return item.id === location.state;
    });

    const foundInCart = cart.find((item) => {
      return item.id === location.state;
    });

    setInWishlist(foundInWish);
    setInCart(foundInCart);
  }, [location, wishlist, cart]);

  const addToWishList = () => {
    if (!token) return navigate("/login");
    const data = {
      product_id: product.id,
    };

    axios
      .post(`http://localhost:5000/wishlist`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        dispatch(addToWishlist(product));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const addToCart = (id) => {
    if (!token) return navigate("/login");
    const data = {
      product_id: id,
    };

    axios
      .post(`http://localhost:5000/cart`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        dispatch(addItemToCart(product));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const increament = () => {
    setQuantity((prev) => prev + 1);
  };

  const decreament = () => {
    if (quantity === 1) return;
    setQuantity((prev) => prev - 1);
  };
  const deleteFromWishList = (id) => {
    axios
      .delete(`http://localhost:5000/wishlist/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res);
        dispatch(deleteFromWishlist(id));
      })
      .catch((err) => {
        console.log(err);
      });
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

  return (
    <>
      <div className="product-deatils-container">
        <div className="title-header">
          <div className="inner-container">
            <div className="current-name">{product.title}</div>
          </div>
        </div>
        <div className="cards">
          <div className="card align-image-center">
            <img className="product-image" src={product.img} alt="dummy" />
          </div>
          <div className="card">
            <div className="title-product">{product.title}</div>
            <div className="product-price">{product.price}$</div>
            <div>
              <div className="specs-wrapper">
                <div className="specs-name">Brand:</div>
                <div className="specs-name">Adidas</div>
              </div>
              <div className="specs-wrapper">
                <div className="specs-name">Availability:</div>
                {inStock ? (
                  <div className="specs-name">Out of Stock</div>
                ) : (
                  <div className="specs-name">In Stock</div>
                )}
              </div>
            </div>
            <div className="product-description">
              <span className="description-title">Overview</span>
              <br />
              {product.descriptions}
            </div>
            <div className="action-wrapper">
              {inCart ? (
                <button
                  className="btn"
                  onClick={() => {
                    deleteFromCart(product.id);
                  }}
                >
                  {loading ? (
                    <span className="btn-spinner"></span>
                  ) : (
                    <>
                      <FaShoppingCart />
                      Remove to cart
                    </>
                  )}
                </button>
              ) : (
                <button
                  className="btn"
                  onClick={() => {
                    addToCart(product.id);
                  }}
                >
                  {loading ? (
                    <span className="btn-spinner"></span>
                  ) : (
                    <>
                      <FaShoppingCart />
                      add to cart
                    </>
                  )}
                </button>
              )}
              {inWishlist ? (
                <button
                  onClick={() => {
                    deleteFromWishList(product.id);
                  }}
                  className="icon-btn"
                >
                  <FaHeart />
                </button>
              ) : (
                <button className="icon-btn" onClick={addToWishList}>
                  <FaRegHeart />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
