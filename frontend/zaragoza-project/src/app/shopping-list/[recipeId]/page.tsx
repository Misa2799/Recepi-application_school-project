"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { dummyRecipes } from "../page";
import { getRecipe } from "@/app/actions";
import FridgeSideBar from "@/components/fridgeSideBar";
import RecipesSideBar from "@/components/recipesSideBar";
import { Recipe } from "@/types/types";

export default function RecipeDetail() {
  const params = useParams();
  const recipeId = params.recipeId.toString();
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>();

  useEffect(() => {
    // get a selected recipe based on recipeId from DB?
    // const foundRecipe = getRecipe(recipeId);

    // replace later
    const foundRecipe = dummyRecipes.find(
      (recipe) => recipe.id === Number(recipeId)
    );

    if (foundRecipe) {
      setSelectedRecipe(foundRecipe);
    }
  }, [recipeId]);

  if (!selectedRecipe) {
    return <div>No longer available...</div>;
  }

  return (
    <>
      <div className="grid grid-cols-12 gap-4">
        <div id="sideBar" className="col-span-3">
          <FridgeSideBar />
        </div>

        <div id="recipe" className="col-span-6 py-6 text-gray-900">
          <div className="">
            <h2 className="text-3xl font-bold">{selectedRecipe.name}</h2>
            <img
              src={selectedRecipe.image}
              alt={selectedRecipe.name}
              className="w-full h-48 object-cover rounded-md my-4"
            />
            <p className="mt-4 text-xl font-semibold pt-4 border border-transparent border-t-gray-900">
              Ingredients
            </p>
            <ul className="pl-10 mt-4">
              {selectedRecipe.ingredients.map((ingredient, index) => (
                <li className="space-x-2 my-2 list-disc" key={index}>
                  {ingredient}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xl font-semibold  pt-4 border border-transparent border-t-gray-900">
              Instructions
            </p>
            <ol className="pl-5 mt-4">
              {selectedRecipe.instructions.map((instruction, index) => (
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

        <div id="itemsList" className="h-screen col-span-3">
          <RecipesSideBar />
        </div>
      </div>
    </>
  );
}
