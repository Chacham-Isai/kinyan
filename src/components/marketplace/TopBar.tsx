import { Link, useNavigate, useLocation } from "react-router-dom";
import { Search, Bell, Plus, ShoppingCart, Heart, MessageCircle, Clock, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useState, useMemo, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import KinyanLogo from "./KinyanLogo";
import { getSearchSuggestions, getUserProfile, trackEvent } from "@/lib/recommendations";
import { mockProducts, mockSellers } from "@/data/mockData";

const desktopNav = [
  { label: "Discover", path: "/discover" },
  { label: "Browse", path: "/browse" },
  { label: "Live", path: "/live" },
  { label: "Drops", path: "/drops" },
  { label: "Charity", path: "/charity" },
];

export default function TopBar() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const profile = useMemo(() => getUserProfile(), []);

  const suggestions = useMemo(
    () => getSearchSuggestions(searchQuery, mockProducts, mockSellers, profile),
    [searchQuery, profile]
  );

  // Close suggestions on click outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      trackEvent({ type: "search", itemId: searchQuery.trim(), metadata: { query: searchQuery.trim() } });
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery("");
      setShowSuggestions(false);
    }
  };

  const pickSuggestion = (term: string) => {
    navigate(`/search?q=${encodeURIComponent(term)}`);
    setSearchQuery("");
    setShowSuggestions(false);
    setSearchOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 glass border-b border-border/50">
      <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between gap-3">
        {/* Logo */}
        <Link to="/home" className="shrink-0">
          <KinyanLogo size={30} showText textClassName="text-lg hidden sm:block" />
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden lg:flex items-center gap-1">
          {desktopNav.map(({ label, path }) => (
            <Link
              key={path}
              to={path}
              className={cn(
                "px-3 py-1.5 rounded-lg text-sm font-medium transition-colors",
                location.pathname.startsWith(path)
                  ? "text-primary bg-primary/10"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              )}
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Search Bar - Desktop with AI suggestions */}
        <div ref={searchRef} className="hidden md:block flex-1 max-w-md relative">
          <form onSubmit={handleSearch}>
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search products, sellers, streams..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setShowSuggestions(true)}
                className="w-full h-9 pl-9 pr-4 rounded-full bg-secondary border border-border/50 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
              />
            </div>
          </form>
          {/* Smart suggestions dropdown */}
          {showSuggestions && (suggestions.suggestions.length > 0 || suggestions.products.length > 0 || profile.recentSearches.length > 0) && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-xl border border-border/50 shadow-lg z-50 overflow-hidden">
              {/* Recent searches */}
              {!searchQuery && profile.recentSearches.length > 0 && (
                <div className="p-3 border-b border-border/50">
                  <p className="text-xs text-muted-foreground font-medium flex items-center gap-1.5 mb-2">
                    <Clock className="w-3 h-3" /> Recent
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {profile.recentSearches.slice(0, 4).map((term) => (
                      <button
                        key={term}
                        onClick={() => pickSuggestion(term)}
                        className="px-2.5 py-1 rounded-full bg-secondary text-xs text-foreground hover:bg-primary/10 hover:text-primary transition-colors"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              {/* Auto-complete suggestions */}
              {suggestions.suggestions.length > 0 && (
                <div className="p-2">
                  {suggestions.suggestions.map((s) => (
                    <button
                      key={s}
                      onClick={() => pickSuggestion(s)}
                      className="w-full text-left px-3 py-2 text-sm text-foreground hover:bg-secondary rounded-lg transition-colors flex items-center gap-2"
                    >
                      <Search className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                      {s}
                    </button>
                  ))}
                </div>
              )}
              {/* Quick product matches */}
              {suggestions.products.length > 0 && (
                <div className="p-2 border-t border-border/50">
                  <p className="text-xs text-muted-foreground font-medium flex items-center gap-1.5 px-3 mb-1">
                    <Sparkles className="w-3 h-3" /> Products
                  </p>
                  {suggestions.products.map((p) => (
                    <Link
                      key={p.id}
                      to={`/product/${p.id}`}
                      onClick={() => { setShowSuggestions(false); setSearchQuery(""); }}
                      className="flex items-center gap-3 px-3 py-2 hover:bg-secondary rounded-lg transition-colors"
                    >
                      <span className="text-sm font-medium text-foreground truncate">{p.title}</span>
                      <span className="text-xs text-muted-foreground ml-auto shrink-0">${p.price}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1">
          {/* Mobile search toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden h-9 w-9"
            onClick={() => setSearchOpen(!searchOpen)}
            aria-label="Search"
          >
            <Search className="w-5 h-5" />
          </Button>

          {user ? (
            <>
              <Button
                variant="ghost"
                size="sm"
                className="hidden sm:flex gap-1.5 h-9 gradient-primary text-white hover:opacity-90"
                onClick={() => navigate("/sell")}
              >
                <Plus className="w-4 h-4" />
                <span className="text-sm font-medium">Sell</span>
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 relative"
                onClick={() => navigate("/messages")}
                aria-label="Messages"
              >
                <MessageCircle className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-primary" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 relative"
                onClick={() => navigate("/notifications")}
                aria-label="Notifications"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-coral animate-pulse-live" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9"
                onClick={() => navigate("/cart")}
                aria-label="Shopping cart"
              >
                <ShoppingCart className="w-5 h-5" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9"
                onClick={() => navigate("/profile")}
                aria-label="Profile"
              >
                <div className="w-7 h-7 rounded-full gradient-primary flex items-center justify-center text-xs font-bold text-white">
                  {user.email?.[0]?.toUpperCase() || "U"}
                </div>
              </Button>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" onClick={() => navigate("/login")}>
                Log in
              </Button>
              <Button
                size="sm"
                className="gradient-primary text-white hover:opacity-90"
                onClick={() => navigate("/signup")}
              >
                Sign up
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Search Dropdown */}
      {searchOpen && (
        <div className="md:hidden px-4 pb-3 animate-slide-up">
          <form onSubmit={handleSearch}>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search products, sellers, streams..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
                className="w-full h-10 pl-9 pr-4 rounded-full bg-secondary border border-border/50 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
          </form>
        </div>
      )}
    </header>
  );
}
