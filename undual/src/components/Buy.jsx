import React from 'react';
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

  const handleComplete = () => {
    // Logic to handle the purchase completion (e.g., API call)
    dispatch(completeBuy(itemsToBuy)); // Dispatch action with items to buy
    alert(`Thank you for purchasing ${itemsToBuy.map(item => item.title).join(", ")}!`);
    navigate('/'); // Redirect to home or another page after purchase
  };

  const handleCancel = () => {
    dispatch(cancelBuy());
    navigate('/'); // Redirect back to home or previous page
  };

  return (
    <><Header/>
   
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
     </>
  );
};

export default Buy;
