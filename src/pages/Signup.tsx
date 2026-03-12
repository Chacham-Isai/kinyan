import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, ArrowRight, Gift, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import kinyanKLogo from "@/assets/kinyan-k-logo.png";

export default function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: name },
      },
    });

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Check your email for a confirmation link!");
      navigate("/login");
    }
    setLoading(false);
  };

  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);
    const { error } = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin,
    });
    if (error) {
      toast.error("Google sign-in failed. Please try again.");
    }
    setGoogleLoading(false);
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Floating background blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute -top-32 -right-32 w-80 h-80 rounded-full opacity-[0.04]"
          style={{ background: "hsl(var(--primary))" }}
          animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full opacity-[0.03]"
          style={{ background: "hsl(var(--primary))" }}
          animate={{ scale: [1.2, 1, 1.2], rotate: [0, -90, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-5 py-8">
        {/* Spinning K Logo */}
        <motion.div
          className="mb-6 relative"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
        >
          <Link to="/" className="block relative">
            <motion.div
              className="w-16 h-16 relative"
              whileHover={{ rotate: 360, scale: 1.1 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            >
              <img src={kinyanKLogo} alt="Kinyan" className="w-full h-full object-contain" />
            </motion.div>
            {/* Glow ring */}
            <motion.div
              className="absolute inset-0 -m-2 rounded-full"
              style={{ border: "2px solid hsl(var(--primary) / 0.15)" }}
              animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            />
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          className="text-center mb-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className="font-display text-[28px] font-extrabold text-foreground tracking-tight">
            Join KINYAN
          </h1>
        </motion.div>

        {/* $10 Bonus Banner */}
        <motion.div
          className="w-full max-w-sm mb-6"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.35, type: "spring", stiffness: 300 }}
        >
          <div className="relative overflow-hidden rounded-2xl p-[1px]" style={{ background: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary) / 0.4))" }}>
            <div className="bg-background rounded-[15px] px-4 py-3 flex items-center gap-3">
              <motion.div
                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: "hsl(var(--primary) / 0.1)" }}
                animate={{ rotate: [0, -10, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
              >
                <Gift className="w-5 h-5 text-primary" />
              </motion.div>
              <div className="flex-1 min-w-0">
                <p className="font-display font-extrabold text-sm text-foreground">
                  Get <span className="text-primary">$10.00 FREE</span> credit
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Sign up now & start shopping instantly
                </p>
              </div>
              <Sparkles className="w-4 h-4 text-primary shrink-0 opacity-60" />
            </div>
          </div>
        </motion.div>

        {/* Form Card */}
        <motion.div
          className="w-full max-w-sm"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {/* Google Sign In */}
          <Button
            type="button"
            variant="outline"
            className="w-full h-12 rounded-2xl border-border/80 bg-background hover:bg-secondary/80 font-semibold text-sm gap-3 mb-4 shadow-sm"
            onClick={handleGoogleSignIn}
            disabled={googleLoading}
          >
            {googleLoading ? (
              <motion.div
                className="w-5 h-5 border-2 border-muted-foreground/30 border-t-primary rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
              />
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18A11 11 0 0 0 1 12c0 1.78.43 3.46 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
            )}
            {googleLoading ? "Connecting..." : "Continue with Google"}
          </Button>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-4">
            <div className="flex-1 h-px bg-border" />
            <span className="text-xs text-muted-foreground font-medium">or</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          {/* Form */}
          <form onSubmit={handleSignup} className="space-y-3.5">
            <div className="space-y-1.5">
              <label className="text-[13px] font-semibold text-foreground pl-1">Full Name</label>
              <motion.div whileFocus={{ scale: 1.01 }}>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onFocus={() => setFocusedField("name")}
                  onBlur={() => setFocusedField(null)}
                  placeholder="Your name"
                  required
                  className={`w-full h-12 px-4 rounded-2xl bg-secondary/60 border text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none transition-all duration-200 ${
                    focusedField === "name"
                      ? "border-primary/50 ring-[3px] ring-primary/10 bg-background"
                      : "border-border/40"
                  }`}
                />
              </motion.div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[13px] font-semibold text-foreground pl-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setFocusedField("email")}
                onBlur={() => setFocusedField(null)}
                placeholder="you@example.com"
                required
                className={`w-full h-12 px-4 rounded-2xl bg-secondary/60 border text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none transition-all duration-200 ${
                  focusedField === "email"
                    ? "border-primary/50 ring-[3px] ring-primary/10 bg-background"
                    : "border-border/40"
                }`}
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[13px] font-semibold text-foreground pl-1">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setFocusedField("password")}
                  onBlur={() => setFocusedField(null)}
                  placeholder="Create a password"
                  required
                  minLength={6}
                  className={`w-full h-12 px-4 pr-11 rounded-2xl bg-secondary/60 border text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none transition-all duration-200 ${
                    focusedField === "password"
                      ? "border-primary/50 ring-[3px] ring-primary/10 bg-background"
                      : "border-border/40"
                  }`}
                />
                <button
                  type="button"
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="w-[18px] h-[18px]" /> : <Eye className="w-[18px] h-[18px]" />}
                </button>
              </div>
            </div>

            <motion.div whileTap={{ scale: 0.98 }}>
              <Button
                type="submit"
                className="w-full h-12 rounded-2xl gradient-primary text-primary-foreground font-bold text-[15px] shadow-md hover:shadow-lg transition-shadow mt-1"
                disabled={loading}
              >
                {loading ? (
                  <motion.div
                    className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                  />
                ) : (
                  <>
                    Sign up & get $10
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </>
                )}
              </Button>
            </motion.div>
          </form>

          {/* Terms */}
          <p className="text-[11px] text-center text-muted-foreground leading-relaxed mt-4 px-2">
            By signing up, you agree to our{" "}
            <Link to="/terms" className="text-primary hover:underline">Terms of Service</Link>{" "}
            and{" "}
            <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>.
          </p>

          {/* Login link */}
          <p className="text-center text-sm text-muted-foreground mt-5">
            Already have an account?{" "}
            <Link to="/login" className="text-primary font-semibold hover:underline">
              Log in
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
