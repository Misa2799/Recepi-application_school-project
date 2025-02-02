'use client'
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
import { useAuth } from "@clerk/nextjs";
import { getWishlist, fetchFridgeItems, removeWishlist, addWishlist, addInventoryItem } from "@/app/recipes/actions";

type ShoppingListContextType = {
  recipes: Recipe[];
  items: { name: string; amount: number }[];
  shoppingList: { name: string; amount: number }[];
  viewRecipe: (id: number) => void;
  addMissingItems: (id: number) => void;
  removeRecipe: (id: number) => void;
  removeItem: (name: string) => void;
  addRecipeToWishlist: (recipe: Recipe) => void;
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
  const { userId } = useAuth();
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [items, setItems] = useState<IngredientInterface[]>([]);
  const [shoppingList, setShoppingList] = useState<IngredientInterface[]>([]);
  const router = useRouter();

  // get all recipes in WishList table
  useEffect(() => {
    fetchWishlist();
    fetchFridgeList();
  }, [userId]);
  
  const fetchWishlist = async () => {
    if (!userId) {
      return;
    }
    const fetchedWishlist = await getWishlist(userId);
    if (fetchedWishlist) {
      setRecipes(fetchedWishlist);
    }
  };

  const fetchFridgeList = async () => {
    if (!userId) {
      return;
    }
    const fetchedFridge = await fetchFridgeItems(userId);
    if (fetchedFridge) {
      setItems(fetchedFridge);
      const shoppingListItems = fetchedFridge.filter(
        (item: any) => item.amount === 0
      );
      setShoppingList(shoppingListItems);
    }
  };

  const viewRecipe = (id: number) => {
    router.push(`/shopping-list/details?recipeId=${id}`);
  };

  const addMissingItems = async (id: number) => {
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

    // Add missing items to MongoDB
    if (userId) {
      await addInventoryItem(userId, newItems);
    }

    setItems((prevItems) => [...prevItems, ...newItems]);
    setShoppingList((prevList) => [...prevList, ...newItems]);
  };

  const removeRecipe = async (id: number) => {
    if (!userId) return;
    const removed = await removeWishlist(userId, id.toString());
    if (!removed) return;
    setRecipes((prevRecipes) =>
      prevRecipes.filter((recipe) => recipe.id !== id)
    );
  };

  const removeItem = (name: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.name !== name));
    setShoppingList((prevList) => prevList.filter((item) => item.name !== name));
  };

  const addRecipeToWishlist = (recipe: Recipe) => {
    setRecipes((prevRecipes) => [...prevRecipes, recipe]);
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
        addRecipeToWishlist,
      }}
    >
      {children}
    </ShoppingListContext.Provider>
  );
};