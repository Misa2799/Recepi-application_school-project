'use client'
import { Recipe } from "@/types/types";
import { useEffect, useState } from "react";
import { getRecipesList } from "../actions";

const Test = () => {
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    useEffect(() => {
        fetchRecipes()
      }, [])
    
      const fetchRecipes = async () => {
        const response = await getRecipesList()
        setRecipes(response.recipes)
      }
    return ( <div>
        <h2>Test</h2>
        {recipes.map((recipe) => (
            <div key={recipe.id}>
                <h3>{recipe.name}</h3>
            </div>
        ))}
    </div> );
}
 
export default Test;
