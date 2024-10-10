"use client";

import ItemsList, { Cart } from "@/components/itemsList";
import SideBar from "@/components/sideBar";
import { Button } from "@/components/ui/button";
import WishList, { Recipe } from "@/components/wishList";
import { useAuth } from "@clerk/nextjs";
import { useState } from "react";

const dummyRecipes: Recipe[] = [
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

const dummyCart: Cart = {
  id: 0,
  user_id: "user_2n93xAxryHQ4ioN7J4LCoX9STn0",
  items: [
    "Pizza dough",
    "Tomato sauce",
    "Fresh mozzarella cheese",
    "Fresh basil leaves",
    "Olive oil",
    "Salt and pepper to taste",
  ],
};

export default function Page() {
  const { userId } = useAuth();
  console.log("userId: ", userId);

  // get all recipes that are saved from DB
  // -> get a Wish-list table? based on userId
  // const wishList = getRecipe(userId)
  const [recipes, setRecipes] = useState<Recipe[]>(dummyRecipes);

  // get Items to Buy from DB?
  //const cart = getCart(userId)
  const [cartItems, setCartItems] = useState(dummyCart.items);

  const viewRecipe = (id: number) => {
    console.log("View Recipe is clicked");
    // View Recipe -> display title, image, ingredients, and instructions
  };

  const addMissingItems = (id: number) => {
    console.log("Add items is clicked");
    // Add items -> add ingredients that are without checkmark to 'Items to Buy'
  };

  const removeRecipe = (id: number) => {
    console.log(`Removing: ${id}`);
    // remove the recipe from the wish list
    setRecipes((prevRecipes) =>
      prevRecipes.filter((recipe) => recipe.id !== id)
    );

    // delete from DB
  };

  const removeItem = (item: string) => {
    console.log(`Removing ${item}`);

    setCartItems((prevItems) =>
      prevItems.filter((cartItem) => cartItem !== item)
    );

    // delete from DB
  };

  return (
    <div className="grid grid-cols-12 gap-4">
      <div id="sideBar" className="col-span-3 p-6">
        <SideBar />
      </div>

      <div id="wishList" className="col-span-6 p-6">
        <WishList
          recipes={recipes}
          viewRecipe={viewRecipe}
          addMissingItems={addMissingItems}
          removeRecipe={removeRecipe}
        />
      </div>

      <div id="itemsList" className="h-screen col-span-3">
        <ItemsList
          cart={{ ...dummyCart, items: cartItems }}
          removeItem={removeItem}
        />
      </div>
    </div>
  );
}
