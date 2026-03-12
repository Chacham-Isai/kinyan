import { Outlet, useLocation } from "react-router-dom";
import BottomNav from "./marketplace/BottomNav";
import TopBar from "./marketplace/TopBar";
import ShabbosBar from "./marketplace/ShabbosBar";

export default function Layout() {
  const location = useLocation();
  const isStreamPage = location.pathname.startsWith("/live/");

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <ShabbosBar />
      {!isStreamPage && <TopBar />}
      <main className={`flex-1 ${isStreamPage ? "" : "pb-20 md:pb-0"}`}>
        <Outlet />
      </main>
      {!isStreamPage && <BottomNav />}
    </div>
  );
}
