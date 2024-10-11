'use server'

import dbConnect from '@/lib/mongodb'
import Wishlist, { WishlistInterface } from '@/models/wishlist'

export async function getWhishlist(id: string) {
    await dbConnect()
    const recipe = await Wishlist.findById(id)
    return recipe
  }
  
  export async function addWhishlist(ingredient: WishlistInterface) {
    await dbConnect()
    const newWishlist = await Wishlist.create({ ingredient })
    return newWishlist
  }
