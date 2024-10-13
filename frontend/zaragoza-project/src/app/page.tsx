"use client";
import RecipesSideBar from "@/components/recipesSideBar";
import FridgeSideBar from "@/components/fridgeSideBar";
import { useEffect, useState } from "react";
import { getRecipesList} from '@/app/actions'
import { Recipe } from "@/types/types";
import Header from "@/components/header";

export default function Home() {
  const [ recipes, setRecipes ] = useState<Recipe[]>([])
  useEffect(() => {
    fetchRecipes()
  }, [])

  const fetchRecipes = async () => {
    const fetchedTasks = await getRecipesList()
    setRecipes(fetchedTasks.recipes)
  }

  return (
    <div className="">
      { recipes.map((recipe) => (
            <div key={recipe.id}>
                <h3>{recipe.name}</h3>
            </div>
        ))}
    </div>
  );
}
