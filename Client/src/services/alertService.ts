import { Alert } from "@/types/alert";
import { AlertTriangle, Cloud, Construction, Car, Share2, AlertOctagon, Waves, Zap, Wind, ThermometerSun } from "lucide-react";

export const fetchAlerts = async (): Promise<Alert[]> => {
    // Simulating API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    return [
        {
            id: 1,
            type: "paid",
            title: "Order Delivered",
            location: "Table 5",
            time: "10 minutes ago",
            description: "Order #1234 has been delivered to Table 5.",
            icon: AlertTriangle,
            color: "bg-green-100 text-green-800",
            severity: "high",
            actions: ["View Details", "Share"],
            toll: "RM 0"
        },
        {
            id: 2,
            type: "pending",
            title: "Order Preparation",
            location: "Kitchen",
            time: "30 minutes ago",
            description: "Order #1235 is being prepared in the kitchen.",
            icon: Cloud,
            color: "bg-yellow-100 text-yellow-800",
            severity: "medium",
            actions: ["View Details", "Share"],
            toll: "RM 2.50"
        },
        {
            id: 3,
            type: "paid",
            title: "Order Ready for Pickup",
            location: "Counter",
            time: "1 hour ago",
            description: "Order #1236 is ready for pickup at the counter.",
            icon: Construction,
            color: "bg-blue-100 text-blue-800",
            severity: "low",
            actions: ["View Details", "Share"],
            toll: "RM 1.80"
        },
        {
            id: 4,
            type: "pending",
            title: "Order Delayed",
            location: "Kitchen",
            time: "15 minutes ago",
            description: "Order #1237 is delayed due to high demand.",
            icon: Waves,
            color: "bg-red-100 text-red-800",
            severity: "high",
            actions: ["View Details", "Share"],
            toll: "RM 3.20"
        },
        {
            id: 5,
            type: "paid",
            title: "Order Completed",
            location: "Table 10",
            time: "45 minutes ago",
            description: "Order #1238 has been completed and served to Table 10.",
            icon: Car,
            color: "bg-green-100 text-green-800",
            severity: "medium",
            actions: ["View Details", "Share"],
            toll: "RM 4.50"
        },
        {
            id: 6,
            type: "pending",
            title: "Order Issue",
            location: "Table 3",
            time: "20 minutes ago",
            description: "Issue reported with Order #1239 at Table 3.",
            icon: AlertOctagon,
            color: "bg-red-100 text-red-800",
            severity: "high",
            actions: ["View Details", "Share"],
            toll: "RM 2.80"
        },
        {
            id: 7,
            type: "paid",
            title: "Order Cancelled",
            location: "Table 7",
            time: "25 minutes ago",
            description: "Order #1240 has been cancelled at Table 7.",
            icon: Zap,
            color: "bg-red-100 text-red-800",
            severity: "high",
            actions: ["View Details", "Share"],
            toll: "RM 1.50"
        },
        {
            id: 8,
            type: "pending",
            title: "Order in Queue",
            location: "Kitchen",
            time: "1 hour ago",
            description: "Order #1241 is in the queue for preparation.",
            icon: Wind,
            color: "bg-yellow-100 text-yellow-800",
            severity: "medium",
            actions: ["View Details", "Share"],
            toll: "RM 5.70"
        },
        {
            id: 9,
            type: "paid",
            title: "Order Completed",
            location: "Table 12",
            time: "2 hours ago",
            description: "Order #1242 has been completed and served to Table 12.",
            icon: ThermometerSun,
            color: "bg-green-100 text-green-800",
            severity: "medium",
            actions: ["View Details", "Share"],
            toll: "RM 1.20"
        }
    ];
};