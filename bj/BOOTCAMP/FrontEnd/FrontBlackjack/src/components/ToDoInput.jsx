import ToDoTask from "./ToDoTask"



export default function ToDoList(){
    

    function addTask(event){
        const value = event.target.value
        settask(value);
    }

    function toggleTaskCompletion(){

    }








    return(
        <form onSubmit={}>
            <input 
            type="text"
            onClick={addTask} />
            <button 
            onClick={submitTask}>Ajouter
            </button>
        </form>

    )
}