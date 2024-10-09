import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Sandwich } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

const Header = () => {
  return (
    <header className="bg-gray-900 py-4">
      <div className="container mx-auto flex flex-wrap items-center justify-between px-4">
        <div className="flex items-center space-x-4">
          <Sandwich className="h-6 w-6 text-yellow-400" />
          <span className="text-xl font-bold text-white">TastyTrove</span>
          <nav className="hidden space-x-4 sm:flex">
            <Link
              href="/recipes"
              className="text-sm font-medium text-gray-300 hover:text-white"
            >
              Recipes
            </Link>
            <Link
              href="/shopping-list"
              className="text-sm font-medium text-gray-300 hover:text-white"
            >
              Shopping List
            </Link>
          </nav>
        </div>
        <div className="flex items-center space-x-4">
          {/* <Button
            variant="outline"
            size="sm"
            className="text-black hover:bg-yellow-400"
          >
            Log in
          </Button>
          <Avatar className="h-8 w-8 ring-2 ring-yellow-400 text-center">
            <AvatarImage src="/placeholder-user.jpg" alt="User" />
            <AvatarFallback className="text-yellow-400">U</AvatarFallback>
          </Avatar> */}
          <SignedOut>
            <SignInButton>
              <Button
                variant="outline"
                size="sm"
                className="text-black hover:bg-yellow-400"
              >
                Sign In / Sign Up
              </Button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </div>
    </header>
  );
};

export default Header;
