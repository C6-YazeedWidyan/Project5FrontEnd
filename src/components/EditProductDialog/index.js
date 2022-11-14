import React, { useState } from "react";
import "./EditProductDialog.css";
import axios from "axios";
import { useSelector } from "react-redux";
import { getToken } from "../../redux/selectors/auth.selectors";
import { useDispatch } from "react-redux";
import { updateProducts } from "../../redux/reducers/products";

//this is componet for edit popup product
const EditProductDialog = ({
  productDetails,
  setIsEdit,
  products,
  setProducts,
}) => {
  const [title, setTitle] = useState(productDetails.title);
  const [price, setPrice] = useState(productDetails.price);
  const [img, setImg] = useState(productDetails.img);
  const [descriptions, setDescriptions] = useState(productDetails.descriptions);
  const [in_stock, setin_stock] = useState(productDetails.in_stock);
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    axios
      .put(`http://localhost:5000/product/update/${productDetails.id}`, {
        title,
        price,
        img,
        descriptions,
        in_stock,
      })
      .then((res) => {
        dispatch(updateProducts(res.data.result));
        setIsEdit(false);
      })
      .catch((err) => {
        console.log(err);
        setIsEdit(false);
      });
    e.preventDefault();
  };

  return (
    <>
      <div className="edit-dialog">
        <div className="edit-dialog-content">
          <span onClick={() => setIsEdit(false)} className="close-edit-dialog">
            &times;
          </span>
          <form
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            <div className="product-form-wrapper">
              <div className="product-form-left">
                <label>Tilte:</label>
                <br />
                <input
                  className="input-field"
                  type="text"
                  value={title}
                  required
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                />
                <br />
                <label>Price:</label>
                <br />
                <input
                  className="input-field"
                  type="text"
                  value={price}
                  required
                  onChange={(e) => {
                    setPrice(e.target.value);
                  }}
                />
                <br />
                <label>descriptions:</label>
                <br />
                <textarea
                  className="input-textarea"
                  type="text"
                  value={descriptions}
                  required
                  onChange={(e) => {
                    setDescriptions(e.target.value);
                  }}
                />
                <br />
                <label>
                  <input
                    type="checkbox"
                    checked={in_stock}
                    onChange={() => {
                      setin_stock(!in_stock);
                    }}
                  />
                  in Stock
                </label>
                <br />
              </div>
              <div className="product-form-right">
                <label>Img:</label>
                <br />
                <input
                  className="input-field"
                  type="text"
                  value={img}
                  required
                  onChange={(e) => {
                    setImg(e.target.value);
                  }}
                />
                <br />{" "}
              </div>
            </div>
            <input className="update-btn" type="submit" value="Update" />
          </form>
        </div>
      </div>
    </>
  );
};

export default EditProductDialog;
