'use server';

import dbConnect from '@/lib/mongodb';
import Wishlist from '@/models/wishlist';
import { getRecipeById } from '../actions';
import { Recipe } from '@/types/types';
import Inventory from '@/models/inventory';

export async function getWishlist(id: string) {
    await dbConnect();
    const wishlist = await Wishlist.findOne({ userId: id });
    let newWishlist: Recipe[] = [];
    for (let recipes of wishlist.recipeId) {
        await getRecipeById(recipes).then((recipe) => {
            newWishlist.push(recipe);
        });
    }
    return newWishlist;
}

export async function addWishlist(userId: string, recipeId: string[]) {
    await dbConnect();
    const wishList: any = await getWishlist(userId);
    console.log(wishList);
    if (wishList) {
        if (wishList.map((recipe: Recipe) => recipe.id).includes(recipeId)) {
            return false;
        }
        const newWishlist = await Wishlist.findOneAndUpdate(
            { userId: userId },
            { $push: { recipeId: recipeId } },
            { new: true }
        );

        return newWishlist ? true : false;
    } else {
        const newWishlist = await Wishlist.create({ userId: userId, recipeId: recipeId });
        return newWishlist ? true : false;
    }
}

export const removeWishlist = async (userId: string, recipeId: string) => {
    await dbConnect();
    const wishList: any = await getWishlist(userId);
    if (wishList) {
        const newWishlist = await Wishlist.findOneAndUpdate(
            { userId: userId },
            { $pull: { recipeId: recipeId } },
            { new: true }
        );
        return newWishlist ? true : false;
    } else {
        return false;
    }
};

export const fetchFridgeItems = async (userId: string) => {
    await dbConnect();
    const inventoryList = await Inventory.findOne({ userId });
    return inventoryList;
};
