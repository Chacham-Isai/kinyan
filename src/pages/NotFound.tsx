import { Link } from "react-router-dom";
import { Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="text-center space-y-6 max-w-sm">
        <div className="w-20 h-20 rounded-2xl gradient-primary mx-auto flex items-center justify-center">
          <span className="text-4xl font-display font-bold text-white">?</span>
        </div>
        <div>
          <h1 className="font-display text-3xl font-bold text-foreground">404</h1>
          <p className="text-muted-foreground mt-2">
            This page doesn't exist. Maybe it was sold already!
          </p>
        </div>
        <div className="flex gap-3 justify-center">
          <Button asChild className="gradient-primary text-white">
            <Link to="/">
              <Home className="w-4 h-4 mr-1.5" />
              Home
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/browse">
              Browse
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
