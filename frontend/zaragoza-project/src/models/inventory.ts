import mongoose, { Schema, Document } from "mongoose";

interface Ingredient {
  name: string;
  amount: number;
}

const IngredientSchema = new Schema<Ingredient>({
  name: { type: String, required: true },
  amount: { type: Number, required: true },
});

interface Inventory extends Document {
  id?: string;
  userId: string;
  ingredient: Ingredient[];
}

const InventorySchema = new Schema<Inventory>({
  id: { type: String, required: false },
  userId: { type: String, required: true },
  ingredient: { type: [IngredientSchema], required: true },
});

export default mongoose.models.Inventory || mongoose.model<Inventory>('Inventory', InventorySchema);