import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function TastyTroveHomepage() {
  return (
    <div className="min-h-screen bg-yellow-400">
      <div className="container mx-auto px-4 py-8">
        <header className="flex justify-between items-center mb-16">
          <h1 className="text-3xl font-bold text-white">Tasty Trove</h1>
          <nav>
            <ul className="flex space-x-4">
              <li>
                <Button
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-yellow-400"
                >
                  Sign In
                </Button>
              </li>
              <li>
                <Button className="bg-white text-yellow-400 hover:bg-yellow-100">
                  Sign Up
                </Button>
              </li>
            </ul>
          </nav>
        </header>

        <main className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
              The #1 Sous-chef in your Kitchen
            </h2>
            <p className="text-xl text-yellow-100 mb-8">
              Tasty Trove is a web-based application that allows you to manage
              your food inventory, create shopping lists, and share recipes with
              friends and family.
            </p>
            <Button className="bg-white text-yellow-400 hover:bg-yellow-100 text-lg px-8 py-3">
              Start Cooking
            </Button>
          </div>
          <div className="md:w-1/2">
            <div className="relative">
              <Image
                src="/placeholder.svg?height=500&width=500"
                alt="Colorful food ingredients"
                width={500}
                height={500}
                className="rounded-full"
              />
              <div className="absolute -top-4 -left-4 bg-white rounded-full p-4 shadow-lg">
                <Image
                  src="/placeholder.svg?height=80&width=80"
                  alt="Chef hat icon"
                  width={80}
                  height={80}
                />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
