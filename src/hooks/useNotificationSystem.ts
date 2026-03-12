import { useState, useEffect, useCallback } from "react";

export interface AppNotification {
  id: string;
  type: "bid_outbid" | "bid_won" | "stream_starting" | "stream_live" | "order_shipped" | "order_delivered" | "price_drop" | "seller_live" | "auction_ending" | "new_follower" | "review_received" | "charity_goal";
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  actionUrl?: string;
  imageEmoji?: string;
}

const INITIAL_NOTIFICATIONS: AppNotification[] = [
  {
    id: "n1",
    type: "bid_outbid",
    title: "You've been outbid!",
    message: "Someone bid $75 on 'Complete Shas Vilna Edition'. Your bid was $60.",
    timestamp: new Date(Date.now() - 60000),
    read: false,
    actionUrl: "/live/ls1",
    imageEmoji: "🔨",
  },
  {
    id: "n2",
    type: "stream_live",
    title: "Seforim Central is LIVE!",
    message: "Massive Seforim Sale — Everything Must Go! 342 watching now.",
    timestamp: new Date(Date.now() - 180000),
    read: false,
    actionUrl: "/live/ls1",
    imageEmoji: "🔴",
  },
  {
    id: "n3",
    type: "order_shipped",
    title: "Order shipped!",
    message: "Your Borsalino Fedora has been shipped via USPS Priority Mail.",
    timestamp: new Date(Date.now() - 3600000),
    read: false,
    actionUrl: "/orders/ord-1",
    imageEmoji: "📦",
  },
  {
    id: "n4",
    type: "price_drop",
    title: "Price drop alert!",
    message: "Sterling Silver Menorah is now $450 (was $600). 25% off!",
    timestamp: new Date(Date.now() - 7200000),
    read: true,
    actionUrl: "/product/p2",
    imageEmoji: "💰",
  },
  {
    id: "n5",
    type: "auction_ending",
    title: "Auction ending soon!",
    message: "Sterling Silver Judaica Auction ends in 5 minutes. Current bid: $120.",
    timestamp: new Date(Date.now() - 300000),
    read: false,
    actionUrl: "/live/ls2",
    imageEmoji: "⏰",
  },
  {
    id: "n6",
    type: "seller_live",
    title: "TechKosher just went live!",
    message: "Kosher Phone Deals — TAG Approved. Don't miss out!",
    timestamp: new Date(Date.now() - 900000),
    read: true,
    actionUrl: "/live/ls4",
    imageEmoji: "📱",
  },
  {
    id: "n7",
    type: "bid_won",
    title: "You won the auction!",
    message: "Congratulations! You won 'Leather-Bound Tehillim' for $45. Complete your purchase.",
    timestamp: new Date(Date.now() - 86400000),
    read: true,
    actionUrl: "/orders",
    imageEmoji: "🏆",
  },
  {
    id: "n8",
    type: "new_follower",
    title: "New follower!",
    message: "MendelK started following your store.",
    timestamp: new Date(Date.now() - 43200000),
    read: true,
    imageEmoji: "👤",
  },
  {
    id: "n9",
    type: "charity_goal",
    title: "Fundraiser goal reached!",
    message: "Purim Simcha Drive hit 64% of its $75,000 goal! Keep the momentum going.",
    timestamp: new Date(Date.now() - 14400000),
    read: true,
    actionUrl: "/charity/keren-simcha",
    imageEmoji: "❤️",
  },
  {
    id: "n10",
    type: "stream_starting",
    title: "Stream starting in 30 min!",
    message: "Rare Seforim Auction — Antique Collection starts at 9:00 PM.",
    timestamp: new Date(Date.now() - 1800000),
    read: false,
    actionUrl: "/live",
    imageEmoji: "🔔",
  },
];

// Simulated incoming notifications
const INCOMING_NOTIFICATIONS: Omit<AppNotification, "id" | "timestamp" | "read">[] = [
  {
    type: "bid_outbid",
    title: "Outbid on 'Antique Kiddush Cup'",
    message: "ChaimG bid $135. Place a higher bid to win!",
    actionUrl: "/live/ls2",
    imageEmoji: "🔨",
  },
  {
    type: "stream_live",
    title: "Heimish Deals is streaming!",
    message: "Kids Toy Blowout starting now. Great deals inside!",
    actionUrl: "/live/ls5",
    imageEmoji: "🔴",
  },
  {
    type: "price_drop",
    title: "iPad price dropped!",
    message: "iPad 10th Gen now $279 (was $299). Limited stock!",
    actionUrl: "/product/p11",
    imageEmoji: "💰",
  },
];

export function useNotificationSystem() {
  const [notifications, setNotifications] = useState<AppNotification[]>(INITIAL_NOTIFICATIONS);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const unreadCount = notifications.filter((n) => !n.read).length;

  // Simulate incoming notifications
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index >= INCOMING_NOTIFICATIONS.length) {
        index = 0;
      }
      const template = INCOMING_NOTIFICATIONS[index];
      const newNotification: AppNotification = {
        ...template,
        id: `n-live-${Date.now()}`,
        timestamp: new Date(),
        read: false,
      };
      setNotifications((prev) => [newNotification, ...prev]);
      index++;
    }, 45000); // New notification every 45 seconds

    return () => clearInterval(interval);
  }, []);

  const markAsRead = useCallback((id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  }, []);

  const markAllAsRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  }, []);

  const deleteNotification = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  const clearAll = useCallback(() => {
    setNotifications([]);
  }, []);

  return {
    notifications,
    unreadCount,
    soundEnabled,
    setSoundEnabled,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    clearAll,
  };
}
