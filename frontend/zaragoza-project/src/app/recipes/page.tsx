const Recipes = () => {
    return ( 
    <div>
        <h2>Recipes</h2>
    </div> 
    );
}
 
export default Recipes;

// useEffect(() => {
//     fetchTasks()
//   }, [])

//   const fetchTasks = async () => {
//     const response = await fetch('/api/tasks')
//     const data = await response.json()
//     setTasks(data)
//   }

//   const addTask = async (e: React.FormEvent) => {
//     e.preventDefault()
//     const response = await fetch('/api/tasks', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ title: newTaskTitle }),
//     })
//     const newTask = await response.json()
//     setTasks([...tasks, newTask])
//     setNewTaskTitle('')
//   }

//   const deleteTask = async (id: string) => {
//     await fetch('/api/tasks', {
//       method: 'DELETE',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ id }),
//     })
//     setTasks(tasks.filter(task => task._id !== id))
//   }