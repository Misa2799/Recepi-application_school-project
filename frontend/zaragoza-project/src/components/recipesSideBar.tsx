"use client";

import { Refrigerator, Trash2 } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";

export default function RecipesSideBar() {
  const [foodItems, setFoodItems] = useState([
    "Garlic",
    "Cream",
    "Butter",
    "Sugar",
  ]);
  const [searchTerm, setSearchTerm] = useState("");
  const [newFoodItem, setNewFoodItem] = useState("");

  const handleDelete = (item: string) => {
    setFoodItems(foodItems.filter((food) => food !== item));
  };

  const handleAdd = () => {
    if (newFoodItem && !foodItems.includes(newFoodItem)) {
      setFoodItems([...foodItems, newFoodItem]);
      setNewFoodItem("");
    }
  };

  const filteredItems = foodItems.filter((item) =>
    item.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex h-screen bg-gray-900">
      <div className="w-72 bg-white p-6">
        <h2 className="text-2xl font-bold mb-6 flex items-center text-yellow-400">
          <Refrigerator className="mr-2" />
          My Fridge
        </h2>
        <div className="flex mb-6 bg-gray-200  text-gray-900 text-sm rounded-lg w-full"></div>
        <ul className="space-y-4">
          {filteredItems.map((item) => (
            <li
              key={item}
              className="flex h-10 justify-between items-center bg-white p-4 border-2 border-gray-900 rounded-lg shadow-sm"
            >
              <span className="font-medium text-gray-900">{item}</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleDelete(item)}
                className="text-gray-400 hover:text-yellow-400 transition-colors"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
