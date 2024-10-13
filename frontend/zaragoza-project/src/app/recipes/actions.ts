'use server'

import dbConnect from '@/lib/mongodb'
import Wishlist from '@/models/wishlist'
import { getRecipeById } from '../actions'
import { Recipe } from '@/types/types'

export async function getWishlist(id: string) {
    await dbConnect()
    const wishlist = await Wishlist.findOne({ userId: id })
    let newWishlist: Recipe[] = []
    for(let recipes of wishlist.recipeId){
        await getRecipeById(recipes).then((recipe) => {
            newWishlist.push(recipe)
        })
    }
    return newWishlist
  }
  
  export async function addWishlist(userId: string, recipeId: string[]) {
    await dbConnect()
    const wishList: any = await getWishlist(userId)
    if (wishList) {
      if (wishList.recipeId.includes(recipeId[0])) {
        return false
      }
      const newWishlist = await Wishlist
        .findOneAndUpdate({ userId: userId }, { $push: { recipeId: recipeId } }, { new: true })

        return newWishlist? true:false
    }else{
      const newWishlist = await Wishlist.create({ userId: userId, recipeId: recipeId })
      return newWishlist? true:false
    }
}