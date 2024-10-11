import React from "react";

interface ListProps {
	recipes: any[];
	className?: string; // Hacemos que className sea opcional
}

const List: React.FC<ListProps> = ({ recipes, className = "" }) => {
	return (
		<div className={`grid grid-cols-2 gap-4 ${className}`}>
			{recipes.map((recipe) => (
				<div key={recipe.id} className="border border-gray-300 p-4 rounded shadow">
					<img src={recipe.image} alt={recipe.name} className="w-full h-32 object-cover rounded mb-2" />
					<h3 className="font-semibold text-lg">{recipe.name}</h3>
					<p className="text-sm text-gray-600">Cuisine: {recipe.cuisine}</p>
					<p className="text-sm text-gray-600">Prep Time: {recipe.prepTimeMinutes} mins</p>
					<p className="text-sm text-gray-600">Cook Time: {recipe.cookTimeMinutes} mins</p>
					<p className="text-sm text-gray-600">Servings: {recipe.servings}</p>
					<div className="flex justify-between mt-4">
						<button className="bg-blue-500 text-white px-3 py-1 rounded">More</button>
						<button className="bg-green-500 text-white px-3 py-1 rounded">Add</button>
					</div>
				</div>
			))}
		</div>
	);
};

export default List;
