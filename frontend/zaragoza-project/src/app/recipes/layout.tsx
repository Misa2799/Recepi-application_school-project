'use client'
import FridgeSideBar from "@/components/fridgeSideBar";
import ItemsList from "@/components/itemsList";
import RecipesSideBar from "@/components/recipesSideBar";
import { useAuth } from "@clerk/nextjs";

export default function RecipesListLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = useAuth();
  return (user.userId ? (
    <div className="grid grid-cols-12 gap-4 h-full">
      <div className="col-span-2">
        <FridgeSideBar />
      </div>
      <div className="col-span-8 py-8 mr-3 overflow-auto">
        {children}
      </div>
      <div className="col-span-2">
        <RecipesSideBar />
      </div>
    </div>
  ) : (
    <div >
        {children}
    </div>
  ));
}