import React, { useState } from "react";
import axios from "axios";
import "./search.style.css";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const [searchResult, setSearchResult] = useState([]);
  const [keyword, setKeyword] = useState("");

  const navigate = useNavigate();

  const getData = (key) => {
    setKeyword(key);
    axios
      .get(`http://localhost:5000/product/search/product?keyword=${keyword}`)
      .then((res) => {
        setSearchResult(res.data.result.slice(0, 3));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const goToDetails = (id) => {
    navigate("/productdetails", {
      state: id,
    });
    setSearchResult([]);
    setKeyword("");
  };

  return (
    <>
      <div className="search-container">
        <input
          onChange={(e) => getData(e.target.value)}
          className="search-input"
          type="text"
          placeholder="Search store"
          value={keyword}
        />
        {!!searchResult.length && keyword ? (
          <div className="search-box">
            {searchResult.map((product) => {
              return (
                <div
                  onClick={() => goToDetails(product.id)}
                  key={product.id}
                  className="search-bar-card"
                >
                  <img
                    className="search-card-image"
                    src={product.img}
                    alt="game"
                  />
                  <div className="search-card-title">{product.title}</div>
                </div>
              );
            })}
            {searchResult.length >= 3 && (
              <div className="search-view-more-btn"></div>
            )}
          </div>
        ) : (
          keyword && (
            <div className="search-box">
              <div className="no-matching-found">No matching titles found</div>
            </div>
          )
        )}
      </div>
    </>
  );
};
export default Search;
