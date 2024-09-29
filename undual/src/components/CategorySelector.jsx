// src/components/CategorySelector.jsx
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedCategory } from '../redux/categoriesSlice';
import styles from '../styles/CategorySelector.module.css';

const CategorySelector = ({ selectedCategory }) => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.categories);

  return (
    <div className={styles.categorySelector}>
      {/* <h3 className={styles.title}>Select Category:</h3> */}
      <select
        className={styles.categorySelect}
        value={selectedCategory}
        onChange={(e) => dispatch(setSelectedCategory(e.target.value))}
      >
        <option className={styles.option} value="">All Categories</option>
        {categories.map((category) => (
          <option key={category.slug} className={styles.option} value={category.slug}>
            {category.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CategorySelector;
