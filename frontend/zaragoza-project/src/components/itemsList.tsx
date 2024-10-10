import { Minus, Refrigerator } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";

export type Cart = {
  id: number;
  user_id: string;
  items: string[];
};

type ItemsListProps = {
  cart: Cart;
  removeItem: (name: string) => void;
};

export default function ItemsList({ cart, removeItem }: ItemsListProps) {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold flex items-center text-yellow-400">
        <Refrigerator className="mr-2" />
        Items to Buy
      </h2>

      <ul className="mt-6 space-y-2">
        {cart.items.map((item, index) => (
          <li
            key={index}
            className="flex items-center justify-between bg-secondary p-2 rounded"
          >
            <span>{item}</span>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => removeItem(item)}
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
