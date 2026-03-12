import { Link } from "react-router-dom";
import {
  ArrowLeft, Monitor, Copy, Settings, Layers, Mic, Video,
  CheckCircle2, ExternalLink, Palette, LayoutGrid
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { toast } from "sonner";

const OVERLAYS = [
  { id: "bid", name: "Live Bid Tracker", description: "Shows current bid, timer, and bidder name", color: "bg-green-50 border-green-200" },
  { id: "chat", name: "Chat Overlay", description: "Transparent chat window for your stream", color: "bg-blue-50 border-blue-200" },
  { id: "product", name: "Product Card", description: "Current item with price and image", color: "bg-purple-50 border-purple-200" },
  { id: "alerts", name: "Bid Alerts", description: "Pop-up notifications for new bids", color: "bg-yellow-50 border-yellow-200" },
  { id: "viewers", name: "Viewer Count", description: "Live viewer counter with animation", color: "bg-pink-50 border-pink-200" },
  { id: "giveaway", name: "Giveaway Widget", description: "Entry counter and winner announcement", color: "bg-orange-50 border-orange-200" },
];

const STREAM_KEY = "kinyan_live_sk_a8f2d9e1c4b7" ;
const RTMP_URL = "rtmp://stream.kinyan.app/live";

export default function OBSSetup() {
  const [activeOverlays, setActiveOverlays] = useState<string[]>(["bid", "chat", "product"]);
  const [streamQuality, setStreamQuality] = useState<"720p" | "1080p" | "4k">("1080p");
  const [showKey, setShowKey] = useState(false);

  const toggleOverlay = (id: string) => {
    setActiveOverlays((prev) =>
      prev.includes(id) ? prev.filter((o) => o !== id) : [...prev, id]
    );
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard?.writeText(text);
    toast.success(`${label} copied to clipboard!`);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 space-y-6">
      <Link
        to="/dashboard"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Dashboard
      </Link>

      <div>
        <div className="flex items-center gap-2">
          <Monitor className="w-5 h-5 text-primary" />
          <h1 className="font-display text-2xl font-bold text-foreground">OBS Integration</h1>
          <Badge className="bg-blue-100 text-blue-700 border-0 text-xs">Beta</Badge>
        </div>
        <p className="text-sm text-muted-foreground mt-0.5">
          Stream from your desktop with professional overlays
        </p>
      </div>

      {/* Quick Start Guide */}
      <div className="rounded-xl border border-border/50 bg-card p-5 space-y-4">
        <h2 className="font-display font-bold text-foreground text-sm flex items-center gap-2">
          <Settings className="w-4 h-4" />
          Quick Setup Guide
        </h2>
        <div className="space-y-3">
          {[
            { step: 1, title: "Download OBS Studio", desc: "Free streaming software for Windows, Mac, and Linux", done: true },
            { step: 2, title: "Add Stream Key", desc: "Copy your stream key below and paste it in OBS Settings > Stream", done: true },
            { step: 3, title: "Add Overlays", desc: "Add browser sources in OBS for each overlay URL below", done: false },
            { step: 4, title: "Go Live!", desc: "Click 'Start Streaming' in OBS and then 'Start Show' on KINYAN", done: false },
          ].map((item) => (
            <div key={item.step} className="flex items-start gap-3">
              <div className={cn(
                "w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0",
                item.done ? "bg-green-100 text-green-700" : "bg-secondary text-muted-foreground"
              )}>
                {item.done ? <CheckCircle2 className="w-4 h-4" /> : item.step}
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">{item.title}</p>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stream Settings */}
      <div className="rounded-xl border border-border/50 bg-card p-5 space-y-4">
        <h2 className="font-display font-bold text-foreground text-sm flex items-center gap-2">
          <Video className="w-4 h-4" />
          Stream Settings
        </h2>

        {/* RTMP URL */}
        <div>
          <label className="text-xs text-muted-foreground font-medium mb-1 block">Server URL</label>
          <div className="flex items-center gap-2">
            <code className="flex-1 px-3 py-2 rounded-lg bg-secondary text-xs font-mono text-foreground select-all">
              {RTMP_URL}
            </code>
            <Button
              size="sm"
              variant="outline"
              className="h-8 gap-1"
              onClick={() => copyToClipboard(RTMP_URL, "Server URL")}
            >
              <Copy className="w-3 h-3" />
            </Button>
          </div>
        </div>

        {/* Stream Key */}
        <div>
          <label className="text-xs text-muted-foreground font-medium mb-1 block">Stream Key</label>
          <div className="flex items-center gap-2">
            <code className="flex-1 px-3 py-2 rounded-lg bg-secondary text-xs font-mono text-foreground">
              {showKey ? STREAM_KEY : "••••••••••••••••••••"}
            </code>
            <Button
              size="sm"
              variant="outline"
              className="h-8 text-xs"
              onClick={() => setShowKey(!showKey)}
            >
              {showKey ? "Hide" : "Show"}
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="h-8 gap-1"
              onClick={() => copyToClipboard(STREAM_KEY, "Stream Key")}
            >
              <Copy className="w-3 h-3" />
            </Button>
          </div>
          <p className="text-[10px] text-red-500 mt-1">Never share your stream key with anyone!</p>
        </div>

        {/* Quality */}
        <div>
          <label className="text-xs text-muted-foreground font-medium mb-1 block">Output Quality</label>
          <div className="flex items-center gap-2">
            {(["720p", "1080p", "4k"] as const).map((q) => (
              <button
                key={q}
                onClick={() => setStreamQuality(q)}
                className={cn(
                  "px-4 py-2 rounded-lg text-xs font-medium transition-colors",
                  streamQuality === q
                    ? "gradient-primary text-white"
                    : "bg-secondary text-muted-foreground hover:text-foreground"
                )}
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        {/* Recommended Settings */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
          <p className="text-xs font-semibold text-blue-800 mb-1">Recommended OBS Settings</p>
          <div className="grid grid-cols-2 gap-1 text-xs text-blue-700">
            <span>Encoder: x264 or NVENC</span>
            <span>Bitrate: {streamQuality === "4k" ? "8000" : streamQuality === "1080p" ? "4500" : "2500"} kbps</span>
            <span>Keyframe: 2 seconds</span>
            <span>FPS: 30</span>
          </div>
        </div>
      </div>

      {/* Custom Overlays */}
      <div className="rounded-xl border border-border/50 bg-card p-5 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-display font-bold text-foreground text-sm flex items-center gap-2">
            <Layers className="w-4 h-4" />
            Stream Overlays
          </h2>
          <Badge variant="secondary" className="text-[10px]">
            {activeOverlays.length} active
          </Badge>
        </div>
        <p className="text-xs text-muted-foreground">
          Add these as Browser Sources in OBS. Each overlay auto-syncs with your KINYAN stream.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {OVERLAYS.map((overlay) => {
            const isActive = activeOverlays.includes(overlay.id);
            const overlayUrl = `https://kinyan.app/overlay/${overlay.id}?key=${STREAM_KEY.slice(0, 8)}`;
            return (
              <div
                key={overlay.id}
                className={cn(
                  "rounded-lg border p-3 space-y-2 transition-all cursor-pointer",
                  isActive ? overlay.color : "border-border/30 bg-secondary/20 opacity-60"
                )}
                onClick={() => toggleOverlay(overlay.id)}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold">{overlay.name}</span>
                  <div className={cn(
                    "w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors",
                    isActive ? "bg-green-500 border-green-500" : "border-gray-300"
                  )}>
                    {isActive && <CheckCircle2 className="w-3 h-3 text-white" />}
                  </div>
                </div>
                <p className="text-[10px] text-muted-foreground">{overlay.description}</p>
                {isActive && (
                  <div className="flex items-center gap-1">
                    <code className="text-[9px] font-mono text-muted-foreground truncate flex-1">
                      {overlayUrl}
                    </code>
                    <button
                      className="shrink-0"
                      onClick={(e) => {
                        e.stopPropagation();
                        copyToClipboard(overlayUrl, `${overlay.name} URL`);
                      }}
                    >
                      <Copy className="w-3 h-3 text-muted-foreground hover:text-foreground" />
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Preview Layout */}
      <div className="rounded-xl border border-border/50 bg-card p-5 space-y-4">
        <h2 className="font-display font-bold text-foreground text-sm flex items-center gap-2">
          <LayoutGrid className="w-4 h-4" />
          Preview Layout
        </h2>
        <div className="aspect-video bg-gray-900 rounded-lg relative overflow-hidden">
          {/* Camera feed area */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center space-y-2">
              <Video className="w-12 h-12 text-gray-600 mx-auto" />
              <p className="text-xs text-gray-500">Camera Feed</p>
            </div>
          </div>

          {/* Overlay previews */}
          {activeOverlays.includes("bid") && (
            <div className="absolute top-3 right-3 bg-black/80 backdrop-blur-sm rounded-lg p-2 text-white">
              <p className="text-[8px] text-white/60">Current Bid</p>
              <p className="text-sm font-bold text-green-400">$125</p>
              <p className="text-[8px] text-white/50">2:45 remaining</p>
            </div>
          )}
          {activeOverlays.includes("chat") && (
            <div className="absolute bottom-3 left-3 w-48 bg-black/60 backdrop-blur-sm rounded-lg p-2 space-y-0.5">
              <p className="text-[8px]"><span className="text-cyan-400 font-bold">YossiB:</span> <span className="text-white/80">$50!</span></p>
              <p className="text-[8px]"><span className="text-yellow-400 font-bold">MosheDavid:</span> <span className="text-white/80">Beautiful!</span></p>
              <p className="text-[8px]"><span className="text-pink-400 font-bold">SarahR:</span> <span className="text-white/80">$55</span></p>
            </div>
          )}
          {activeOverlays.includes("product") && (
            <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm rounded-lg p-2 text-black">
              <p className="text-[8px] font-bold">Complete Shas Vilna</p>
              <p className="text-[8px] text-green-600 font-bold">Starting at $45</p>
            </div>
          )}
          {activeOverlays.includes("viewers") && (
            <div className="absolute top-3 left-3 bg-red-600 text-white rounded-full px-2 py-0.5 text-[8px] font-bold flex items-center gap-1">
              <span className="w-1 h-1 rounded-full bg-white animate-pulse" />
              342 watching
            </div>
          )}
          {activeOverlays.includes("alerts") && (
            <div className="absolute top-12 left-1/2 -translate-x-1/2 bg-green-500 text-white rounded-lg px-3 py-1 text-[8px] font-bold">
              YossiB bid $60!
            </div>
          )}
        </div>
      </div>

      {/* Help Links */}
      <div className="flex items-center justify-center gap-4">
        <button
          className="text-xs text-primary hover:underline flex items-center gap-1"
          onClick={() => toast.info("OBS download page would open")}
        >
          <ExternalLink className="w-3 h-3" />
          Download OBS
        </button>
        <button
          className="text-xs text-primary hover:underline flex items-center gap-1"
          onClick={() => toast.info("Help docs would open")}
        >
          <ExternalLink className="w-3 h-3" />
          Setup Guide
        </button>
        <button
          className="text-xs text-primary hover:underline flex items-center gap-1"
          onClick={() => toast.info("Audio setup guide would open")}
        >
          <Mic className="w-3 h-3" />
          Audio Setup
        </button>
      </div>
    </div>
  );
}
