// src/components/Sidebar.tsx

import React from 'react';

interface SidebarProps {
  filters: any;
  handleFilterChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ filters, handleFilterChange }) => {
  return (
    <div className="w-64 fixed top-0 left-0 bottom-0 bg-purple-100 text-gray-800 p-6 shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Filters</h2>
      <div className="space-y-4">
        <div>
          <input
            type="checkbox"
            id="active"
            name="ACTIVE"
            checked={filters.ACTIVE}
            onChange={handleFilterChange}
            className="mr-2"
          />
          <label htmlFor="active">Active</label>
        </div>
        <div>
          <input
            type="checkbox"
            id="pending"
            name="PENDING"
            checked={filters.PENDING}
            onChange={handleFilterChange}
            className="mr-2"
          />
          <label htmlFor="pending">Pending</label>
        </div>
        <div>
          <input
            type="checkbox"
            id="completed"
            name="COMPLETED"
            checked={filters.COMPLETED}
            onChange={handleFilterChange}
            className="mr-2"
          />
          <label htmlFor="completed">Completed</label>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
