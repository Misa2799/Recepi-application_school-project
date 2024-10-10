'use server'

import dbConnect from '@/lib/mongodb'
import Recipes from '@/models/recipes'
import { Recipe } from '@/types/types'

export async function getRecipesList(){
  const response = await fetch('https://dummyjson.com/recipes?limit=10')
  return response.json()
}

export async function getRecipes() {
  await dbConnect()
  const recipeList = await Recipes.find({})
  return recipeList
}

export async function getRecipe(id: string) {
  await dbConnect()
  const recipe = await Recipes.findById(id)
  return recipe
}

export async function addRecipes(recipe: Recipe) {
  await dbConnect()
  const newRecipe = await Recipes.create({ recipe })
  return newRecipe
}

export async function deleteRecipes(id: string) {
  await dbConnect()
  await Recipes.findByIdAndDelete(id)
  return { message: 'Recipe deleted' }
}