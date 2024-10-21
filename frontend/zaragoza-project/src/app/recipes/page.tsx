"use client";

import React, { useEffect, useState } from "react";
import { getRecipesList } from "../actions";
import { useAuth } from "@clerk/nextjs";
import { Recipe } from "@/types/types";
import { addWishlist, getWishlist } from "./actions";
import { useShoppingList } from "@/context/shoppingListContext.context";
import { useRouter } from "next/navigation"; // Import useRouter
import { ScrollArea } from "@/components/ui/scroll-area"; // Import ScrollArea

const Recipes = () => {
  const [recipesList, setRecipes] = useState<Recipe[]>([]);
  const [filteredCuisine, setFilteredCuisine] = useState<string | null>(null);
  const [filteredMealType, setFilteredMealType] = useState<string[] | null>([]);
  const [filteredTags, setFilteredTags] = useState<string[]>([]);
  const [filteredRating, setFilteredRating] = useState<number | null>(null);
  const [filteredReviewCount, setFilteredReviewCount] = useState<number | null>(null);
  const [filteredPrepTime, setFilteredPrepTime] = useState<number | null>(null);
  const [showOnlyFridgeIngredients, setShowOnlyFridgeIngredients] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const user = useAuth();
  const { addRecipeToWishlist, items } = useShoppingList();
  const router = useRouter(); 

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    const fetchedRecipes = await getRecipesList();
    setRecipes(fetchedRecipes.recipes);
  };

  const addRecipe = async (recipe: Recipe) => {
    if (user.userId) {
      const success = await addWishlist(user.userId, [recipe.id.toString()]);
      if (success) {
        addRecipeToWishlist(recipe);
      } else {
        console.error("Failed to add to wishlist");
      }
    } else {
      console.error("User ID is not available");
    }
  };

  const filterByCuisine = (cuisine: string) => {
    setFilteredCuisine(cuisine);
  };

  const filterByMealType = (mealType: string[]) => {
    setFilteredMealType(mealType);
  };

  const filterByTags = (tags: string[]) => {
    setFilteredTags(tags);
  };

  const filterByRating = (rating: number) => {
    setFilteredRating(rating);
  };

  const filterByReviewCount = (reviewCount: number) => {
    setFilteredReviewCount(reviewCount);
  };

  const filterByPrepTime = (prepTime: number) => {
    setFilteredPrepTime(prepTime);
  };

  const clearFilter = () => {
    setFilteredCuisine(null);
    setFilteredMealType([]);
    setFilteredTags([]);
    setFilteredRating(null);
    setFilteredReviewCount(null);
    setFilteredPrepTime(null);
    setShowOnlyFridgeIngredients(false);
    setSearchTerm("");
  };

  const handleCheckboxChange = () => {
    setShowOnlyFridgeIngredients(!showOnlyFridgeIngredients);
  };

  const displayedRecipes = recipesList.filter((recipe) => {
    if (filteredCuisine && recipe.cuisine !== filteredCuisine) {
      return false;
    }
    if (filteredMealType && !filteredMealType.every(type => recipe.mealType.includes(type))) {
      return false;
    }
    if (filteredTags.length > 0 && !filteredTags.every(tag => recipe.tags.includes(tag))) {
      return false;
    }
    if (filteredRating && recipe.rating < filteredRating) {
      return false;
    }
    if (filteredReviewCount && recipe.reviewCount < filteredReviewCount) {
      return false;
    }
    if (filteredPrepTime && recipe.prepTimeMinutes < filteredPrepTime) {
      return false;
    }
    if (showOnlyFridgeIngredients) {
      const fridgeIngredients = items.filter(item => item.amount > 0).map(item => item.name.toLowerCase());
      return recipe.ingredients.every(ingredient => fridgeIngredients.includes(ingredient.toLowerCase()));
    }
    if (searchTerm && !recipe.name.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    return true;
  });

  return (
    <div className="flex flex-col h-full">
      <div className="flex  justify-between items-center mb-4">
        <div className="bg-gray-100 p-4 rounded w-full md:w-auto">
          <p className="font-semibold pt-2">Filter Area for recipes</p>
          <div className="grid grid-cols-8 gap-4 justify-between mt-2">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="fridge-ingredients"
                checked={showOnlyFridgeIngredients}
                onChange={handleCheckboxChange}
                className="mr-2"
              />
              <label htmlFor="fridge-ingredients" className="text-sm text-gray-600">
                Show only recipes with ingredients in the fridge
              </label>
            </div>
            <div>
              <label className="text-sm text-gray-600">Cuisine:</label>
              <select onChange={(e) => filterByCuisine(e.target.value)} className="ml-2 p-1 border border-gray-300 rounded w-full">
                <option value="">All</option>
                <option value="Italian">Italian</option>
                <option value="Chinese">Chinese</option>
                <option value="Indian">Indian</option>
                {/* Add more cuisines as needed */}
              </select>
            </div>
            <div>
              <label className="text-sm text-gray-600">Meal Type:</label>
              <select onChange={(e) => filterByMealType([e.target.value])} className="ml-2 p-1 border border-gray-300 rounded w-full">
                <option value="Breakfast">Breakfast</option>
                <option value="Lunch">Lunch</option>
                <option value="Dinner">Dinner</option>
                {/* Add more meal types as needed */}
              </select>
            </div>
            <div>
              <label className="text-sm text-gray-600">Tags:</label>
              <input
                type="text"
                placeholder="Enter tags separated by commas"
                onChange={(e) => filterByTags(e.target.value.split(',').map(tag => tag.trim()))}
                className="ml-2 p-1 border border-gray-300 rounded w-full"
              />
            </div>
            <div>
              <label className="text-sm text-gray-600">Rating:</label>
              <input
                type="number"
                min="1"
                max="5"
                onChange={(e) => filterByRating(Number(e.target.value))}
                className="ml-2 p-1 border border-gray-300 rounded w-full"
              />
            </div>
            <div>
              <label className="text-sm text-gray-600">Review Count:</label>
              <input
                type="number"
                min="1"
                onChange={(e) => filterByReviewCount(Number(e.target.value))}
                className="ml-2 p-1 border border-gray-300 rounded w-full"
              />
            </div>
            <div>
              <label className="text-sm text-gray-600">Prep Time (minutes):</label>
              <input
                type="number"
                min="1"
                onChange={(e) => filterByPrepTime(Number(e.target.value))}
                className="ml-2 p-1 border border-gray-300 rounded w-full"
              />
            </div>
            
          </div>
          <div className="mt-3">
          <h2 className="font-semibold text-lg">Search Recipes</h2>
          <input
            type="text"
            placeholder="Search Recipes"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-80 p-2 border border-gray-300 rounded"
          />
          <button onClick={clearFilter} className="mt-4 bg-red-500 text-white mx-3 py-1 rounded w-40">
            Clear Filters
          </button>
          </div>
        </div>
        
      </div>
      <ScrollArea className="flex-1">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
          {displayedRecipes.map((recipe) => (
            <div key={recipe.id} className="border border-gray-300 p-4 rounded shadow">
              <img
                src={recipe.image}
                alt={recipe.name}
                className="w-full h-32 object-cover rounded mb-2"
              />
              <h3 className="font-semibold text-lg">{recipe.name}</h3>
              <p className="text-sm text-gray-600">Rating: {recipe.rating}</p>
              <p className="text-sm text-gray-600">Cook Time: {recipe.cookTimeMinutes} mins</p>
              <p className="text-sm text-gray-600">Servings: {recipe.servings}</p>
              <div className="flex justify-between mt-4">
                <button
                  className="bg-blue-500 text-white px-3 py-1 rounded"
                  onClick={() => router.push(`/recipes/details?recipeId=${recipe.id}`)} // Correct URL construction
                >
                  More
                </button>
                {user.userId && (
                  <button
                    className="bg-green-500 text-white px-3 py-1 rounded"
                    onClick={() => addRecipe(recipe)}
                  >
                    Add
                  </button>
                )}
                
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default Recipes;