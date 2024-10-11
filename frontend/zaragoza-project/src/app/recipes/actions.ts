'use server'

import dbConnect from '@/lib/mongodb'
import Recipes from '@/models/recipes'
import { Recipe } from '@/types/types'

export async function getWhishlist(id: string) {
    await dbConnect()
    const recipe = await Recipes.findById(id)
    return recipe
  }
  
  export async function addWhishlist(ingredient: string) {
    await dbConnect()
    const newRecipe = await Recipes.create({ ingredient })
    return newRecipe
  }
