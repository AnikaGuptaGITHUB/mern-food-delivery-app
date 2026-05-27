import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import './Cart.css';

const Cart = () => {
  const { cartItems, foodList, removeFromCart, getTotalCartAmount, url } = useContext(StoreContext);
  const navigate = useNavigate();

  return (
    <div className="cart">
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />

        {/* ✅ Safe rendering check */}
        {Array.isArray(foodList) && foodList.length > 0 ? (
          foodList.map((item) => {
            if (cartItems && cartItems[item._id] > 0) {
              return (
                <div key={item._id}>
                  <div className="cart-items-title cart-items-item">
                    <img src={`${url}/images/${item.image}`} alt={item.name} />
                    <p>{item.name}</p>
                    <p>${item.price}</p>
                    <p>{cartItems[item._id]}</p>
                    <p>${item.price * cartItems[item._id]}</p>
                    <p
                      onClick={() => removeFromCart(item._id)}
                      className="cross"
                      style={{ cursor: 'pointer' }}
                    >
                      ×
                    </p>
                  </div>
                  <hr />
                </div>
              );
            }
            return null;
          })
        ) : (
          <p className="empty-cart">🛒 Your cart is empty or still loading...</p>
        )}
      </div>

      {/* ✅ Bottom summary section */}
      <div className="cart-bottom">
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
            <b>
              ${getTotalCartAmount() === 0 ? 0 : (getTotalCartAmount() + 2).toFixed(2)}
            </b>
          </div>


          <button onClick={() => navigate('/order')}>PROCEED TO CHECKOUT</button>
        </div>

        <div className="cart-promocode">
          <div>
            <p>If you have a promo code, enter it here</p>
            <div className="cart-promocode-input">
              <input type="text" placeholder="Promo code" />
              <button>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
