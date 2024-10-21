import { Minus, ShoppingBasket } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";
import { useShoppingList } from "@/context/shoppingListContext.context";
import { ScrollArea } from "./ui/scroll-area";

export default function ItemsList() {
  const { shoppingList, removeItem } = useShoppingList();
  
  return (
    <div className=" h-[calc(100vh-5rem)] w-full bg-white shadow-lg rounded-lg overflow-hidden mt-1">
        <div className="p-4 bg-yellow-400">
          <h2 className="flex items-center text-2xl font-bold text-white">
            <ShoppingBasket className="mr-2"/>
             Items to buy
          </h2>
        </div>

        <ScrollArea className="h-[calc(100vh-150px)]">
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
      </ScrollArea>
    </div>
  );
}