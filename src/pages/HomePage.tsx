import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar'; // Import Sidebar
import Layout from '../layouts/Layout';

interface Auction {
  id: string;
  carId: string;
  status: 'ACTIVE' | 'COMPLETED' | 'PENDING';
  startingBid: number;
  startTime: string;
  endTime: string;
  imageUrl?: string;
}

const HomePage: React.FC = () => {
  const [auctions, setAuctions] = useState<Auction[]>([]);
  const [filteredAuctions, setFilteredAuctions] = useState<Auction[]>([]);
  const [filters, setFilters] = useState({
    ACTIVE: true, // Active filter is enabled by default
    PENDING: false,
    COMPLETED: false,
  });

  useEffect(() => {
    // Fetch auctions data
    api.get('/auctions')
      .then((res) => {
        setAuctions(res.data);
        setFilteredAuctions(res.data); // Set the initial filtered data
      })
      .catch((err) => console.error('Failed to fetch auctions', err));
  }, []);

  useEffect(() => {
    applyFilters(filters); // Reapply filters whenever filters state changes
  }, [filters, auctions]); // Reapply whenever auctions or filters change

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFilters((prev) => {
      const updatedFilters = { ...prev, [name]: checked };
      return updatedFilters;
    });
  };

  const applyFilters = (updatedFilters: any) => {
    const filtered = auctions.filter((auction: any) => {
      // Only show auctions whose status matches any selected filter (OR condition)
      if (updatedFilters.ACTIVE && auction.status === 'ACTIVE') return true;
      if (updatedFilters.PENDING && auction.status === 'PENDING') return true;
      if (updatedFilters.COMPLETED && auction.status === 'COMPLETED') return true;
      return false; // Exclude auctions that don't match any of the selected filters
    });
    setFilteredAuctions(filtered);
  };

  const formatDate = (dateString: any) => {
    const options: any = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true };
    const date = new Date(dateString);
    return date.toLocaleString('en-US', options);
  };

  return (
    <Layout>
      <div className="flex">
        {/* Sidebar */}
        <Sidebar filters={filters} handleFilterChange={handleFilterChange} />

        {/* Main Content */}
        <div className="flex-1 p-6 ml-10">
          <h1 className="text-3xl font-bold mb-6">Live & Upcoming Auctions</h1>
          <div className="space-y-6">
            {filteredAuctions.map((auction) => (
              <Link
                to={`/auction/${auction.id}`}
                key={auction.id}
                className="flex items-center border p-4 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 bg-white"
              >
                <img
                  src={auction.imageUrl || '/placeholder.jpg'}
                  alt={auction.carId}
                  className="h-40 w-40 object-cover rounded-md mr-4"
                />
                <div className="flex flex-col">
                  <h2 className="text-lg font-semibold text-gray-800">{auction.carId}</h2>
                  <p className="text-sm text-gray-600 mt-1">Status: {auction.status}</p>
                  <p className="text-sm text-gray-600 mt-1">Start Time: {formatDate(auction.startTime)}</p>
                  <p className="text-sm text-gray-600 mt-1">End Time: {formatDate(auction.endTime)}</p>
                  <p className="text-sm font-semibold text-gray-800 mt-2">Starting Bid: Rs {auction.startingBid}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
