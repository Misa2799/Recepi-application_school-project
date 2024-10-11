"use client";
import RecipesSideBar from "@/components/recipesSideBar";
import SideBar from "@/components/sideBar";
import { useEffect, useState } from "react";
import { getRecipes, addRecipes, deleteRecipes } from '@/app/actions'
import { Recipe } from "@/types/types";
import Header from "@/components/header";

export default function Home() {
  const [ recipes, setRecipes ] = useState<Recipe[]>([])
  useEffect(() => {
    fetchRecipes()
  }, [])

  const fetchRecipes = async () => {
    const fetchedTasks = await getRecipes()
    setRecipes(fetchedTasks)
  }

  return (
    <div className="flex flex-1 p-4 justify-between">
      
    </div>
  );
}
