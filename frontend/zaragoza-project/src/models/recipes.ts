import mongoose, { Schema } from "mongoose"

const RecipeSchema = new Schema({
    id: { type: String, required: false },
    name: { type: String, required: true },
    description: { type: String, required: true },
    ingredients: { type: String, required: true },
    steps: { type: String, required: true },
    image: { type: String, required: true },
    category: { type: String, required: true }
})
  
export default mongoose.models.Recipes || mongoose.model('Recipes', RecipeSchema)