import React from 'react';
import styles from '../styles/SearchBar.module.css'; // Ensure this path is correct

const SearchBar = ({ searchTerm, setSearchTerm, handleSearch }) => {
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch(); // Trigger search when Enter key is pressed
    }
  };

  return (
    <div className={styles.searchBar}>
      <input
        type="text"
        className={styles.searchInput}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)} // Update search term state
        onKeyPress={handleKeyPress} // Handle key press for Enter
        placeholder="Search Products"
      />
      <button 
        className={styles.searchButton} 
        onClick={handleSearch} // Call handleSearch on button click
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
