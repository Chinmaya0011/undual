// src/App.jsx
import React from 'react';
import MainLayout from './components/MainLayout';
import useProductManagement from './hooks/useProductManagement'; // Import custom hook
import Header from './components/Header';
const App = () => {
  const {
   

    products,
    status,
    error,
    page,
    handleNextPage,
    handlePreviousPage,
  } = useProductManagement();

  return (
    <>
    <Header/>
    <MainLayout
     
      products={products}
      status={status}
      error={error}
      page={page}
      handlePreviousPage={handlePreviousPage}
      handleNextPage={handleNextPage}
    />
    </>
  );
};

export default App;
