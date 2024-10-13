"use client";

import { useFridge } from '@/context/fridgeContext.context';
import { IngredientInterface } from '@/models/inventory';
import { CalendarIcon, Minus, Plus, Refrigerator, Trash } from 'lucide-react';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import { Input } from './ui/input';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Calendar } from './ui/calendar';

export default function FridgeSideBar() {
  const { fridgeItems, addFridgeItem, updateFridgeItem, removeFridgeItem } = useFridge();
  const [searchTerm, setSearchTerm] = useState("");
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [filteredItems, setFilteredItems] = useState<IngredientInterface[]>([]);
  const [expiry, setExpiry] = useState<Date | undefined>(undefined);
	const [open, setOpen] = useState(false);

  useEffect(() => {
    if (fridgeItems) {
      setFilteredItems(fridgeItems.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
  }, [fridgeItems, searchTerm]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ name, quantity, expiry });
    if (name) {
      addFridgeItem({ name, amount: quantity });
      setName("");
      setQuantity(1);
      setExpiry(undefined);
      setOpen(false);
    }
  };

  return (
    <div className="flex h-screen">
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
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">Add</Button>
            </DialogTrigger>
            <DialogContent className="max-w-md mx-auto p-6 bg-gradient-to-b from-yellow-100 to-white rounded-lg shadow-lg">
              <DialogHeader>
                <DialogTitle className="text-3xl font-bold text-center text-yellow-800 mb-6">
                  {" "}
                  Add to my fridge
                </DialogTitle>
                <DialogDescription className="text-center text-yellow-600 mb-6">
                  Enter item details you want to add to your fridge
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid items-center gap-4">
                  <div>
                    <Label htmlFor="name" className="text-yellow-700">
                      Name
                    </Label>
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="border-yellow-300 focus:border-yellow-500"
                    />
                  </div>
                  <div>
                    <Label htmlFor="quantity" className="text-yellow-700">
                      Quantity
                    </Label>
                    <Input
                      id="quantity"
                      type="number"
                      value={quantity}
                      onChange={(e) => setQuantity(parseInt(e.target.value))}
                      className="text-left border-yellow-300 focus:border-yellow-500"
                      required
                      min="1"
                    />
                  </div>
                </div>
              </div>
              <div>
                <Label htmlFor="expiry" className="text-yellow-700">
                  Expiry
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal bg-white border-yellow-300 text-yellow-700 hover:bg-blue-50"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {expiry ? (
                        format(expiry, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={expiry}
                      onSelect={setExpiry}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <DialogFooter>
                  <Button
                    type="button"
                    className="w-full bg-yellow-500 hover:bg-yellow-700 text-white"
                    onClick={handleSubmit}
                  >
                    Add to Fridge
                  </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
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
                  onClick={() => updateFridgeItem(foodItem.name, foodItem.amount - 1)}
                >
                  <Minus className="h-4 w-4" />
                  <span className="sr-only">Decrease</span>
                </Button>
                <span className="w-8 text-center">{foodItem.amount}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => updateFridgeItem(foodItem.name, foodItem.amount + 1)}
                >
                  <Plus className="h-4 w-4" />
                  <span className="sr-only">Increase</span>
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => removeFridgeItem(foodItem.name)}
                > 
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}