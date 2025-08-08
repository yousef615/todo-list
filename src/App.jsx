import { useEffect, useReducer, useState } from "react";
import { getItem, setItem } from "./utils/LocalStorage";
import {toDoReducer} from "./utils/ToDoReducer";
import Header from "./components/Header";
import './App.css'
import {AddTaskForm} from "./components/AddTaskForm";
import TasksList from "./components/Task'sList";
import ToggleTheme from "./components/ToggleTheme";
import ControlsButtons from "./components/ControlButtons";

//  Initialize reducer

 
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
        const [editValue, setEditValue] = useState("");
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
      // Feature for mobile devices
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

   <Header/>

{/*  main div with all content */}
   <div className="main  mt-12 flex flex-col items-start min-w-80 text-2xl
    bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200">
   
   <ToggleTheme
   darkMode={darkMode}
   setDarkMode={setDarkMode}
  />

      {/* The unorder list of tasks */}
    <AddTaskForm
     inputValue={inputValue}
     setInputValue={setInputValue}
     handleAddTask={handleAddTask}
     exist={exist}
    />  
    <TasksList
      visibleItems={visibleItems}
      dispatch={dispatch}
      filterCompleted={filterCompleted}
      taskCount={state.length}
      />    
      
          {/* control Buttons */}
     <ControlsButtons
      visibleItems={visibleItems}
      dispatch={dispatch}
      filterCompleted={filterCompleted}
      taskCount={state.length}
      showCompleted={showCompleted} 
     />
    </div>

    </div>
  )
}

export default App;
