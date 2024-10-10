import { CalendarIcon, X } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";
import { Label } from "./ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

export default function AddToFridge() {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(0);
  const [expiry, setExpiry] = useState<Date | undefined>(undefined);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ name, quantity, price, expiry });
  };
  const handleDelete = () => {
    console.log("Delete button clicked");
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-gradient-to-b from-blue-100 to-white rounded-lg shadow-lg">
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-2 right-2 text-blue-700 hover:bg-blue-200"
        onClick={handleDelete}
        aria-label="Delete"
      >
        <X className="h-6 w-6" />
      </Button>
      <h1 className="text-3xl font-bold text-center text-blue-800 mb-6">
        Add to my fridge
      </h1>
      <p className="text-center text-blue-600 mb-6">
        Enter item details you want to add to your fridge
      </p>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Label htmlFor="name" className="text-blue-700">
            Name
          </Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="border-blue-300 focus:border-blue-500"
          />
        </div>
        <div>
          <Label htmlFor="quantity" className="text-blue-700">
            Quantity
          </Label>
          <div className="flex">
            <Input
              id="quantity"
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
              className="text-center border-blue-300 focus:border-blue-500"
              required
              min="1"
            />
          </div>
        </div>
        <div>
          <Label htmlFor="price" className="text-blue-700">
            Price
          </Label>
          <div className="flex">
            <Input
              id="price"
              type="number"
              value={price}
              onChange={(e) => setPrice(parseFloat(e.target.value))}
              className="text-center border-blue-300 focus:border-blue-500"
              required
              min="0"
              step="0.01"
            />
          </div>
        </div>
        <div>
          <Label htmlFor="expiry" className="text-blue-700">
            Expiry
          </Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start text-left font-normal bg-white border-blue-300 text-blue-700 hover:bg-blue-50"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {expiry ? format(expiry, "PPP") : <span>Pick a date</span>}
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
        <Button
          className="w-full bg-blue-600 hover:bg-blue-700 text-white"
          onClick={handleSubmit}
        >
          Add to Fridge
        </Button>
      </form>
    </div>
  );
}
