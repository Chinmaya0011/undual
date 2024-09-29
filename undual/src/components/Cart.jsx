import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { removeFromCart, clearCart, updateQuantity } from '../redux/cartSlice';
import styles from '../styles/Cart.module.css';

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.items);

  const handleRemove = (item) => {
    dispatch(removeFromCart(item));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handleQuantityChange = (item, change) => {
    const newQuantity = item.quantity + change;
    if (newQuantity >= 1) {
      dispatch(updateQuantity({ ...item, quantity: newQuantity }));
    }
  };

  const handleBuyAll = () => {
    navigate('/buy');
  };

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  return (
    <div className={styles.cart}>
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cartItems.map((item) => (
            <div key={item.id} className={styles.cartItem}>
<div> <h3>{item.title}</h3>
              <img src={item.thumbnail} alt={item.title} className={styles.productImage} />
</div>
              <div className={styles.itemDetails}>
                <p>Price: ${item.price.toFixed(2)}</p>
                <div className={styles.quantityControl}>
                  <button onClick={() => handleQuantityChange(item, -1)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => handleQuantityChange(item, 1)}>+</button>
                </div>
                <p>Total: ${(item.price * item.quantity).toFixed(2)}</p>
                <button onClick={() => handleRemove(item)}>Remove</button>
              </div>
            </div>
          ))}
          <button onClick={handleClearCart}>Clear Cart</button>
          <button onClick={handleBuyAll} className={styles.buyAllButton}>Buy All</button>
          <h3>Total Price: ${calculateTotalPrice()}</h3>
        </div>
      )}
    </div>
  );
};

export default Cart;
