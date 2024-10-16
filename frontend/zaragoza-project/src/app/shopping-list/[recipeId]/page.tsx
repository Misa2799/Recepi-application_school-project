"use client";

import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getRecipe, getRecipeById } from "@/app/actions";
import FridgeSideBar from "@/components/fridgeSideBar";
import RecipesSideBar from "@/components/recipesSideBar";
import { Recipe } from "@/types/types";
import Link from "next/link";


export default function FridgeRecipeDetail() {
  const searchParams = useSearchParams();
  const recipeId = searchParams.get("recipeId");
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!recipeId) return;

    const fetchRecipeDetails = async () => {
      try {
        const data = await getRecipeById(recipeId);
        setRecipe(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching recipe details:", error);
        setLoading(false);
      }
    };

    fetchRecipeDetails();
  }, [recipeId]);

  if( recipe === null) {
    return <div>Recipe not found</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
        <div id="recipe" className="col-span-6  text-gray-900">
          <Link href="/shopping-list" className="text-2xl" >Back to recipes</Link>
          <div className="mt-3">
            <h2 className="text-3xl font-bold">{recipe.name}</h2>
            <img
              src={recipe.image}
              alt={recipe.name}
              className="w-full h-48 object-cover rounded-md my-4"
            />
            <p className="mt-4 text-xl font-semibold pt-4 border border-transparent border-t-gray-900">
              Ingredients
            </p>
            <ul className="pl-10 mt-4">
              {recipe.ingredients.map((ingredient, index) => (
                <li className="space-x-2 my-2 list-disc" key={index}>
                  {ingredient}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xl font-semibold  pt-4 border border-transparent border-t-gray-900">
              Instructions
            </p>
            <ol className="pl-5 mt-4">
              {recipe.instructions.map((instruction, index) => (
                <li className="space-x-2 my-2 " key={index}>
                  <p>
                    <span className="font-bold">Step{index + 1}:</span>{" "}
                    {instruction}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </div>
    </>
  );
}
