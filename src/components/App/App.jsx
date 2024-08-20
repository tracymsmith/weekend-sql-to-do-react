import {useState, useEffect} from 'react';
import axios from 'axios';
import './App.css';


function App() {
  const [todoList, setTodoList] = useState([]);
  const [newTodoDescription, setNewTodoDescription] = useState('');


  useEffect(()=>{
    fetchTasks()
  })
    function fetchTasks (){
    axios.get('/api/todo')
          .then((response) => {
              console.log(response.data);
              setTodoList(response.data);
          })
          .catch((error) => {         
  })
}
  const addTasks = (event) => {
    event.preventDefault ();
  const newTasks = {
    description: newTodoDescription,
    is_complete: false
  }
  axios.post ('/api/todo', newTasks)
  .then((response) => {
    console.log(response);
    setNewTodoDescription('');

    fetchTasks();
  })
  .catch((error) => {
    console.log(error);
  })
}
  return (
  <div className='form-container'>
    <form onSubmit={addTasks}>
        <label htmlFor="task">Task</label>
        <input id="task" onChange={(event) => setNewTodoDescription(event.target.value)} value={newTodoDescription} />
        <label htmlFor="taskStatus">Task Status:</label>
        {/* <input id="taskStatus" onChange={(event) => setNewIs_complete(event.target.value)} value={newIs_complete} /> */}
        <button type="submit">Submit</button>
      </form>
 
   <div>
    <p>
      {todoList.map((todo)=>{
        return (
       <>
          <p>{todo.description}</p>
          <p>{todo.is_complete}</p>
        

          <button>Complete</button>
          <button>Remove</button>
       </>

        )
      })}
    </p>
  </div>
</div>

  )};

export default App

// import { useState } from 'react';

// function RockCounter(props) {
  
//   const [count, setCount] = useState(0); 
 
//   const increaseCount = () => { 
//     setCount(count + 1); 
//   }; 
 
//   const decreaseCount = () => { 
//     setCount(count - 1); 
//   }; 

//   const resetCount = () => {
//    setCount(0);
//   }


 

//   return (
//     <div>
//       <h2>{props.name}</h2>
//       <div>Rocks Picked: {count} </div>
//       <div>
//         <button onClick={increaseCount}>Increase</button>
//         <button onClick={decreaseCount}>Decrease</button>
//         <button onClick={resetCount}>Reset</button>
//       </div>
//     </div>
//   );
// }

// export default RockCounter;
