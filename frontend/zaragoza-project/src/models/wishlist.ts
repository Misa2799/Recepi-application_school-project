import mongoose, { Schema } from "mongoose"

const WishlistSchema = new Schema({
    userId: { type: String, required: true },
    recipeId: [{ type: String, required: true }],
})

export interface WishlistInterface {
    userId: string;
    recipeId: string[];
}
  
export default mongoose.models.Wishlist || mongoose.model('Wishlist', WishlistSchema)