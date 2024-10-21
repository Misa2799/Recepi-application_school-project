"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getRecipeById } from "@/app/actions";
import { Recipe } from "@/types/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Users } from "lucide-react"
import Link from "next/link";

const RecipeDetails = () => {
  const searchParams = useSearchParams();
  const recipeId = searchParams.get("recipeId");
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

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
  const moveBack = () => {
    router.back();
  }
  if (loading) {
    return <div>Loading...</div>;
  }

  if (!recipe || Object.keys(recipe).length === 0) {
    return <div>Recipe not found</div>;
  }


  return (
    <div className="container mx-auto p-4 space-y-6">
      <Link href='' onClick={moveBack} className="text-2xl" >Back to recipes</Link>
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold">{recipe.name}</CardTitle>
          <Badge>{recipe.cuisine}</Badge>
        </CardHeader>
        <CardContent>
          <img src={recipe.image} alt={recipe.name} className="w-full h-96 object-cover rounded-lg mb-4" />
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center">
              <Clock className="mr-2" />
              <span>Prep: {recipe.prepTimeMinutes} min | Cook: {recipe.cookTimeMinutes} min</span>
            </div>
            <div className="flex items-center">
              <Users className="mr-2" />
              <span>Servings: {recipe.servings}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Ingredients</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Instructions</CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="list-decimal list-inside">
              {recipe.instructions.map((instruction, index) => (
                <li key={index} className="mb-2">{instruction}</li>
              ))}
            </ol>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RecipeDetails;
