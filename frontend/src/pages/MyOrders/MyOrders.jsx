import axios from "axios";
import { useCallback, useContext, useEffect, useState } from "react";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";
import "./MyOrders.css";

const MyOrders = () => {
  const { url, token } = useContext(StoreContext);
  const [data, setData] = useState([]);

  const fetchOrders = useCallback(async () => {
    try {
      const response = await axios.post(
        `${url}/api/orders/userorders`, // ✅ fixed route
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`, // ✅ correct format
          },
        }
      );

      console.log("🟢 Orders fetched:", response.data);

      if (response.data.success) {
        setData(response.data.data || []);
      } else {
        setData([]);
      }
    } catch (error) {
      console.error("❌ Error fetching orders:", error);
      setData([]);
    }
  }, [url, token]);

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token, fetchOrders]);

  return (
    <div className="my-orders">
      <h2>My Orders</h2>
      <div className="container">
        {data.length > 0 ? (
          data.map((order, index) => (
            <div key={index} className="my-orders-order">
              <img src={assets.parcel_icon} alt="parcel icon" />

              <p>
                {order.items.map((item, i) => (
                  <span key={i}>
                    {item.name} × {item.quantity}
                    {i < order.items.length - 1 ? ", " : ""}
                  </span>
                ))}
              </p>

              <p>${order.amount}</p>
              <p>Items: {order.items.length}</p>

              <p>
                <span
                  className={
                    order.status === "Delivered"
                      ? "status delivered"
                      : order.status === "Out for Delivery"
                      ? "status in-progress"
                      : "status pending"
                  }
                >
                  ●
                </span>{" "}
                <b>{order.status}</b>
              </p>

              <button onClick={fetchOrders}>Track Order</button>
            </div>
          ))
        ) : (
          <p>No orders found.</p>
        )}
      </div>
    </div>
  );
};

export default MyOrders;
