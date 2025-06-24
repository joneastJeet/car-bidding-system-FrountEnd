import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import { Link } from 'react-router-dom';

interface Auction {
  id: string;
  carId: string;
  status: 'UPCOMING' | 'LIVE' | 'ENDED';
  startingBid: number;
  startTime: string;
  endTime: string;
  imageUrl?: string;
}

const HomePage: React.FC = () => {
  const [auctions, setAuctions] = useState<Auction[]>([]);

  useEffect(() => {
    api.get('/auctions')
      .then(res => setAuctions(res.data))
      .catch(err => console.error('Failed to fetch auctions', err));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Live & Upcoming Auctions</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {auctions.map(auction => (
          <Link
            to={`/auction/${auction.id}`}
            key={auction.id}
            className="border p-4 rounded-xl shadow hover:shadow-md transition"
          >
            <img
              src={auction.imageUrl || '/placeholder.jpg'}
              alt={auction.carId}
              className="h-40 w-full object-cover rounded-md mb-3"
            />
            <h2 className="text-lg font-semibold">{auction.carId}</h2>
            <p className="text-sm text-gray-600">Status: {auction.status}</p>
            <p className="text-sm text-gray-600">Start Time: {auction.startTime}</p>
            <p className="text-sm text-gray-600">End Time: {auction.endTime}</p>
            <p className="text-sm text-gray-600">Starting: ${auction.startingBid}</p>
            <hr></hr>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
