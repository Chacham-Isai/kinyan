import { Shield, Clock, RotateCcw, AlertTriangle, CheckCircle2, XCircle, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { toast } from "sonner";

interface BuyerProtectionProps {
  orderId: string;
  sellerName: string;
  itemTitle: string;
  amount: number;
  status: "protected" | "in_dispute" | "resolved";
}

const DISPUTE_REASONS = [
  "Item not as described",
  "Item not received",
  "Wrong item shipped",
  "Item damaged during shipping",
  "Counterfeit item",
  "Seller not responding",
];

export default function BuyerProtection({ orderId, sellerName, itemTitle, amount, status }: BuyerProtectionProps) {
  const [showDispute, setShowDispute] = useState(false);
  const [selectedReason, setSelectedReason] = useState("");
  const [disputeDetails, setDisputeDetails] = useState("");

  const handleFileDispute = () => {
    if (!selectedReason) {
      toast.error("Please select a reason");
      return;
    }
    toast.success("Dispute filed successfully", {
      description: "Our team will review within 24 hours. Your funds are held in escrow.",
    });
    setShowDispute(false);
  };

  return (
    <div className="rounded-xl border border-border/50 bg-card overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 bg-green-50 border-b border-green-100 flex items-center gap-2">
        <Shield className="w-5 h-5 text-green-600" />
        <div className="flex-1">
          <p className="font-semibold text-sm text-green-800">KINYAN Buyer Protection</p>
          <p className="text-xs text-green-600">Your purchase is 100% protected</p>
        </div>
        <Badge className={
          status === "protected" ? "bg-green-100 text-green-700 border-0"
          : status === "in_dispute" ? "bg-amber-100 text-amber-700 border-0"
          : "bg-blue-100 text-blue-700 border-0"
        }>
          {status === "protected" ? "Protected" : status === "in_dispute" ? "In Dispute" : "Resolved"}
        </Badge>
      </div>

      {/* Protection Details */}
      <div className="p-4 space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="flex items-start gap-2">
            <Clock className="w-4 h-4 text-primary mt-0.5 shrink-0" />
            <div>
              <p className="text-xs font-medium">Escrow Hold</p>
              <p className="text-[10px] text-muted-foreground">Payment held until you confirm receipt</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <RotateCcw className="w-4 h-4 text-primary mt-0.5 shrink-0" />
            <div>
              <p className="text-xs font-medium">Free Returns</p>
              <p className="text-[10px] text-muted-foreground">Return within 3 days for full refund</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <Shield className="w-4 h-4 text-primary mt-0.5 shrink-0" />
            <div>
              <p className="text-xs font-medium">Money-Back Guarantee</p>
              <p className="text-[10px] text-muted-foreground">Full refund if item not as described</p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-2 border-t border-border/30">
          <Button
            variant="outline"
            size="sm"
            className="text-xs gap-1"
            onClick={() => toast.success("Item confirmed! Payment released to seller.")}
          >
            <CheckCircle2 className="w-3 h-3" />
            Confirm Receipt
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="text-xs gap-1"
            onClick={() => setShowDispute(!showDispute)}
          >
            <AlertTriangle className="w-3 h-3" />
            Open Dispute
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-xs gap-1 ml-auto"
          >
            <MessageCircle className="w-3 h-3" />
            Contact Seller
          </Button>
        </div>

        {/* Dispute Form */}
        {showDispute && (
          <div className="mt-3 p-3 bg-secondary/50 rounded-lg space-y-3">
            <p className="text-sm font-medium">File a Dispute</p>
            <div className="space-y-2">
              {DISPUTE_REASONS.map((reason) => (
                <label key={reason} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="dispute-reason"
                    value={reason}
                    checked={selectedReason === reason}
                    onChange={(e) => setSelectedReason(e.target.value)}
                    className="text-primary"
                  />
                  <span className="text-xs">{reason}</span>
                </label>
              ))}
            </div>
            <textarea
              value={disputeDetails}
              onChange={(e) => setDisputeDetails(e.target.value)}
              placeholder="Additional details..."
              className="w-full h-20 px-3 py-2 rounded-lg bg-background border border-border/50 text-xs resize-none"
            />
            <div className="flex gap-2">
              <Button size="sm" className="text-xs gradient-primary text-white" onClick={handleFileDispute}>
                Submit Dispute
              </Button>
              <Button size="sm" variant="ghost" className="text-xs" onClick={() => setShowDispute(false)}>
                Cancel
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
