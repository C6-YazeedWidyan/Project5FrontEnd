import axios from "axios";
import React, { useEffect, useState } from "react";
import "./dashboard.style.css";
import { getToken } from "../../../redux/selectors/auth.selectors";
import { useSelector } from "react-redux";

const Dashboard = () => {
  //this componet fror get website status and show it in dashboard like total of users
  const [usersTotal, setUsersTotal] = useState(0);
  const [productsTotal, setProductsTotal] = useState(0);
  const [ordersTotal, setOrdersTotal] = useState(0);
  const token = useSelector(getToken);

  useEffect(() => {
    axios
      .get("http://localhost:5000/webstatus/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setUsersTotal(res.data.result[0].count);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get("http://localhost:5000/webstatus/products", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setProductsTotal(res.data.result[0].count);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get("http://localhost:5000/webstatus/orders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setOrdersTotal(res.data.result[0].count);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <div className="dashboard-container">
        <div className="dashboard-card">
          <div>
            <div className="total-text">Live Users</div>
            <div className="total-number">{usersTotal}</div>
          </div>
          <img
            className="dashboard-card-image"
            src="../assets/images/polling.png"
            alt=""
          />
        </div>
        <div className="dashboard-card">
          <div>
            <div className="total-text">Products Total</div>
            <div className="total-number">{productsTotal}</div>
          </div>
          <img
            className="dashboard-card-image"
            src="../assets/images/deal.png"
            alt=""
          />
        </div>
        <div className="dashboard-card">
          <div>
            <div className="total-text">Orders Total</div>
            <div className="total-number">{ordersTotal}</div>
          </div>
          <img
            className="dashboard-card-image"
            src="../assets/images/growth.png"
            alt=""
          />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
