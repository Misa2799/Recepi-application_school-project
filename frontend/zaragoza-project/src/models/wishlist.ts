import mongoose, { Schema } from "mongoose"

const WishlistSchema = new Schema({
    id: { type: String, required: false },
    userId: { type: String, required: true },
    recipeId: [{ type: String, required: true }],
})
  
export default mongoose.models.Wishlist || mongoose.model('Wishlist', WishlistSchema)