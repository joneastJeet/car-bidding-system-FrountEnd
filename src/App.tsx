// import { Routes, Route } from 'react-router-dom';
// import HomePage from './pages/HomePage';
// import AuctionDetail from './pages/AuctionDetail';
// import LoginPage from './pages/LoginPage';
// import { ProtectedRoute } from './routes/ProtectedRoute';

// export default function App() {
//   return (
//     <Routes>
//       <Route path="/login" element={<LoginPage />} />
//       <Route
//         path="/"
//         element={
//           <ProtectedRoute>
//             <HomePage />
//           </ProtectedRoute>
//         }
//       />
//       <Route
//         path="/auction/:id"
//         element={
//           <ProtectedRoute>
//             <AuctionDetail />
//           </ProtectedRoute>
//         }
//       />
//     </Routes>
//   );
// }


import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AuctionDetail from './pages/AuctionDetail';
import LoginPage from './pages/LoginPage';
import { ProtectedRoute } from './routes/ProtectedRoute';

const App: React.FC = () => {
  return (
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
  );
};

export default App;
