
// src/components/Header.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'; // Import useDispatch
import useProductManagement from '../hooks/useProductManagement'; // Import the custom hook
import { setSelectedCategory } from '../redux/categoriesSlice'; // Import the action
import styles from '../styles/Header.module.css';

const Header = () => {
  const dispatch = useDispatch(); // Initialize dispatch
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.items);
  const {
    searchTerm,
    setSearchTerm,
    handleSearch,
    selectedCategory,
    categories, // Access categories
  } = useProductManagement();

  const handleCartClick = () => {
    navigate('/cart');
  };

  const handleCategoryChange = (e) => {
    const selected = e.target.value;
    dispatch(setSelectedCategory(selected)); // Dispatch action to set selected category
  };

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link to="/" className={styles.logoLink}>QuickCart</Link>
      </div>
     
      <div className={styles.categories}>
      <select
              className={styles.categorySelect}
              value={selectedCategory}
              onChange={handleCategoryChange} // Set category change handler
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id} className={styles.categoryOption}>
                  {category.name}
                </option>
              ))}
            </select>
            </div>
      <div className={styles.search}>
        <input
          type="text"
          className={styles.searchInput}
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              handleSearch(); // Trigger search on Enter key
            }
          }}
        />
        <button className={styles.searchButton} onClick={handleSearch}>Search</button>
      </div>
      <div className={styles.cart} onClick={handleCartClick}>
        <span className={styles.cartIcon}>🛒</span>
        {cartItems.length > 0 && <span className={styles.cartCount}>{cartItems.length}</span>}
      </div>
    </header>
  );
};

export default Header;
