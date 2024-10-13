import mongoose, { Schema, Document } from "mongoose";

export interface IngredientInterface {
  name: string;
  amount: number;
}

const IngredientSchema = new Schema<IngredientInterface>({
  name: { type: String, required: true },
  amount: { type: Number, required: true },
});

interface InventoryInterface extends Document {
  userId: string;
  ingredient: IngredientInterface[];
}

const InventorySchema = new Schema<InventoryInterface>({
  userId: { type: String, required: true },
  ingredient: { type: [IngredientSchema], required: true },
});

export default mongoose.models.Inventory || mongoose.model<InventoryInterface>('Inventory', InventorySchema);