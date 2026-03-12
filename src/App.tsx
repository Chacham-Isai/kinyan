import React, { Suspense } from "react";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { Skeleton } from "@/components/ui/skeleton";

// Lazy-loaded pages
const Landing = React.lazy(() => import("./pages/Landing"));
const Layout = React.lazy(() => import("./components/Layout"));
const Home = React.lazy(() => import("./pages/Home"));
const Browse = React.lazy(() => import("./pages/Browse"));
const LiveStreams = React.lazy(() => import("./pages/LiveStreams"));
const LiveStreamView = React.lazy(() => import("./pages/LiveStreamView"));
const ProductView = React.lazy(() => import("./pages/ProductView"));
const SellerProfile = React.lazy(() => import("./pages/SellerProfile"));
const Search = React.lazy(() => import("./pages/Search"));
const Cart = React.lazy(() => import("./pages/Cart"));
const Orders = React.lazy(() => import("./pages/Orders"));
const Profile = React.lazy(() => import("./pages/Profile"));
const Sell = React.lazy(() => import("./pages/Sell"));
const Notifications = React.lazy(() => import("./pages/Notifications"));
const Settings = React.lazy(() => import("./pages/Settings"));
const Saved = React.lazy(() => import("./pages/Saved"));
const Following = React.lazy(() => import("./pages/Following"));
const About = React.lazy(() => import("./pages/About"));
const Help = React.lazy(() => import("./pages/Help"));
const CharityHub = React.lazy(() => import("./pages/CharityHub"));
const CharityProfile = React.lazy(() => import("./pages/CharityProfile"));
const CharityGame = React.lazy(() => import("./pages/CharityGame"));
const Messages = React.lazy(() => import("./pages/Messages"));
const OrderDetail = React.lazy(() => import("./pages/OrderDetail"));
const Login = React.lazy(() => import("./pages/Login"));
const Signup = React.lazy(() => import("./pages/Signup"));
const Onboarding = React.lazy(() => import("./pages/Onboarding"));
const SellerDashboard = React.lazy(() => import("./pages/SellerDashboard"));
const Reviews = React.lazy(() => import("./pages/Reviews"));
const Discover = React.lazy(() => import("./pages/Discover"));
const PaymentSetup = React.lazy(() => import("./pages/PaymentSetup"));
const SellerOnboarding = React.lazy(() => import("./pages/SellerOnboarding"));
const SellerOrders = React.lazy(() => import("./pages/SellerOrders"));
const Customers = React.lazy(() => import("./pages/Customers"));
const Drops = React.lazy(() => import("./pages/Drops"));
const LiveFeed = React.lazy(() => import("./pages/LiveFeed"));
const RewardsClub = React.lazy(() => import("./pages/RewardsClub"));
const OBSSetup = React.lazy(() => import("./pages/OBSSetup"));
const NotFound = React.lazy(() => import("./pages/NotFound"));

function PageLoadingSkeleton() {
  return (
    <div className="p-6 space-y-4 animate-pulse">
      <Skeleton className="h-8 w-48" />
      <div className="grid grid-cols-2 gap-4">
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="h-40 rounded-xl" />
        ))}
      </div>
      <div className="grid grid-cols-3 gap-4">
        {[...Array(6)].map((_, i) => (
          <Skeleton key={i} className="h-48 rounded-xl" />
        ))}
      </div>
    </div>
  );
}

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Suspense fallback={<PageLoadingSkeleton />}>
            <Routes>
              {/* Landing page (marketing) */}
              <Route path="/" element={<Landing />} />

              {/* Auth & onboarding (no layout) */}
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/onboarding" element={<Onboarding />} />
              <Route path="/start-selling" element={<SellerOnboarding />} />

              {/* Live stream view (custom layout - no nav) */}
              <Route path="/live/:streamId" element={<LiveStreamView />} />

              {/* Full-screen live feed (WhatNot-style) */}
              <Route path="/feed" element={<LiveFeed />} />

              {/* Main app with layout */}
              <Route element={<Layout />}>
                <Route path="/home" element={<Home />} />
                <Route path="/browse" element={<Browse />} />
                <Route path="/browse/:categoryId" element={<Browse />} />
                <Route path="/live" element={<LiveStreams />} />
                <Route path="/product/:productId" element={<ProductView />} />
                <Route path="/seller/:username" element={<SellerProfile />} />
                <Route path="/search" element={<Search />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/sell" element={<Sell />} />
                <Route path="/notifications" element={<Notifications />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/saved" element={<Saved />} />
                <Route path="/following" element={<Following />} />
                <Route path="/about" element={<About />} />
                <Route path="/help" element={<Help />} />
                <Route path="/charity" element={<CharityHub />} />
                <Route path="/charity/:slug" element={<CharityProfile />} />
                <Route path="/charity/game/:gameId" element={<CharityGame />} />
                <Route path="/messages" element={<Messages />} />
                <Route path="/messages/:sellerId" element={<Messages />} />
                <Route path="/orders/:orderId" element={<OrderDetail />} />
                <Route path="/dashboard" element={<SellerDashboard />} />
                <Route path="/reviews" element={<Reviews />} />
                <Route path="/discover" element={<Discover />} />
                <Route path="/payments" element={<PaymentSetup />} />
                <Route path="/seller-orders" element={<SellerOrders />} />
                <Route path="/customers" element={<Customers />} />
                <Route path="/drops" element={<Drops />} />
                <Route path="/rewards" element={<RewardsClub />} />
                <Route path="/obs-setup" element={<OBSSetup />} />
              </Route>

              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
