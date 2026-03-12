import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft, Send, Phone, MoreVertical, Shield, Clock, Image as ImageIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { mockSellers, type Seller } from "@/data/mockData";

interface Message {
  id: string;
  from: "user" | "seller";
  text: string;
  time: string;
  read: boolean;
}

interface Conversation {
  seller: Seller;
  messages: Message[];
  lastActivity: string;
  unread: number;
  productContext?: { title: string; price: number; id: string };
}

const mockConversations: Conversation[] = [
  {
    seller: mockSellers[0],
    lastActivity: "2 min ago",
    unread: 2,
    productContext: { title: "Artscroll Shas — Full Set", price: 899, id: "p1" },
    messages: [
      { id: "m1", from: "user", text: "Hi! Is the Artscroll Shas still available?", time: "10:30 AM", read: true },
      { id: "m2", from: "seller", text: "Yes! Brand new, sealed in the box. Would you like to see more photos?", time: "10:32 AM", read: true },
      { id: "m3", from: "user", text: "Yes please! And can you do $800?", time: "10:35 AM", read: true },
      { id: "m4", from: "seller", text: "I can do $850 with free shipping. That's the lowest I can go — it's a great deal!", time: "10:38 AM", read: false },
      { id: "m5", from: "seller", text: "I also have a complete Mishna Berura set if you're interested. Just listed it!", time: "10:39 AM", read: false },
    ],
  },
  {
    seller: mockSellers[2],
    lastActivity: "1 hour ago",
    unread: 0,
    productContext: { title: "Borsalino Fedora — Black", price: 175, id: "p3" },
    messages: [
      { id: "m6", from: "user", text: "What size is the Borsalino?", time: "9:15 AM", read: true },
      { id: "m7", from: "seller", text: "It's a 7 1/4. I also have 7 1/8 and 7 3/8 in stock.", time: "9:20 AM", read: true },
      { id: "m8", from: "user", text: "Perfect, 7 1/4 is my size. Is there any damage?", time: "9:22 AM", read: true },
      { id: "m9", from: "seller", text: "No damage at all! Worn twice, looks brand new. I'll include the original box.", time: "9:25 AM", read: true },
    ],
  },
  {
    seller: mockSellers[3],
    lastActivity: "Yesterday",
    unread: 1,
    messages: [
      { id: "m10", from: "seller", text: "We just got a new shipment of kosher phones! Check out our live stream tonight at 8 PM.", time: "Yesterday", read: false },
    ],
  },
];

function ConversationList({
  conversations,
  selectedId,
  onSelect,
}: {
  conversations: Conversation[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="space-y-1">
      {conversations.map((conv) => (
        <button
          key={conv.seller.id}
          onClick={() => onSelect(conv.seller.id)}
          className={cn(
            "w-full flex items-center gap-3 p-3 rounded-xl text-left transition-colors",
            selectedId === conv.seller.id
              ? "bg-primary/10 border border-primary/20"
              : "hover:bg-secondary"
          )}
        >
          <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center text-sm font-bold text-white shrink-0">
            {conv.seller.displayName[0]}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-foreground truncate">
                {conv.seller.displayName}
                {conv.seller.verified && <span className="text-primary ml-1 text-xs">✓</span>}
              </span>
              <span className="text-[10px] text-muted-foreground shrink-0">{conv.lastActivity}</span>
            </div>
            <p className="text-xs text-muted-foreground truncate">
              {conv.messages[conv.messages.length - 1]?.text}
            </p>
          </div>
          {conv.unread > 0 && (
            <span className="w-5 h-5 rounded-full gradient-primary text-white text-[10px] font-bold flex items-center justify-center shrink-0">
              {conv.unread}
            </span>
          )}
        </button>
      ))}
    </div>
  );
}

function ChatView({ conversation }: { conversation: Conversation }) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState(conversation.messages);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const send = () => {
    if (!input.trim()) return;
    setMessages([
      ...messages,
      {
        id: `m-${Date.now()}`,
        from: "user",
        text: input.trim(),
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        read: true,
      },
    ]);
    setInput("");
  };

  return (
    <div className="flex flex-col h-full">
      {/* Chat header */}
      <div className="flex items-center gap-3 p-3 border-b border-border/50">
        <Link to={`/seller/${conversation.seller.username}`}>
          <div className="w-9 h-9 rounded-full gradient-primary flex items-center justify-center text-sm font-bold text-white">
            {conversation.seller.displayName[0]}
          </div>
        </Link>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1">
            <span className="text-sm font-semibold text-foreground">{conversation.seller.displayName}</span>
            {conversation.seller.verified && <span className="text-primary text-xs">✓</span>}
          </div>
          <span className="text-[10px] text-muted-foreground">{conversation.seller.location}</span>
        </div>
      </div>

      {/* Product context */}
      {conversation.productContext && (
        <Link
          to={`/product/${conversation.productContext.id}`}
          className="flex items-center gap-3 p-3 border-b border-border/50 bg-secondary/50 hover:bg-secondary transition-colors"
        >
          <div className="w-10 h-10 rounded-lg bg-secondary border border-border/50 flex items-center justify-center">
            <ImageIcon className="w-4 h-4 text-muted-foreground/40" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-foreground truncate">{conversation.productContext.title}</p>
            <p className="text-xs font-bold text-primary">${conversation.productContext.price}</p>
          </div>
        </Link>
      )}

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin">
        <div className="flex justify-center">
          <Badge variant="secondary" className="text-[10px] gap-1">
            <Shield className="w-3 h-3 text-primary" />
            Messages are monitored for your safety
          </Badge>
        </div>
        {messages.map((msg) => (
          <div key={msg.id} className={cn("flex", msg.from === "user" ? "justify-end" : "justify-start")}>
            <div
              className={cn(
                "max-w-[80%] rounded-2xl px-4 py-2.5",
                msg.from === "user"
                  ? "gradient-primary text-white rounded-br-md"
                  : "bg-secondary text-foreground rounded-bl-md"
              )}
            >
              <p className="text-sm leading-relaxed">{msg.text}</p>
              <p className={cn(
                "text-[10px] mt-1",
                msg.from === "user" ? "text-white/60" : "text-muted-foreground"
              )}>
                {msg.time}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="p-3 border-t border-border/50">
        <form
          onSubmit={(e) => { e.preventDefault(); send(); }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 h-10 px-4 rounded-full bg-secondary border border-border/50 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
          <Button
            type="submit"
            size="icon"
            className="h-10 w-10 rounded-full gradient-primary text-white shrink-0"
            disabled={!input.trim()}
          >
            <Send className="w-4 h-4" />
          </Button>
        </form>
      </div>
    </div>
  );
}

export default function Messages() {
  const { sellerId } = useParams<{ sellerId: string }>();
  const [selectedId, setSelectedId] = useState<string | null>(sellerId || null);

  const selectedConversation = mockConversations.find((c) => c.seller.id === selectedId);

  // Mobile: if a conversation is selected, show chat. Otherwise show list
  const showChat = selectedId && selectedConversation;

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <div className="flex items-center gap-2 mb-4">
        {showChat && (
          <button
            onClick={() => setSelectedId(null)}
            className="md:hidden text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
        )}
        <h1 className="font-display text-2xl font-bold text-foreground">Messages</h1>
        {!showChat && (
          <Badge variant="secondary" className="text-xs">
            {mockConversations.reduce((sum, c) => sum + c.unread, 0)} unread
          </Badge>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Conversation list */}
        <div className={cn(
          "md:block",
          showChat ? "hidden" : "block"
        )}>
          <ConversationList
            conversations={mockConversations}
            selectedId={selectedId}
            onSelect={setSelectedId}
          />
        </div>

        {/* Chat area */}
        <div className={cn(
          "md:col-span-2 rounded-xl border border-border/50 bg-card overflow-hidden",
          showChat ? "block" : "hidden md:block",
          !selectedConversation && "flex items-center justify-center"
        )}
        style={{ height: "calc(100vh - 220px)", minHeight: "400px" }}
        >
          {selectedConversation ? (
            <ChatView conversation={selectedConversation} />
          ) : (
            <div className="text-center p-8 text-muted-foreground">
              <p className="text-sm">Select a conversation to start messaging</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
