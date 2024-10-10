"use server";

import dbConnect from "@/lib/mongodb";
import Recipes from "@/models/recipes";

export async function getRecipesList() {
	return fetch("https://dummyjson.com/recipes")
		.then((res) => res.json())
		.then((data) => data)
		.catch((error) => {
			console.error("Error fetching recipes:", error);
			return { recipes: [] };
		});
}

export async function getRecipes() {
	await dbConnect();
	const recipeList = await Recipes.find({});
	return recipeList;
}

export async function getRecipe(id: string) {
	await dbConnect();
	const recipe = await Recipes.findById(id);
	return recipe;
}

export async function addRecipes(title: string) {
	await dbConnect();
	const newTask = await Recipes.create({ title });
	return newTask;
}

export async function deleteRecipes(id: string) {
	await dbConnect();
	await Recipes.findByIdAndDelete(id);
	return { message: "Task deleted" };
}
