'use client'
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import Inventory, { IngredientInterface } from '@/models/inventory';
import dbConnect from '@/lib/mongodb';
import { useAuth } from '@clerk/nextjs';
import { fetchFridgeItems } from '@/app/recipes/actions';

const initialState ={
  fridgeItems: [],
  setFridgeItems: () => {},
  addFridgeItem: () => {},
  updateFridgeItem: () => {},
  removeFridgeItem: () => {},
}

interface FridgeContextType {
  fridgeItems: IngredientInterface[];
  setFridgeItems: React.Dispatch<React.SetStateAction<IngredientInterface[]>>;
  addFridgeItem: (item: IngredientInterface) => void;
  updateFridgeItem: (name: string, amount: number) => void;
  removeFridgeItem: (name: string) => void;
}

const FridgeContext = createContext<FridgeContextType >(initialState);

export const FridgeProvider = ({ children }: { children: ReactNode }) => {
  const [fridgeItems, setFridgeItems] = useState<IngredientInterface[]>([]);
  const user = useAuth();
  
  useEffect(() => {
    fetchFridge()
  }, []);

  const fetchFridge = async () => {
		if (!user.userId) {
		  return
		}
		const fetchedFridge = await fetchFridgeItems(user.userId)
		setFridgeItems(fetchedFridge)
	  }

  const addFridgeItem = (item: IngredientInterface) => {
    setFridgeItems((prevItems) => [...prevItems, item]);
    // Update DB
  };

  const updateFridgeItem = (name: string, amount: number) => {
    setFridgeItems((prevItems) =>
      prevItems.map((item) =>
        item.name === name ? { ...item, amount } : item
      )
    );
    // Update DB
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