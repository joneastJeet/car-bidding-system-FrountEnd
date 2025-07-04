import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AuctionDetail from './pages/AuctionDetail';
import LoginPage from './pages/LoginPage';
import { ProtectedRoute } from './routes/ProtectedRoute';
import { Toaster } from 'react-hot-toast';

const App: React.FC = () => {
  return (

    <>
      <Toaster position="top-right" reverseOrder={false} />

      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/auction/:id"
          element={
            <ProtectedRoute>
              <AuctionDetail />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  )
};

export default App;
