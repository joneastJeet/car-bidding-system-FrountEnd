// import { useEffect, useState } from 'react';
// import { io, Socket } from 'socket.io-client';

// export const useSocket = (auctionId: string, userId: number): Socket | null => {
//   const [socket, setSocket] = useState<Socket | null>(null);

//   useEffect(() => {
//     if (!auctionId || !userId) return;

//     const socketInstance = io(import.meta.env.VITE_SOCKET_URL || 'http://localhost:8000', {
//       transports: ['websocket'],
//       // reconnectionAttempts: 3,
//       // timeout: 5000,
//     });

//     socketInstance.on('connect', () => {
//       console.log('✅ Socket connected:', socketInstance.id);
//       console.log('📤 Emitting join-auction:', { auctionId, userId });

//       socketInstance.emit('join-auction', { auctionId, userId });
//     });

//     socketInstance.on('joined-auction', (data) => {
//       console.log('📥 Successfully joined auction:', data);
//     });

//     socketInstance.on('connect_error', (err) => {
//       console.error('❌ Socket connection error:', err.message);
//     });

//     setSocket(socketInstance);

//     return () => {
//       socketInstance.disconnect();
//       console.log('🔌 Socket disconnected');
//     };
//   }, [auctionId, userId]); // ✅ FIXED

//   return socket;
// };


// useSocket.ts
import { useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';

type SocketMap = {
  [key: string]: Socket;
};

export const useMultipleSockets = (
  connections: { auctionId: string; userId: number }[],
  onUserJoined?: (data: { auctionId: string; userId: number }) => void
): SocketMap => {
  const socketMapRef = useRef<SocketMap>({});

  useEffect(() => {
    connections.forEach(({ auctionId, userId }) => {
      const key = `${auctionId}_${userId}`;
      if (socketMapRef.current[key]) return;

      const socket = io(import.meta.env.VITE_SOCKET_URL || 'http://localhost:8000', {
        transports: ['websocket'],
      });

      console.log(`🧪 Creating socket for key [${key}]`);

      socket.on('connect', () => {
        console.log(`✅ [${key}] Connected`, socket.id);
        socket.emit('join-auction', { auctionId, userId });
      });

      

      socket.on('joined-auction', (data) => {
        console.log(`📥 [${key}] Joined auction`, data);
      });

      // ✅ Handle others joining the same auction
      socket.on('user-joined', (data) => {
        console.log(`👥 [${key}] Another user joined:`, data);
        if (onUserJoined) onUserJoined(data);
        // You can show a toast, notification, or update a list of active users
      });

      socket.on('connect_error', (err) => {
        console.error(`❌ [${key}] Socket error:`, err.message);
      });

      socketMapRef.current[key] = socket;
    });

    return () => {
      Object.entries(socketMapRef.current).forEach(([key, socket]) => {
        socket.disconnect();
        console.log(`🔌 [${key}] Disconnected`);
      });
      socketMapRef.current = {};
    };
  }, [JSON.stringify(connections)]); // forces effect to re-run on change

  return socketMapRef.current;
};
