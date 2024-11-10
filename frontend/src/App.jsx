//App.jsx
import { useEffect, useState } from 'react';
import axios from 'axios';

const backendUrl = 'http://localhost:3000';

function App() {
  const [tasks, setTasks] = useState([]); // State to hold tasks
  const [input, setInput] = useState(''); // State for input field

  async function fetchItems() {
    const items = await axios.get(`${backendUrl}/items`);
    setTasks(items.data);
  }

  useEffect(() => {
    (async () => {
      await fetchItems();
    })();
  });

  // Function to add a new task
  async function addTask() {
    if (input.trim()) {
      await axios.post(`${backendUrl}/items`, { name: input });
      await fetchItems();
      setInput(''); // Clear input field
    }
  }

  // Function to delete a task by index
  async function deleteTask(id) {
    await axios.delete(`${backendUrl}/items/${id}`);
    await fetchItems();
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>To-Do List</h1>
      <input
        type='text'
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder='Add a new task'
      />
      <button onClick={addTask}>Add</button>
      <ul>
        {tasks.map(task => (
          <li key={task._id}>
            {task.name}
            <button
              onClick={() => deleteTask(task._id)}
              style={{ marginLeft: '20px' }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
