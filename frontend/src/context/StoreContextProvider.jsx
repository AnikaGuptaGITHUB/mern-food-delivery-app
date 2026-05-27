import axios from "axios";
import { useEffect, useState } from "react";
import { StoreContext } from "./StoreContext";

const StoreContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cartItems");
    return savedCart ? JSON.parse(savedCart) : {};
  });

  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [foodList, setFoodList] = useState([]);
  const url = "https://food-del-backend-tbn6.onrender.com";

  // ✅ Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  // ✅ If token is removed, clear cart
  useEffect(() => {
    if (!token) {
      setCartItems({});
      localStorage.removeItem("cartItems");
    }
  }, [token]);

  // ✅ Fetch food items from backend
  const fetchFoodList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      setFoodList(response.data.data || []);
    } catch (error) {
      console.error("❌ Failed to fetch food list:", error);
    }
  };

  useEffect(() => {
    fetchFoodList();
  }, []);

  // ✅ Add item to cart
  const addToCart = (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1,
    }));
  };

  // ✅ Remove item from cart
  const removeFromCart = (itemId) => {
    setCartItems((prev) => {
      const updatedCart = { ...prev };
      if (updatedCart[itemId] > 1) updatedCart[itemId]--;
      else delete updatedCart[itemId];
      return updatedCart;
    });
  };

  // ✅ Calculate total cart amount
  const getTotalCartAmount = () => {
    return foodList.reduce((total, item) => {
      const quantity = cartItems[item._id] || 0;
      return total + item.price * quantity;
    }, 0);
  };

  // ✅ Clear cart manually
  const clearCart = () => {
    setCartItems({});
    localStorage.removeItem("cartItems");
  };

  return (
    <StoreContext.Provider
      value={{
        foodList,
        cartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        token,
        setToken,
        url,
        clearCart,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
