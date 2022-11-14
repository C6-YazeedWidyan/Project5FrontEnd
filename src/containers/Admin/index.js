import React, { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import "./admin.style.css";
import { useDispatch, useSelector } from "react-redux";
import { setUserType } from "../../redux/reducers/auth";
import { setLogout } from "../../redux/reducers/auth";
import { getToken } from "../../redux/selectors/auth.selectors";

const Admin = () => {
  //this componet is container of admin panel bussines add product edit and delete and have header of admin panel

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector(getToken);
  const [activeTab, setActiveTab] = useState(0);
  const [show, setShow] = useState(false);
  const [tabs, setTabs] = useState([
    { name: "Dashboard", route: "dashboard" },
    { name: "Products", route: "productsList" },
    { name: "Add new Product", route: "addNewProduct" },
  ]);

  const logout = () => {
    dispatch(setLogout(false));
    dispatch(setUserType(1));
    navigate("/login");
  };
  const handleTabs = (tab, index) => {
    setActiveTab(index);
    navigate(tab);
  };
  return (
    <div className="admin-container">
      <div className="admin-Navbar">
        <div className="admin-Navbar-Link admin-Navbar__Link-brand">
          <div>
            <div>Hello Admin</div>
            <div>Welcome to your admin dashboard</div>
          </div>
        </div>
        <div className="admin-Navbar-Link admin-Navbar-Link-toggle">
          <i
            onClick={() => {
              setShow(!show);
            }}
          >
            menu{" "}
          </i>
        </div>
        <nav
          className={
            show
              ? "admin-Navbar-Items admin-Navbar-ToggleShow"
              : "admin-Navbar-Items"
          }
        >
          <div className="admin-Navbar-Link">
            <Link className="admin-link" to="/admin/dashboard">
              <div className="admin-title">Dashboard</div>
            </Link>
          </div>
          <div className="admin-Navbar-Link margin-20">
            <Link className="admin-link" to="/admin/productsList">
              <div className="admin-title">Products List</div>
            </Link>
          </div>
          <div className="admin-Navbar-Link margin-30">
            <Link className="admin-link" to="/admin/addNewProduct">
              <div className="admin-title">Add New Product</div>
            </Link>
          </div>
        </nav>
        <nav
          className={
            show
              ? "admin-Navbar-Items admin-Navbar-Items--right admin-Navbar-ToggleShow"
              : "admin-Navbar-Items admin-Navbar-Items--right"
          }
        >
          <div className="admin-Navbar-Link">
            <div className="logout-btn" onClick={logout}>
              Logout
            </div>
          </div>
        </nav>
      </div>
      <main>
        <Outlet />
      </main>
      <div className="sidebar">
        <div className="sidebar-img">
          <img src="/assets/images/logo.png" alt="logo" />
          <div style={{ color: "white" }}>Admin Dashboard</div>
        </div>
        <div className="tabs-container">
          {tabs.map((tab, i) => {
            return (
              <div
                key={i}
                onClick={() => handleTabs(tab.route, i)}
                className="sidebar-tab"
                style={
                  activeTab == i
                    ? {
                        borderRadius: "4px",
                        padding: "12px",
                        backgroundColor: "#0047AB",
                        color: "white",
                      }
                    : { borderRadius: "4px", padding: "12px", color: "white" }
                }
              >
                {tab.name}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Admin;
