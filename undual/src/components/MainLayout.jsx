// src/components/MainLayout.jsx
import React from 'react';
import SearchBar from './SearchBar';
import CategorySelector from './CategorySelector';
import ProductList from './ProductList';
import styles from '../styles/MainLayout.module.css'; // New styling for the layout

const MainLayout = ({
  searchTerm,
  setSearchTerm,
  handleSearch,
  selectedCategory,
  products,
  status,
  error,
  page,
  handlePreviousPage,
  handleNextPage,
}) => {
  return (
    <div className={styles.appContainer}>
    

      {status === 'loading' && <p className={styles.loading}>Loading products...</p>}
      {error && <p className={styles.error}>Error: {error}</p>}

      <ProductList
        products={products}
        status={status}
        page={page}
        handlePreviousPage={handlePreviousPage}
        handleNextPage={handleNextPage}
      />
    </div>
  );
};

export default MainLayout;
