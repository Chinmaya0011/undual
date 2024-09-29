import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import styles from '../styles/ProductDetails.module.css';

const ProductDetails = () => {
  const { id } = useParams(); // Get the product ID from the URL parameters
  const products = useSelector((state) => state.products.products); // Get the products from the Redux store

  // Find the product based on the ID
  const product = products.find((product) => product.id.toString() === id);

  // Handle case where product is not found
  if (!product) {
    return <p className={styles.error}>Product not found.</p>;
  }

  return (
    <div className={styles.productDetails}>
      <h2 className={styles.productTitle}>{product.title}</h2>
      <img src={product.thumbnail} alt={product.title} className={styles.productImage} />
      
      <table className={styles.productTable}>
        <tbody>
          <tr>
            <td className={styles.tableLabel}>Price:</td>
            <td className={styles.tableValue}>${product.price.toFixed(2)}</td>
          </tr>
          <tr>
            <td className={styles.tableLabel}>Category:</td>
            <td className={styles.tableValue}>{product.category}</td>
          </tr>
          <tr>
            <td className={styles.tableLabel}>Stock:</td>
            <td className={styles.tableValue}>{product.stock}</td>
          </tr>
          <tr>
            <td className={styles.tableLabel}>Brand:</td>
            <td className={styles.tableValue}>{product.brand}</td>
          </tr>
          <tr>
            <td className={styles.tableLabel}>Warranty:</td>
            <td className={styles.tableValue}>{product.warrantyInformation}</td>
          </tr>
          <tr>
            <td className={styles.tableLabel}>Shipping:</td>
            <td className={styles.tableValue}>{product.shippingInformation}</td>
          </tr>
          <tr>
            <td className={styles.tableLabel}>Availability:</td>
            <td className={styles.tableValue}>{product.availabilityStatus}</td>
          </tr>
        </tbody>
      </table>

      {/* Display reviews if available */}
      <h5 className={styles.reviewsTitle}>Reviews:</h5>
      {product.reviews && product.reviews.length > 0 ? (
        <div className={styles.reviewsContainer}>
          {product.reviews.map((review, index) => (
            <div key={index} className={styles.reviewItem}>
              <div className={styles.reviewHeader}>
                <span className={styles.reviewRating}>Rating: {review.rating}</span>
                <span className={styles.reviewDate}>
                  {new Date(review.date).toLocaleDateString()}
                </span>
              </div>
              <p className={styles.reviewComment}>{review.comment}</p>
              <p className={styles.reviewReviewer}>Reviewed by: {review.reviewerName}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No reviews available.</p>
      )}
    </div>
  );
};

export default ProductDetails;
