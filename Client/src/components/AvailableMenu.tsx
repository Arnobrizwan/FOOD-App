import { Button } from "./ui/button";
import { Card, CardContent, CardFooter } from "./ui/card";
import { useNavigate } from "react-router-dom";

interface MenuItem {
  name: string;
  description: string;
  price: number;
  image: string;
}

const AvailableMenu = ({ menus }: { menus: MenuItem[] }) => {
  const addToCart = (menu: MenuItem) => {
    console.log("Added to Cart:", menu);
    alert(`${menu.name} has been added to your cart!`);
  };

  const navigate = useNavigate();

  return (
    <div className="md:p-4">
      <h1 className="text-xl md:text-2xl font-extrabold mb-6">Available Menus</h1>
      <div className="grid md:grid-cols-3 gap-4">
        {menus.map((menu, idx) => (
          <Card key={idx} className="max-w-xs mx-auto shadow-lg rounded-lg overflow-hidden">
            {/* Menu Image */}
            <img
              src={menu.image || "https://via.placeholder.com/300x200"}
              alt={menu.name || "Menu Image"}
              className="w-full h-40 object-cover"
            />
            {/* Card Content */}
            <CardContent className="p-4">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                {menu.name || "Unknown Dish"}
              </h2>
              <p className="text-sm text-gray-600 mt-2 dark:text-gray-300">
                {menu.description || "No description available"}
              </p>
              <h3 className="text-lg font-semibold mt-4">
                Price: <span className="text-[#D19254]">₹{menu.price || 0}</span>
              </h3>
            </CardContent>
            {/* Card Footer */}
            <CardFooter className="p-4">
              <Button
                onClick={() => {
                  addToCart(menu);
                  navigate("/cart");
                }}
                className="w-full bg-orange hover:bg-hoverOrange"
              >
                Add to Cart
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AvailableMenu;
