import { useEffect, useRef, useState } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { Home, Settings, Filter, Clock, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";


import { fetchAlerts } from "@/services/alertService";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useQuery } from "@tanstack/react-query";

const SafetyMap = () => {
    const mapContainer = useRef<HTMLDivElement>(null);
    const map = useRef<maplibregl.Map | null>(null);
    const markersRef = useRef<{ [key: string]: maplibregl.Marker }>({});
    const isMobile = useIsMobile();
    const { toast } = useToast();
    const [selectedOrderType, setSelectedOrderType] = useState<string | null>(null);
    const [timeFilter, setTimeFilter] = useState<string>("all");
    const [showSafetyScore, setShowSafetyScore] = useState(false);

    // Fetch alerts using React Query
    const { data: alerts } = useQuery({
        queryKey: ['alerts'],
        queryFn: fetchAlerts,
        refetchInterval: 30000, // Refetch every 30 seconds
    });

    // Filter alerts based on selected criteria
    const filteredAlerts = alerts?.filter(alert => {
        if (selectedOrderType && alert.type !== selectedOrderType) return false;

        if (timeFilter !== "all") {
            const alertTime = new Date(alert.time);
            const now = new Date();
            const hoursDiff = (now.getTime() - alertTime.getTime()) / (1000 * 60 * 60);

            if (timeFilter === "1h" && hoursDiff > 1) return false;
            if (timeFilter === "24h" && hoursDiff > 24) return false;
        }

        return true;
    });

    // Initialize map
    useEffect(() => {
        if (!mapContainer.current || map.current) return;

        map.current = new maplibregl.Map({
            container: mapContainer.current,
            style: {
                version: 8,
                sources: {},
                layers: [],
                glyphs: "https://demotiles.maplibre.org/font/{fontstack}/{range}.pbf",
            },
            center: [103.7414, 1.4927],
            zoom: isMobile ? 11 : 12,
        });

        map.current.on("load", () => {
            if (!map.current) return;

            map.current.addSource("background", {
                type: "raster",
                tiles: ["https://tile.openstreetmap.org/{z}/{x}/{y}.png"],
                tileSize: 256,
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            });

            map.current.addLayer({
                id: "background-layer",
                type: "raster",
                source: "background",
            });
        });

        return () => {
            map.current?.remove();
            map.current = null;
        };
    }, [isMobile]);

    // Handle safety score layer
    useEffect(() => {
        if (!map.current || !alerts) return;

        // Remove existing safety heat layer if it exists
        if (map.current.getLayer('safety-heat')) {
            map.current.removeLayer('safety-heat');
        }
        if (map.current.getSource('safety-heat')) {
            map.current.removeSource('safety-heat');
        }

        if (showSafetyScore) {
            map.current.addLayer({
                id: "safety-heat",
                type: "heatmap",
                source: {
                    type: "geojson",
                    data: {
                        type: "FeatureCollection",
                        features: alerts.map(alert => ({
                            type: "Feature",
                            geometry: {
                                type: "Point",
                                coordinates: getCoordinatesForLocation(alert.location) || [0, 0],
                            },
                            properties: {
                                intensity: alert.type === "paid" ? 1 : 0.5,
                            },
                        })),
                    },
                },
                paint: {
                    "heatmap-weight": ["get", "intensity"],
                    "heatmap-intensity": 1,
                    "heatmap-color": [
                        "interpolate",
                        ["linear"],
                        ["heatmap-density"],
                        0, "rgba(0, 255, 0, 0)",
                        0.5, "rgba(255, 255, 0, 0.5)",
                        1, "rgba(255, 0, 0, 0.8)"
                    ],
                    "heatmap-radius": 30,
                },
            });
        }
    }, [showSafetyScore, alerts]);

    // Update markers when filtered alerts change
    useEffect(() => {
        if (!map.current || !filteredAlerts) return;

        // Remove markers that are no longer in the filtered alerts
        Object.entries(markersRef.current).forEach(([id, marker]) => {
            if (!filteredAlerts.find(alert => alert.id.toString() === id)) {
                marker.remove();
                delete markersRef.current[id];
            }
        });

        // Update or add markers for filtered alerts
        filteredAlerts.forEach((alert) => {
            const coordinates = getCoordinatesForLocation(alert.location);
            if (!coordinates) return;

            const markerId = alert.id.toString();

            // If marker already exists, update its popup content
            if (markersRef.current[markerId]) {
                const popup = new maplibregl.Popup({ offset: 25 }).setHTML(`
          <div class="p-2">
            <h3 class="font-bold">${alert.title}</h3>
            <p class="text-sm">${alert.description}</p>
            <p class="text-xs mt-1">Toll: ${alert.toll}</p>
            <p class="text-xs">Time: ${alert.time}</p>
          </div>
        `);
                markersRef.current[markerId].setPopup(popup);
                return;
            }

            // Create new marker if it doesn't exist
            const el = document.createElement("div");
            el.className = `marker ${alert.type}`;
            el.style.width = "24px";
            el.style.height = "24px";
            el.style.borderRadius = "50%";
            el.style.backgroundColor = getMarkerColor(alert.type);
            el.style.border = "2px solid white";
            el.style.boxShadow = "0 2px 4px rgba(0,0,0,0.2)";
            el.title = `${alert.title}\n${alert.description}`;

            const popup = new maplibregl.Popup({ offset: 25 }).setHTML(`
        <div class="p-2">
          <h3 class="font-bold">${alert.title}</h3>
          <p class="text-sm">${alert.description}</p>
          <p class="text-xs mt-1">Toll: ${alert.toll}</p>
          <p class="text-xs">Time: ${alert.time}</p>
        </div>
      `);

            const marker = new maplibregl.Marker(el)
                .setLngLat(coordinates)
                .setPopup(popup)
                .addTo(map.current!);

            markersRef.current[markerId] = marker;

            if (alert.type === "paid") {
                toast({
                    title: "New Order Detected",
                    description: `${alert.title} at ${alert.location}`,
                });
            }
        });
    }, [filteredAlerts, toast]);

    // ... keep existing code (UI components JSX)

    return (
        <>
            <div className="relative h-[500px]">
                {/* <div className="absolute top-0 left-0 right-0 z-10 bg-white p-4 flex justify-between items-center">
                    <Link to="/" className="text-gray-800">
                        <Home className="w-6 h-6" />
                    </Link>
                    <h1 className="text-xl font-semibold">Johor Bahru Safety Map</h1>
                    <Settings className="w-6 h-6 text-gray-800" />
                </div> */}

                {/* Control Panel */}
                <div className="absolute top-20 right-4 z-10 space-y-2">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm">
                                <Filter className="w-4 h-4 mr-2" />
                                Filter Orders
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem onClick={() => setSelectedOrderType(null)}>
                                All Types
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setSelectedOrderType("pending")}>
                                Pending Only
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setSelectedOrderType("paid")}>
                                Paid Only
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm">
                                <Clock className="w-4 h-4 mr-2" />
                                Time Filter
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem onClick={() => setTimeFilter("all")}>
                                All Time
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setTimeFilter("1h")}>
                                Last Hour
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setTimeFilter("24h")}>
                                Last 24 Hours
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    {/* <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setShowSafetyScore(!showSafetyScore)}
                    >
                        <Shield className="w-4 h-4 mr-2" />
                        {showSafetyScore ? "Hide" : "Show"} Safety Score
                    </Button> */}
                </div>

                <div className="h-full">
                    <div ref={mapContainer} className="h-full" />
                </div>
            </div>
        </>

    );
};

// Helper function to get marker color based on alert type
const getMarkerColor = (type: string): string => {
    switch (type) {
        case "paid":
            return "#FF0000";
        case "pending":
            return "#FFA500";
        default:
            return "#3B82F6";
    }
};

// Helper function to convert location names to coordinates (simplified)
const getCoordinatesForLocation = (location: string): [number, number] | null => {
    const coordinates: Record<string, [number, number]> = {
        "Table 5": [103.7614, 1.4927],
        "Kitchen": [103.7514, 1.4827],
        "Counter": [103.7714, 1.5027],
        "Table 10": [103.7814, 1.4727],
        "Table 3": [103.7914, 1.4627],
        "Table 7": [103.7414, 1.5127],
        "Table 12": [103.7314, 1.4727],
    };

    return coordinates[location] || null;
};

export default SafetyMap;