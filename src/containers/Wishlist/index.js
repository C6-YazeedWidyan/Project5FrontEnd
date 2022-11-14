import React from "react";
import "./wishlist.style.css";
import { getToken } from "../../redux/selectors/auth.selectors";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getWishlist } from "../../redux/selectors/wishlist.selectors";
import axios from "axios";
import { setWishlist, deleteFromWishlist } from "../../redux/reducers/wishlist";

const Wishlist = () => {
  const navigate = useNavigate();
  const token = useSelector(getToken);
  const wishlist = useSelector(getWishlist);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }

    if (wishlist.length === 0) {
      axios
        .get("http://localhost:5000/wishlist", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          dispatch(setWishlist(res.data.result));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  const deleteFromWishList = (id) => {
    axios
      .delete(`http://localhost:5000/wishlist/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        dispatch(deleteFromWishlist(id));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const goToDetails = (id) => {
    navigate("/gameDetails", {
      state: id,
    });
  };
  return (
    <>
      <div className="wishlist-container">
        <div className="page-title">Wishlist</div>
        <div className="wishlist-grid">
          {wishlist.length
            ? wishlist.map((product) => {
                return (
                  <div className="product-card" key={product.id}>
                    <img
                      onClick={() => goToDetails(product.id)}
                      className="product-img"
                      src={product.img}
                      alt={product.title}
                    />
                    <div>
                      <h3>{product.title}</h3>
                      <h3>{product.price}</h3>
                    </div>
                    <button
                      className="remove-from-wish-list-btn"
                      onClick={() => {
                        deleteFromWishList(product.id);
                      }}
                    >
                      Remove From Wishlist
                    </button>
                  </div>
                );
              })
            : null}
        </div>
        {!wishlist.length && (
          <div className="empty-list">
            <img
              className="empty-list-image"
              src="./assets/images/bankrupt.png"
              alt="empty"
            />
            <div className="empty-list-text">
              You haven't added anything to your wishlist yet.
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Wishlist;
