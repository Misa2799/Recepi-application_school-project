"use client";

import { useEffect, useState } from "react";
import { getRecipesList} from '@/app/actions'
import { ChevronLeft, ChevronRight } from "lucide-react";

const recipeCategories = [
  "All",
  "Breakfast",
  "Lunch",
  "Dinner",
  "Dessert",
  "Snack",
  "Side Dish",
  "Appetizer",
  "Beverage",
];

type Recipe = {
  id: number;
  name: string;
  image: string;
  mealType: string;
};

export default function HomePage() {
  const [recipesData, setRecipesData] = useState<Recipe[]>([]);
  const [currentCategory, setCurrentCategory] = useState("All");
  const [currentIndex, setCurrentIndex] = useState(0);

  const fetchRecipes = async () => {
    const fetchedTasks = await getRecipesList();
    const recipes = fetchedTasks.recipes;

    const filteredRecipes =
      currentCategory === "All"
        ? recipes
        : recipes.filter((recipe: { mealType: string | string[] }) =>
            recipe.mealType.includes(currentCategory)
          );
    const uniqueRecipes: Recipe[] = [];
    const seenMealTypes = new Set();

    filteredRecipes.forEach(
      (recipe: { id: any; name: any; image: any; mealType: any }) => {
        const { id, name, image, mealType } = recipe;

        if (seenMealTypes.has(mealType)) {
          return;
        }
        if (id !== undefined && name && image) {
          uniqueRecipes.push({ id, name, image, mealType });
          seenMealTypes.add(mealType);
        }
      }
    );

    setRecipesData(uniqueRecipes);
    setCurrentIndex(0);
  };

  useEffect(() => {
    fetchRecipes();
  }, [currentCategory]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % recipesData.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => prevIndex - 1 + recipesData.length + recipesData.length
    );
  };
  return (
    <div className="min-h-screen bg-gray-100">
      <main className="container mx-auto mt-8 px-4">
        <h1 className="text-3xl font-bold mb-6">Explore New Recipes</h1>

        <div className="relative mb-8">
          <div className="overflow-hidden rounded-lg shadow-lg">
            <div
              className={`flex ${
                recipesData.length < 4 ? "justify-center" : ""
              }`}
            >
              {Array.from({ length: Math.min(4, recipesData.length) }).map(
                (_, offset) => {
                  const index = (currentIndex + offset) % recipesData.length;
                  return (
                    <div key={recipesData[index].id} className="w-1/4 p-2">
                      <img
                        src={recipesData[index].image}
                        alt={recipesData[index].name}
                        className="w-full h-48 object-cover rounded-lg"
                      />
                      <h2 className="mt-2 text-center text-sm font-semibold">
                        {recipesData[index].name}
                      </h2>
                    </div>
                  );
                }
              )}
            </div>
          </div>
          <button
            onClick={prevSlide}
            className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        <h2 className="text-2xl font-bold mb-4">Recipe Categories</h2>
        <div className="flex space-x-4 mb-8 overflow-x-auto pb-2">
          {recipeCategories.map((mealType) => (
            <button
              key={mealType}
              onClick={() => setCurrentCategory(mealType)}
              className={`px-4 py-2 rounded-full ${
                currentCategory === mealType
                  ? "bg-primary text-primary-foreground"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              }`}
            >
              {mealType}
            </button>
          ))}
        </div>

        <h2 className="text-2xl font-bold mb-4">Explore More Recipes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {recipesData.map((recipe) => (
            <div
              key={recipe.id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <img
                src={recipe.image}
                alt={recipe.name || "Recipe Image"}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold">{recipe.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
