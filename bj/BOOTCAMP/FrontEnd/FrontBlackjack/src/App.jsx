import { useState } from 'react'
import './App.css'
import TableBj from './components/TableBj'


function App() {

  const players_list = [
    {
      id: 0,
      score: 0,
      name: "Clem",
    },
    {
      id: 1,
      score: 0,
      name: "Clement",
    },
    {
      id: 3,
      score: 0,
      name: "Clemento",
    },
  ]


  const [task, setTask] = useState('');
  const [list, setList] = useState([]);

  function addTask(event) {
    const value = event.target.value;
    setTask(value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (task.trim() !== '') {
      const newTodo = {
        id: Date.now(),
        title: task,
        completed: false,
      };
      setList([...list, newTodo]);
      setTask('');
    }
  }

  function Toggle(id) {
    const temp = [...list];
    const item = temp.find((item) => item.id === id);
    if (item) {
      item.completed = !item.completed;
      setList(temp);
    }
  }

  return (
    <>
      <TableBj players={players_list} />

      <div className='TODO'>
        <h1>To-Do-List</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={task}
            onChange={addTask}
            placeholder="Ajouter une tâche"
          />
          <button type="submit">Ajouter</button>
        </form>
        <ul>
          {list.map((item) => (
            <li
              key={item.id}
              onClick={() => Toggle(item.id)}
              style={{
                textDecoration: item.completed ? 'line-through' : 'none',
                cursor: 'pointer',
              }}
            >
              {item.title}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App
