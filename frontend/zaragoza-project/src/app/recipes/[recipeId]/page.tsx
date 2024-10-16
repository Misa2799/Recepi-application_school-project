"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { getRecipeById } from "@/app/actions";
import { Recipe } from "@/types/types";

const RecipeDetails = () => {
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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!recipe || Object.keys(recipe).length === 0) {
    return <div>Recipe not found</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">{recipe.name}</h1>
      <img src={recipe.image} alt={recipe.name} className="w-full h-64 object-cover rounded mb-4" />
      <p>
        <strong>Cuisine:</strong> {recipe.cuisine}
      </p>
      <p>
        <strong>Prep Time:</strong> {recipe.prepTimeMinutes} minutes
      </p>
      <p>
        <strong>Cook Time:</strong> {recipe.cookTimeMinutes} minutes
      </p>
      <p>
        <strong>Servings:</strong> {recipe.servings}
      </p>
      <h2 className="text-xl font-semibold mt-4">Ingredients:</h2>
      <ul className="list-disc pl-5">
        {recipe.ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
      <h2 className="text-xl font-semibold mt-4">Instructions:</h2>
      <ol className="list-decimal pl-5">
        {recipe.instructions.map((instruction, index) => (
          <li key={index} className="mb-2">
            {instruction}
          </li>
        ))}
      </ol>
    </div>
  );
};

export default RecipeDetails;