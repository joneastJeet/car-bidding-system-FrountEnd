// src/layouts/Layout.tsx

import React from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Top Header */}
      <Header />

      <div className="flex flex-1 pt-16">
        {/* Sidebar */}
        <Sidebar filters={{ ACTIVE: true, PENDING: false, COMPLETED: false }} handleFilterChange={() => {}} />

        {/* Main Content */}
        <div className="flex-1 p-6 ml-64 overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
