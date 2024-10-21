'use server';

import dbConnect from '@/lib/mongodb';
import Wishlist from '@/models/wishlist';
import { getRecipeById } from '../actions';
import { Recipe } from '@/types/types';
import Inventory, { IngredientInterface } from '@/models/inventory';

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
    if (wishList) {
        if (wishList.map((recipe: Recipe) => recipe.id).includes(Number(recipeId))) {
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
    if (!inventoryList) {
        return null;
    }
    return inventoryList.ingredient.map((ingredient: any) => {
        const { _id, ...rest } = ingredient.toObject();
        return rest;
    });
};

export const addInventoryItem = async (userId: string, items: IngredientInterface[]) => {
    await dbConnect();
    const inventory = await fetchFridgeItems(userId);
    if (inventory) {
        const existingIngredient = inventory.find((item: { name: string; }) => item.name === items[0].name);
        if (existingIngredient) {
            const updatedInventory = await Inventory.findOneAndUpdate(
                { userId, "ingredient.name": items[0].name },
                { $set: { "ingredient.$.amount": existingIngredient.amount += items[0].amount } },
                { new: true }
            );
            return updatedInventory ? true : false;
        } else {
            const updatedInventory = await Inventory.findOneAndUpdate(
                { userId },
                { $push: { ingredient: items } },
                { new: true }
            );
            return updatedInventory ? true : false;
        }
    } else {
        const newInventory = await Inventory.create({ userId, ingredient: items });
        return newInventory ? true : false;
    }
};

export const updateInventoryItem = async (userId: string, name: string, amount: number) => {
    await dbConnect();
    const updatedInventory = await Inventory.findOneAndUpdate(
        { userId, "ingredient.name": name },
        { $set: { "ingredient.$.amount": amount } },
        { new: true }
    );
    return updatedInventory ? true : false;
};

export const removeInventoryItem = async (userId: string, name: string) => {
    await dbConnect();
    const updatedInventory = await Inventory.findOneAndUpdate(
        { userId },
        { $pull: { ingredient: { name } } },
        { new: true }
    );
    return updatedInventory ? true : false;
};