import { useState, useRef, useEffect } from "react";
import { Send, Gift, Crown, Star, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { ChatMessage } from "@/data/mockData";

interface StreamChatProps {
  messages: ChatMessage[];
  onSendMessage?: (message: string) => void;
}

const USER_BADGES: Record<string, { icon: React.ReactNode; color: string }> = {
  YossiB: { icon: <Crown className="w-2.5 h-2.5" />, color: "text-yellow-500" },
  MosheDavid: { icon: <Star className="w-2.5 h-2.5" />, color: "text-blue-500" },
  ChaimG: { icon: <ShieldCheck className="w-2.5 h-2.5" />, color: "text-green-500" },
};

// Simulated incoming messages
const BOT_MESSAGES = [
  { username: "MendelK", message: "How much for the set?" },
  { username: "RachelS", message: "Beautiful! 🔥" },
  { username: "DovB", message: "Can you show the back?" },
  { username: "LeahG", message: "$70!" },
  { username: "ShlomoW", message: "Is shipping included?" },
  { username: "MiriamF", message: "What size is it?" },
  { username: "AviK", message: "That's a steal!" },
  { username: "EstherP", message: "Gorgeous piece mashke!" },
  { username: "NaftaliR", message: "$80!" },
  { username: "TziporahD", message: "Does it come with a certificate?" },
  { username: "MendelK", message: "Amazing quality IYH" },
  { username: "RachelS", message: "My husband would love this" },
  { username: "DovB", message: "$85 going once..." },
  { username: "LeahG", message: "Perfect for Pesach!" },
  { username: "ShlomoW", message: "Take my money 💸" },
];

export default function StreamChat({ messages: initialMessages, onSendMessage }: StreamChatProps) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState(initialMessages);
  const [showGiftMenu, setShowGiftMenu] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const botIndexRef = useRef(0);

  // Auto-scroll
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // Simulate incoming chat messages
  useEffect(() => {
    const interval = setInterval(() => {
      const botMsg = BOT_MESSAGES[botIndexRef.current % BOT_MESSAGES.length];
      botIndexRef.current++;

      const newMsg: ChatMessage = {
        id: `live-${Date.now()}`,
        userId: `bot-${botMsg.username}`,
        username: botMsg.username,
        message: botMsg.message,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, newMsg]);
    }, 3000 + Math.random() * 5000);

    return () => clearInterval(interval);
  }, []);

  const handleSend = () => {
    if (input.trim()) {
      const userMsg: ChatMessage = {
        id: `user-${Date.now()}`,
        userId: "you",
        username: "You",
        message: input.trim(),
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, userMsg]);
      onSendMessage?.(input.trim());
      setInput("");
    }
  };

  const sendGift = (emoji: string, name: string, cost: number) => {
    const giftMsg: ChatMessage = {
      id: `gift-${Date.now()}`,
      userId: "you",
      username: "You",
      message: `sent a ${name} ${emoji}`,
      timestamp: new Date(),
      isSystem: true,
    };
    setMessages((prev) => [...prev, giftMsg]);
    setShowGiftMenu(false);
  };

  const GIFTS = [
    { emoji: "☕", name: "Coffee", cost: 1 },
    { emoji: "🌹", name: "Rose", cost: 5 },
    { emoji: "💎", name: "Diamond", cost: 25 },
    { emoji: "👑", name: "Crown", cost: 100 },
    { emoji: "🕎", name: "Menorah", cost: 50 },
    { emoji: "📚", name: "Sefer", cost: 10 },
  ];

  return (
    <div className="flex flex-col h-full">
      {/* Messages */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-3 space-y-1.5 scrollbar-thin"
      >
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={cn(
              "text-sm",
              msg.isSystem && "text-center py-1"
            )}
          >
            {msg.isSystem ? (
              <span className={cn(
                "text-xs font-medium px-3 py-1 rounded-full inline-flex items-center gap-1",
                msg.message.includes("sent a")
                  ? "bg-yellow-50 text-yellow-700"
                  : "bg-primary/10 text-primary"
              )}>
                {msg.message}
              </span>
            ) : (
              <p className={cn(
                "rounded-lg px-2 py-0.5",
                msg.userId === "you" && "bg-primary/5"
              )}>
                <span className="inline-flex items-center gap-0.5">
                  {USER_BADGES[msg.username] && (
                    <span className={USER_BADGES[msg.username].color}>
                      {USER_BADGES[msg.username].icon}
                    </span>
                  )}
                  <span className={cn(
                    "font-semibold text-xs mr-1.5",
                    msg.userId === "you" ? "text-primary" : "text-primary/80"
                  )}>
                    {msg.username}
                  </span>
                </span>
                <span className="text-foreground/80 text-xs">{msg.message}</span>
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Gift Menu */}
      {showGiftMenu && (
        <div className="px-3 py-2 border-t border-border/50 bg-secondary/30">
          <p className="text-[10px] text-muted-foreground mb-1.5 font-medium">Send a gift to the seller</p>
          <div className="grid grid-cols-6 gap-1.5">
            {GIFTS.map((gift) => (
              <button
                key={gift.name}
                className="flex flex-col items-center gap-0.5 p-1.5 rounded-lg hover:bg-primary/10 transition-colors"
                onClick={() => sendGift(gift.emoji, gift.name, gift.cost)}
              >
                <span className="text-xl">{gift.emoji}</span>
                <span className="text-[9px] text-muted-foreground">${gift.cost}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="p-3 border-t border-border/50">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "h-9 w-9 rounded-full shrink-0",
              showGiftMenu && "bg-primary/10 text-primary"
            )}
            onClick={() => setShowGiftMenu(!showGiftMenu)}
          >
            <Gift className="w-4 h-4" />
          </Button>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Say something..."
            className="flex-1 h-9 px-3 rounded-full bg-secondary border border-border/50 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50"
          />
          <Button
            size="icon"
            className="h-9 w-9 rounded-full gradient-primary"
            onClick={handleSend}
            disabled={!input.trim()}
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
