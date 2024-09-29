// src/hooks/useProductManagement.js
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../redux/productsSlice';
import { fetchCategories } from '../redux/categoriesSlice';

const useProductManagement = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [batchSize, setBatchSize] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');

  const selectedCategory = useSelector((state) => state.categories.selectedCategory);
  const products = useSelector((state) => state.products.products);
  const categories = useSelector((state) => state.categories.categories); // Get categories from the Redux store
  const status = useSelector((state) => state.products.status);
  const error = useSelector((state) => state.products.error);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    dispatch(
      fetchProducts({
        category: selectedCategory,
        limit: batchSize,
        skip: (page - 1) * batchSize,
        searchTerm,
      })
    );
  }, [selectedCategory, page, batchSize, dispatch, searchTerm]);

  const handleNextPage = () => setPage((prevPage) => prevPage + 1);
  const handlePreviousPage = () => {
    if (page > 1) setPage((prevPage) => prevPage - 1);
  };

  const handleSearch = () => {
    setPage(1);
    dispatch(
      fetchProducts({
        category: selectedCategory,
        limit: batchSize,
        skip: 0,
        searchTerm,
      })
    );
  };

  return {
    searchTerm,
    setSearchTerm,
    handleSearch,
    selectedCategory,
    products,
    categories, // Return categories
    status,
    error,
    page,
    handleNextPage,
    handlePreviousPage,
  };
};

export default useProductManagement;
