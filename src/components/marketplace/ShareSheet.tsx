import { Copy, Share2, MessageCircle, Mail, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface ShareSheetProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  url: string;
  type: "product" | "stream" | "seller" | "charity";
}

export default function ShareSheet({ isOpen, onClose, title, url, type }: ShareSheetProps) {
  if (!isOpen) return null;

  const shareText = {
    product: `Check out "${title}" on KINYAN!`,
    stream: `Watch "${title}" LIVE on KINYAN!`,
    seller: `Check out ${title}'s store on KINYAN!`,
    charity: `Support ${title} on KINYAN Gives!`,
  }[type];

  const handleCopy = () => {
    navigator.clipboard?.writeText(`${shareText}\n${url}`);
    toast.success("Link copied to clipboard!");
    onClose();
  };

  const handleShare = async (method: string) => {
    if (method === "native" && navigator.share) {
      try {
        await navigator.share({ title: shareText, url });
        onClose();
      } catch {}
      return;
    }

    const encoded = encodeURIComponent(`${shareText}\n${url}`);
    const links: Record<string, string> = {
      whatsapp: `https://wa.me/?text=${encoded}`,
      sms: `sms:?body=${encoded}`,
      email: `mailto:?subject=${encodeURIComponent(shareText)}&body=${encoded}`,
    };

    if (links[method]) {
      window.open(links[method], "_blank");
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <div
        className="bg-card rounded-t-2xl sm:rounded-2xl w-full sm:max-w-sm p-5 space-y-4 animate-in slide-in-from-bottom-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <h3 className="font-display font-bold text-foreground">Share</h3>
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>

        <p className="text-sm text-muted-foreground">{shareText}</p>

        <div className="grid grid-cols-4 gap-3">
          <button
            className="flex flex-col items-center gap-1.5 p-3 rounded-xl hover:bg-secondary transition-colors"
            onClick={() => handleShare("whatsapp")}
          >
            <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
              <MessageCircle className="w-6 h-6 text-white" />
            </div>
            <span className="text-[10px] text-muted-foreground">WhatsApp</span>
          </button>

          <button
            className="flex flex-col items-center gap-1.5 p-3 rounded-xl hover:bg-secondary transition-colors"
            onClick={() => handleShare("sms")}
          >
            <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center">
              <MessageCircle className="w-6 h-6 text-white" />
            </div>
            <span className="text-[10px] text-muted-foreground">Text</span>
          </button>

          <button
            className="flex flex-col items-center gap-1.5 p-3 rounded-xl hover:bg-secondary transition-colors"
            onClick={() => handleShare("email")}
          >
            <div className="w-12 h-12 rounded-full bg-gray-500 flex items-center justify-center">
              <Mail className="w-6 h-6 text-white" />
            </div>
            <span className="text-[10px] text-muted-foreground">Email</span>
          </button>

          <button
            className="flex flex-col items-center gap-1.5 p-3 rounded-xl hover:bg-secondary transition-colors"
            onClick={handleCopy}
          >
            <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center">
              <Copy className="w-6 h-6" />
            </div>
            <span className="text-[10px] text-muted-foreground">Copy</span>
          </button>
        </div>

        {navigator.share && (
          <Button
            className="w-full gradient-primary text-white font-bold gap-2"
            onClick={() => handleShare("native")}
          >
            <Share2 className="w-4 h-4" />
            More Options
          </Button>
        )}
      </div>
    </div>
  );
}
