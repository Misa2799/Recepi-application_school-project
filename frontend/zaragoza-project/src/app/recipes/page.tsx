"use client";

import FridgeSideBar from "@/components/fridgeSideBar";
import React, { Suspense, useEffect, useState } from "react";
import { getRecipesList } from "../actions";
import { useAuth } from "@clerk/nextjs";
import { Recipe } from "@/types/types";
import { addWishlist, getWishlist } from "./actions";
import RecipesSideBar from "@/components/recipesSideBar";
import { useShoppingList } from "@/context/shoppingListContext.context";
import { useRouter } from "next/navigation"; // Importar useRouter

const Recipes = () => {
	const [recipesList, setRecipes] = useState<Recipe[]>([]);
	const [filteredCuisine, setFilteredCuisine] = useState<string | null>(null);
	const [filterType, setFilterType] = useState<string | null>(null);
	const user = useAuth();
	const { recipes, removeRecipe, addRecipeToWishlist } = useShoppingList();
	const router = useRouter(); // Inicializar el hook useRouter

	useEffect(() => {
		fetchRecipes();
	}, []);

	const fetchRecipes = async () => {
		const fetchedRecipes = await getRecipesList();
		setRecipes(fetchedRecipes.recipes);
	};

	const addRecipe = async (recipe: Recipe) => {
		if (user.userId) {
			const success = await addWishlist(user.userId, [recipe.id.toString()]);
			if (success) {
				addRecipeToWishlist(recipe);
			} else {
				console.error("Failed to add to wishlist");
			}
		} else {
			console.error("User ID is not available");
		}
	};

	const filterByCuisine = (cuisine: string) => {
		setFilteredCuisine(cuisine);
		setFilterType(null);
	};

	const clearFilter = () => {
		setFilteredCuisine(null);
		setFilterType(null);
	};

	const displayedRecipes = filteredCuisine
		? recipesList.filter((recipe) => recipe.cuisine === filteredCuisine)
		: recipesList;

	return (
		<div className="flex gap-4 p-4">
			<div id="sideBar" className="col-span-3">
				<FridgeSideBar />
			</div>
			<div className="flex-1 mr-80">
				<div className="flex flex-col md:flex-row justify-between items-center mb-4">
					<div className="flex-1 mb-4 md:mb-0 md:mr-4">
						<input
							type="text"
							placeholder="Search Recipes"
							className="w-full p-2 border border-gray-300 rounded"
						/>
					</div>
					<div className="bg-gray-100 p-4 rounded w-full md:w-auto">
						<p className="font-semibold">Filter Area for recipes</p>
						{/* Aquí van los filtros */}
					</div>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
					{displayedRecipes.map((recipe) => (
						<div key={recipe.id} className="border border-gray-300 p-4 rounded shadow">
							<img
								src={recipe.image}
								alt={recipe.name}
								className="w-full h-32 object-cover rounded mb-2"
							/>
							<h3 className="font-semibold text-lg">{recipe.name}</h3>
							<p className="text-sm text-gray-600">Cuisine: {recipe.cuisine}</p>
							<p className="text-sm text-gray-600">Prep Time: {recipe.prepTimeMinutes} mins</p>
							<p className="text-sm text-gray-600">Cook Time: {recipe.cookTimeMinutes} mins</p>
							<p className="text-sm text-gray-600">Servings: {recipe.servings}</p>
							<div className="flex justify-between mt-4">
								<button
									className="bg-blue-500 text-white px-3 py-1 rounded"
									onClick={() => router.push(`/recipes/${recipe.id}`)} // Redirigir a la página de detalles
								>
									More
								</button>
								<button
									className="bg-green-500 text-white px-3 py-1 rounded"
									onClick={() => addRecipe(recipe)}
								>
									Add
								</button>
							</div>
						</div>
					))}
				</div>
			</div>
			<div className="fixed right-0 top-16 h-[calc(100vh-4rem)]">
				<Suspense fallback={<div className="flex h-screen">Loading...</div>}>
					<RecipesSideBar />
				</Suspense>
			</div>
		</div>
	);
};

export default Recipes;
