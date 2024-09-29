// src/components/Buy.js
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { completeBuy, cancelBuy } from '../redux/buySlice'; // Assuming these actions are defined
import styles from '../styles/Buy.module.css';
import Header from './Header';

const Buy = () => {
  const navigate = useNavigate(); // To navigate back if needed
  const dispatch = useDispatch();
  const location = useLocation(); // Access the location object
  const cartItems = useSelector((state) => state.cart.items); // Get cart items from Redux store

  // Check if a product is passed in the state (from the product details page)
  const product = location.state?.product;

  // If both cart items and the product are unavailable, show an error message
  if (cartItems.length === 0 && !product) {
    return <p className={styles.error}>No product selected for purchase.</p>;
  }

  // Use cart items if available, otherwise fallback to the passed product
  const itemsToBuy = cartItems.length > 0 ? cartItems : [product];

  const [showConfirmation, setShowConfirmation] = useState(false); // State to manage confirmation message

  const handleComplete = () => {
    // Logic to handle the purchase completion (e.g., API call)
    dispatch(completeBuy(itemsToBuy)); // Dispatch action with items to buy
    setShowConfirmation(true); // Show confirmation message

    // Redirect to home after 2 seconds
    setTimeout(() => {
      navigate('/'); // Redirect to home after 2 seconds
    }, 2000);
  };

  const handleCancel = () => {
    dispatch(cancelBuy());
    navigate('/'); // Redirect back to home or previous page
  };

  return (
    <>
      <Header />
      {showConfirmation ? (
        <div className={styles.confirmation}>
          <div className={styles.tickIcon}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="green"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <h2>Thank You for Your Purchase!</h2>
          <p>You have purchased: {itemsToBuy.map(item => item.title).join(", ")}</p>
          <p>Redirecting to home...</p>
        </div>
      ) : (
        <div className={styles.buyModal}>
          <h2>Confirm Purchase</h2>
          <div className={styles.itemsList}>
            {itemsToBuy.map((item) => (
              <div key={item.id} className={styles.itemCard}>
                <img src={item.thumbnail} alt={item.title} className={styles.itemImage} />
                <div className={styles.itemDetails}>
                  <h3>{item.title}</h3>
                  <p>Price: ${item.price.toFixed(2)}</p>
                  <p>Quantity: {item.quantity || 1}</p>
                </div>
              </div>
            ))}
          </div>
          <div className={styles.buttonContainer}>
            <button onClick={handleComplete} className={styles.confirmButton}>Confirm</button>
            <button onClick={handleCancel} className={styles.cancelButton}>Cancel</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Buy;
