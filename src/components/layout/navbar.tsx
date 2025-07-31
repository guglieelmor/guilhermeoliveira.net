import * as React from "react"; 
import {
  NavigationMenu, 
  NavigationMenuList, 
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";

export default function Navbar() { 
  return (
    <header className="fixed top-5 left-1/2 z-50 w-[min(90%,700px)] -translate-x-1/2 rounded-full border bg-background/70 backdrop-blur-md lg:top-12">
      <div className="flex items-center justify-between px-6 py-3">
        {/* <Link href="/" className="flex shrink-0 items-center gap-2">
          <Image
            src="/images/block/block-1.svg"
            alt="logo"
            width={40}
            height={40}
          />
        </Link> */}
        <NavigationMenu className="hidden lg:flex">
          <NavigationMenuList>
            {/* <NavigationMenuItem>
              <NavigationMenuTrigger>Features</NavigationMenuTrigger>
              <NavigationMenuContent className="p-4 space-y-3">
                <Link href="#" className="block font-medium hover:underline">
                  Modern product teams
                </Link>
                <Link href="#" className="block font-medium hover:underline">
                  Resource Allocation
                </Link>
              </NavigationMenuContent>
            </NavigationMenuItem>
            {menus.map((item) => (
              <NavigationMenuItem key={item}>
                <Link
                  href="#"
                  className="px-3 text-sm font-medium text-muted-foreground hover:text-primary"
                >
                  {item}
                </Link>
              </NavigationMenuItem>
            ))} */}
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex items-center gap-2.5"> 
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden">
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="top">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
                <div className="flex flex-col gap-4 py-4">
                  {/* <NavigationMenu>
                    <NavigationMenuList className="flex flex-col space-y-2">
                      <NavigationMenuItem>
                        <NavigationMenuTrigger>Features</NavigationMenuTrigger>
                        <NavigationMenuContent className="p-4 space-y-2">
                          <Link
                            href="#"
                            className="block font-medium hover:underline"
                          >
                            Modern product teams
                          </Link>
                          <Link
                            href="#"
                            className="block font-medium hover:underline"
                          >
                            Resource Allocation
                          </Link>
                        </NavigationMenuContent>
                      </NavigationMenuItem>
                      {["About Us", "Pricing", "FAQ", "Contact"].map((item) => (
                        <NavigationMenuItem key={item}>
                          <Link
                            href="#"
                            className="text-base font-medium text-primary hover:underline"
                          >
                            {item}
                          </Link>
                        </NavigationMenuItem>
                      ))}
                    </NavigationMenuList>
                  </NavigationMenu> */}
                </div>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
