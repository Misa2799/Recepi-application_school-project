"use client";

import { Minus, Plus, PlusCircle, Refrigerator } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export default function SideBar() {
  const [foodItems, setFoodItems] = useState([
    { name: "Milk", quantity: 1 },
    { name: "Eggs", quantity: 12 },
    { name: "Cheese", quantity: 2 },
    { name: "Yogurt", quantity: 3 },
  ]);
  const [searchTerm, setSearchTerm] = useState("");
  const [newFoodItem, setNewFoodItem] = useState("");

  const filteredItems = foodItems.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // const handleAdd = () => {
  //   if (newFoodItem && !foodItems.includes(newFoodItem)) {
  //     setFoodItems([...foodItems, newFoodItem]);
  //     setNewFoodItem("");
  //   }
  // };

  //   const updateQuantity = (index: number, change: number) => {
  //     const newIngredients = [...foodItems];
  //     newIngredients[index].quantity = Math.max(
  //       0,
  //       newIngredients[index].quantity + change
  //     );
  const updateQuantity = (index: number, change: number) => {
    const newIngredients = [...foodItems];
    newIngredients[index].quantity += change;

    if (newIngredients[index].quantity <= 0) {
      newIngredients.splice(index, 1);
    }
    setFoodItems(newIngredients);
  };
  const handleAdd = () => {
    if (newFoodItem) {
      setFoodItems([...foodItems, { name: newFoodItem, quantity: 1 }]);
      setNewFoodItem("");
    }
  };

  return (
    <div className="flex h-screen bg-gray-900">
      <div className="w-72 bg-white p-6">
        <h2 className="text-2xl font-bold mb-6 flex items-center text-yellow-400">
          <Refrigerator className="mr-2" />
          My Fridge
        </h2>
        <div className="flex space-x-2 mb-4">
          <Input
            type="text"
            placeholder="Search Fridge"
            className="flex-grow"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button variant="outline" onClick={handleAdd}>
            <PlusCircle className="h-4 w-4" />
            <span className="sr-only">Add</span>
          </Button>
        </div>
        <ul className="space-y-2">
          {filteredItems.map((foodItem, index) => (
            <li
              key={foodItem.name}
              className="flex items-center justify-between bg-secondary p-2 rounded"
            >
              <span>{foodItem.name}</span>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => updateQuantity(index, -1)}
                >
                  <Minus className="h-4 w-4" />
                  <span className="sr-only">Decrease</span>
                </Button>
                <span className="w-8 text-center">{foodItem.quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => updateQuantity(index, 1)}
                >
                  <Plus className="h-4 w-4" />
                  <span className="sr-only">Increase</span>
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
