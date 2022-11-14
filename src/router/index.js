import React from "react";
import { Routes, Route } from "react-router-dom";
// import Template from "../containers/Template";
import ProductDetails from "../containers/ProductDetails";
import Checkout from "../containers/Checkout";
import AddNewProduct from "../containers/Admin/AddNewProduct";
import ProductsList from "../containers/Admin/ProductsList";
import Dashboard from "../containers/Admin/Dashboard";
import Admin from "../containers/Admin";
import Home from "../containers/Home";
import Cart from "../containers/Cart";
import CheckoutSuccess from "../components/CheckoutSuccess";
import ContactUs from "../components/ContactUs";
import Wishlist from "../containers/Wishlist";
import Login from "../containers/Login";
import Register from "../containers/Register";
import Matches from "../containers/Matches";
import Store from "../containers/Store";
import { useSelector } from "react-redux";
import { getIsLoggedIn, getUserType } from "../redux/selectors/auth.selectors";
import Header from "../components/Header";
import Footer from "../components/Footer";
import MatchPage from "../containers/Matches/MatchPage";

const Router = () => {
  const userType = useSelector(getUserType);
  const isLoggedIn = useSelector(getIsLoggedIn);

  return (
    <>
      {userType === 1 && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="admin" element={<Admin />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="productsList" element={<ProductsList />} />
          <Route path="addNewProduct" element={<AddNewProduct />} />
        </Route>
        <Route path="productdetails" element={<ProductDetails />} />
        <Route path="cart" element={<Cart />} />
        <Route path="matches" element={<Matches />} />
        <Route path="matchpage" element={<MatchPage />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="checkout-success" element={<CheckoutSuccess />} />
        <Route path="contactUs" element={<ContactUs />} />
        <Route path="wishlist" element={<Wishlist />} />
        <Route path="store" element={<Store />} />
        {!isLoggedIn && (
          <>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </>
        )}
        <Route path="*" element={<p>There's nothing here: 404!</p>} />
      </Routes>
      {userType === 1 && <Footer />}
    </>
  );
};

console.log("adasd");

export default Router;
