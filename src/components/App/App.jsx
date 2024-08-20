import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [todoList, setTodoList] = useState([]);
  const [newDescription, setNewDescription] = useState('');

  useEffect(() => {
    getData();
  }, []);

  function getData() {
    axios.get('/api/todo')
      .then(response => {

        console.log('Displaying the data from db: ', response.data); 

        setTodoList(response.data);
      })
      .catch(error => {
        console.error('Error getting ToDo List from db', error);
      });
  }

  const addTodo = (event) => {
    event.preventDefault();

    const newTask = {
      description: newDescription,
      is_complete: false 
    };

    axios.post('/api/todo', newTask)
      .then(() => {
        getData(); 
      })
      .catch(error => {
        console.error('Error adding new task', error);
      });

    setNewDescription(''); 
  };

  const markCompleted = (id) => {
    axios.put(`/api/todo/${id}`, { is_complete: true }) 
      .then(() => {
        getData(); 
      })
      .catch((error) => {
        console.log('new task not added to db', error);
      });
  };

  const deleteTodo = (id) => {
    axios.delete(`/api/todo/${id}`)
      .then(() => {
        getData(); 
      })
      .catch(error => {
        console.error('Error deleting task', error);
      });
  };

  console.log('Todo List:', todoList); 

  return (
    <div>
      <h1>To Do List</h1>

      <div className='form-container'>
        <form onSubmit={addTodo}>
          <label htmlFor="description">Task</label> <br />
          <input 
            id="description" 
            onChange={(event) => setNewDescription(event.target.value)} 
            value={newDescription} 
            placeholder="Enter task here" 
          /> <br />
          <button type="submit">Add Task</button>
        </form>
      </div>

      <div className='todo-container'>
        <ul>
          {todoList.map(todo => (
            <li key={todo.id}>
              <p> Task: {todo.description}</p> 
      
              <div className='buttons'>
                <button 
                  onClick={() => markCompleted(todo.id)} 
                  disabled={todo.is_complete} 
                >
                  {todo.is_complete ? 'Completed' : 'Complete'}
                </button>
                <button className='delete-btn' onClick={() => deleteTodo(todo.id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;