// src/components/ProductList.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/ProductList.module.css';

const ProductList = ({ products, status, page, handlePreviousPage, handleNextPage }) => {
  const navigate = useNavigate();

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  return (
    <>
      <div className={styles.productList}>
        {status === 'loading' ? (
          <p className={styles.loading}>Loading...</p>
        ) : (
          <>
            {products.length > 0 ? (
              products.map((product) => (
                <div 
                  key={product.id} 
                  className={styles.productItem} 
                  onClick={() => handleProductClick(product.id)} 
                  role="button" 
                  tabIndex={0} 
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') handleProductClick(product.id);
                  }}
                >
                  <img src={product.thumbnail} alt={product.title} className={styles.productThumbnail} />
                  <h4 className={styles.productTitle}>{product.title}</h4>
                  <p className={styles.productPrice}>Price: ${product.price.toFixed(2)}</p>
                </div>
              ))
            ) : (
              <p className={styles.noProducts}>No products found.</p>
            )}
          </>
        )}
      </div>

      {/* Pagination outside of product list rendering */}
      <div className={styles.pagination}>
        <button
          className={styles.paginationButton}
          onClick={handlePreviousPage}
          disabled={page === 1}
          aria-label="Previous page"
        >
          Previous
        </button>
        <span className={styles.paginationText}>Page {page}</span>
        <button
          className={styles.paginationButton}
          onClick={handleNextPage}
          aria-label="Next page"
        >
          Next
        </button>
      </div>
    </>
  );
};

export default ProductList;
