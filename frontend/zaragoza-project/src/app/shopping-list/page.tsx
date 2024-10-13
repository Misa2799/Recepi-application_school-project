"use client";

import ItemsList, { OwnedItems } from "@/components/itemsList";
import FridgeSideBar from "@/components/fridgeSideBar";
import WishList from "@/components/wishList";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { deleteRecipes } from "../actions";
import { Recipe } from "@/types/types";

export const dummyRecipes: Recipe[] = [
  {
    id: 1,
    name: "Classic Margherita Pizza",
    ingredients: [
      "Pizza dough",
      "Tomato sauce",
      "Fresh mozzarella cheese",
      "Fresh basil leaves",
      "Olive oil",
      "Salt and pepper to taste",
    ],
    instructions: [
      "Preheat the oven to 475°F (245°C).",
      "Roll out the pizza dough and spread tomato sauce evenly.",
      "Top with slices of fresh mozzarella and fresh basil leaves.",
      "Drizzle with olive oil and season with salt and pepper.",
      "Bake in the preheated oven for 12-15 minutes or until the crust is golden brown.",
      "Slice and serve hot.",
    ],
    prepTimeMinutes: 20,
    cookTimeMinutes: 15,
    servings: 4,
    difficulty: "Easy",
    cuisine: "Italian",
    caloriesPerServing: 300,
    tags: ["Pizza", "Italian"],
    userId: 45,
    image: "https://cdn.dummyjson.com/recipe-images/1.webp",
    rating: 4.6,
    reviewCount: 3,
    mealType: ["Dinner"],
  },
  {
    id: 2,
    name: "Avocado salada",
    ingredients: [
      "Avocado",
      "Tomato",
      "Onion",
      "Lemon juice",
      "Olive oil",
      "Salt",
    ],
    instructions: ["Chop avocado, tomato and onion.", "Mix all ingredients"],
    prepTimeMinutes: 20,
    cookTimeMinutes: 15,
    servings: 4,
    difficulty: "Easy",
    cuisine: "Italian",
    caloriesPerServing: 300,
    tags: ["Pizza", "Italian"],
    userId: 45,
    image: "https://cdn.dummyjson.com/recipe-images/1.webp",
    rating: 4.6,
    reviewCount: 3,
    mealType: ["Dinner"],
  },
];

const dummyOwnedItems: OwnedItems = {
  id: 0,
  user_id: "user_2n93xAxryHQ4ioN7J4LCoX9STn0",
  items: [
    { name: "Pizza dough", amount: 0 },
    { name: "Tomato sauce", amount: 0 },
    { name: "Fresh mozzarella cheese", amount: 1 },
    { name: "Fresh basil leaves", amount: 1 },
    { name: "Olive oil", amount: 1 },
    { name: "Salt and pepper to taste", amount: 1 },
  ],
};

export default function Page() {
  const { userId } = useAuth();
  console.log("userId: ", userId);

  const [recipes, setRecipes] = useState<Recipe[]>(dummyRecipes);

  const [items, setItems] = useState(dummyOwnedItems.items);
  const shoppingList = items.filter((item) => item.amount === 0);

  const router = useRouter();

  const viewRecipe = (id: number) => {
    router.push(`/shopping-list/${id}`);
  };

  const addMissingItems = (id: number) => {
    console.log("Add items is clicked");
    const recipe = dummyRecipes.find((recipe) => recipe.id === id);
    const missingItems = recipe?.ingredients.filter((ingredient) => {
      const ownedItem = items.find((item) => item.name === ingredient);
      return !ownedItem || ownedItem.amount === 0;
    });
    setItems((prevItems) => [
      ...prevItems,
      ...missingItems!.map((name) => ({ name, amount: 0 })),
    ]);

    // update DB
  };

  const removeRecipe = (id: number) => {
    console.log(`Removing: ${id}`);
    // remove the recipe from the wish list
    setRecipes((prevRecipes) =>
      prevRecipes.filter((recipe) => recipe.id !== id)
    );

    // delete from DB
    deleteRecipes(id.toString());
  };

  const removeItem = (item: string) => {
    console.log(`Removing ${item}`);

    setItems((prevItems) =>
      prevItems.filter((prevItem) => prevItem.name !== item)
    );

    // delete from DB
  };

  return (
    <div className="grid grid-cols-12 gap-4">
      <div id="sideBar" className="col-span-3">
        <FridgeSideBar />
      </div>

      <div id="wishList" className="col-span-6 py-6">
        <WishList
          recipes={recipes}
          items={items}
          viewRecipe={viewRecipe}
          addMissingItems={addMissingItems}
          removeRecipe={removeRecipe}
        />
      </div>

      <div id="itemsList" className="h-screen col-span-3">
        <ItemsList items={shoppingList} removeItem={removeItem} />
      </div>
    </div>
  );
}
