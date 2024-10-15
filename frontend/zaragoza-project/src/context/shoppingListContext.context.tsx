import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { Recipe } from "@/types/types";
import { useRouter } from "next/navigation";
import { IngredientInterface } from "@/models/inventory";

type ShoppingListContextType = {
  recipes: Recipe[];
  items: { name: string; amount: number }[];
  shoppingList: { name: string; amount: number }[];
  viewRecipe: (id: number) => void;
  addMissingItems: (id: number) => void;
  removeRecipe: (id: number) => void;
  removeItem: (name: string) => void;
};

const ShoppingListContext = createContext<ShoppingListContextType | undefined>(
  undefined
);

export const useShoppingList = () => {
  const context = useContext(ShoppingListContext);
  if (!context) {
    throw new Error(
      "useShoppingList must be used within a ShoppingListProvider"
    );
  }
  return context;
};

export const ShoppingListProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  // Replace data
  const [recipes, setRecipes] = useState<Recipe[]>(dummyRecipes);

  // Replace data
  const [items, setItems] = useState<IngredientInterface[]>(
    dummyOwnedItems.items
  );
  const shoppingList = items.filter((item) => item.amount === 0);

  const router = useRouter();

  const viewRecipe = (id: number) => {
    router.push(`/shopping-list/${id}`);
  };

  const addMissingItems = (id: number) => {
    const recipe = recipes.find((r) => r.id === id);
    if (!recipe) return;

    const missingItems = recipe.ingredients.filter((ingredient) => {
      const ownedItem = items.find((item) => item.name === ingredient);
      return !ownedItem || ownedItem.amount === 0;
    });

    const newItems = missingItems.map((ingredient) => ({
      name: ingredient,
      amount: 0,
    }));

    setItems((prevItems) => [...prevItems, ...newItems]);
  };

  const removeRecipe = (id: number) => {
    setRecipes((prevRecipes) =>
      prevRecipes.filter((recipe) => recipe.id !== id)
    );
  };

  const removeItem = (name: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.name !== name));
  };

  return (
    <ShoppingListContext.Provider
      value={{
        recipes,
        items,
        shoppingList,
        viewRecipe,
        addMissingItems,
        removeRecipe,
        removeItem,
      }}
    >
      {children}
    </ShoppingListContext.Provider>
  );
};

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

export const dummyOwnedItems = {
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
