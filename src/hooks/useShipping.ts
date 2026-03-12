import { useState, useCallback } from "react";

export interface ShippingRate {
  carrier: string;
  service: string;
  price: number;
  estimatedDays: string;
  logo: string;
}

export interface ShippingLabel {
  id: string;
  trackingNumber: string;
  carrier: string;
  service: string;
  labelUrl: string;
  cost: number;
  createdAt: Date;
}

export interface TrackingEvent {
  date: string;
  time: string;
  status: string;
  location: string;
}

export interface TrackingInfo {
  trackingNumber: string;
  carrier: string;
  status: "pre_transit" | "in_transit" | "out_for_delivery" | "delivered" | "exception";
  estimatedDelivery: string;
  events: TrackingEvent[];
}

const MOCK_RATES: ShippingRate[] = [
  { carrier: "USPS", service: "Priority Mail", price: 7.99, estimatedDays: "2-3 days", logo: "📬" },
  { carrier: "USPS", service: "First Class", price: 4.50, estimatedDays: "3-5 days", logo: "📬" },
  { carrier: "UPS", service: "Ground", price: 9.99, estimatedDays: "3-5 days", logo: "📦" },
  { carrier: "UPS", service: "2-Day Air", price: 18.99, estimatedDays: "2 days", logo: "📦" },
  { carrier: "FedEx", service: "Home Delivery", price: 11.99, estimatedDays: "2-5 days", logo: "📫" },
  { carrier: "FedEx", service: "Express", price: 24.99, estimatedDays: "1-2 days", logo: "📫" },
];

function generateTrackingNumber(): string {
  const chars = "0123456789";
  return "1Z" + Array.from({ length: 16 }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
}

export function useShipping() {
  const [rates, setRates] = useState<ShippingRate[]>([]);
  const [selectedRate, setSelectedRate] = useState<ShippingRate | null>(null);
  const [label, setLabel] = useState<ShippingLabel | null>(null);
  const [loading, setLoading] = useState(false);

  const calculateRates = useCallback(async (weight: number, fromZip: string, toZip: string) => {
    setLoading(true);
    // Simulate API call
    await new Promise((r) => setTimeout(r, 800));

    // Adjust prices based on weight
    const weightMultiplier = Math.max(1, weight / 16); // base is 1lb
    const adjustedRates = MOCK_RATES.map((rate) => ({
      ...rate,
      price: Math.round(rate.price * weightMultiplier * 100) / 100,
    }));

    setRates(adjustedRates);
    setLoading(false);
    return adjustedRates;
  }, []);

  const purchaseLabel = useCallback(async (rate: ShippingRate) => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));

    const newLabel: ShippingLabel = {
      id: `lbl-${Date.now()}`,
      trackingNumber: generateTrackingNumber(),
      carrier: rate.carrier,
      service: rate.service,
      labelUrl: "#", // Would be actual label PDF
      cost: rate.price,
      createdAt: new Date(),
    };

    setLabel(newLabel);
    setSelectedRate(rate);
    setLoading(false);
    return newLabel;
  }, []);

  const getTracking = useCallback(async (trackingNumber: string): Promise<TrackingInfo> => {
    await new Promise((r) => setTimeout(r, 600));

    return {
      trackingNumber,
      carrier: "USPS",
      status: "in_transit",
      estimatedDelivery: "March 15, 2026",
      events: [
        { date: "Mar 12", time: "2:30 PM", status: "Package accepted by carrier", location: "Brooklyn, NY" },
        { date: "Mar 12", time: "6:15 PM", status: "Departed facility", location: "Brooklyn, NY" },
        { date: "Mar 13", time: "3:45 AM", status: "Arrived at regional facility", location: "Newark, NJ" },
        { date: "Mar 13", time: "8:20 AM", status: "In transit to destination", location: "Edison, NJ" },
      ],
    };
  }, []);

  return {
    rates,
    selectedRate,
    label,
    loading,
    calculateRates,
    purchaseLabel,
    setSelectedRate,
    getTracking,
  };
}
