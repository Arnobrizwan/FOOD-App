import { LucideIcon } from "lucide-react";

export interface Alert {
    id: number;
    type: "pending" | "paid" | "info";
    title: string;
    location: string;
    time: string;
    description: string;
    icon: LucideIcon;
    color: string;
    severity: "high" | "medium" | "low";
    actions: string[];
    toll: string;
}