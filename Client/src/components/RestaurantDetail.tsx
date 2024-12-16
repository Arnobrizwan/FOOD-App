import AvailableMenu from "./AvailableMenu";
import { Badge } from "./ui/Badge";
import { Timer } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// Define a type for restaurant details
interface Restaurant {
  imageUrl: string;
  restaurantName: string;
  cuisines: string[];
  deliveryTime: number;
  menus: Menu[];
}

interface Menu {
  id: string;
  name: string;
  price: number;
}

const RestaurantDetail = () => {
  const params = useParams();
  const [singleRestaurant, setSingleRestaurant] = useState<Restaurant | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchRestaurantDetails();
  }, [params.id]);

  const fetchRestaurantDetails = async () => {
    try {
      setLoading(true);
      // Simulate API call with mock data
      const mockData: Restaurant = {
        imageUrl: "https://via.placeholder.com/600x300",
        restaurantName: "Mock Restaurant",
        cuisines: ["Italian", "Mexican"],
        deliveryTime: 30,
        menus: [
          { id: "1", name: "Pasta", price: 12 },
          { id: "2", name: "Pizza", price: 15 },
        ],
      };
      // Simulate API delay
      setTimeout(() => {
        setSingleRestaurant(mockData);
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error("Failed to fetch restaurant details:", error);
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto my-10">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="w-full">
          <div className="relative w-full h-32 md:h-64 lg:h-72">
            <img
              src={singleRestaurant?.imageUrl}
              alt="res_image"
              className="object-cover w-full h-full rounded-lg shadow-lg"
            />
          </div>
          <div className="flex flex-col md:flex-row justify-between">
            <div className="my-5">
              <h1 className="font-medium text-xl">
                {singleRestaurant?.restaurantName}
              </h1>
              <div className="flex gap-2 my-2">
                {singleRestaurant?.cuisines.map((cuisine: string, idx: number) => (
                  <Badge key={idx}>{cuisine}</Badge>
                ))}
              </div>
              <div className="flex md:flex-row flex-col gap-2 my-5">
                <div className="flex items-center gap-2">
                  <Timer className="w-5 h-5" />
                  <h1 className="flex items-center gap-2 font-medium">
                    Delivery Time:{" "}
                    <span className="text-[#D19254]">
                      {singleRestaurant?.deliveryTime} mins
                    </span>
                  </h1>
                </div>
              </div>
            </div>
          </div>
        

        </div>
      )}
    </div>
  );
};

export default RestaurantDetail;
