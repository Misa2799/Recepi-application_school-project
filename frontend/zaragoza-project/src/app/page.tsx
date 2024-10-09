"use client";
import RecipesSideBar from "@/components/recipesSideBar";
import SideBar from "@/components/sideBar";

export default function Home() {
  // const [ recipes, setRecipes ] = useState<recipe[]>([])
  // useEffect(() => {
  //   fetchRecipes()
  // }, [])

  // const fetchRecipes = async () => {
  //   const fetchedTasks = await getRecipes()
  //   setRecipes(fetchedTasks)
  // }

  return (
    <div className="flex flex-1 p-4">
      <SideBar />
      <RecipesSideBar />
      Hello
    </div>
  );
}
