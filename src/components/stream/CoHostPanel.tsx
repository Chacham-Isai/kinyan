import { useState } from "react";
import { Users, Mic, MicOff, Video, VideoOff, PhoneOff, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface CoHost {
  id: string;
  username: string;
  displayName: string;
  isMuted: boolean;
  isVideoOn: boolean;
}

interface CoHostPanelProps {
  hostName: string;
  onInvite?: (username: string) => void;
}

const AVAILABLE_COHOSTS = [
  { id: "ch1", username: "silvergoldjudaica", displayName: "Silver & Gold Judaica" },
  { id: "ch2", username: "thehatspot", displayName: "The Hat Spot" },
  { id: "ch3", username: "techkosher", displayName: "TechKosher" },
  { id: "ch4", username: "heimishdeals", displayName: "Heimish Deals" },
];

export default function CoHostPanel({ hostName, onInvite }: CoHostPanelProps) {
  const [coHosts, setCoHosts] = useState<CoHost[]>([]);
  const [showInvite, setShowInvite] = useState(false);
  const [inviteUsername, setInviteUsername] = useState("");

  const addCoHost = (user: typeof AVAILABLE_COHOSTS[0]) => {
    if (coHosts.length >= 3) {
      toast.error("Maximum 3 co-hosts allowed");
      return;
    }
    setCoHosts((prev) => [...prev, {
      ...user,
      isMuted: false,
      isVideoOn: true,
    }]);
    setShowInvite(false);
    toast.success(`${user.displayName} joined as co-host!`);
    onInvite?.(user.username);
  };

  const toggleMute = (id: string) => {
    setCoHosts((prev) => prev.map((ch) => ch.id === id ? { ...ch, isMuted: !ch.isMuted } : ch));
  };

  const toggleVideo = (id: string) => {
    setCoHosts((prev) => prev.map((ch) => ch.id === id ? { ...ch, isVideoOn: !ch.isVideoOn } : ch));
  };

  const removeCoHost = (id: string) => {
    const host = coHosts.find((ch) => ch.id === id);
    setCoHosts((prev) => prev.filter((ch) => ch.id !== id));
    toast(`${host?.displayName} left the stream`);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-primary" />
          <span className="text-sm font-semibold">Co-Hosts</span>
          {coHosts.length > 0 && (
            <Badge variant="secondary" className="text-[10px]">{coHosts.length}/3</Badge>
          )}
        </div>
        <Button
          size="sm"
          variant="outline"
          className="text-xs gap-1 h-7"
          onClick={() => setShowInvite(!showInvite)}
        >
          <UserPlus className="w-3 h-3" />
          Invite
        </Button>
      </div>

      {/* Active Co-Hosts */}
      {coHosts.length > 0 && (
        <div className="space-y-2">
          {coHosts.map((ch) => (
            <div key={ch.id} className="flex items-center gap-2 p-2 rounded-lg bg-secondary/50">
              <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center text-xs font-bold text-white">
                {ch.displayName[0]}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold truncate">{ch.displayName}</p>
                <p className="text-[10px] text-muted-foreground">Co-host</p>
              </div>
              <div className="flex items-center gap-1">
                <button
                  className={cn(
                    "w-6 h-6 rounded-full flex items-center justify-center transition-colors",
                    ch.isMuted ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600"
                  )}
                  onClick={() => toggleMute(ch.id)}
                >
                  {ch.isMuted ? <MicOff className="w-3 h-3" /> : <Mic className="w-3 h-3" />}
                </button>
                <button
                  className={cn(
                    "w-6 h-6 rounded-full flex items-center justify-center transition-colors",
                    !ch.isVideoOn ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600"
                  )}
                  onClick={() => toggleVideo(ch.id)}
                >
                  {ch.isVideoOn ? <Video className="w-3 h-3" /> : <VideoOff className="w-3 h-3" />}
                </button>
                <button
                  className="w-6 h-6 rounded-full bg-red-100 text-red-600 flex items-center justify-center"
                  onClick={() => removeCoHost(ch.id)}
                >
                  <PhoneOff className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {coHosts.length === 0 && !showInvite && (
        <p className="text-xs text-muted-foreground text-center py-2">
          No co-hosts yet. Invite a seller to join your stream!
        </p>
      )}

      {/* Invite Panel */}
      {showInvite && (
        <div className="space-y-2 p-3 rounded-lg bg-secondary/30 border border-border/50">
          <p className="text-xs font-medium text-foreground">Invite a co-host</p>
          <div className="space-y-1.5">
            {AVAILABLE_COHOSTS.filter((u) => !coHosts.find((ch) => ch.id === u.id)).map((user) => (
              <button
                key={user.id}
                className="w-full flex items-center gap-2 p-2 rounded-lg hover:bg-secondary transition-colors text-left"
                onClick={() => addCoHost(user)}
              >
                <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">
                  {user.displayName[0]}
                </div>
                <span className="text-xs font-medium flex-1">{user.displayName}</span>
                <Badge className="text-[9px] bg-primary/10 text-primary border-0">Invite</Badge>
              </button>
            ))}
          </div>
          <div className="flex gap-2 mt-2">
            <input
              type="text"
              value={inviteUsername}
              onChange={(e) => setInviteUsername(e.target.value)}
              placeholder="Or enter username..."
              className="flex-1 h-8 px-3 rounded-lg bg-background border border-border/50 text-xs"
            />
            <Button size="sm" className="h-8 text-xs" onClick={() => {
              if (inviteUsername.trim()) {
                toast.success(`Invitation sent to @${inviteUsername}`);
                setInviteUsername("");
              }
            }}>
              Send
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
