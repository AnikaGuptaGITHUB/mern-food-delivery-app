import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { assets } from "../../assets/assets";
import "./Orders.css";

const Orders = ({ url }) => {
  const [orders, setOrders] = useState([]);

  // ✅ Fetch all orders (useCallback prevents re-creation)
  const fetchAllOrders = useCallback(async () => {
    try {
      const response = await axios.get(`${url}/api/orders/list`);
      if (response.data.success) {
        setOrders(response.data.data);
      } else {
        toast.error("Error fetching orders");
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("Failed to fetch orders");
    }
  }, [url]);

  // ✅ Update order status
  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(`${url}/api/orders/status`, {
        orderId,
        status: event.target.value,
      });

      if (response.data.success) {
        toast.success("Status updated!");
        await fetchAllOrders(); // refresh list
      } else {
        toast.error("Failed to update status");
      }
    } catch (error) {
      console.error("Error updating order status:", error);
      toast.error("Something went wrong");
    }
  };

  // ✅ Fetch orders on mount
  useEffect(() => {
    fetchAllOrders();
  }, [fetchAllOrders]);

  return (
    <div className="order add">
      <h3>Order Page</h3>
      <div className="order-list">
        {orders.map((order, index) => (
          <div key={index} className="order-item">
            <img src={assets.parcel_icon} alt="" />
            <div>
              <p className="order-item-food">
                {order.items.map((item, i) =>
                  i === order.items.length - 1
                    ? `${item.name} x ${item.quantity}`
                    : `${item.name} x ${item.quantity}, `
                )}
              </p>
              <p className="order-item-name">
                {order.address.firstName + " " + order.address.lastName}
              </p>
              <div className="order-item-address">
                <p>{order.address.street + ","}</p>
                <p>
                  {order.address.city +
                    ", " +
                    order.address.state +
                    ", " +
                    order.address.country +
                    ", " +
                    order.address.zipcode}
                </p>
              </div>
              <p className="order-item-phone">{order.address.phone}</p>
            </div>
            <p>Items: {order.items.length}</p>
            <p>${order.amount}</p>
            <select
              onChange={(event) => statusHandler(event, order._id)}
              value={order.status}
            >
              <option value="Food Processing">Food Processing</option>
              <option value="Out for delivery">Out for delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
