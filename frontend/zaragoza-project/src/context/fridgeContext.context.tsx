'use client'
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useAuth } from '@clerk/nextjs';
import { fetchFridgeItems } from '@/app/recipes/actions';
import { IngredientInterface } from '@/models/inventory';

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

  useEffect(() => {
    fetchFridge();
  }, [userId]);

  const fetchFridge = async () => {
    if (!userId) {
      return;
    }
    const fetchedFridge = await fetchFridgeItems(userId);
    if (fetchedFridge) {
      setFridgeItems(fetchedFridge);
    }
  };

  const addFridgeItem = (item: IngredientInterface) => {
    setFridgeItems((prevItems) => [...prevItems, item]);
  };

  const updateFridgeItem = (name: string, amount: number) => {
    if (amount <= 0) {
      removeFridgeItem(name);
      return;
    }
    setFridgeItems((prevItems) =>
      prevItems.map((item) =>
        item.name === name ? { ...item, amount } : item
      )
    );
  };

  const removeFridgeItem = (name: string) => {
    setFridgeItems((prevItems) =>
      prevItems.filter((item) => item.name !== name)
    );
    // Update DB
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