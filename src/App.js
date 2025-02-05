import { useEffect, useState } from 'react';
import './App.css';
import { MdDelete } from "react-icons/md";
import { FaCheck } from "react-icons/fa";

function App() {
  const[isCompleteScreen,setIsCompleteScreen]=useState(false);
  const[allTodos,setTodos]=useState([]);
  const[newTitle,setNewTitle]=useState("");
  const[newDescription,setNewDescription]=useState("");
  const[completedTodos,setCompletedTodos]=useState([]);

  const handleAddTodo=()=>{
      let newTodoItem={
        title:newTitle,
        description:newDescription
      }

      let updatedTodoArr=[...allTodos];
      updatedTodoArr.push(newTodoItem);
      setTodos(updatedTodoArr);

      localStorage.setItem('todolist',JSON.stringify(updatedTodoArr))
  };

  const handleDeleteTodo=(index)=>{
    let reduceTodo = [...allTodos];
    reduceTodo.splice(index,1);

    localStorage.setItem('todolist',JSON.stringify(reduceTodo));
    setTodos(reduceTodo);
  }

   let handleComplete=(index)=>{
    let now=new Date();
    let dd=now.getDate();
    let mm=now.getMonth()+1;
    let yy=now.getFullYear();
    let hr=now.getHours();
    let min=now.getMinutes();
    let sec=now.getSeconds();

    let completedOn=dd + '-' + mm + '-' + yy + '-' + hr + '-' + min + '-' + sec;

    let filteredItem={
      ...allTodos[index],
      completedOn:completedOn
    }

    let updatedCompletedArr=[...completedTodos];
    updatedCompletedArr.push(filteredItem);
    setCompletedTodos(updatedCompletedArr);
    handleDeleteTodo(index);
    localStorage.setItem('completedTodos',JSON.stringify(updatedCompletedArr));
   }

   let handleDeleteCompletedTodo=(index)=>{
     let reduceTodo=[...completedTodos];
     reduceTodo.splice(index,1);

     localStorage.setItem('completedTodos',JSON.stringify(reduceTodo));
     setCompletedTodos(reduceTodo);
   }

  useEffect(() => {
    try {
      const savedTodo = JSON.parse(localStorage.getItem('todolist'));
      const completedTodo = JSON.parse(localStorage.getItem('completedTodos'));

      if (savedTodo) {
        setTodos(savedTodo);
      }
      if(completedTodo){
        setCompletedTodos(completedTodo);
      }
    } catch (error) {
      console.error('Error parsing or retrieving data from local storage:', error);
    }
  }, []);

  return (
    <div className='App'>
        <h1>MY Todos</h1>

        <div className='todo-wrapper'>
               <div className='todo-input'>
                  <div className='todo-input-item'>
                    <label>Title</label>
                    <input type='text' value={newTitle} onChange={(e)=>setNewTitle(e.target.value)} placeholder='whats the task title? '></input>
                  </div>
                  <div className='todo-input-item'>
                    <label>Description</label>
                    <input type='text' value={newDescription} onChange={(e)=>setNewDescription(e.target.value)} placeholder='whats the description? '></input>
                  </div>
                  <div className='todo-input-item'>
                     <button type='button' onClick={handleAddTodo} className='primaryBtn'>Add</button>
                  </div>
               </div>

               <div className='btn-area'>
                  <button className={`isCompleteScreen ${isCompleteScreen === false && 'active'}`} onClick={() => setIsCompleteScreen(false)}>Todo</button>
                  <button className={`isCompleteScreen ${isCompleteScreen === true && 'active'}`} onClick={() => setIsCompleteScreen(true)}>Complete</button>
               </div>

               <div className='todo-list'>
                {isCompleteScreen===false && allTodos.map((item,index)=>{
                  return(
                    <div className='todo-list-item' key={index}>
                  <div>
                     <h3>{item.title}</h3>
                     <p>{item.description}</p>
                  </div>
                  
                <div>
                  <MdDelete className='icon' onClick={()=>handleDeleteTodo(index)} title='delete?'/>
                  <FaCheck className='check-icon' onClick={()=>handleComplete(index)}/>
                </div>

               </div>
                  )
                }
                )}

            {isCompleteScreen===true && completedTodos.map((item,index)=>{
                  return(
                    <div className='todo-list-item' key={index}>
                  <div>
                     <h3>{item.title}</h3>
                     <p>{item.description}</p>
                     <p><small>completedOn : {item.completedOn}</small></p>
                  </div>
                  
                <div>
                  <MdDelete className='icon' onClick={()=>handleDeleteCompletedTodo(index)} title='delete?'/>
                </div>

               </div>
                  )
                }
                )}
               </div>
        </div>
    </div>
  );
}

export default App;
