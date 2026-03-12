import { Link } from "react-router-dom";
import { ArrowLeft, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { mockSellers } from "@/data/mockData";
import SellerCard from "@/components/marketplace/SellerCard";

export default function Following() {
  // Mock: show first 4 sellers as "followed"
  const followedSellers = mockSellers.slice(0, 4);

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
      <Link
        to="/profile"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Profile
      </Link>

      <div className="flex items-center gap-2">
        <Users className="w-5 h-5 text-primary" />
        <h1 className="font-display text-2xl font-bold text-foreground">Following</h1>
        <span className="text-sm text-muted-foreground">({followedSellers.length})</span>
      </div>

      {followedSellers.length === 0 ? (
        <div className="text-center py-16 space-y-4">
          <Users className="w-12 h-12 text-muted-foreground mx-auto" />
          <p className="text-muted-foreground">You're not following anyone yet</p>
          <Button asChild className="gradient-primary text-white">
            <Link to="/browse">Discover sellers</Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {followedSellers.map((seller) => (
            <SellerCard key={seller.id} seller={seller} />
          ))}
        </div>
      )}
    </div>
  );
}
