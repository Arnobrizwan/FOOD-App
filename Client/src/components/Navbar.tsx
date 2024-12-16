import { Link } from "react-router-dom";
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger } from "./ui/menubar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { HandPlatter, Loader2, Menu, Moon, PackageCheck, ShoppingCart, SquareMenu, Sun, User, UtensilsCrossed } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { Separator } from "./ui/separator";

const Navbar = () => {
  const admin = true;
  const loading = false;
  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center justify-between h-14">

        <Link to="/">
          <h1 className="font-bold md:font-extrabold text-2xl text-black absolute left-4 top-4">FoodTiger</h1>
        </Link>


        <div className="hidden md:flex items-center gap-10"  >
          <div className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-gray-800 hover:text-gray-600 font-medium ">Home</Link>
            <Link to="/profile" className="text-gray-800 hover:text-gray-600 font-medium ">Profile</Link>
            <Link to="/order/status" className="text-gray-800 hover:text-gray-600 font-medium">Order</Link>


            {
              admin && (
                <Menubar>
                  <MenubarMenu>
                    <MenubarTrigger className="bg-white text-black font-medium px-4 py-2 rounded-md shadow-md hover:bg-gray-100">
                      Dashboard
                    </MenubarTrigger>
                    <MenubarContent>
                      <Link to="/admin/restaurant">
                        <MenubarItem className="text-black hover:bg-gray-100 hover:text-gray-800">Restaurant</MenubarItem></Link>
                      <Link to="/admin/menu">
                        <MenubarItem className="text-black hover:bg-gray-100 hover:text-gray-800">Menu</MenubarItem></Link>
                      <Link to="/admin/orders">
                        <MenubarItem className="text-black hover:bg-gray-100 hover:text-gray-800">Orders</MenubarItem></Link>
                    </MenubarContent>
                  </MenubarMenu>
                </Menubar>
              )}
          </div>
          <div className="flex items-center gap-4">
            <div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                    <span className="sr-only">Toggle theme</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem >
                    Light
                  </DropdownMenuItem>
                  <DropdownMenuItem >
                    Dark
                  </DropdownMenuItem>

                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <Link to="/cart" className="relative cursor-pointer">
              <ShoppingCart />
              <Button size={'icon'} className="absolute -inset-y-3 left-2 text-xs rounded-full h-4 w-4 bg-red-500 hover:bg-red-500">2</Button>
            </Link>
            <div>
              <Avatar>
                <AvatarImage />
                <AvatarFallback>AR</AvatarFallback>
              </Avatar>
            </div>
            <div>
              {
                loading ? (
                  <Button className="bg-orange hover:bg-hoverOrange">

                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Please Wait
                  </Button>
                ) : (
                  <Button className="bg-orange hover:bg-hoverOrange">Logout
                  </Button>
                )
              }
            </div>
          </div>
        </div>
        <div className="md:hidden lg:hidden">
          {/*Mobile responsive*/}
          <MobileNavbar />
        </div>

      </div>
    </div>

  );
};

export default Navbar;


const MobileNavbar = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size={'icon'} className="rounded-full bg-gray-200 text-black hover:bg-gray" variant="outline">
          <Menu size={'18'} />
        </Button>
      </SheetTrigger>

      <SheetContent className="flex flex-col">
        <SheetHeader className="flex flex-row items-center justify-between mt-2">
          <SheetTitle>FoodTiger</SheetTitle>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem >
                Light
              </DropdownMenuItem>
              <DropdownMenuItem >
                Dark
              </DropdownMenuItem>

            </DropdownMenuContent>
          </DropdownMenu>

        </SheetHeader>
        <Separator className="my-2" />
        <SheetDescription className="flex-1">
          <Link to="/profile" className="flex items-center gap-4 hover:bg-gray-200 px-3 py-2 rounded-lg cursor-pointer hover:text-gray-900 font-medium">
            <User />
            <span>Profile</span>
          </Link>
          <Link to="/profile" className="flex items-center gap-4 hover:bg-gray-200 px-3 py-2 rounded-lg cursor-pointer hover:text-gray-900 font-medium">
            <HandPlatter />
            <span>Order</span>
          </Link>
          <Link to="/cart" className="flex items-center gap-4 hover:bg-gray-200 px-3 py-2 rounded-lg cursor-pointer hover:text-gray-900 font-medium">
            <ShoppingCart />
            <span>cart (0)</span>
          </Link>
          <Link to="/profile" className="flex items-center gap-4 hover:bg-gray-200 px-3 py-2 rounded-lg cursor-pointer hover:text-gray-900 font-medium">
            <SquareMenu />
            <span>Menu</span>
          </Link>
          <Link to="/profile" className="flex items-center gap-4 hover:bg-gray-200 px-3 py-2 rounded-lg cursor-pointer hover:text-gray-900 font-medium">
            <UtensilsCrossed />
            <span>Restaurant</span>
          </Link>
          <Link to="/profile" className="flex items-center gap-4 hover:bg-gray-200 px-3 py-2 rounded-lg cursor-pointer hover:text-gray-900 font-medium">
            <PackageCheck />
            <span>Restaurant Orders</span>
          </Link>
        </SheetDescription>
        <SheetFooter className="flex flex-col gap-2">
          <>
            <div className="flex flex-row items-center gap-2">
              <Avatar>
                <AvatarFallback>AR</AvatarFallback>
              </Avatar>
              <h1 className="font-bold text-xl"> Arnob Rizwan </h1>

            </div>
          </>

          <SheetClose asChild>
            <Button type="submit" className="bg-orange hover:bg-hoverOrange">Logout</Button>
          </SheetClose>


        </SheetFooter>

      </SheetContent>
    </Sheet>

  )
}


