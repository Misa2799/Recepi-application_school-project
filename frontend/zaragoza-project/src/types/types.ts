export interface recipe{
    id: number,
    name: string,
    description: string,
    ingredients: string,
    steps: string,
    image: string,
    category: string
}

export interface category{
    id: number,
    name: string
}

export interface groceryCart{
    id: number,
    user_id: number,
    recipe_id: number,
    quantity: number
}
