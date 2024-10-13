"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUser } from "@/context/user-provider";
import { useState } from "react";
import { Cross as Hamburger } from "hamburger-react";
import { logoutUser } from "@/services/auth-services";
import { Home, LogOut } from "lucide-react";
import Loader from "../Loader";

const Sidebar = () => {
  const { user, setIsLoading, isLoading } = useUser();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const adminRoutes = [
    {
      name: "Admin",
      path: "/admin/admin",
    },
    {
      name: "Manage Posts",
      path: "/admin/manage-posts",
    },
    {
      name: "Manage Users",
      path: "/admin/manage-users",
    },
    {
      name: "Activity Logs",
      path: "/admin/activity-logs",
    },
    {
      name: "Manage Admin",
      path: "/admin/manage-admin",
    },
    {
      name: "Payments History",
      path: "/admin/payment-history",
    }
  
  ];

  const userRoutes = [
    {
      name: "User Analytics",
      path: "/user/user-analytics",
    },
    {
      name: "My Posts",
      path: "/user/my-posts",
    },
    {
      name: "User Payment",
      path: "/user/user-payment",
    },
  ];

  const handleLogout = () => {
    logoutUser();
    setIsLoading(true);
    router.push("/");
  };

  const avatarFallback = user?.name ? user.name.charAt(0).toUpperCase() : "U";

  if (isLoading) return <Loader />;

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="w-[280px] px-6 py-10 border-r h-[100vh] hidden lg:block fixed top-0 left-0 bg-gray-900 shadow-lg text-gray-200">
        {/* Logo */}
        <div className="max-w-[180px] pb-6 text-center mx-auto border-b border-gray-700">
          <h1 className="mb-4 text-lg text-gray-300">
            Welcome Tech <span className="text-orange-500">Tips</span> 😍
          </h1>
          <DropdownMenu>
            <DropdownMenuTrigger className="outline-none relative" asChild>
              <Avatar className="cursor-pointer rounded-md size-10 hover:opacity-75 transition mx-auto">
                <AvatarImage src={user?.profilePhoto} alt="User Avatar" />
                <AvatarFallback className="bg-sky-500 text-white rounded-md">
                  {avatarFallback}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-gray-800 text-gray-300">
              <DropdownMenuItem className="hover:bg-gray-700">
                <Home className="w-4 h-4 mr-2" />
                <Link href={"/"}>Home</Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="hover:bg-gray-700"
                onClick={handleLogout}
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Routes */}
        <div className="flex flex-col gap-6 py-8">
          {user?.role === "admin"
            ? adminRoutes.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`text-gray-400 hover:text-orange-500 p-2 flex gap-3 items-center text-lg rounded-xl transition-colors duration-200 ${
                    pathname === item.path
                      ? "text-orange-500 bg-gray-800 border-l-4 border-orange-500"
                      : ""
                  }`}
                >
                  {item.name}
                </Link>
              ))
            : userRoutes.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`text-gray-400 hover:text-orange-500 p-2 flex gap-3 items-center text-lg rounded-xl transition-colors duration-200 ${
                    pathname === item.path
                      ? "text-orange-500 bg-gray-800 border-l-4 border-orange-500"
                      : ""
                  }`}
                >
                  {item.name}
                </Link>
              ))}
        </div>
      </div>

      {/* Mobile Sidebar (Sheet) */}
      <div className="flex items-center justify-between h-20 bg-gray-800 px-4 lg:hidden shadow-md text-gray-200">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button className="text-xl font-medium bg-transparent hover:bg-transparent p-0">
              <Hamburger toggled={isOpen} toggle={setIsOpen} color="#FEA633" />
            </Button>
          </SheetTrigger>
          <SheetContent className="bg-gray-900 text-gray-300">
            <SheetHeader>
              <SheetTitle className="mb-4 text-gray-400 text-center">
                Welcome Tech <span className="text-orange-500">Tips</span> 😍
              </SheetTitle>
              <SheetTitle className="font-bold uppercase text-gray-400 text-center">
                <DropdownMenu>
                  <DropdownMenuTrigger
                    className="outline-none relative mb-4"
                    asChild
                  >
                    <Avatar className="cursor-pointer rounded-md size-10 hover:opacity-75 transition mx-auto">
                      <AvatarImage src={user?.profilePhoto} alt="User Avatar" />
                      <AvatarFallback className="bg-sky-500 text-white rounded-md">
                        {avatarFallback}
                      </AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-gray-800 text-gray-300">
                    <DropdownMenuItem className="hover:bg-gray-700">
                      <Home className="w-4 h-4 mr-2" />
                      <Link href={"/"}>Home</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="hover:bg-gray-700"
                      onClick={handleLogout}
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </SheetTitle>
            </SheetHeader>

            <div className="flex flex-col gap-6 py-8 border-t border-gray-700">
              {user?.role === "admin"
                ? adminRoutes.map((item) => (
                    <SheetClose asChild key={item.path}>
                      <Link
                        href={item.path}
                        className={`text-gray-400 hover:text-orange-500 p-2 flex gap-3 items-center text-lg rounded-xl transition-colors duration-200 ${
                          pathname === item.path
                            ? "text-orange-500 bg-gray-800 border-l-4 border-orange-500"
                            : ""
                        }`}
                      >
                        {item.name}
                      </Link>
                    </SheetClose>
                  ))
                : userRoutes.map((item) => (
                    <SheetClose asChild key={item.path}>
                      <Link
                        href={item.path}
                        className={`text-gray-400 hover:text-orange-500 p-2 flex gap-3 items-center text-lg rounded-xl transition-colors duration-200 ${
                          pathname === item.path
                            ? "text-orange-500 bg-gray-800 border-l-4 border-orange-500"
                            : ""
                        }`}
                      >
                        {item.name}
                      </Link>
                    </SheetClose>
                  ))}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
};

export default Sidebar;
