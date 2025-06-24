import { useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';

export const useSocket = (auctionId: string) => {
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    const socket = io(import.meta.env.VITE_SOCKET_URL || 'http://localhost:3000');
    socket.emit('join-auction', auctionId);
    socketRef.current = socket;

    return () => {
      socket.disconnect();
    };
  }, [auctionId]);

  return socketRef.current;
};
