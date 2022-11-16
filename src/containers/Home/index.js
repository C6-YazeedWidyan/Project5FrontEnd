import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import "./home.style.css";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addItemToCart } from "../../redux/reducers/cart";
import { deleteItemFromCart } from "../../redux/reducers/cart";
import { getToken } from "../../redux/selectors/auth.selectors";
import { getCart } from "../../redux/selectors/cart.selectors";
import { setCart } from "../../redux/reducers/cart";

import Carousel from "better-react-carousel";
import {
  getMenProducts,
  getWomenProducts,
  getKidsProducts,
} from "../../redux/selectors/products.selectors";
import {
  setMenProducts,
  setWomenProducts,
  setKidsProducts,
} from "../../redux/reducers/products";
import { setWishlist } from "../../redux/reducers/wishlist";
import { getWishlist } from "../../redux/selectors/wishlist.selectors";
const Home = () => {
  const [loading, setLoading] = useState(false);
  const menProducts = useSelector(getMenProducts);
  const womenProducts = useSelector(getWomenProducts);
  const kidsProducts = useSelector(getKidsProducts);
  const token = useSelector(getToken);
  const cart = useSelector(getCart);
  const wishlist = useSelector(getWishlist);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getMenItems = () => {
    axios
      .get(`http://localhost:5000/product/catgory/1`)
      .then((data) => {
        dispatch(setMenProducts(data.data.result));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getWomenItems = () => {
    axios
      .get(`http://localhost:5000/product/catgory/2`)
      .then((data) => {
        dispatch(setWomenProducts(data.data.result));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getKidsItems = () => {
    axios
      .get(`http://localhost:5000/product/catgory/3`)
      .then((data) => {
        dispatch(setKidsProducts(data.data.result));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const addToCart = (e, id, product) => {
    e.stopPropagation();
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

  const deleteFromCart = (e, id) => {
    e.stopPropagation();
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

  useEffect(() => {
    getMenItems();
    getWomenItems();
    getKidsItems();

    if (token && cart.length === 0) {
      console.log("yazeed ssssssssss");
      axios
        .get("http://localhost:5000/cart", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          console.log("ssss");
          dispatch(setCart(res.data.result));
        })
        .catch((err) => {
          console.log(err);
        });
    }

    if (token && wishlist.length === 0) {
      console.log("yazeed fffffffffff");
      axios
        .get("http://localhost:5000/wishlist", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          console.log("mmmmmmmmm");
          dispatch(setWishlist(res.data.result));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  const goToDetails = (id) => {
    console.log(id);
    navigate("/productdetails", {
      state: id,
    });
  };
  return (
    <>
      <div>
        <img
          style={{
            width: "100%",
          }}
          src={"../assets/images/ads.jpg"}
        />
      </div>
      <div className="container">
        <div>
          <div className="category-title-wrapper">
            <div className="category-title">Men</div>
            <div className="category-subtitle">
              CURATED AND HANDPICKED FOR YOU
            </div>
          </div>
          <Carousel cols={4} rows={1} gap={30} loop>
            {menProducts.map((product, i) => {
              return (
                <Carousel.Item key={i}>
                  <div className="product-item-container">
                    <img
                      onClick={() => {
                        goToDetails(product.id);
                      }}
                      className="product-item-image"
                      src={product.img}
                    />
                    <div>
                      <div className="product-item-title">{product.title}</div>
                      <div className="product-item-price">${product.price}</div>
                    </div>
                    {cart.find((item) => item.id === product.id) ? (
                      <button
                        className="product-item-btn"
                        onClick={(e) => deleteFromCart(e, product.id)}
                      >
                        {loading ? (
                          <span className="btn-spinner"></span>
                        ) : (
                          <>
                            <FaShoppingCart />
                            Remove From Cart
                          </>
                        )}
                      </button>
                    ) : (
                      <button
                        className="product-item-btn"
                        onClick={(e) => addToCart(e, product.id, product)}
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
                  </div>
                </Carousel.Item>
              );
            })}
          </Carousel>
        </div>
        <div>
          <div className="category-title-wrapper">
            <div className="category-title">Women</div>
            <div className="category-subtitle">
              CURATED AND HANDPICKED FOR YOU
            </div>
          </div>
          <Carousel cols={4} rows={1} gap={30} loop>
            {womenProducts.map((product, i) => {
              return (
                <Carousel.Item key={i}>
                  <div className="product-item-container">
                    <img
                      onClick={() => {
                        goToDetails(product.id);
                      }}
                      className="product-item-image"
                      src={product.img}
                    />
                    <div>
                      <div className="product-item-title">{product.title}</div>
                      <div className="product-item-price">${product.price}</div>
                    </div>
                    {cart.find((item) => item.id === product.id) ? (
                      <button
                        className="product-item-btn"
                        onClick={(e) => deleteFromCart(e, product.id)}
                      >
                        {loading ? (
                          <span className="btn-spinner"></span>
                        ) : (
                          <>
                            <FaShoppingCart />
                            Remove From Cart
                          </>
                        )}
                      </button>
                    ) : (
                      <button
                        className="product-item-btn"
                        onClick={(e) => addToCart(e, product.id, product)}
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
                  </div>
                </Carousel.Item>
              );
            })}
          </Carousel>
        </div>
        <div>
          <div className="category-title-wrapper">
            <div className="category-title">Kids</div>
            <div className="category-subtitle">
              CURATED AND HANDPICKED FOR YOU
            </div>
          </div>
          <div className="categroy-item-container">
            <Carousel cols={4} rows={1} gap={30} loop>
              {kidsProducts.map((product, i) => {
                return (
                  <Carousel.Item key={i}>
                    <div className="product-item-container">
                      <img
                        onClick={() => {
                          goToDetails(product.id);
                        }}
                        className="product-item-image"
                        src={product.img}
                      />
                      <div>
                        <div className="product-item-title">
                          {product.title}
                        </div>
                        <div className="product-item-price">
                          ${product.price}
                        </div>
                      </div>
                      {cart.find((item) => item.id === product.id) ? (
                        <button
                          className="product-item-btn"
                          onClick={(e) => deleteFromCart(e, product.id)}
                        >
                          {loading ? (
                            <span className="btn-spinner"></span>
                          ) : (
                            <>
                              <FaShoppingCart />
                              Remove From Cart
                            </>
                          )}
                        </button>
                      ) : (
                        <button
                          className="product-item-btn"
                          onClick={(e) => addToCart(e, product.id, product)}
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
                    </div>
                  </Carousel.Item>
                );
              })}
            </Carousel>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
