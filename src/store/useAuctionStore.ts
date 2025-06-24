import { create } from 'zustand';

interface AuctionState {
  currentBid: number;
  setCurrentBid: (amount: number) => void;
}

export const useAuctionStore = create<AuctionState>((set) => ({
  currentBid: 0,
  setCurrentBid: (amount) => set({ currentBid: amount }),
}));
