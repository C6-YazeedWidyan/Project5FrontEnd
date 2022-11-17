import axios from "axios";
import React, { useEffect, useState } from "react";
import "./store.style.css";

const Store = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const getCategories = () => {
    axios
      .get(`http://localhost:5000/category`)
      .then((data) => {
        setCategories(data.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getProductsByCategory = (id) => {
    axios
      .get(`http://localhost:5000/product/catgory/${id}`)
      .then((data) => {
        setProducts(data.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getCategories();

    axios
      .get(`http://localhost:5000/product/catgory/1`)
      .then((data) => {
        setProducts(data.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="container">
      <div className="categories-container">
        {categories.map((categories, i) => {
          return (
            <div key={i}>
              {}
              <button
                className="categories-button"
                onClick={() => getProductsByCategory(categories.id)}
              >
                {categories.category}
              </button>
            </div>
          );
        })}
      </div>
      <div className="products-container">
        {products.map((product, i) => {
          return (
            <div className="products-border">
              <div className="products">
                <img className="product-img-store" src={product.img}></img> 
                <h5 className="desc">{product.descriptions}</h5>
                <h5 className="product-item-price">{product.price}$</h5>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Store;
