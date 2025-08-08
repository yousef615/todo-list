export default function ControlsButtons ({taskCount, filterCompleted, showCompleted, visibleItems, dispatch,}) {
     return (
        <div>
        {taskCount > 0 ? 
        <button  className="filter-complete hover:text-cyan-700 hover:border-cyan-900! inline!" style={{display: taskCount < 1 && state.filter((item)=> item.complete) ? "none" : "block" }}
         onClick={showCompleted}> {filterCompleted && taskCount > 0 ? "📄 Show All Tasks": "✅ Show Completed Tasks"}
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
     )
}