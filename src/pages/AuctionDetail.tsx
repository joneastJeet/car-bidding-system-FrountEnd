import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuctionStore } from '../store/useAuctionStore';
import { useSocket } from '../hooks/useSocket';

interface Auction {
  id: string;
  title: string;
  status: string;
  highestBid: number;
}

const AuctionDetail: React.FC = () => {
  const { id = '' } = useParams();
  const [auction, setAuction] = useState<Auction | null>(null);
  const [bidAmount, setBidAmount] = useState('');
  const setCurrentBid = useAuctionStore((s) => s.setCurrentBid);
  const socket = useSocket(id);

  useEffect(() => {
    // Fetch auction details
    fetch(`/api/auctions/${id}`)
      .then(res => res.json())
      .then(data => {
        setAuction(data);
        setCurrentBid(data.highestBid);
      });
  }, [id]);

  useEffect(() => {
    if (!socket) return;

    socket.on('bidUpdate', (data) => {
      setCurrentBid(data.amount);
    });

    socket.on('auction-ended', () => {
      alert('Auction ended!');
    });

    return () => {
      socket.off('bidUpdate');
      socket.off('auction-ended');
    };
  }, [socket]);

  const submitBid = () => {
    const amount = parseFloat(bidAmount);
    if (socket && !isNaN(amount)) {
      socket.emit('place-bid', { auctionId: id, amount });
      setBidAmount('');
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-2">{auction?.title}</h1>
      <p>Status: {auction?.status}</p>
      <p className="text-xl font-semibold mt-4">Highest Bid: ${useAuctionStore.getState().currentBid}</p>

      <div className="mt-6">
        <input
          type="number"
          value={bidAmount}
          onChange={(e) => setBidAmount(e.target.value)}
          className="border p-2 rounded w-full mb-2"
          placeholder="Enter your bid"
        />
        <button
          onClick={submitBid}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Place Bid
        </button>
      </div>
    </div>
  );
};

export default AuctionDetail;
