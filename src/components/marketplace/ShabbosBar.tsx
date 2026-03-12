import { getShabbosMessage } from "@/lib/shabbos";
import { useState, useEffect } from "react";

export default function ShabbosBar() {
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    const check = () => setMessage(getShabbosMessage());
    check();
    const interval = setInterval(check, 60000); // Check every minute
    return () => clearInterval(interval);
  }, []);

  if (!message) return null;

  return (
    <div className="bg-gradient-to-r from-blue-900/80 to-cyan-900/80 border-b border-blue-700/30 px-4 py-2 text-center">
      <p className="text-sm text-blue-200 font-medium">{message}</p>
    </div>
  );
}
