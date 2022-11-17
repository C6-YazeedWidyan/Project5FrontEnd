import React from "react";
import "./addnewproduct.style.css";
import axios from "axios";
import { useState } from "react";

const AddNewProduct = () => {
  const [title, settitle] = useState("");
  const [descriptions, setdescriptions] = useState("");
  const [category_id, setcategory_id] = useState(0);
  const [img, setimg] = useState("");
  const [url, setUrl] = useState("");
  const [price, setprice] = useState(0);
  const [message, setmessage] = useState("");
  const [show, setshow] = useState(false);
  const addProduct = () => {
    axios
      .post(`http://localhost:5000/product/add`, {
        title,
        descriptions,
        category_id,
        img: url,
        price,
      })
      .then((result) => {
        setmessage(result.data.massage);
      })
      .catch((err) => {
        console.log(err.message);
        setmessage(err.message);
      });
  };

  const uploadImage = () => {
    const data = new FormData();
    data.append("file", img);
    data.append("upload_preset", "sportblue");
    data.append("cloud_name", "dt8h9hj39");
    fetch(" https://api.cloudinary.com/v1_1/dt8h9hj39/image/upload", {
      method: "post",
      body: data,
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
        setUrl(data.url);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="add-new-product-contianer">
        <p className="add-new-product-title"> Add new product </p>
        <br />
        <input
          className="add-new-product-input"
          onChange={(e) => {
            settitle(e.target.value);
          }}
          type="text"
          placeholder="title"
        />
        <input
           
          className="add-new-product-input"
          onChange={(e) => {
            setdescriptions(e.target.value);
          }}
          type="text"
          placeholder="description"
        />
        <input
          className="add-new-product-input"
          onChange={(e) => {
            setcategory_id(e.target.value);
          }}
          type="number"
          placeholder="catagory"
        />
            <input className="add-new-product-input"
          onChange={(e) => {
            setprice(e.target.value);
          }}
          type="number"
          placeholder="price"
        />
        <label>Img:</label>
        <br />
        <input
          className="image-input-field"
          type="file"
          required
          onChange={(e) => {
            // uploadImg(e);
            setimg(e.target.files[0]);
          }}
        />

        {show&& <img className="img" src={url} />}
       
        <button className="add-new-product-button" onClick={()=>{
          uploadImage()
          setshow(true)
        }}>
          Upload
        </button>
    
        <button
          className="add-new-product-button"
          onClick={() => {
            addProduct();
          }}
        >
          ADD
        </button>
        <p>{message}</p>
      </div>
    </>
  );
};

export default AddNewProduct;
