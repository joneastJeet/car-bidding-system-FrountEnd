import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useAuctionStore } from '../store/useAuctionStore';
// import { useSocket } from '../hooks/useSocket';
import { useMultipleSockets } from '../hooks/useSocket';
import { useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';

interface Auction {
  id: string;
  carId: string;
  status: string;
  highestBid: number;
  currentHighestBid: number;
  timeRemaining: any;
}

interface BidUpdateData {
  amount: number;
  bidderId?: string;
}

const AuctionDetail: React.FC = () => {
  const { id = '' } = useParams();
  // const [auction, setAuction] = useState<Auction | null>(null);

  const location = useLocation();
  const passedAuction = location.state?.auction as Auction | undefined;
  const [auction] = useState<Auction | null>(passedAuction || null);
  

  const [bidAmount, setBidAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [userBidCount, setUserBidCount] = useState(0);
  const [userConnCount, setUserConnCount] = useState(0);
  // const [timeRemaining, setTimeRemaining] = useState(0);
  const setCurrentBid = useAuctionStore((s) => s.setCurrentBid);
  const currentBid = useAuctionStore((s) => s.currentBid);
  const userDetails: any = localStorage.getItem('userDetails');
  const userId = JSON.parse(userDetails)?.id;
  
  // const socket = useSocket(id.toString(), userId);
  const socketMap = useMultipleSockets([{ auctionId: id, userId }]);
  const socketKey = `${id}_${userId}`;
  const socket = socketMap[socketKey];

  // Fetch auction details on mount / id change
  useEffect(() => {
    // if (!id) return;

    console.log("==LOG== ~ useEffect ~ auction:", auction)
    if (auction) {
      setCurrentBid(auction?.currentHighestBid);
    }
  }, [id, setCurrentBid]);

  // Handle socket events
  useEffect(() => {
    if (!socket) return;


    const handleBidError = (data: { success: false; message: string }) => {
      // console.log("==LOG== ~ handleBidError ~ data:", data)
      toast.error(data.message || 'Bid error');
    };

    const handleBidUpdate = (data: BidUpdateData) => {
      setCurrentBid(data.amount);
    };

    const handleAuctionEnded = () => {
      alert('Auction ended!');
    };

    const handleBidPlaced = (data: { success: true; amount: number }) => {
      toast.success(`Bid placed: Rs ${data.amount}`);
    };

    const handleUserConnCountPlaced = (data: { auctionId: string; count: number }) => {
      setUserConnCount(data.count)
    };


    const handleBidCountPlaced = (data: { auctionId: string; count: number }) => {
      setUserBidCount(data.count)
    };

    socket.on('bidUpdate', handleBidUpdate);
    socket.on('auction-ended', handleAuctionEnded);
    socket.on('bid-error', handleBidError);
    socket.on('bid-placed', handleBidPlaced);
    socket.on('user-count', handleUserConnCountPlaced);
    socket.on('bid-count', handleBidCountPlaced);
    return () => {
      socket.off('bidUpdate', handleBidUpdate);
      socket.off('auction-ended', handleAuctionEnded);
      socket.off('bid-error', handleBidError);
      socket.off('bid-placed', handleBidPlaced);
      socket.off('user-count', handleUserConnCountPlaced);
      socket.off('bid-count', handleBidCountPlaced);
    };
  }, [socket, setCurrentBid]);

  useEffect(() => {
    console.log('🟢 AuctionDetail mounted');
  
    return () => {
      console.log('🔴 AuctionDetail unmounted');
    };
  }, []);

  // Bid submit handler
  const submitBid = useCallback(() => {
    setErrorMsg('');
    const amount = parseFloat(bidAmount);
    console.log("==LOG== ~ submitBid ~ amount:", amount)
    if (!socket) {
      setErrorMsg('Socket not connected');
      return;
    }
    if (isNaN(amount) || amount <= 0) {
      setErrorMsg('Enter a valid bid amount');
      return;
    }

    setLoading(true);
    socket.emit('place-bid', { auctionId: id, userId, amount });

    // Optionally, you can listen for an ack or confirmation event from server here
    // For now, just clear input and stop loading
    setBidAmount('');
    setLoading(false);
  }, [socket, bidAmount, id]);

  return (
    <div className="p-6 max-w-xl mx-auto">
      {/* <h1 className="text-2xl font-bold mb-2">{auction?.carId}</h1> */}
      <h6 className="text-2xl font-bold mb-2">{auction?.id}</h6>
      {/* <p>Status: {auction?.status}</p> */}
      <span
          className={`inline-block px-3 py-1 text-sm font-semibold rounded-full text-white
            ${auction?.status === 'ACTIVE' ? 'bg-green-500' : ''}
            ${auction?.status === 'PENDING' ? 'bg-orange-400' : ''}
            ${auction?.status === 'COMPLETED' ? 'bg-red-500' : ''}`}
        >
        {auction?.status}
      </span>
      <p className="text-xl font-semibold mt-4">Highest: Rs {currentBid}</p>
      <p className="text-xl font-semibold mt-4">User Conn:  {userConnCount}</p>
      <p className="text-xl font-semibold mt-4">Total Bid:  {userBidCount}</p>
      <p className="text-xl font-semibold mt-4">Time Remaining:  {auction?.timeRemaining}</p>
      {/* <p className="text-xl font-semibold mt-4">Highest Bid: Rs {currentBid}</p> */}

      <div className="mt-6">
        <input
          type="number"
          value={bidAmount}
          onChange={(e) => setBidAmount(e.target.value)}
          className="border p-2 rounded w-full mb-2"
          // placeholder="Enter your bid"
          placeholder="Enter your"
          disabled={loading}
          min="0"
          step="any"
        />
        <button
          onClick={submitBid}
          className={`bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition ${loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          disabled={loading}
        >
          {loading ? 'Placing Bid...' : 'Place'}
          {/* {loading ? 'Placing Bid...' : 'Place Bid'} */}
        </button>
        {errorMsg && <p className="text-red-600 mt-2">{errorMsg}</p>}
      </div>
    </div>
  );
};

export default AuctionDetail;
