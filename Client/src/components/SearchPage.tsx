import { Link, useParams } from "react-router-dom";
import FilterPage from "./FilterPage";
import { Input } from "./ui/input";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Badge } from "./ui/Badge";
import { Globe, MapPin, X } from "lucide-react";

import { Skeleton } from "./ui/skeleton";
import { Card, CardContent, CardFooter } from "./ui/card";
import { AspectRatio } from "./ui/aspect-ratio";

const SearchPage = () => {
  const params = useParams();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [restaurants, setRestaurants] = useState<any[]>([]);
  const [appliedFilter, setAppliedFilter] = useState<string[]>([]);

  // Fetch Restaurants Locally
  useEffect(() => {
    fetchRestaurants();
  }, [params.text, appliedFilter]);

  const fetchRestaurants = async () => {
    setLoading(true);
    try {
      // Simulated API fetch logic (replace with actual fetch call)
      const mockData = [
        {
          _id: "1",
          restaurantName: "Burger Place",
          city: "New York",
          country: "USA",
          cuisines: ["Burgers", "Fries"],
          imageUrl: "https://via.placeholder.com/300x200",
        },
        {
          _id: "2",
          restaurantName: "Pasta Delight",
          city: "Rome",
          country: "Italy",
          cuisines: ["Pasta", "Italian"],
          imageUrl: "https://via.placeholder.com/300x200",
        },
      ];

      // Filter data based on search query and applied filters
      const filteredData = mockData.filter((restaurant) =>
        restaurant.restaurantName
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      );

      setRestaurants(filteredData);
    } catch (error) {
      console.error("Error fetching restaurants:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterRemove = (filter: string) => {
    setAppliedFilter((prev) => prev.filter((f) => f !== filter));
  };

  return (
    <div className="max-w-7xl mx-auto my-10">
      <div className="flex flex-col md:flex-row justify-between gap-10">
      <FilterPage onFilterChange={setAppliedFilter} />

        <div className="flex-1">
          {/* Search Input */}
          <div className="flex items-center gap-2">
            <Input
              type="text"
              value={searchQuery}
              placeholder="Search by restaurant & cuisines"
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button onClick={fetchRestaurants} className="bg-orange hover:bg-hoverOrange">
              Search
            </Button>
          </div>

          {/* Applied Filters */}
          <div className="flex flex-wrap gap-2 my-3">
            {appliedFilter.map((filter, idx) => (
              <div key={idx} className="relative inline-flex items-center max-w-full">
                <Badge className="text-[#D19254] rounded-md pr-6" variant="outline">
                  {filter}
                </Badge>
                <X
                  onClick={() => handleFilterRemove(filter)}
                  size={16}
                  className="absolute text-[#D19254] right-1 hover:cursor-pointer"
                />
              </div>
            ))}
          </div>

          {/* Restaurant Cards */}
          <div className="grid md:grid-cols-3 gap-4">
            {loading ? (
              <SearchPageSkeleton />
            ) : restaurants.length === 0 ? (
              <NoResultFound searchText={params.text || ""} />
            ) : (
              restaurants.map((restaurant) => (
                <Card
                  key={restaurant._id}
                  className="bg-white shadow-xl rounded-xl overflow-hidden hover:shadow-2xl transition-shadow"
                >
                  <div className="relative">
                    <AspectRatio ratio={16 / 6}>
                      <img
                        src={restaurant.imageUrl}
                        alt={restaurant.restaurantName}
                        className="w-full h-full object-cover"
                      />
                    </AspectRatio>
                  </div>
                  <CardContent className="p-4">
                    <h1 className="text-2xl font-bold">{restaurant.restaurantName}</h1>
                    <div className="mt-2 flex items-center text-gray-600">
                      <MapPin size={16} />
                      <p className="text-sm">
                        City: <span className="font-medium">{restaurant.city}</span>
                      </p>
                    </div>
                    <div className="mt-2 flex items-center text-gray-600">
                      <Globe size={16} />
                      <p className="text-sm">
                        Country: <span className="font-medium">{restaurant.country}</span>
                      </p>
                    </div>
                    <div className="flex gap-2 mt-4">
                      {restaurant.cuisines.map((cuisine: string, idx: number) => (
                        <Badge key={idx} className="font-medium px-2 py-1 rounded-full">
                          {cuisine}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="p-4 flex justify-end">
                    <Link to={`/restaurant/${restaurant._id}`}>
                      <Button className="bg-orange hover:bg-hoverOrange rounded-full">
                        View Menus
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;

const SearchPageSkeleton = () => (
  <>
    {[...Array(3)].map((_, index) => (
      <Card key={index} className="shadow-xl rounded-xl">
        <AspectRatio ratio={16 / 6}>
          <Skeleton className="w-full h-full" />
        </AspectRatio>
        <CardContent className="p-4">
          <Skeleton className="h-8 w-3/4 mb-2" />
          <Skeleton className="h-4 w-1/2 mb-2" />
          <Skeleton className="h-4 w-1/2" />
        </CardContent>
        <CardFooter className="p-4">
          <Skeleton className="h-10 w-24 rounded-full" />
        </CardFooter>
      </Card>
    ))}
  </>
);

const NoResultFound = ({ searchText }: { searchText: string }) => (
  <div className="text-center">
    <h1 className="text-2xl font-semibold">No results found</h1>
    <p className="mt-2">
      We couldn't find any results for "{searchText}". Try searching with a different term.
    </p>
    <Link to="/">
      <Button className="mt-4 bg-orange hover:bg-orangeHover">Go Back to Home</Button>
    </Link>
  </div>
);
