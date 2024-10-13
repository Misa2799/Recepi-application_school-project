import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { Checkbox } from "./ui/checkbox";
import { Button } from "./ui/button";
import { Recipe } from "@/types/types";

type WishListProps = {
  recipes: Recipe[];
  items: { name: string; amount: number }[];
  viewRecipe: (id: number) => void;
  addMissingItems: (id: number) => void;
  removeRecipe: (id: number) => void;
};

export default function WishList({
  recipes,
  items,
  viewRecipe,
  addMissingItems,
  removeRecipe,
}: WishListProps) {
  return (
    <div id="listItem" className="px-4">
      {recipes.map((recipe) => (
        <Accordion type="single" collapsible key={recipe.id}>
          <AccordionItem value={`item-${recipe.id}`} key={recipe.id}>
            <AccordionTrigger>
              <p className="text-xl text-gray-900">{recipe.name}</p>
            </AccordionTrigger>
            <AccordionContent>
              {/* image */}
              <div className="flex items-center px-4">
                <img
                  className="w-full h-48 object-cover rounded-md"
                  src={recipe.image}
                  alt={recipe.name}
                />
              </div>
              {/* list of ingredients */}
              <div id="ingredients" className="px-4 mt-6 text-gray-900">
                {recipe.ingredients.map((ingredient, index) => {
                  const ownedItem = items.find(
                    (item) => item.name === ingredient
                  );
                  const isChecked = ownedItem ? ownedItem.amount > 0 : false;

                  return (
                    <div
                      key={`${recipe.id}-ingredient-${index}`}
                      className="flex items-center space-x-2 my-2"
                    >
                      <Checkbox
                        id={`${recipe.id}-ingredient-${index}`}
                        checked={isChecked}
                        disabled
                      />
                      <label
                        htmlFor={`${recipe.id}-ingredient-${index}`}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {ingredient}
                      </label>
                    </div>
                  );
                })}
              </div>

              <div id="btn" className="flex justify-end mt-6">
                <Button
                  size="sm"
                  className="bg-blue-900 hover:bg-blue-600"
                  onClick={() => viewRecipe(recipe.id)}
                >
                  View Recipe
                </Button>
                <Button
                  size="sm"
                  className="ml-3 bg-green-900 hover:bg-green-600"
                  onClick={() => addMissingItems(recipe.id)}
                >
                  Add missing ingredients to Shopping List
                </Button>
                <Button
                  size="sm"
                  className="ml-3 bg-red-900 hover:bg-red-600"
                  onClick={() => removeRecipe(recipe.id)}
                >
                  Remove Recipe
                </Button>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      ))}
    </div>
  );
}
