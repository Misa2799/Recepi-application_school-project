"use client";

import { Recipe } from "@/types/types";
import { ChevronRight, CookingPot, Search } from "lucide-react";
import { useState, useEffect } from "react";
import { useShoppingList } from "@/context/shoppingListContext.context";
import CustomAlertDialog from "./AlertDialog";
import { ScrollArea } from "./ui/scroll-area";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export default function RecipesSideBar() {
  const [foodItems, setFoodItems] = useState<Recipe[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const { recipes, removeRecipe } = useShoppingList();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedRecipeId, setSelectedRecipeId] = useState<number | null>(null);

  useEffect(() => {
    const fetchWishlistRecipes = async () => {
      if (recipes.length === 0) {
        return;
      }
      setFoodItems(recipes);
      setLoading(false);
    };

    fetchWishlistRecipes();
  }, [recipes]);

  const filteredItems = foodItems.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleRemoveClick = (id: number) => {
    setSelectedRecipeId(id);
    setIsDialogOpen(true);
  };

  const handleConfirmRemove = () => {
    if (selectedRecipeId !== null) {
      removeRecipe(selectedRecipeId);
      setIsDialogOpen(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="fixed right-0 top-16 h-[calc(100vh-4rem)] w-80 bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="p-4 bg-yellow-400">
        <h2 className="flex items-center text-2xl font-bold text-white">
            <CookingPot className="mr-2"/>
            My recipes
          </h2>
      </div>
      <div className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder="Search recipes..."
            className="pl-10 w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <ScrollArea className="h-[calc(100vh-200px)]">
        <div className="p-4">
          {filteredItems.map((recipe) => (
            <div key={recipe.id} className="flex items-center justify-between py-2 hover:bg-gray-100 rounded-md px-2">
              <div>
                <p className="font-medium">{recipe.name}</p>
                <p className="text-sm text-gray-500">{recipe.cuisine}</p>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <ChevronRight className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleRemoveClick(recipe.id)}>
                  <span className="text-red-500">X</span>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
      <div className="hidden">
      <CustomAlertDialog
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onConfirm={handleConfirmRemove}
        title="Remove Recipe"
        description="Are you sure you want to remove this recipe?"
      />
      </div>
    </div>
  );
}