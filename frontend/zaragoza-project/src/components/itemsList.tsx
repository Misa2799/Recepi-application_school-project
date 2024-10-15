import { Minus, Refrigerator } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";
import { useShoppingList } from "@/context/shoppingListContext.context";

export type OwnedItems = {
  id: number;
  user_id: string;
  items: { name: string; amount: number }[];
};

export default function ItemsList() {
  const { shoppingList, removeItem } = useShoppingList();

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold flex items-center text-yellow-400">
        <Refrigerator className="mr-2" />
        Items to Buy
      </h2>

      <ul className="mt-6 space-y-2">
        {shoppingList.map((item, index) => (
          <li
            key={index}
            className="flex items-center justify-between bg-secondary p-2 rounded"
          >
            <span>{item.name}</span>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => removeItem(item.name)}
              >
                <Minus className="h-4 w-4" />
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
