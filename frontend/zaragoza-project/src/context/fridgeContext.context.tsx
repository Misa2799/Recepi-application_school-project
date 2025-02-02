'use client'
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useAuth } from '@clerk/nextjs';
import { addInventoryItem, fetchFridgeItems, updateInventoryItem, removeInventoryItem } from '@/app/recipes/actions';
import { IngredientInterface } from '@/models/inventory';
import { useShoppingList } from '@/context/shoppingListContext.context';

const initialState = {
  fridgeItems: [],
  setFridgeItems: () => {},
  addFridgeItem: () => {},
  updateFridgeItem: () => {},
  removeFridgeItem: () => {},
};

interface FridgeContextType {
  fridgeItems: IngredientInterface[];
  setFridgeItems: React.Dispatch<React.SetStateAction<IngredientInterface[]>>;
  addFridgeItem: (item: IngredientInterface) => void;
  updateFridgeItem: (name: string, amount: number) => void;
  removeFridgeItem: (name: string) => void;
}

const FridgeContext = createContext<FridgeContextType>(initialState);

export const FridgeProvider = ({ children }: { children: ReactNode }) => {
  const [fridgeItems, setFridgeItems] = useState<IngredientInterface[]>([]);
  const { userId } = useAuth();
  const { shoppingList, removeItem } = useShoppingList();

  useEffect(() => {
    fetchFridge();
  }, [userId]);

  const fetchFridge = async () => {
    if (!userId) {
      return;
    }
    const fetchedFridge = await fetchFridgeItems(userId);
    if (fetchedFridge) {
      const fetchItemsMoreThanZero = fetchedFridge.filter(
        (item: any) => item.amount > 0
      );
      setFridgeItems(fetchItemsMoreThanZero);
    }
  };

  const addFridgeItem = async (item: IngredientInterface) => {
    if (!userId) {
      return;
    }
    const existingItem = fridgeItems.find((fridgeItem) => fridgeItem.name === item.name);
    if (existingItem) {
      await addInventoryItem(userId, [item]);
      updateFridgeItem(item.name, item.amount + existingItem.amount);
    } else {
      await addInventoryItem(userId, [item]);
      setFridgeItems((prevItems) => [...prevItems, item]);
    }

    // Check if the item is in the shopping list and remove it if it is
    const itemInShoppingList = shoppingList.find((shoppingItem) => shoppingItem.name === item.name);
    if (itemInShoppingList) {
      removeItem(item.name);
    }
  };

  const updateFridgeItem = async (name: string, amount: number) => {
    if (!userId) {
      return;
    }
    if (amount <= 0) {
      removeFridgeItem(name);
      return;
    }
    await updateInventoryItem(userId, name, amount);
    setFridgeItems((prevItems) =>
      prevItems.map((item) =>
        item.name === name ? { ...item, amount } : item
      )
    );
  };

  const removeFridgeItem = async (name: string) => {
    if (!userId) {
      return;
    }
    await removeInventoryItem(userId, name);
    setFridgeItems((prevItems) =>
      prevItems.filter((item) => item.name !== name)
    );
  };

  return (
    <FridgeContext.Provider value={{ fridgeItems, setFridgeItems, addFridgeItem, updateFridgeItem, removeFridgeItem }}>
      {children}
    </FridgeContext.Provider>
  );
};

export const useFridge = () => {
  const context = useContext(FridgeContext);
  if (!context) {
    throw new Error('useFridge must be used within a FridgeProvider');
  }
  return context;
};