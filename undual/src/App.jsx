import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from './redux/productsSlice';
import { fetchCategories } from './redux/categoriesSlice';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Updated import
import SearchBar from './components/SearchBar';
import CategorySelector from './components/CategorySelector';
import ProductList from './components/ProductList';
import ProductDetails from './components/ProductDetails'; // New component
import styles from './App.module.css';

const App = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [batchSize, setBatchSize] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');

  const selectedCategory = useSelector((state) => state.categories.selectedCategory);
  const products = useSelector((state) => state.products.products);
  const status = useSelector((state) => state.products.status);
  const error = useSelector((state) => state.products.error);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchProducts({ 
      category: selectedCategory, 
      limit: batchSize, 
      skip: (page - 1) * batchSize, 
      searchTerm 
    }));
  }, [selectedCategory, page, batchSize, dispatch, searchTerm]);

  const handleNextPage = () => setPage((prevPage) => prevPage + 1);
  const handlePreviousPage = () => { 
    if (page > 1) setPage((prevPage) => prevPage - 1); 
  };

  const handleSearch = () => { 
    setPage(1);
    dispatch(fetchProducts({ 
      category: selectedCategory, 
      limit: batchSize, 
      skip: 0, 
      searchTerm 
    })); 
  };

  return (
    <Router>
      <div className={styles.appContainer}>
        <h1 className={styles.title}>Product Management App</h1>
        <div className={styles.searchCategoryContainer}>
          <SearchBar 
            searchTerm={searchTerm} 
            setSearchTerm={setSearchTerm} 
            handleSearch={handleSearch} 
          />
          <CategorySelector selectedCategory={selectedCategory} />
        </div>
        
        {status === 'loading' && <p className={styles.loading}>Loading products...</p>}
        {error && <p className={styles.error}>Error: {error}</p>} 
        
        <Routes> {/* Changed from <Switch> to <Routes> */}
          <Route path="/" element={
            <ProductList 
              products={products} 
              status={status} 
              page={page} 
              handlePreviousPage={handlePreviousPage} 
              handleNextPage={handleNextPage} 
            />
          } />
          <Route path="/product/:id" element={<ProductDetails />} /> {/* Updated to use element prop */}
        </Routes>

       
      </div>
    </Router>
  );
};

export default App;
