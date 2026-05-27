import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ You missed this import earlier
import { StoreContext } from "../../context/StoreContext";
import "./PlaceOrder.css";

const PlaceOrder = () => {
  const {
    getTotalCartAmount,
    token,
    foodList,
    cartItems,
    url,
    clearCart, // ✅ from context
  } = useContext(StoreContext);

  const navigate = useNavigate(); // ✅ Initialize navigate

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  // ✅ Handle input change
  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Handle order placement
  const placeOrder = async (event) => {
    event.preventDefault();

    if (!token) {
      alert("Please log in before placing an order!");
      return;
    }

    const orderItems = [];
    foodList.forEach((item) => {
      if (cartItems[item._id] > 0) {
        orderItems.push({ ...item, quantity: cartItems[item._id] });
      }
    });

    if (orderItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    const orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 2, // subtotal + delivery fee
    };

    try {
      const response = await axios.post(`${url}/api/orders/place`, orderData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        const { session_url } = response.data;

        // 🧹 Clear cart right after placing order
        clearCart();

        if (session_url) {
          window.location.replace(session_url); // Stripe redirect
        } else {
          alert("Order placed successfully!");
        }
      } else {
        alert("Failed to process your order. Please try again.");
      }
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Something went wrong while placing your order.");
    }
  };

  // ✅ Redirect if not logged in or cart empty
  useEffect(() => {
    if (!token || getTotalCartAmount() === 0) {
      navigate("/cart");
    }
  }, [token, getTotalCartAmount, navigate]);

  return (
    <form onSubmit={placeOrder} className="place-order">
      {/* ===== Left Section — Delivery Info ===== */}
      <div className="place-order-left">
        <p className="place-order-left-title">Delivery Information</p>

        <div className="multi-fields">
          <input
            required
            name="firstName"
            onChange={onChangeHandler}
            value={data.firstName}
            type="text"
            placeholder="First name"
          />
          <input
            required
            name="lastName"
            onChange={onChangeHandler}
            value={data.lastName}
            type="text"
            placeholder="Last name"
          />
        </div>

        <input
          required
          name="email"
          onChange={onChangeHandler}
          value={data.email}
          type="email"
          placeholder="Email address"
        />

        <input
          required
          name="street"
          onChange={onChangeHandler}
          value={data.street}
          type="text"
          placeholder="Street"
        />

        <div className="multi-fields">
          <input
            required
            name="city"
            onChange={onChangeHandler}
            value={data.city}
            type="text"
            placeholder="City"
          />
          <input
            required
            name="state"
            onChange={onChangeHandler}
            value={data.state}
            type="text"
            placeholder="State"
          />
        </div>

        <div className="multi-fields">
          <input
            required
            name="zipcode"
            onChange={onChangeHandler}
            value={data.zipcode}
            type="text"
            placeholder="Zip code"
          />
          <input
            required
            name="country"
            onChange={onChangeHandler}
            value={data.country}
            type="text"
            placeholder="Country"
          />
        </div>

        <input
          required
          name="phone"
          onChange={onChangeHandler}
          value={data.phone}
          type="text"
          placeholder="Phone number"
        />
      </div>

      {/* ===== Right Section — Cart Summary ===== */}
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Total</h2>

          <div className="cart-total-details">
            <p>Subtotal</p>
            <p>${getTotalCartAmount()}</p>
          </div>
          <hr />

          <div className="cart-total-details">
            <p>Delivery Fee</p>
            <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
          </div>
          <hr />

          <div className="cart-total-details">
            <b>Total</b>
            <b>${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</b>
          </div>

          <button type="submit">PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
