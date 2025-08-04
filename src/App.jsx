import { useEffect, useReducer, useState } from "react";
import { getItem, setItem } from "./utils/LocalStorage";
import './App.css'

//  Initialize reducer
const toDoReducer = (state, action) => {
  switch(action.type) {
    case "ADDTASK": return [...state,{id: Date.now(), title: action.title, complete: false}];
    
    case "DELETE": return state.filter((todo) => todo.id !== action.id);

    case "COMPLETE": return state.map((todo) => todo.id === action.id ?{...todo, complete: !todo.complete}: todo );

    case "CLEAR_ALL": return [];

    default:  return state; 
    
    }}
 
  //  The main component
  function App() {
    // Use local storage to store data after leaving the session
    const [state, dispatch] = useReducer(toDoReducer, [], () => {
      const stored = getItem("tasks");
      return stored ?? [];
    });
    // try to store this state in local storage
    const [darkMode, setDarkMode] = useState(() => {
      const saved = getItem("darkMode");
      return saved ?? false;
    });
        const [inputValue, setInputValue] = useState("");
    const [exist, setExist] = useState(false);
    const [filterCompleted, setFilterCompleted] = useState(false);


    useEffect(() => {
      setItem({ key: "tasks", value: state });
    }, [state]);

   
    
    useEffect (() => {
      setItem({key:"darkMode", value: darkMode})
      if (darkMode) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");

      }
    }, [darkMode])

    // Start functions on events
    const handleAddTask = ()  => {
  window.navigator.vibrate(50)

  //  convert the first letter of every word to uppercase
  const words = inputValue.split(" ")
  const firstToUpper = words.map((word) =>
  { if (word.length <= 0) {
    return "";
  } return word.charAt(0).toLocaleUpperCase() + word.slice(1)}).join(" ")
  
  { if (inputValue !== "" && !state.some((item) => item.title.toLocaleLowerCase() === firstToUpper.toLocaleLowerCase())) {
  dispatch({type: "ADDTASK", title: firstToUpper});
     setInputValue("");
     setExist(false);
     
      }
       else if (state.some((item) => item.title.toLowerCase() === firstToUpper.toLowerCase())) {
         setExist(true)
        

      }

    }}

const showCompleted =() => {
  setFilterCompleted(prev => !prev);
}
  
  const visibleItems = filterCompleted
    ? state.filter(todo => todo.complete)
    : state;

// *************JSX**************
    return (
    <div className="bg-gray-100 dark:bg-gray-700 dark:text-gray-200 ">
{/* the titile */}
    <h1 className="dark:bg-gray-700 dark:text-gray-100 bg-gray-100
     text-cyan-400 hover:bg-sky-200 dark:hover:bg-sky-900 font-serif  
    text-3xl text-center m-0   border-b-1 w-5x 
    rounded-xl shadow-[-1px_8px_8px_-4px_rgb(90,120,200)]
     dark:shadow-[-1px_8px_8px_-4px_rgb(6,169,214)]
    hover:text-4xl hover:text-white-300! ">Todo List</h1>

{/*  main div with all content */}
   <div className="main  mt-12 flex flex-col items-start min-w-80 text-2xl
    bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200">
      {/* Toggle mode button */}
    <div className=" theme text-base!  rounded-2xl relative
     bg-gray-100 text-white  dark:bg-gray-300  
    w-13 h-7 hover:shadow-[5px_5px_40px_-4px_rgb(0,0,0)]!
    dark:hover:shadow-[5px_5px_40px_-4px_rgb(255,255,255)]!
      border-2 
    outline-gray-400 border-gray-500
    " 
    onClick={(() => {setDarkMode(prev => !prev)})}>{!darkMode ?<span className="d"></span> : <span className="l"></span>}</div>

     <div> <input className="
   bg-white border-1 border-gray-300
   text-gray-900 text-sm rounded-lg
   focus:outline-blue-900 inline m-3 p-3
   dark:bg-gray-600 dark:border-gray-600 
   dark:placeholder-gray-400 dark:text-white" 
        value={inputValue}
        onKeyDown={ (e) =>{if (e.key === "Enter") {
          handleAddTask(e)}}}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder='New Task'
      />
      <button  className="add-task hover:drop-shadow-4xl hover:text-green-500 hover:border-green-800!"
       onClick={(e) => handleAddTask(e)
       }>Add task</button>
        </div>
        {exist ? <p style={{ color: "red"}} className="text-lg mb-2" > This task is already exist</p>: ""}
      
      {/* here there is the unorder list of tasks */}
      <ul className="p-3 mb-5  border-gray-200/100 dark:border-gray-600
       rounded-xl " style={{border: state.length  < 2 ? "none":  " ridge 3px  " }}>
        {visibleItems.map((todo) => (
          <li className="mb-3 font-[Josifen_Sans]  max-w-xl " key={todo.id} style={{textDecoration:
            !filterCompleted && todo.complete?"line-through": "none" }}>{todo.title}  
            {/* completed  task button */}
           <button className="complete ml-5!" onClick={() => dispatch({type:"COMPLETE",
            id: todo.id })} style={{color: todo.complete? "gray": "green"}}>✔</button>
            {/* delete task button */}
           <button
          className="delete filter hover:shadow-[1px_5px_30px_-4px_rgb(250,2,25)]!" onClick={() => dispatch({type:"DELETE", id: todo.id})}>X</button>
        <br/>
           </li> 
        ))}
      </ul>
          {/* control div */}
      <div>
        {state.length > 0 ? 
        <button  className="filter-complete hover:text-cyan-700 hover:border-cyan-900! inline!" style={{display: state.length < 1 && state.filter((item)=> item.complete) ? "none" : "block" }}
         onClick={showCompleted}> {filterCompleted && state.length > 0 ? "📄 Show All Tasks": "✅ Show Completed Tasks"}
         {/* Clear All Tasks Button */} </button> : <p style={{fontSize:"18px", paddingLeft: "20px"}}>Lets Do It Now...</p>}
        {visibleItems.length > 0 && (
  <button
    className="clear-all hover:text-red-600 hover:border-red-600!
     dark:hover:text-red-500 inline! dark:text-white 
     hover:shadow-[1px_5px_30px_-4px_rgb(250,2,25)]! p-2 rounded m-3"
    onClick={() => {
      dispatch({ type: "CLEAR_ALL" });
      localStorage.removeItem("tasks"); // مسح من التخزين المحلي
    }}
  >
    🗑️ Clear All Tasks
  </button>
)}

    </div>
    </div>

    </div>
  )
}

export default App;
