"use client";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useState } from "react";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Home,
  Car,
  Info,
  Calendar,
  Phone,
  User,
  LogOut,
  LayoutDashboardIcon,
  NewspaperIcon,
  Plus,
  BadgeDollarSign,
} from "lucide-react";
import { Cross as Hamburger } from "hamburger-react";
import { useUser } from "@/context/user-provider";
import { logoutUser } from "@/services/auth-services";
import { protectedRoutes } from "@/utils/constant";
import PostModal from "@/components/post-modal";
import Image from "next/image";

const Navbar = () => {
  const pathname = usePathname();
  const { user, setIsLoading } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const [isPostModalOpen, setPostModalOpen] = useState(false);
  const router = useRouter();

  const handleLogout = () => {
    logoutUser();
    setIsLoading(true);
    if (protectedRoutes.some((route) => pathname.match(route))) {
      router.push("/");
    }
  };

  console.log(user);
  // Ensure user?.name exists before using it for the avatar fallback
  const avatarFallback = user?.name.charAt(0).toUpperCase();

  const routes = [
    {
      path: "/",
      name: "News Feed",
      icon: <NewspaperIcon className="w-4 h-4 mr-2" />,
    },
    {
      path: "/about",
      name: "About Us",
      icon: <Info className="w-4 h-4 mr-2" />,
    },
    {
      path: "/contact-us",
      name: "Contact",
      icon: <Phone className="w-4 h-4 mr-2" />,
    },
  ];

  return (
    <div className="bg-sky-950 ">
      <div className="max-w-screen-xl min-h-20 mx-auto flex items-center justify-between px-3">
        {/* Logo */}
        <Link href="/">
          <div className="flex text-center items-center">
            <p className="font-bold text-muted-foreground text-white text-3xl border-2 px-4 py-2 rounded-md hover:bg-gradient w-[250px]">
              Tech <span className="text-orange-500">Tips</span>
            </p>
          </div>
        </Link>

        {/* Mobile device menus */}
        <div className="block md:hidden ">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button className="text-xl font-medium  p-0">
                <Hamburger
                  toggled={isOpen}
                  toggle={setIsOpen}
                  color="#FEA633"
                />
              </Button>
            </SheetTrigger>
            <SheetContent className="flex flex-col justify-between items-center bg-sky-950">
              <SheetHeader className="w-full ">
                <SheetTitle className="text-xl mb-4">Menu</SheetTitle>
                <div className="flex flex-col space-y-2">
                  {routes.map((route) => (
                    <SheetClose asChild key={route.path}>
                      <Link href={route.path}>
                        <p
                          className={`flex items-center font-medium text-white hover:text-orange-700 uppercase p-2 border-b ${
                            pathname === route.path ? "text-orange-800" : ""
                          }`}
                        >
                          {route.icon}
                          {route.name}
                        </p>
                      </Link>
                    </SheetClose>
                  ))}
                </div>
                {user?.email && (
                   <Button
                   onClick={() => setPostModalOpen(true)}
                   className="bg-transparent rounded-full hover:bg-black/40  text-black"
                 >
                   <Plus className="w-6 h-6 mr-1" /> Create Post
                 </Button>
               )}
              </SheetHeader>
              <SheetFooter className="w-full">
                {!user?.email ? (
                  <Link href="/login" className="w-full">
                    <Button className="w-full mt-2 cursor-pointer btn-primary">
                      <span className="relative z-10">LOGIN →</span>
                    </Button>
                  </Link>
                ) : (
                  <DropdownMenu>
                    <DropdownMenuTrigger
                      className="outline-none relative"
                      asChild
                    >
                      <Avatar className="cursor-pointer rounded-md size-10 hover:opacity-75 transition mx-auto">
                        <AvatarImage
                          src={user?.profilePhoto}
                          alt="User Avatar"
                        />
                        <AvatarFallback className="bg-sky-500 text-white rounded-md">
                          {avatarFallback}
                        </AvatarFallback>
                      </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem>
                        <User className="w-4 h-4 mr-2" />
                        <Link href={"/profile"}>Profile</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                      {user.role === "admin" ? (
                          <div className="flex items-center">
                            <LayoutDashboardIcon className="w-4 h-4 mr-2" />
                            <Link href={`/${user.role}/admin`}>Dashboard</Link>
                          </div>
                        ) : (
                          <div className="flex items-center">
                            <LayoutDashboardIcon className="w-4 h-4 mr-2" />
                            <Link href={`/${user.role}/user`}>Dashboard</Link>
                          </div>
                        )}
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <BadgeDollarSign className="w-4 h-4 mr-2" />
                        <Link href="/premium">Premium</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={handleLogout}>
                        <LogOut className="w-4 h-4 mr-2" />
                        Logout
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>

        {/* Navigation menu for large screens */}
        <div className="hidden md:flex w-full justify-center items-center gap-12">
          {routes.map((route) => (
            <Link key={route.path} href={route.path}>
              <p
                className={`flex items-center font-medium uppercase ${
                  pathname === route.path
                    ? "text-orange-500"
                    : "text-white hover:text-orange-500"
                }`}
              >
                {route.icon}
                {route.name}
              </p>
            </Link>
          ))}
        </div>

        {/* New Post button for large screens */}
        <div className="hidden md:flex items-center mr-2">
          {user?.email && (
            <Button
              onClick={() => setPostModalOpen(true)}
              className="bg-transparent rounded-full hover:bg-black/40  text-white"
            >
              <Plus className="w-6 h-6 mr-1" /> Create Post
            </Button>
          )}
        </div>
        <div className="hidden md:flex items-center ml-auto">
          {!user?.email ? (
            <Link href="/login">
              <Button className="btn-primary ">LOGIN</Button>
            </Link>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger className="outline-none relative" asChild>
                <Avatar className="cursor-pointer rounded-md size-10 hover:opacity-75 transition mx-auto">
                  <AvatarImage src={user?.profilePhoto} alt="User Avatar" />
                  <AvatarFallback className="bg-sky-500 text-white rounded-md">
                    {avatarFallback}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <User className="w-4 h-4 mr-2" />
                  <Link href="/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  {user.role === "admin" ? (
                    <div className="flex items-center">
                      <LayoutDashboardIcon className="w-4 h-4 mr-2" />
                      <Link href={`/${user.role}/admin`}>Dashboard</Link>
                    </div>
                      ) : (
                        <div className="flex items-center">
                          <LayoutDashboardIcon className="w-4 h-4 mr-2" />
                          <Link href={`/${user.role}/user`}>Dashboard</Link>
                        </div>
                      )}
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <BadgeDollarSign className="w-4 h-4 mr-2" />
                      <Link href="/premium">Premium</Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
      {/* Post Modal */}
      <PostModal
        isOpen={isPostModalOpen}
        onClose={() => setPostModalOpen(false)}
      />
    </div>
  );
};

export default Navbar;
