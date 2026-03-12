import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sparkles, ChevronRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { interestCategories, saveOnboardingPreferences } from "@/lib/recommendations";
import KinyanLogo from "@/components/marketplace/KinyanLogo";

const ONBOARDING_KEY = "kinyan_onboarding_done";

export function hasCompletedOnboarding(): boolean {
  return localStorage.getItem(ONBOARDING_KEY) === "true";
}

export default function Onboarding() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<string[]>([]);

  const toggle = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleContinue = () => {
    if (selected.length > 0) {
      saveOnboardingPreferences(selected);
    }
    localStorage.setItem(ONBOARDING_KEY, "true");
    navigate("/home");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12 bg-gradient-to-b from-white to-primary/5">
      <div className="max-w-md w-full space-y-8 text-center">
        <KinyanLogo size={48} showText textClassName="text-2xl" />

        <div className="space-y-2">
          <div className="flex items-center justify-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            <h1 className="font-display text-2xl font-bold text-foreground">
              What interests you?
            </h1>
          </div>
          <p className="text-sm text-muted-foreground">
            Pick a few categories so we can personalize your feed. You can always change this later.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {interestCategories.map((cat) => {
            const isSelected = selected.includes(cat.id);
            return (
              <button
                key={cat.id}
                onClick={() => toggle(cat.id)}
                className={cn(
                  "relative flex items-center gap-3 p-4 rounded-xl border-2 text-left transition-all",
                  isSelected
                    ? "border-primary bg-primary/5 shadow-sm"
                    : "border-border/50 bg-white hover:border-primary/30 hover:bg-primary/5"
                )}
              >
                <span className="text-2xl">{cat.emoji}</span>
                <span className="text-sm font-medium text-foreground">{cat.label}</span>
                {isSelected && (
                  <div className="absolute top-2 right-2 w-5 h-5 rounded-full gradient-primary flex items-center justify-center">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                )}
              </button>
            );
          })}
        </div>

        <div className="space-y-3 pt-2">
          <Button
            className="w-full h-12 gradient-primary text-white font-bold text-sm gap-2"
            onClick={handleContinue}
          >
            {selected.length > 0 ? (
              <>
                Continue with {selected.length} interest{selected.length > 1 ? "s" : ""}
                <ChevronRight className="w-4 h-4" />
              </>
            ) : (
              "Skip for now"
            )}
          </Button>
          <p className="text-xs text-muted-foreground">
            KINYAN uses AI to learn your preferences and show you the most relevant items
          </p>
        </div>
      </div>
    </div>
  );
}
