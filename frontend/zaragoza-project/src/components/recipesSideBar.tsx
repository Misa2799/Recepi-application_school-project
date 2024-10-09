"use client";

import { Refrigerator } from "lucide-react";
import { useState } from "react";

export default function RecipesSideBar() {
  const [foodItems, setFoodItems] = useState([
    { name: "Tomato Basil Bruschetta", image: "" },
    { name: "Chicken Alfredo Pasta", image: "" },
    { name: "Vegerarian Stir-Fry", image: "" },
    { name: "Quinoa Salada with Avocado", image: "" },
  ]);
  const [searchTerm, setSearchTerm] = useState("");
  const [newFoodItem, setNewFoodItem] = useState("");

  const handleAdd = () => {
    if (
      newFoodItem &&
      !foodItems.some(
        (item) => item.name.toLowerCase() === newFoodItem.toLowerCase()
      )
    ) {
      setFoodItems([...foodItems, { name: newFoodItem, image: "" }]);
      setNewFoodItem("");
    }
  };

  const filteredItems = foodItems.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex h-screen bg-gray-900">
      <div className="w-72 bg-white p-6">
        <h2 className="text-2xl font-bold mb-6 flex items-center text-yellow-400">
          <Refrigerator className="mr-2" />
          My Recipes
        </h2>
        <div className="flex mb-6 bg-gray-200  text-gray-900 text-sm rounded-lg w-full"></div>
        <ul className="space-y-4">
          {filteredItems.map((item) => (
            <li
              key={item.name}
              className="flex h-10 justify-between items-center bg-white p-4 border-2 border-gray-900 rounded-lg shadow-sm"
            >
              <span className="font-medium text-gray-900">{item.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
