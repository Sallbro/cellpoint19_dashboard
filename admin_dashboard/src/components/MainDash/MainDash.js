import React, { useEffect, useState } from "react";
import Cards from "../Cards/Cards";
import BasicTable from "../Table/Table";
import "./MainDash.css";
const MainDash = () => {
  const [order, setOder] = useState([]);
  const Get_latest_order_data = async () => {
    try {
      const res = await fetch("/latest_orders", {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        },

      });
      const data = await res.json();
      if (data) {
        console.log("data is: ", data);
        setOder(data);
      }
    }
    catch (e) {
      console.log(e);
    }
  }
  useEffect(() => {
    Get_latest_order_data();
  }, []);
  return (
    <div className="MainDash">
      <h1>Dashboard</h1>
      <Cards />
      <BasicTable data={order} />
    </div>
  );
};

export default MainDash;
