import { useState } from "react";
import { Shield, Ban, Star, MessageSquare, Filter, UserX, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export type ChatFilter = "all" | "questions" | "buyers" | "mods";

interface MutedUser {
  username: string;
  mutedAt: Date;
  duration: number; // minutes, 0 = permanent
}

interface Moderator {
  username: string;
  addedAt: Date;
}

interface ChatModerationProps {
  activeFilter: ChatFilter;
  onFilterChange: (filter: ChatFilter) => void;
  isSeller?: boolean;
}

const CHAT_USERS = [
  "MosheDavid", "SarahR", "ChaimG", "RivkaM", "YossiB", "MendelK", "RachelS",
  "DovB", "LeahG", "ShlomoW", "MiriamF", "AviK",
];

export default function ChatModeration({ activeFilter, onFilterChange, isSeller = true }: ChatModerationProps) {
  const [mutedUsers, setMutedUsers] = useState<MutedUser[]>([]);
  const [moderators, setModerators] = useState<Moderator[]>([
    { username: "YossiB", addedAt: new Date() },
  ]);
  const [showModPanel, setShowModPanel] = useState(false);
  const [slowMode, setSlowMode] = useState(false);
  const [subscriberOnly, setSubscriberOnly] = useState(false);

  const muteUser = (username: string, duration: number) => {
    setMutedUsers((prev) => [...prev, { username, mutedAt: new Date(), duration }]);
    toast(`${username} muted${duration > 0 ? ` for ${duration} min` : " permanently"}`);
  };

  const unmuteUser = (username: string) => {
    setMutedUsers((prev) => prev.filter((u) => u.username !== username));
    toast(`${username} unmuted`);
  };

  const addModerator = (username: string) => {
    if (moderators.find((m) => m.username === username)) return;
    setModerators((prev) => [...prev, { username, addedAt: new Date() }]);
    toast.success(`${username} is now a moderator`);
  };

  const removeModerator = (username: string) => {
    setModerators((prev) => prev.filter((m) => m.username !== username));
    toast(`${username} removed as moderator`);
  };

  const filters: { id: ChatFilter; label: string; icon: React.ReactNode }[] = [
    { id: "all", label: "All", icon: <MessageSquare className="w-3 h-3" /> },
    { id: "questions", label: "Questions", icon: <Filter className="w-3 h-3" /> },
    { id: "buyers", label: "Buyers", icon: <Star className="w-3 h-3" /> },
    { id: "mods", label: "Mods", icon: <Shield className="w-3 h-3" /> },
  ];

  return (
    <div className="space-y-2">
      {/* Chat Filter Tabs */}
      <div className="flex items-center gap-1">
        {filters.map((f) => (
          <button
            key={f.id}
            onClick={() => onFilterChange(f.id)}
            className={cn(
              "flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-medium transition-colors",
              activeFilter === f.id
                ? "bg-primary text-white"
                : "bg-secondary text-muted-foreground hover:text-foreground"
            )}
          >
            {f.icon}
            {f.label}
          </button>
        ))}

        {isSeller && (
          <button
            onClick={() => setShowModPanel(!showModPanel)}
            className={cn(
              "ml-auto flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-medium transition-colors",
              showModPanel ? "bg-amber-100 text-amber-800" : "bg-secondary text-muted-foreground"
            )}
          >
            <Shield className="w-3 h-3" />
            Mod Tools
          </button>
        )}
      </div>

      {/* Mod Tools Panel */}
      {showModPanel && isSeller && (
        <div className="p-3 rounded-lg bg-secondary/30 border border-border/50 space-y-3">
          {/* Quick Settings */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setSlowMode(!slowMode);
                toast(slowMode ? "Slow mode off" : "Slow mode on (10s between messages)");
              }}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors",
                slowMode ? "bg-blue-100 text-blue-700" : "bg-secondary text-muted-foreground"
              )}
            >
              🐌 Slow Mode
            </button>
            <button
              onClick={() => {
                setSubscriberOnly(!subscriberOnly);
                toast(subscriberOnly ? "Chat open to all" : "Subscriber-only chat enabled");
              }}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors",
                subscriberOnly ? "bg-purple-100 text-purple-700" : "bg-secondary text-muted-foreground"
              )}
            >
              ⭐ Subs Only
            </button>
          </div>

          {/* Moderators */}
          <div>
            <p className="text-xs font-semibold text-foreground mb-1.5 flex items-center gap-1">
              <Crown className="w-3 h-3 text-yellow-500" />
              Moderators ({moderators.length})
            </p>
            <div className="space-y-1">
              {moderators.map((mod) => (
                <div key={mod.username} className="flex items-center justify-between p-1.5 rounded bg-green-50">
                  <div className="flex items-center gap-1.5">
                    <Shield className="w-3 h-3 text-green-600" />
                    <span className="text-xs font-medium">{mod.username}</span>
                  </div>
                  <button
                    className="text-[10px] text-red-500 hover:underline"
                    onClick={() => removeModerator(mod.username)}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
            <div className="mt-2 flex flex-wrap gap-1">
              {CHAT_USERS
                .filter((u) => !moderators.find((m) => m.username === u))
                .slice(0, 4)
                .map((username) => (
                  <button
                    key={username}
                    className="text-[10px] px-2 py-0.5 rounded-full bg-secondary hover:bg-primary/10 transition-colors"
                    onClick={() => addModerator(username)}
                  >
                    + {username}
                  </button>
                ))}
            </div>
          </div>

          {/* Muted Users */}
          <div>
            <p className="text-xs font-semibold text-foreground mb-1.5 flex items-center gap-1">
              <Ban className="w-3 h-3 text-red-500" />
              Muted ({mutedUsers.length})
            </p>
            {mutedUsers.length === 0 ? (
              <p className="text-[10px] text-muted-foreground">No muted users</p>
            ) : (
              <div className="space-y-1">
                {mutedUsers.map((user) => (
                  <div key={user.username} className="flex items-center justify-between p-1.5 rounded bg-red-50">
                    <div className="flex items-center gap-1.5">
                      <UserX className="w-3 h-3 text-red-500" />
                      <span className="text-xs">{user.username}</span>
                      <Badge className="text-[9px] bg-red-100 text-red-600 border-0">
                        {user.duration > 0 ? `${user.duration}m` : "Perm"}
                      </Badge>
                    </div>
                    <button
                      className="text-[10px] text-green-600 hover:underline"
                      onClick={() => unmuteUser(user.username)}
                    >
                      Unmute
                    </button>
                  </div>
                ))}
              </div>
            )}
            <div className="mt-2 flex flex-wrap gap-1">
              {CHAT_USERS
                .filter((u) => !mutedUsers.find((m) => m.username === u))
                .slice(0, 3)
                .map((username) => (
                  <button
                    key={username}
                    className="text-[10px] px-2 py-0.5 rounded-full bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
                    onClick={() => muteUser(username, 5)}
                  >
                    Mute {username}
                  </button>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
