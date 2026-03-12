import { useState, useEffect, useCallback, useRef } from "react";
import type { Bid } from "@/data/mockData";

export type AuctionMode = "standard" | "sudden_death";

export interface AuctionState {
  currentBid: number;
  bids: Bid[];
  timeLeft: number;
  isActive: boolean;
  winner: Bid | null;
  autoBidEnabled: boolean;
  autoBidMax: number;
  snipeProtectionActive: boolean;
  mode: AuctionMode;
}

const SNIPE_PROTECTION_THRESHOLD = 15; // seconds
const SNIPE_EXTENSION = 30; // seconds added on snipe

const BOT_BIDDERS = [
  { userId: "bot1", username: "MosheDavid" },
  { userId: "bot2", username: "SarahR" },
  { userId: "bot3", username: "ChaimG" },
  { userId: "bot4", username: "RivkaM" },
  { userId: "bot5", username: "YossiB" },
  { userId: "bot6", username: "MendelK" },
  { userId: "bot7", username: "RachelS" },
];

export function useAuction(
  initialBid: number = 0,
  initialTime: number = 120,
  mode: AuctionMode = "standard"
) {
  const [state, setState] = useState<AuctionState>({
    currentBid: initialBid,
    bids: [],
    timeLeft: initialTime,
    isActive: true,
    winner: null,
    autoBidEnabled: false,
    autoBidMax: 0,
    snipeProtectionActive: false,
    mode,
  });

  const timerRef = useRef<ReturnType<typeof setInterval>>();
  const botTimerRef = useRef<ReturnType<typeof setTimeout>>();

  // Countdown timer
  useEffect(() => {
    if (!state.isActive || state.timeLeft <= 0) return;

    timerRef.current = setInterval(() => {
      setState((prev) => {
        if (prev.timeLeft <= 1) {
          clearInterval(timerRef.current);
          const winner = prev.bids[prev.bids.length - 1] || null;
          return { ...prev, timeLeft: 0, isActive: false, winner };
        }
        return { ...prev, timeLeft: prev.timeLeft - 1 };
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [state.isActive, state.timeLeft > 0]);

  // Simulate bot bidding
  useEffect(() => {
    if (!state.isActive) return;

    const scheduleBotBid = () => {
      // Sudden death: bots bid faster in the last 30 seconds
      const isSuddenDeath = state.mode === "sudden_death";
      const minDelay = isSuddenDeath && state.timeLeft <= 30 ? 2000 : 5000;
      const maxDelay = isSuddenDeath && state.timeLeft <= 30 ? 8000 : 20000;
      const delay = minDelay + Math.random() * maxDelay;

      botTimerRef.current = setTimeout(() => {
        setState((prev) => {
          if (!prev.isActive || prev.timeLeft <= 0) return prev;

          const increment = [5, 10, 15, 25][Math.floor(Math.random() * 4)];
          const botBidder = BOT_BIDDERS[Math.floor(Math.random() * BOT_BIDDERS.length)];
          const newAmount = prev.currentBid + increment;

          const newBid: Bid = {
            id: `bid-${Date.now()}`,
            userId: botBidder.userId,
            username: botBidder.username,
            amount: newAmount,
            timestamp: new Date(),
          };

          // Snipe protection — only in standard mode
          let newTimeLeft = prev.timeLeft;
          let snipeActive = prev.snipeProtectionActive;
          if (prev.mode === "standard" && prev.timeLeft <= SNIPE_PROTECTION_THRESHOLD) {
            newTimeLeft = prev.timeLeft + SNIPE_EXTENSION;
            snipeActive = true;
          }

          // Auto-bid response
          let bids = [...prev.bids, newBid];
          let currentBid = newAmount;

          if (prev.autoBidEnabled && newAmount < prev.autoBidMax) {
            const autoBidAmount = Math.min(newAmount + 5, prev.autoBidMax);
            const autoBid: Bid = {
              id: `bid-auto-${Date.now()}`,
              userId: "you",
              username: "You",
              amount: autoBidAmount,
              timestamp: new Date(),
            };
            bids = [...bids, autoBid];
            currentBid = autoBidAmount;
          }

          return {
            ...prev,
            currentBid,
            bids,
            timeLeft: newTimeLeft,
            snipeProtectionActive: snipeActive,
          };
        });
        scheduleBotBid();
      }, delay);
    };

    scheduleBotBid();
    return () => clearTimeout(botTimerRef.current);
  }, [state.isActive]);

  const placeBid = useCallback((amount: number) => {
    setState((prev) => {
      if (!prev.isActive || amount <= prev.currentBid) return prev;

      const newBid: Bid = {
        id: `bid-${Date.now()}`,
        userId: "you",
        username: "You",
        amount,
        timestamp: new Date(),
      };

      // Snipe protection — only in standard mode
      let newTimeLeft = prev.timeLeft;
      let snipeActive = prev.snipeProtectionActive;
      if (prev.mode === "standard" && prev.timeLeft <= SNIPE_PROTECTION_THRESHOLD) {
        newTimeLeft = prev.timeLeft + SNIPE_EXTENSION;
        snipeActive = true;
      }

      return {
        ...prev,
        currentBid: amount,
        bids: [...prev.bids, newBid],
        timeLeft: newTimeLeft,
        snipeProtectionActive: snipeActive,
      };
    });
  }, []);

  const setAutoBid = useCallback((maxAmount: number) => {
    setState((prev) => ({
      ...prev,
      autoBidEnabled: maxAmount > prev.currentBid,
      autoBidMax: maxAmount,
    }));
  }, []);

  const resetAuction = useCallback((newItem: string, startingBid: number, newMode?: AuctionMode) => {
    clearInterval(timerRef.current);
    clearTimeout(botTimerRef.current);
    setState({
      currentBid: startingBid,
      bids: [],
      timeLeft: initialTime,
      isActive: true,
      winner: null,
      autoBidEnabled: false,
      autoBidMax: 0,
      snipeProtectionActive: false,
      mode: newMode || mode,
    });
  }, [initialTime, mode]);

  return { ...state, placeBid, setAutoBid, resetAuction };
}
